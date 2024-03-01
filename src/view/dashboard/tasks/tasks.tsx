import { Box, Button, Grid, Stack, Tooltip, Typography, Pagination } from "@mui/material";
import MUIDataTable, { MUIDataTableOptions, MUIDataTableTextLabels, Responsive } from "mui-datatables";
import {useEffect, useState} from 'react'
import AddCircleIcon from "@mui/icons-material/AddCircle"

import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import Modals from "../../../components/modal";
import AddTask from "./add";
import EditTask from "./edit";
import tasks from "../../../api/tasks";
import { loading } from "../../../components/backdrop";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Task from "../../../interfaces/task.dto";
import { toast } from "../../../components/snackbar";
import DeleteTask from "./delete";
import Notification from "../../../components/notification";
import Sidenav from "../../navigation/sidebar";
import MarkAsCompleted from "./completion";

export default function WorkerTask() 
{
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openCompletion, setOpenCompletion] = useState(false);
    const [openNotif, setOpenNotif] = useState(false);
    const [notifMessage, setNotifMessage] = useState({} as {title: string; message: string; status: string;});
    const [index, setIndex] = useState('');
    const [activities, setActivities] = useState([] as Task[]);
    const [task, setTask] = useState({} as Task);

    const loadTask = () => {
        tasks.findAll().then((data : any) =>{
            setActivities(data);
            
            loading.stop();
        }).catch((error : any) => {
            toast.error('Task Load', error.message)
        })
    }

    useEffect(() => {
        loading.start();

        loadTask();
    }, []);

    const handleEditClick = (index: string) => {
        activities.map((obj: any) => {
            if (obj._id == index)
            {
                setTask(obj);
            }
        });
    };
      
    const handleComplete = (index: string) => {
        tasks.complete(index).then((response) => {
            if (response?.success)
            {
                toast.success('Task Completion', response.message);
                const newTask = activities.map((obj: any) => {
                    if (obj._id == index)
                    {
                        obj.status = 'Completed';
                        obj.end_date = new Date().toISOString().slice(0, 10);
                    } 
                    return obj;
                });

                setActivities(newTask);
            }
            else
            {
                toast.error('Task Completion', 'Failed tag task as completed');
            }
        }).catch((error: any) => {
            toast.error('Task Completion', error.message);
        });
    };
      
    const handleDeleteClick = (index: string) => {
        tasks.remove(index)
        .then((response) => {
            if (response?.success)
            {
                toast.success('Task Delete', response.message);

                const deletedTask = activities.filter((item: any) => item._id != index);
                setActivities(deletedTask);
            }
        })
        .catch((error) => {
            toast.error('Task Delete', error.message);
        });
    };

    const handleMassDeleteClick = (index: string | undefined) => {
        tasks.remove(index as string).
        then((response) => {
            if (response?.success)
            {
                toast.success('Mass Deleter', response.message);
            }
            else
            {
                toast.error('Mass Deleter', response?.message);
            }
        }).
        catch((error: any) => {
            toast.error('Mass Deleter', error.message)
        });
    }
    
    const columns = [
        { 
            name: "id", 
            label: "Task ID",
            options: {
                filter: true,
                sort: true,
                download: false,
            }
        },
        { 
            name: "user.fullname", 
            label: "Owner",
            options: {
                filter: true,
                sort: true,
                download: false,
            }
        },
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "start_date",
            label: "Start Date",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "end_date",
            label: "End Date",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "status",
            label: "Status",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "id",
            label: "Action",
            options: {
                filter: false,
                sort: false,
                download: false,
                customBodyRender: (value: string, _tableMeta: any, _updateValue: any) => (
                    <Stack spacing={2} direction={"row"}>
                        <Tooltip title="Set as Completed">
                            <TaskAltIcon style={{ fontSize: "20px", color: "green", cursor: "pointer" }}
                                onClick={() => { setOpenCompletion(true); setIndex(value); } }/>
                        </Tooltip>
                        <Tooltip title="Edit Task">
                            <EditIcon style={{ fontSize: "20px", color: "blue", cursor: "pointer" }}
                                onClick={() => {handleEditClick(value); setOpenEdit(true)} }/>
                        </Tooltip>
                        <Tooltip title="Delete Task">
                            <DeleteIcon style={{ fontSize: "20px", color: "darkred", cursor: "pointer" }}
                                onClick={() => { setIndex(value); setOpenDelete(true) }}/>
                        </Tooltip>
                    </Stack>
                ),
            },
        },
    ];

    const options: MUIDataTableOptions = {
        responsive: 'vertical' as Responsive,
        enableNestedDataAccess: ".",
        onRowsDelete: (rowsDeleted: any) => {
            // console.log(JSON.stringify(rowsDeleted));
            rowsDeleted.data.map((data : any) => {
                handleMassDeleteClick(activities[data.dataIndex]._id);
            });
        },
        downloadOptions: {
            filename: `Laporan Task ${new Date().toISOString().slice(0, 10)}`,
            filterOptions: {
                useDisplayedColumnsOnly: true
            }
        },
        customFooter: (rowCount: number, page: number, rowsPerPage: number, _changeRowsPerPage: (newPage: number) => void, changePage: (newPage: number) => void, _textLabels: Partial<MUIDataTableTextLabels>) => {
            return (
                <Box display="flex" justifyContent="flex-end" marginTop={2} marginBottom={2}>
                    <Pagination
                        showFirstButton showLastButton
                        count={Math.floor(rowCount / rowsPerPage)}
                        page={page + 1}
                        onChange={(_e, index) => changePage(index - 1)}
                    />
                </Box>
            );
        },
    };

    return (
        <Box height={70}>
            <Box sx={{ display: "flex" }}>
                <Sidenav/>
                <Box component={"main"} sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                    <Box m="20px">
                        <Grid container justifyContent="center">
                            <Typography variant="h4" component="div">
                                Tasks
                            </Typography>
                        </Grid>
                        <Box
                            m="40px 0 0 0"
                            height="75vh"
                            display={'contents'}
                        >
                            <Box height={10}/>
                            <Button variant="contained" endIcon={<AddCircleIcon/>} onClick={() => setOpenAdd(true)}>
                                Add
                            </Button>
                            <Box height={10}/>
                            
                            <MUIDataTable title={""} data={activities} columns={columns} options={options}/>
                        </Box>
                    </Box>
                    <Modals open={openAdd} callback={() => setOpenAdd(false)} title={"Add Task"}>
                        <AddTask callback={() => { setNotifMessage({title: 'Add Task', message: 'You have successfully add task', status: 'success'}); setOpenNotif(true); loadTask(); setOpenAdd(false); }}/>
                    </Modals>
                    <Modals open={openEdit} callback={() => setOpenEdit(false)} title={"Edit Task"}>
                        <EditTask task={task} callback={loadTask}/>
                    </Modals>
                    <DeleteTask open={openDelete} agree={ () => { setNotifMessage({title: 'Delete Task', message: 'You have successfully delete task', status: 'success'}); setOpenNotif(true); handleDeleteClick(index); setOpenDelete(false); } } disagree={ () => setOpenDelete(false)}/>
                    <MarkAsCompleted open={openCompletion} agree={ () => { setNotifMessage({title: 'Task Completed', message: 'You have successfully mark task as completed', status: 'success'}); setOpenNotif(true); handleComplete(index); setOpenCompletion(false); } } disagree={ () => setOpenDelete(false)}/>
                    <Notification id={notifMessage.status} title={ notifMessage.title } message={ notifMessage.message } open={openNotif} callback={() => {setOpenNotif(false)}}/>
                </Box>
            </Box>
        </Box>
    );
}