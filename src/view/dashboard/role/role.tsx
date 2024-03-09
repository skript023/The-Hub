import { Box, Button, Chip, Grid, LinearProgress, Pagination, Stack, Typography } from "@mui/material";
import Sidenav from "../../navigation/sidebar";
import MUIDataTable, { MUIDataTableTextLabels, Responsive } from "mui-datatables";
import Modals from "../../../components/modal";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle"
import Role from "../../../interfaces/role.dto";
import role from "../../../api/role";
import { loading } from "../../../components/backdrop";
import { toast } from "../../../components/snackbar";
import AddRole from "./add";
import { confirm } from "../../../components/confirmation";
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { notification } from "../../../components/notification";
import EditRole from "./edit";

export default function Roles()
{
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [roles, setRoles] = useState([] as Role[]);
    const [selectedRole, setSelectedRole] = useState({} as Role);
    
    const loadRole = () => {
        loading.start()
        role.findAll().then((response) => {
            if (response?.success)
            {
                setRoles(response.data);
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
        roles.map((obj: any) => {
            if (obj._id == index)
            {
                setSelectedRole(obj);
            }
        });
    };

    const handleDeleteClick = (index: string) => {
        role.remove(index)
        .then((response) => {
            if (response?.success)
            {
                toast.success('Role Delete', response.message);

                const deletedUser = roles.filter((item: any) => item._id != index);
                setRoles(deletedUser);
                notification.success('Delete Role', 'You have successfully delete role');
            }
        })
        .catch((error) => {
            toast.error('Role Delete', error.message);
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
            name: "name", 
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        { 
            name: "level", 
            label: "Level",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value: any, _tableMeta: any, _updateValue: any) => {
                    const maxLevel = 6;
                    const percentage = (value * 100) / maxLevel;
                    return <LinearProgress variant="determinate" value={percentage} color={percentage > 70 ? 'success' : percentage < 50 ? 'error' : 'warning'}/>
                }
            }
        },
        { 
            name: "access.create", 
            label: "Create",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value: any, _tableMeta: any, _updateValue: any) => (
                    <span style={{ color: value ? 'green' : 'red' }}>
                        <Chip label={value ? 'yes' : 'no'} color={value ? "success" : "error"} />
                    </span>
                )
            },
        },
        { 
            name: "access.read", 
            label: "Read",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value: any, _tableMeta: any, _updateValue: any) => (
                    <span style={{ color: value ? 'green' : 'red' }}>
                        <Chip label={value ? 'yes' : 'no'} color={value ? "success" : "error"} />
                    </span>
                )
            }
        },
        { 
            name: "access.update", 
            label: "Update",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value: any, _tableMeta: any, _updateValue: any) => (
                    <span style={{ color: value ? 'green' : 'red' }}>
                        <Chip label={value ? 'yes' : 'no'} color={value ? "success" : "error"} />
                    </span>
                )
            }
        },
        { 
            name: "access.delete", 
            label: "Delete",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value: any, _tableMeta: any, _updateValue: any) => (
                    <span style={{ color: value ? 'green' : 'red' }}>
                        <Chip label={value ? 'yes' : 'no'} color={value ? "success" : "error"} />
                    </span>
                )
            }
        },
        { 
            name: "access.system", 
            label: "System",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value: any, _tableMeta: any, _updateValue: any) => (
                    <span style={{ color: value ? 'green' : 'red' }}>
                        <Chip label={value ? 'yes' : 'no'} color={value ? "success" : "error"} />
                    </span>
                )
            }
        },
        { 
            name: "access.suspend", 
            label: "Suspend",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value: any, _tableMeta: any, _updateValue: any) => (
                    <span style={{ color: value ? 'green' : 'red' }}>
                        <Chip label={value ? 'yes' : 'no'} color={value ? "success" : "error"} />
                    </span>
                )
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
        onRowsDelete: (rowsDeleted: any) => {
            JSON.stringify(rowsDeleted)
            rowsDeleted.data.map((data : any) => {
                console.log(`${roles[data.index]._id}`)
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
        <>
        <Box height={70}>
            <Box sx={{ display: "flex" }}>
                <Sidenav/>
                <Box component={"main"} sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                    <Box m="20px">
                        <Grid container justifyContent="center">
                            <Typography variant="h4" component="div">
                                Roles
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
                            <MUIDataTable title={""} data={roles} columns={columns} options={options}/>
                        </Box>
                    </Box>
                    <Modals  title="Add Role" open={openAdd} callback={() => setOpenAdd(false)}>
                        <AddRole callback={() => { loadRole(); setOpenAdd(false); }}/>
                    </Modals>
                    <Modals title="Edit Role" open={openEdit} callback={() => { setOpenEdit(false); }}>
                        <EditRole selectedRole={selectedRole} callback={() => { loadRole(); setOpenEdit(false); }}/>
                    </Modals>
                </Box>
            </Box>
        </Box>
        </>
    )
}