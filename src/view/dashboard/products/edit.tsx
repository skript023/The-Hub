import { Alert, Box, Button, CircularProgress, DialogActions, DialogContent, Divider, Grid, IconButton, Input, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ChangeEvent, FormEvent, useState } from "react";
import authentication from "../../../api/authentication";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "../../../components/snackbar";
import Product from "../../../interfaces/product.dto";
import product from "../../../api/product";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { confirm } from "../../../components/confirmation";
import MsaOrderData from "../../../interfaces/msa_order.dto";
import ServerResponse from "../../../interfaces/response.dto";

interface Edit
{
    products: Product
    callback: () => void;
}

export default function EditProduct({products, callback}: Edit)
{
    const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date(products.start_date as string)))
    const [endDate, setEndDate] = useState<Dayjs>(dayjs(new Date(products.end_date as string)))
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<JSX.Element | null>(null);
    const [formData, setFormData] = useState<Product>({
        _id: products._id,
        user_id: authentication.data()?._id,
        name: products.name,
        start_date: products.start_date,
        end_date: products.end_date,
        status: products.status,
        detail: products.detail,
        user: products.user,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDetailChange = (index: number, key: string, value: string) => {
        setFormData((prevData) => {
          const newDetail = [...prevData.detail];
          newDetail[index] = { ...newDetail[index], [key]: value };
          return { ...prevData, detail: newDetail };
        });
    };
    
    const handleStatusOrder = (index: number, id: string) => {
        product.getOrderDataById(id).
        then((value: ServerResponse<MsaOrderData[]> | undefined) => {
            handleDetailChange(index, 'status', value?.data[0].statusorder as string)
        });
    }

    const addDetail = () => {
        setFormData((prevData) => ({
            ...prevData,
            detail: [...prevData.detail, { order_num: '', type: '', status: '', attributes: [{name: '', value: ''}], captures: [{image: ""}], images: null }],
        }));
    };

    const removeDetail = () => {
        setFormData((prevData) => {
            const newDetail = [...prevData.detail];
            newDetail.pop(); // Remove the last item from the array
            return { ...prevData, detail: newDetail };
        });
    };

    
    const addAttribute = (detailIndex: number) => {
        setFormData((prevData) => {
            const newDetail = [...prevData.detail];
            if (!newDetail[detailIndex].attributes)
            {
                newDetail[detailIndex].attributes = [];
            }
        
            newDetail[detailIndex].attributes.push({ name: '', value: '' });
            return { ...prevData, detail: newDetail };
        });
    };
    
    const removeAttribute = (detailIndex: number) => {
        setFormData((prevData) => {
            const newDetail = [...prevData.detail];
            const lastAttributeIndex = newDetail[detailIndex].attributes.length - 1;
            if (lastAttributeIndex >= 0) {
            newDetail[detailIndex].attributes.splice(lastAttributeIndex, 1);
            }
            return { ...prevData, detail: newDetail };
        });
    };

    const handleCaptureFileChange = (detailIndex: number, event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files) return;

        if (products.detail[detailIndex].captures)
            products.detail[detailIndex].captures.length = 0;

        setFormData((prevData) => {
            const newDetail = [...prevData.detail];
            newDetail[detailIndex] = { ...newDetail[detailIndex], images: files };
            return { ...prevData, detail: newDetail };
        });

        Array.from(files).forEach((file, i) =>{
            setFormData((prevData) => {
                const newDetail = [...prevData.detail];
                if (newDetail[detailIndex].captures)
                {
                    newDetail[detailIndex].captures[i] = {image: file.name};
                }
                else
                {
                    newDetail[detailIndex].captures = []
                    newDetail[detailIndex].captures.push({image: file.name})
                }
                return { ...prevData, detail: newDetail };
            });
        })
    };
    
    const handleChangeAttributeKey = (detailIndex: number, attributeIndex: number, newName: string) => {
        setFormData((prevData) => {
            const newDetail = [...prevData.detail];
            newDetail[detailIndex].attributes[attributeIndex].name = newName;
            return { ...prevData, detail: newDetail };
        });
    };

    const handleChangeAttributeValue = (detailIndex: number, attributeIndex: number, newValue: string) => {
        setFormData((prevData) => {
            const newDetail = [...prevData.detail];
            newDetail[detailIndex].attributes[attributeIndex].value = newValue;
            return { ...prevData, detail: newDetail };
        });
    };
    

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        confirm.show('Update Product', 'Are you sure want to update this product?', () => {
            setLoading(true);

            formData.start_date = startDate.toDate().toLocaleDateString();
            formData.end_date = endDate.toDate().toLocaleDateString();
            
            setFormData(formData);

            product.update(products._id as string, formData as Product).then((response) => {
                if (response?.success)
                {
                    toast.success("Product Update", response.message)
                    setAlert(() => (<Alert severity="success">{response.message}</Alert>));
                }
                else
                {
                    setAlert(() => (<Alert severity="error">{response?.message}</Alert>));
                    toast.error("Product Update", `${response?.message}`);
                }

                setLoading(false);

                callback();
            }).catch((error: any) => {
                toast.error("Product Update", error.message);
            });
            
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <Box sx={{ m: 2 }}/>
                        {alert}
                        {alert ? <Box height={20}/> : <div/>}
                    <Divider>
                        {products.name}
                    </Divider>
                    <Box height={20}/>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                required
                                variant="standard"
                                type="text"
                                label="Name"
                                onChange={handleInputChange}
                                value={formData.name}
                                name="name"
                                size="small"
                                sx={{ minWidth: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                variant="standard"
                                type="text"
                                label="Status"
                                onChange={handleInputChange}
                                value={formData.status}
                                name="status"
                                size="small"
                                sx={{ minWidth: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    autoFocus
                                    label="Start Date"
                                    value={startDate}
                                    onChange={value => setStartDate(value as Dayjs)}
                                    defaultValue={startDate}
                                />
                            </LocalizationProvider>
                            <div hidden>
                                <TextField
                                    disabled={true}
                                    hidden={true}
                                    variant="filled"
                                    type="text"
                                    label="Start Date"
                                    onChange={handleInputChange}
                                    value={startDate}
                                    name="start_date"
                                    size="small"
                                    sx={{ minWidth: "100%" }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    autoFocus
                                    label="End Date"
                                    value={endDate}
                                    onChange={value => setEndDate(value as Dayjs)}
                                    defaultValue={endDate}
                                />
                            </LocalizationProvider>
                            <div hidden>
                                <TextField
                                    disabled={true}
                                    hidden={true}
                                    variant="filled"
                                    type="text"
                                    label="End Date"
                                    onChange={handleInputChange}
                                    value={endDate}
                                    name="end_date"
                                    size="small"
                                    sx={{ minWidth: "100%" }}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Box height={50}/>
                    <Box display="flex" justifyContent="center">
                        <Stack spacing={2} direction={'row'}>
                            <IconButton onClick={addDetail}>
                                <AddIcon/>
                            </IconButton>
                            <IconButton onClick={removeDetail}>
                                <RemoveIcon/>
                            </IconButton>
                        </Stack>
                    </Box>
                    {formData.detail.map((detail, index) => (
                        <div key={index}>
                            <Divider sx={{ mb: 3 }}>{detail.type}</Divider>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="standard"
                                        type="text"
                                        label="Order#"
                                        onChange={(e) => { handleDetailChange(index, 'order_num', e.target.value); handleStatusOrder(index, e.target.value)}}
                                        value={detail.order_num}
                                        name={`detail[${index}].order_num`}
                                        size="small"
                                        sx={{ minWidth: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="standard"
                                        type="text"
                                        label="Type"
                                        onChange={(e) => handleDetailChange(index, 'type', e.target.value)}
                                        value={detail.type}
                                        name={`detail[${index}].type`}
                                        size="small"
                                        sx={{ minWidth: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="standard"
                                        type="text"
                                        label="Status"
                                        onChange={(e) => handleDetailChange(index, 'status', e.target.value)}
                                        value={detail.status}
                                        name={`detail[${index}].status`}
                                        size="small"
                                        sx={{ minWidth: "100%" }}
                                    />
                                </Grid>
                            </Grid>
                            <Box height={50}/>
                            <Divider>Attribute</Divider>
                            <Box display="flex" justifyContent="center" mt="20px" mb="20px">
                                <Stack spacing={2}alignContent={"center"} direction={'row'}>
                                    <IconButton onClick={() => addAttribute(index)}>
                                        <AddIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => removeAttribute(index)}>
                                        <RemoveIcon/>
                                    </IconButton>
                                </Stack>
                            </Box>
                            <Grid container spacing={2}>
                                {detail.attributes?.map((attr, attr_id) => (
                                    <>
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="standard"
                                                type="text"
                                                label={`${attr.name}`}
                                                onChange={(e) => handleChangeAttributeKey(index, attr_id, e.target.value)}
                                                value={attr.name}
                                                name={`attribute[${index}].name`}
                                                size="small"
                                                sx={{ minWidth: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                variant="standard"
                                                type="text"
                                                label={`${attr.value}`}
                                                onChange={(e) => handleChangeAttributeValue(index, attr_id, e.target.value)}
                                                value={attr.value}
                                                name={`attributes[${index}].value`}
                                                size="small"
                                                sx={{ minWidth: "100%" }}
                                            />
                                        </Grid>
                                    </>
                                ))}
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="center" mt="20px" mb="20px" position="relative" width="550px">
                                        <Grid item xs={12}>
                                            <Stack spacing={2}>
                                                <Typography variant="h6">Selected Files:</Typography>
                                                {detail.captures && (
                                                <ul>
                                                    {detail.captures.map((capture, captureIndex) => (
                                                        <li key={captureIndex}>{capture.image}</li>
                                                    ))}
                                                </ul>
                                                )}
                                            </Stack>
                                        </Grid>
                                    </Box>
                                    <Input
                                        style={{ display: 'none' }}
                                        id={`file-upload-input${index}`}
                                        type="file"
                                        name={`capture${index}`}
                                        inputProps={{ accept: 'image/*', multiple: true }}
                                        onChange={(event: any) => handleCaptureFileChange(index, event)}
                                    />
                                    <label htmlFor={`file-upload-input${index}`}>
                                        <Button variant="outlined" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                                            Choose Files
                                        </Button>
                                    </label>
                                </Grid>
                            </Grid>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Box display="flex" justifyContent="center" mt="20px" m={1} position="relative">
                        <Button autoFocus type="submit" disabled={loading}>
                            Update
                        </Button>
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Box>
                </DialogActions>
            </form>
        </>

    )
}