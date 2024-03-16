import { Box, Button, Grid, Pagination, Stack, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@mui/material";
import MUIDataTable, { MUIDataTableTextLabels, Responsive } from "mui-datatables";
import {useEffect, useState} from 'react'
import AddCircleIcon from "@mui/icons-material/AddCircle"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import AddProduct from "./add";
import EditProduct from "./edit";
import Modals from "../../../components/modal";
import product from "../../../api/product";
import { loading } from "../../../components/backdrop";
import { toast } from "../../../components/snackbar";
import Product from "../../../interfaces/product.dto";
import DetailProduct from "./product.detail";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Sidenav from "../../navigation/sidebar";
import { notification } from "../../../components/notification";
import { confirm } from "../../../components/confirmation";

const TabMenu: React.FC<{ children: React.ReactNode; value: number, index: number }> = ({ children, value, index }) => (
    <div hidden={value !== index} style={{ width: '100%' }}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );

export default function ProductManagement() 
{
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDetail, setopenDetail] = useState(false);
    const [products, setProduct] = useState([] as Product[]);
    const [prod, setProd] = useState({} as Product);
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

    function loadProduct()
    {
        product.findAll()
        .then((response) => {
            setProduct(response as Product[]);
            loading.stop();
        })
        .catch((error: any) => console.log(error.message));
    }

    useEffect(() => {
        loading.start();
        
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

    const handleDeleteClick = (index: string) => {
        product.remove(index)
        .then((response) => {
            if (response?.success)
            {
                toast.success('Product Delete', response.message);

                const deleted = products.filter((item: any) => item._id != index);
                setProduct(deleted);

                notification.success('Delete Product', 'You have successfully delete product');
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
            toast.error('Mass Deleter', error.message);
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
                            onClick={() => { handleDetailClick(value); setopenDetail(true);} }/>
                        <EditIcon style={{ fontSize: "20px", color: "blue", cursor: "pointer" }}
                            onClick={() => { handleEditClick(value); setOpenEdit(true);} }/>
                        <DeleteIcon style={{ fontSize: "20px", color: "darkred", cursor: "pointer" }}
                            onClick={() => { confirm.show('Product Delete', `Are you sure want to delete this record?`, () => handleDeleteClick(value)) }}/>
                    </Stack>
                ),
            },
        },
    ];

    const options = {
        responsive: 'vertical' as Responsive,
        enableNestedDataAccess: ".",
        selectableRowsHideCheckboxes: isMobile ? true : false,
        onRowsDelete: (rowsDeleted: any) => {
            JSON.stringify(rowsDeleted)
            rowsDeleted.data.map((data : any) => {
                handleMassDeleteClick(products[data.dataIndex]._id);
            });
        },
        onCellClick: (_colData: any, _cellMeta: { colIndex: number, rowIndex: number, dataIndex: number }) => {
            // console.log(products[cellMeta.dataIndex]._id);
            //handleDetailClick(products[cellMeta.dataIndex]._id as any); 
            //setopenDetail(true);
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
            <>
            <Box sx={{ display: "flex" }}>
                <Sidenav/>
                <Box component={"main"} sx={{ flexGrow: 1, mt: 8, ...(!isMobile && { p: 3 }), ...(isMobile && { mb: 8 }) }}>
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
                    <Modals title={"Add Product"} open={openAdd} callback={() => setOpenAdd(false)}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="wrapped label tabs example"
                        >
                            <Tab label="UAT Progress" wrapped/>
                            <Tab label="8IC Progress" wrapped/>
                        </Tabs>
                        <TabMenu value={value} index={0}>
                            <AddProduct callback={() => { notification.success('Add Product', 'You have successfully add product'); loadProduct(); setOpenAdd(false)}}/>
                        </TabMenu>
                        <TabMenu value={value} index={1}>
                            <AddProduct callback={() => { notification.success('Add Product', 'You have successfully add product'); loadProduct(); setOpenAdd(false)}}/>
                        </TabMenu>
                    </Modals>
                    <Modals title={"Edit Product"} open={openEdit} callback={() => setOpenEdit(false)}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="wrapped label tabs example"
                        >
                            <Tab label="UAT Progress" wrapped/>
                            <Tab label="8IC Progress" wrapped/>
                        </Tabs>
                        <TabMenu value={value} index={0}>
                            <EditProduct products={prod} callback={() => {notification.success('Update Product', 'You have successfully update product'); loadProduct(); setOpenEdit(false)}}/>
                        </TabMenu>
                        <TabMenu value={value} index={1}>
                            <EditProduct products={prod} callback={() => {notification.success('Update Product', 'You have successfully update product'); loadProduct(); setOpenEdit(false)}}/>
                        </TabMenu>
                    </Modals>
                    <Modals title={"Product Detail"} open={openDetail} callback={() => setopenDetail(false)}>
                        <DetailProduct products={prod}/>
                    </Modals>
                </Box>
            </Box>
            </>
        </Box>
        
    );
}