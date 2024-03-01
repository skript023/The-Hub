import { Box, Button, Grid, Pagination, Stack, Typography } from "@mui/material";
import MUIDataTable, { MUIDataTableTextLabels, Responsive } from "mui-datatables";
import {useEffect, useState} from 'react'
import AddCircleIcon from "@mui/icons-material/AddCircle"

import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import Modals from "../../../components/modal";
import user from "../../../api/user";
import AddUser from "./add";
import EditUser from "./edit";
import Sidenav from "../../navigation/sidebar";
import { toast } from "../../../components/snackbar";
import { notification } from "../../../components/notification";
import { loading } from "../../../components/backdrop";
import { confirm } from "../../../components/confirmation";

export default function User() 
{
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const [users, setUsers] = useState([] as any);
    const [usr, setUser] = useState({} as any);
    
    const loadUser = () => { 
        loading.start();
        user.findAll().then((data) => {
            setUsers(data);
            loading.stop();
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
                notification.success('Delete User', 'You have successfully delete user');
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
            name: "role.name",
            label: "Role",
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
                            onClick={() => { confirm.show('User Delete', 'Are you sure want to delete this record?', () => handleDeleteClick(value)) } }/>
                    </Stack>
                ),
            },
        },
    ];

    const options = {
        responsive: 'vertical' as Responsive,
        enableNestedDataAccess: ".",
        onRowsDelete: (rowsDeleted: any) => {
            JSON.stringify(rowsDeleted)
            rowsDeleted.data.map((data : any) => {
                console.log(`${users[data.index].id}`)
            })
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
                        <AddUser callback={() => { loadUser(); setOpenAdd(false); }}/>
                    </Modals>
                    <Modals  title="Edit User" open={openEdit} callback={() => { setOpenEdit(false); }}>
                        <EditUser users={usr} callback={() => { loadUser(); setOpenEdit(false); }}/>
                    </Modals>
                </Box>
            </Box>
        </Box>
    );
}