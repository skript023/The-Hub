import { Alert, Box, Button, CircularProgress, DialogActions, DialogContent, Divider, Grid, Stack, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import authentication from "../../api/authentication";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import product from "../../api/product";
import Product from "../../interfaces/product.dto";
import { toast } from "../../components/snackbar";

export default function AddProduct({callback}: any)
{
    const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date()))
    const [endDate, setEndDate] = useState<Dayjs>(dayjs(new Date()))
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<JSX.Element | null>(null);
    const [formData, setFormData] = useState<Product>({
        _id: undefined,
        user_id: authentication.data()?._id,
        name: "",
        start_date: "",
        end_date: "",
        status: "",
        detail: [{ order_num: "", type: "", status: ""}],
        user: undefined
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
    
    const addDetail = () => {
        setFormData((prevData) => ({
            ...prevData,
            detail: [...prevData.detail, { order_num: '', type: '', status: '' }],
        }));
    };

    const removeDetail = () => {
        setFormData((prevData) => {
            const newDetail = [...prevData.detail];
            newDetail.pop(); // Remove the last item from the array
            return { ...prevData, detail: newDetail };
        });
    };

    function handleSubmit (e: FormEvent<HTMLFormElement>) 
    {
        setLoading(true);

        e.preventDefault();

        formData.start_date = startDate.toDate().toLocaleDateString();
        formData.end_date = endDate.toDate().toLocaleDateString();
        
        setFormData(formData);

        product.create(formData).then((response) => {
            if (response?.success)
            {
                
                toast.success("Add Product", response.message);
                setAlert(() => (<Alert severity="success">{response.message}</Alert>))
            }
            else
            {
                setAlert(() => (<Alert severity="error">{response?.message}</Alert>))
                toast.error("Add Product", `${response?.message}`);
            }
            callback();
            setLoading(false);
        }).catch((error: any) => {
            toast.error("Add Product Exception", error.message);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <DialogContent dividers>
                <Box sx={{ m: 2 }}/>
                {alert}
                <Stack spacing={2} direction={'row'}>
                    <Button variant="contained" color="primary" onClick={addDetail}>
                        Add Skenario
                    </Button>
                    <Button variant="contained" color="primary" onClick={removeDetail}>
                        Remove Skenario
                    </Button>
                </Stack>
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
                {formData.detail.map((detail, index) => (
                    <div key={index}>
                        <Box height={50}/>
                        <Divider sx={{ mb: 3 }}>Skenario {index + 1}</Divider>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    variant="standard"
                                    type="text"
                                    label="Order#"
                                    onChange={(e) => handleDetailChange(index, 'order_num', e.target.value)}
                                    value={detail.order_num}
                                    name={`detail[${index}].order_num`}
                                    size="small"
                                    sx={{ minWidth: "100%" }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
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
                                    required
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
                    </div>
                ))}
            </DialogContent>
            <DialogActions>
                <Box display="flex" justifyContent="center" mt="20px" m={1} position="relative">
                    <Button autoFocus type="submit" disabled={loading}>
                        Add
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
    )
}