import { Box, Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import toast from "react-hot-toast";
import tasks from "../../api/tasks";
import Task from "../../interfaces/task.dto";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormEvent, useState } from "react";
import authentication from "../../api/authentication";

export default function AddTask()
{
    const [startDate, setStartDate] = useState<string | undefined>("")
    const [endDate, setEndDate] = useState<string | undefined>("")
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Task>({
        _id: undefined,
        user_id: authentication.data()?._id,
        name: "",
        start_date: "",
        end_date: "",
        status: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, });
      };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        setLoading(true);
        
        e.preventDefault();
        formData.start_date = startDate;
        formData.end_date = endDate;
        
        setFormData(formData)
        console.log(formData);
        
        tasks.create(formData as Task).then((response) => {
            if (response?.success)
            {
                toast.success(`${response?.message}`);
            }
            else
            {
                toast.error(`${response?.message}`);
            }
        }).catch((error: any) => {
            toast.error(error.message);
        });

        setLoading(false);
    };

    return (
        <>
            <Box sx={{ m: 2 }}/>
                <Typography variant="h5" align="center">
                    Add Task
                </Typography>
            <Box height={20}/>
        
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            variant="filled"
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start Date"
                                value={formData.start_date}
                                onChange={value => setStartDate(value?.toString())}
                                slotProps={{
                                    textField: {
                                    helperText: 'MM/DD/YYYY'
                                    },
                                }}
                            />
                        </LocalizationProvider>
                        <div hidden>
                            <TextField
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
                                label="End Date"
                                value={formData.end_date}
                                onChange={value => setEndDate(value?.toString())}
                                slotProps={{
                                    textField: {
                                    helperText: 'MM/DD/YYYY'
                                    },
                                }}
                            />
                        </LocalizationProvider>
                        <div hidden>
                            <TextField
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
                    <Grid item xs={6}>
                        <TextField
                            required
                            variant="filled"
                            type="text"
                            label="Status"
                            onChange={handleInputChange}
                            value={formData.status}
                            name="status"
                            size="small"
                            sx={{ minWidth: "100%" }}
                        />
                    </Grid>
                </Grid>
                <Box display="flex" justifyContent="center" mt="20px" m={1} position="relative">
                    <Button type="submit" variant="contained" disabled={loading}>
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
            </form>
        </>

    )
}