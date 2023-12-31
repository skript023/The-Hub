import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import React, {useEffect, useState} from 'react'
import Sidenav from "../../navigation/sidebar";
import AddCircleIcon from "@mui/icons-material/AddCircle"

import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import AddProduct from "./add";
import EditProduct from "./edit";
import Modals from "../../components/modal";
import product from "../../api/product";
import Loading from "../../components/backdrop";

export default function Product() 
{
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [products, setProduct] = useState([] as any)
    useEffect(() => {
        setLoading(true);
        
        product.findAll()
        .then((response) => {
            setProduct(response);
            setLoading(false);
        })
        .catch((error: any) => console.log(error.message))
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
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "code",
            label: "Product Code",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "price",
            label: "Price",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "grade",
            label: "Grade",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "game",
            label: "Game",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "target",
            label: "Target Process",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "file",
            label: "Filename",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "version",
            label: "version",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "action",
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
                console.log(`${products[data.index].id}`)
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
                                        Products
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
                                    <MUIDataTable title={""} data={products} columns={columns} options={options}/>
                                </Box>
                            </Box>
                            <Modals open={openAdd} callback={() => setOpenAdd(false)} children={<AddProduct/>}/>
                            <Modals open={openEdit} callback={() => setOpenEdit(false)} children={<EditProduct/>}/>
                        </Box>
                    </Box>
                    </>
                )
            }
        })() }
        </Box>
        
    );
}