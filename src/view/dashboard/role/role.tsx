import { Box, Button, Grid, Pagination, Typography } from "@mui/material";
import Sidenav from "../../navigation/sidebar";
import MUIDataTable, { MUIDataTableTextLabels, Responsive } from "mui-datatables";
import Modals from "../../../components/modal";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle"
import Role from "../../../interfaces/role.dto";
import role from "../../../api/role";
import { loading } from "../../../components/backdrop";
import { toast } from "../../../components/snackbar";

export default function Roles()
{
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [roles, setRoles] = useState([] as Role[])
    
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
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        { 
            name: "access.create", 
            label: "Create",
            options: {
                filter: true,
                sort: false,
            }
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
                        <></>{/* <AddUser callback={() => { loadUser(); setOpenAdd(false); }}/> */}
                    </Modals>
                    <Modals  title="Edit Role" open={openEdit} callback={() => { setOpenEdit(false); }}>
                        <></>{/* <EditUser users={usr} callback={() => { loadUser(); setOpenEdit(false); }}/> */}
                    </Modals>
                </Box>
            </Box>
        </Box>
        </>
    )
}