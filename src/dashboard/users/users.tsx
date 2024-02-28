import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import {useEffect, useState} from 'react'
import Sidenav from "../../navigation/sidebar";
import AddCircleIcon from "@mui/icons-material/AddCircle"

import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import Modals from "../../components/modal";
import user from "../../api/user";
import toast from "react-hot-toast";
import AddUser from "./add";
import EditUser from "./edit";
import Loading from "../../components/backdrop";

export default function User() 
{
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    const [users, setUsers] = useState([] as any)
    useEffect(() => {
        setLoading(true);

        user.findAll().then((data) => {
            setUsers(data);
            setLoading(false);
        }).catch((error) => {
            toast.error(error.message);
        });
    }, []);

    const handleEditClick = (index: number) => {
        console.log("Edit clicked for column index:", index);
        // Add your edit logic here using the index
    };
      
    const handleDeleteClick = (index: number) => {
        console.log("Delete clicked for column index:", index);
        // Add your delete logic here using the index
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
                                <Modals open={openAdd} callback={() => setOpenAdd(false)} children={<AddUser/>}/>
                                <Modals open={openEdit} callback={() => setOpenEdit(false)} children={<EditUser/>}/>
                            </Box>
                        </Box>
                        </>
                    )
                }
            })() }
        </Box>
    );
}