import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import {useEffect, useState} from 'react'
import AddCircleIcon from "@mui/icons-material/AddCircle"

import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import Modals from "../../../components/modal";
import user from "../../../api/user";
import AddUser from "./add";
import EditUser from "./edit";
import Loading from "../../../components/backdrop";
import Sidenav from "../../navigation/sidebar";
import { toast } from "../../../components/snackbar";
import DeleteUser from "./delete";
import Notification from "../../../components/notification";

export default function User() 
{
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [index, setIndex] = useState('');
    const [loading, setLoading] = useState(false);

    const [users, setUsers] = useState([] as any);
    const [usr, setUser] = useState({} as any);

    const [openNotif, setOpenNotif] = useState(false);
    const [notifMessage, setNotifMessage] = useState({} as {title: string; message: string; status: string;});
    
    const loadUser = () => { 
        setLoading(true);
        user.findAll().then((data) => {
            setUsers(data);
            setLoading(false);
        }).catch((error) => {
            toast.error('Load Users', error.message);
        });
    }
    useEffect(() => {
        loadUser();
    }, []);

    const handleEditClick = (index: string) => {
        users.map((obj: any) => {
            if (obj._id == index)
            {
                setUser(obj);
            }
        });
    };
      
    const handleDeleteClick = (index: string) => {
        user.remove(index)
        .then((response) => {
            if (response?.success)
            {
                toast.success('User Delete', response.message);

                const deletedUser = users.filter((item: any) => item._id != index);
                setUsers(deletedUser);

                setNotifMessage({title: 'Delete User', message: 'You have successfully delete user', status: 'success'}); setOpenNotif(true); 
            }
        })
        .catch((error) => {
            toast.error('User Delete', error.message);
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
            name: "username", 
            label: "Username",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "fullname",
            label: "Fullname",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "email",
            label: "Email",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "recent_login",
            label: "Last Login",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "expired",
            label: "Expired",
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
                            onClick={() => {handleEditClick(value); setOpenEdit(true)} }/>
                        <DeleteIcon style={{ fontSize: "20px", color: "darkred", cursor: "pointer" }}
                            onClick={() => { setOpenDelete(true); setIndex(value); } }/>
                    </Stack>
                ),
            },
        },
    ];

    const options = {
        onRowsDelete: (rowsDeleted: any) => {
            JSON.stringify(rowsDeleted)
            rowsDeleted.data.map((data : any) => {
                console.log(`${users[data.index].id}`)
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
                                            Users
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
                                        <MUIDataTable title={""} data={users} columns={columns} options={options}/>
                                    </Box>
                                </Box>
                                <Modals  title="Add User" open={openAdd} callback={() => setOpenAdd(false)}>
                                    <AddUser callback={() => { setNotifMessage({title: 'Add User', message: 'You have successfully add user', status: 'success'}); setOpenNotif(true); loadUser(); setOpenAdd(false); }}/>
                                </Modals>
                                <Modals  title="Edit User" open={openEdit} callback={() => { setOpenEdit(false); }}>
                                    <EditUser users={usr} callback={() => { setNotifMessage({title: 'Update User', message: 'You have successfully update user', status: 'success'}); setOpenNotif(true); loadUser(); setOpenEdit(false); }}/>
                                </Modals>
                                <DeleteUser open={openDelete} agree={ () => { handleDeleteClick(index); setOpenDelete(false); } } disagree={ () => setOpenDelete(false)}/>
                                <Notification id="success" color="#198754" title={ notifMessage.title } message={ notifMessage.message } open={openNotif} callback={() => {setOpenNotif(false)}}/>
                            </Box>
                        </Box>
                        </>
                    )
                }
            })() }
        </Box>
    );
}