import { Box, Button, Grid, Pagination, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Sidenav from "../../navigation/sidebar";
import MUIDataTable, { MUIDataTableTextLabels, Responsive } from "mui-datatables";
import Modals from "../../../components/modal";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { loading } from "../../../components/backdrop";
import { toast } from "../../../components/snackbar";
import { confirm } from "../../../components/confirmation";
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { notification } from "../../../components/notification";
import AddAttendance from "./action/add";
import EditAttendance from './action/edit';
import { Attendance } from "../../../interfaces/attendance";
import attendance from "../../../api/attendance";

export default function Attendances()
{
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [attendances, setAttendances] = useState([] as Attendance[]);
    const [selectedAttendances, setSelectedAttendances] = useState({} as Attendance);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const loadRole = () => {
        loading.start()
        attendance.findAll().then((response) => {
            if (response?.success)
            {
                setAttendances(response.data);
            }
            else
            {
                toast.error('Role', response?.message);
            }
            loading.stop()
        }).catch((err: any) => {
            toast.error('Exception Role', err.message);
            loading.stop();
        })
    }

    useEffect(() => {
        loadRole();
    }, []);

    const handleEditClick = (index: string) => {
        attendances.map((obj: any) => {
            if (obj._id == index)
            {
                setSelectedAttendances(obj);
            }
        });
    };

    const handleDeleteClick = (index: string) => {
        attendance.remove(index)
        .then((response) => {
            if (response?.success)
            {
                toast.success('Attendance', response.message);

                const deletedUser = attendances.filter((item: any) => item._id != index);
                setAttendances(deletedUser);
                notification.success('Attendance', 'You have successfully delete attendance');
            }
            else
            {
                notification.error('Attendance', 'You have fail delete attendance');
            }
        })
        .catch((error) => {
            toast.error('Attendance', error.message);
            notification.error('Attendance', 'You have fail delete attendance');
        });
    };

    const columns = [
        { 
            name: "_id", 
            label: "ID",
            options: {
                filter: true,
                sort: true,
            }
        },
        { 
            name: "date", 
            label: "Date",
            options: {
                filter: true,
                sort: true,
            }
        },
        { 
            name: "type", 
            label: "Type",
            options: {
                filter: true,
                sort: true,
            }
        },
        { 
            name: "jenis", 
            label: "Jenis",
            options: {
                filter: true,
                sort: true,
            }
        },
        { 
            name: "deskripsi", 
            label: "Description",
            options: {
                filter: true,
                sort: true,
            }
        },
        { 
            name: "justifikasi_approval", 
            label: "Approval Justification",
            options: {
                filter: true,
                sort: true,
            }
        },
        { 
            name: "justifikasi_agenda", 
            label: "Agenda Justification",
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
                        <EditIcon style={{ fontSize: "20px", color: "blue", cursor: "pointer" }}
                            onClick={() => { handleEditClick(value); setOpenEdit(true)} }/>
                        <DeleteIcon style={{ fontSize: "20px", color: "darkred", cursor: "pointer" }}
                            onClick={() => { confirm.show('User Delete', 'Are you sure want to delete this record?', () => handleDeleteClick(value) ) } }/>
                    </Stack>
                ),
            },
        },
    ]

    const options = {
        responsive: 'vertical' as Responsive,
        enableNestedDataAccess: ".",
        selectableRowsHideCheckboxes: isMobile ? true : false,
        onRowsDelete: (rowsDeleted: any) => {
            JSON.stringify(rowsDeleted)
            rowsDeleted.data.map((data : any) => {
                console.log(`${attendances[data.index]._id}`)
            })
        },
        customFooter: (rowCount: number, page: number, rowsPerPage: number, _changeRowsPerPage: (newPage: number) => void, changePage: (newPage: number) => void, _textLabels: Partial<MUIDataTableTextLabels>) => {
            return (
                <Box display="flex" justifyContent="flex-end" marginTop={2} marginBottom={2}>
                    <Pagination
                        showFirstButton showLastButton
                        count={Math.floor(rowCount / rowsPerPage) + 1}
                        page={page + 1}
                        onChange={(_e, index) => changePage(index - 1)}
                    />
                </Box>
            );
        },
    };

    return (
        <>
        <Box height={70}>
            <Box sx={{ display: "flex" }}>
                <Sidenav/>
                <Box component={"main"} sx={{ flexGrow: 1, mt: 8, ...(!isMobile && { p: 3 }), ...(isMobile && { mb: 8 })  }}>
                    <Box m="20px">
                        <Grid container justifyContent="center">
                            <Typography variant="h4" component="div">
                                Attendance
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
                            <MUIDataTable title={""} data={attendances} columns={columns} options={options}/>
                        </Box>
                    </Box>
                    <Modals  title="Add Role" open={openAdd} callback={() => setOpenAdd(false)}>
                        <AddAttendance callback={() => { loadRole(); setOpenAdd(false); }}/>
                    </Modals>
                    <Modals title="Edit Role" open={openEdit} callback={() => { setOpenEdit(false); }}>
                        <EditAttendance selectedAttendance={selectedAttendances} callback={() => { loadRole(); setOpenEdit(false); }}/>
                    </Modals>
                </Box>
            </Box>
        </Box>
        </>
    )
}