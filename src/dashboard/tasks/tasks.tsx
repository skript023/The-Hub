import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import {useEffect, useState} from 'react'
import Sidenav from "../../navigation/sidebar";
import AddCircleIcon from "@mui/icons-material/AddCircle"

import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import Modals from "../../components/modal";
import AddTask from "./add";
import EditTask from "./edit";
import tasks from "../../api/tasks";
import toast from "react-hot-toast";
import Loading from "../../components/backdrop";
import AddTaskIcon from '@mui/icons-material/AddTask';

export default function Task() 
{
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activities, setactivities] = useState([] as any);
    const [task, setTask] = useState({} as any);

    const loadTask = () => {
        tasks.findAll().then((data : any) =>{
            setactivities(data);
            
            setLoading(false);
        }).catch((error : any) => {
            toast.error(error.message)
        })
    }

    useEffect(() => {
        setLoading(true);

        loadTask()
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
        tasks.complete(index).then((success) => {
            if (success)
            {
                toast.success('Task tagged as completed');
                const newTask = activities.map((obj: any) => {
                    // Modify the property as needed
                    if (obj._id == index)
                    {
                        obj.status = 'Completed';
                        obj.end_date = new Date().toLocaleDateString();
                    } 
                    return obj;
                });

                setactivities(newTask);
            }
            else
            {
                toast.error('Failed tag task as completed');
            }
        }).catch((error: any) => {
            toast.error(error.message);
        });
    };
      
    const handleDeleteClick = (index: string) => {
        tasks.remove(index)
        .then((response) => {
            if (response?.success)
            {
                toast.success(response.message);

                const deletedTask = activities.filter((item: any) => item._id !== index);
                setactivities(deletedTask);
            }
        })
        .catch((error) => {
            toast.error(error.message);
        });
    };
    
    const columns = [
        { 
            name: "id", 
            label: "ID",
            options: {
                filter: true,
                sort: true,
            }
        },
        { 
            name: "user_id", 
            label: "Owner",
            options: {
                filter: true,
                sort: true,
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
                filter: true,
                sort: true,
                customBodyRender: (value: any, _tableMeta: any, _updateValue: any) => (
                    <Stack spacing={2} direction={"row"}>
                        <AddTaskIcon style={{ fontSize: "20px", color: "green", cursor: "pointer" }}
                            onClick={() => handleComplete(value) }/>
                        <EditIcon style={{ fontSize: "20px", color: "blue", cursor: "pointer" }}
                            onClick={() => {handleEditClick(value); setOpenEdit(true)} }/>
                        <DeleteIcon style={{ fontSize: "20px", color: "darkred", cursor: "pointer" }}
                            onClick={() => handleDeleteClick(value) }/>
                    </Stack>
                ),
            },
        },
    ];

    const options = {
        onRowsDelete: (rowsDeleted: any) => {
            JSON.stringify(rowsDeleted)
            rowsDeleted.data.map((data : any) => {
                console.log(`${activities[data.index].id}`)
            })
        },
    };

    return (
        <Box height={70}>
        { (() => {
            if (loading)
            {
                return (
                    <>
                        <Loading open={loading}/>
                    </>
                )
            }
            else
            {
                return (
                    <>
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
                                <Modals open={openAdd} callback={() => setOpenAdd(false)} children={<AddTask callback={loadTask}/>}/>
                                <Modals open={openEdit} callback={() => setOpenEdit(false)} children={<EditTask task={task} callback={loadTask}/>}/>
                            </Box>
                        </Box>
                    </>
                )
            }
        })() }
        </Box>
    );
}