import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import MUIDataTable, { Responsive } from "mui-datatables";
import React, {useEffect, useState} from 'react'
import Sidenav from "../../navigation/sidebar";
import AddCircleIcon from "@mui/icons-material/AddCircle"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import AddProduct from "./add";
import EditProduct from "./edit";
import Modals from "../../components/modal";
import product from "../../api/product";
import Loading from "../../components/backdrop";
import { toast } from "../../components/snackbar";
import Product from "../../interfaces/product.dto";
import DetailProduct from "./product.detail";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileUpload from "./upload";

export default function ProductManagement() 
{
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDetail, setopenDetail] = React.useState(false);
    const [openEvident, setopenEvident] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [products, setProduct] = useState([] as Product[]);
    const [prod, setProd] = useState({} as Product);

    function loadProduct()
    {
        product.findAll()
        .then((response) => {
            setProduct(response as any);
            setLoading(false);
        })
        .catch((error: any) => console.log(error.message));
    }

    useEffect(() => {
        setLoading(true);
        
        loadProduct();
    }, []);

    const handleEditClick = (index: number) => {
        products.map((obj: any) => {
            if (obj._id == index)
            {
                setProd(obj);
            }
        });
    };

    const handleDetailClick = (index: number) => {
        products.map((obj: any) => {
            if (obj._id == index)
            {
                setProd(obj);
            }
        });
    };

    const handleUploadClick = (index: number) => {
        products.map((obj: any) => {
            if (obj._id == index)
            {
                setProd(obj);
            }
        });
    };
      
    const handleDeleteClick = (index: string) => {
        product.remove(index)
        .then((response) => {
            if (response?.success)
            {
                toast.success('Product Delete', response.message);

                const deleted = products.filter((item: any) => item._id != index);
                setProduct(deleted);
            }
        })
        .catch((error) => {
            toast.error('Product Delete', error.message);
        });
    };

    const handleMassDeleteClick = (index: string | undefined) => {
        product.remove(index as string).
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
            label: "UAT ID",
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
            label: "Agenda",
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
                download: false,
                customBodyRender: (value: any, _tableMeta: any, _updateValue: any) => (
                    <Stack spacing={2} direction={"row"}>
                        <MoreVertIcon style={{ fontSize: "20px", color: "blue", cursor: "pointer" }}
                            onClick={() => {handleDetailClick(value); setopenDetail(true);} }/>
                        <AddAPhotoIcon style={{ fontSize: "20px", color: "blue", cursor: "pointer" }}
                            onClick={() => {handleUploadClick(value); setopenEvident(true);} }/>
                        <EditIcon style={{ fontSize: "20px", color: "blue", cursor: "pointer" }}
                            onClick={() => {handleEditClick(value); setOpenEdit(true);} }/>
                        <DeleteIcon style={{ fontSize: "20px", color: "darkred", cursor: "pointer" }}
                            onClick={() => handleDeleteClick(value) }/>
                    </Stack>
                ),
            },
        },
    ];

    const options = {
        responsive: 'standard' as Responsive,
        enableNestedDataAccess: ".",
        onRowsDelete: (rowsDeleted: any) => {
            JSON.stringify(rowsDeleted)
            rowsDeleted.data.map((data : any) => {
                handleMassDeleteClick(products[data.dataIndex]._id);
            });
        },
        onCellClick: (_colData: any, cellMeta: { colIndex: number, rowIndex: number, dataIndex: number }) => {
            console.log(products[cellMeta.dataIndex]._id);
            //handleDetailClick(products[cellMeta.dataIndex]._id as any); 
            //setopenDetail(true);
        }
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
                            <Modals title={"Add Product"} open={openAdd} callback={() => setOpenAdd(false)} children={<AddProduct callback={loadProduct}/>}/>
                            <Modals title={"Edit Product"} open={openEdit} callback={() => setOpenEdit(false)} children={<EditProduct products={prod} callback={loadProduct}/>}/>
                            <Modals title={"Product Detail"} open={openDetail} callback={() => setopenDetail(false)} children={<DetailProduct products={prod}/>}/>
                            <Modals title={"Evident"} open={openEvident} callback={() => setopenEvident(false)} children={<FileUpload upload={prod}/>}/>
                        </Box>
                    </Box>
                    </>
                )
            }
        })() }
        </Box>
        
    );
}