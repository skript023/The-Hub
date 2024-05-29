import { Box, Button, Grid, Pagination, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Sidenav from "../../navigation/sidebar";
import MUIDataTable, { MUIDataTableTextLabels, Responsive } from "mui-datatables";
import Modals from "../../../components/modal";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { loading } from "../../../components/backdrop";
import { toast } from "../../../components/snackbar";
import AddAccess from "./add";
import { confirm } from "../../../components/confirmation";
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { notification } from "../../../components/notification";
import EditAccess from "./edit";
import access from "../../../api/access";
import type Access from "../../../interfaces/access";

export default function AccessManager()
{
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [accesses, setAccesses] = useState([] as Access[]);
    const [selectedAccess, setSelectedAccess] = useState({} as Access);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const loadData = () => {
        loading.start()
        access.get().then((response) => {
            if (response?.success)
            {
                setAccesses(response.data as Access[]);
            }
            else
            {
                toast.error('Accesss', response?.message);
            }
            loading.stop()
        }).catch((err: any) => {
            toast.error('Exception Accesss', err.message);
            loading.stop();
        })
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleEditClick = (index: string) => {
        accesses.map((obj: any) => {
            if (obj._id == index)
            {
                setSelectedAccess(obj);
            }
        });
    };

    const handleDeleteClick = (index: string) => {
        access.remove(index)
        .then((response) => {
            if (response?.success)
            {
                toast.success('Accesss Delete', response.message);

                const deletedUser = accesses.filter((item: any) => item._id != index);
                setAccesses(deletedUser);
                notification.success('Delete Accesss', 'You have successfully delete accesss');
            }
        })
        .catch((error: any) => {
            toast.error('Accesss Delete', error.message);
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
            name: "type", 
            label: "Type",
            options: {
                filter: true,
                sort: true,
                // customBodyRender: (value: any, _tableMeta: any, _updateValue: any) => {
                //     const maxLevel = 6;
                //     const percentage = (value * 100) / maxLevel;
                //     return <LinearProgress variant="determinate" value={percentage} color={percentage > 70 ? 'success' : percentage < 50 ? 'error' : 'warning'}/>
                // }
            }
        },
        { 
            name: "frontend", 
            label: "Frontend",
            options: {
                filter: true,
                sort: false
            },
        },
        { 
            name: "backend", 
            label: "Backend",
            options: {
                filter: true,
                sort: false
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
                console.log(`${accesses[data.index]._id}`)
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
                                Access
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
                            <MUIDataTable title={""} data={accesses} columns={columns} options={options}/>
                        </Box>
                    </Box>
                    <Modals  title="Add Role" open={openAdd} callback={() => setOpenAdd(false)}>
                        <AddAccess callback={() => { loadData(); setOpenAdd(false); }}/>
                    </Modals>
                    <Modals title="Edit Role" open={openEdit} callback={() => { setOpenEdit(false); }}>
                        <EditAccess selectedAccess={selectedAccess} callback={() => { loadData(); setOpenEdit(false); }}/>
                    </Modals>
                </Box>
            </Box>
        </Box>
        </>
    )
}