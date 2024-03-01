import { Alert, Box, Button, CircularProgress, DialogActions, DialogContent, Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import tasks from "../../../api/tasks";
import Task from "../../../interfaces/task.dto";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormEvent, useState } from "react";
import authentication from "../../../api/authentication";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "../../../components/snackbar";
import { confirm } from "../../../components/confirmation";

interface Edit
{
    task: Task
    callback: () => void;
}

export default function EditTask({task, callback}: Edit)
{
    const [startDate, setStartDate] = useState<Dayjs>(dayjs(new Date(task.start_date as string)))
    const [endDate, setEndDate] = useState<Dayjs>(dayjs(new Date(task.end_date as string)))
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<JSX.Element | null>(null);
    const [formData, setFormData] = useState<Task>({
        _id: task._id,
        user_id: authentication.data()?._id,
        name: task.name,
        start_date: task.start_date,
        end_date: task.end_date,
        status: task.status,
        user: task.user
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        confirm.show('Update Task', 'Are you sure want to update this task?', () => {
            setLoading(true);

            formData.start_date = startDate.toDate().toLocaleDateString();
            formData.end_date = endDate.toDate().toLocaleDateString();
            
            setFormData(formData);

            tasks.update(task._id as string, formData as Task).then((response) => {
                if (response?.success)
                {
                    toast.success("Task Update", response.message)
                    setAlert(() => (<Alert severity="success">{response.message}</Alert>));
                }
                else
                {
                    setAlert(() => (<Alert severity="error">{response?.message}</Alert>));
                    toast.error("Task Update", `${response?.message}`);
                }

                setLoading(false);

                callback();
            }).catch((error: any) => {
                toast.error("Task Update", error.message);
            });
        })
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <Box sx={{ m: 2 }}/>
                        {alert}
                    <Box height={20}/>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
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
                    </Grid>
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