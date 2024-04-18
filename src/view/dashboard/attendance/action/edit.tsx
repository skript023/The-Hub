import dayjs, { Dayjs } from "dayjs";
import { FormEvent, useState } from "react";
import attendance from "../../../../api/attendance";
import { toast } from "../../../../components/snackbar";
import { notification } from "../../../../components/notification";
import { Box, Button, CircularProgress, DialogActions, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Attendance } from "../../../../interfaces/attendance";

export default function EditAttendance({ selectedAttendance, callback }: { selectedAttendance: Attendance, callback: () => void})
{
    const [attendDate, setAttendDate] = useState<Dayjs>(dayjs(new Date()))
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    
    const [formData, setFormData] = useState<Attendance>({
        _id: selectedAttendance._id,
        user_id: selectedAttendance.user_id,
        range: selectedAttendance.range,
        date: selectedAttendance.date,
        type: selectedAttendance.type,
        jenis: selectedAttendance.jenis,
        durasi: selectedAttendance.durasi,
        deskripsi: selectedAttendance.deskripsi,
        justifikasi_approval: selectedAttendance.justifikasi_approval,
        justifikasi_agenda: selectedAttendance.justifikasi_agenda,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, });
    };

    const handleChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value, });
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        try 
        {
            setLoadingSubmit(true);

            e.preventDefault();

            formData.date = attendDate.toDate().toLocaleDateString();

            setFormData(formData);
            
            attendance.update(selectedAttendance._id, formData).then((response) => {
                if (response?.success)
                {
                    toast.success('Attendance', response.message);
                    notification.success('Attendance', 'You have successfully update attendance');
                }
                else
                {
                    toast.error('Attendance', response?.message);
                    notification.error('Attendance', response?.message as string);
                }

                callback();
                setLoadingSubmit(false);
            });
        } 
        catch (error: any) 
        {
            setLoadingSubmit(false);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <DialogContent dividers >
                <Box sx={{ m: 1 }}/>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    autoFocus
                                    label="Date"
                                    value={attendDate}
                                    onChange={value => setAttendDate(value as Dayjs)}
                                    defaultValue={attendDate}
                                    format="DD/MM/YYYY"
                                />
                            </LocalizationProvider>
                            <div hidden>
                                <TextField
                                    disabled={true}
                                    hidden={true}
                                    variant="filled"
                                    type="text"
                                    label="Date"
                                    onChange={handleInputChange}
                                    value={attendDate}
                                    name="date"
                                    size="small"
                                    sx={{ minWidth: "100%" }}
                                />
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl sx={{ minWidth: 250 }} size="small">
                            <InputLabel id="demo-select-small-label">Attendance Type</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={formData.type}
                                label="Type"
                                name="type"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Hari Kerja">
                                    <em>Hari Kerja</em>
                                </MenuItem>
                                <MenuItem value="Hari Lembur">
                                    <em>Hari Lembur</em>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl sx={{ minWidth: 250 }} size="small">
                            <InputLabel id="demo-select-small-label">Jenis Attendance</InputLabel>
                            <Select 
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={formData.jenis}
                                label="Jenis"
                                name="jenis"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Hadir">
                                    <em>Hadir</em>
                                </MenuItem>
                                <MenuItem value="Sakit">
                                    <em>Sakit</em>
                                </MenuItem>
                                <MenuItem value="Izin">
                                    <em>Izin</em>
                                </MenuItem>
                                <MenuItem value="Cuti">
                                    <em>Cuti</em>
                                </MenuItem>
                                <MenuItem value="SPJ">
                                    <em>SPJ</em>
                                </MenuItem>
                                <MenuItem value="Weekly Report">
                                    <em>Weekly Report</em>
                                </MenuItem>
                                <MenuItem value="Feedback Talent">
                                    <em>Feedback Talent</em>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            rows={4}
                            variant="standard"
                            type="text"
                            label="Durasi"
                            onChange={handleInputChange}
                            value={formData.durasi}
                            name="durasi"
                            size="small"
                            sx={{ minWidth: "100%" }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            multiline
                            rows={4}
                            variant="standard"
                            type="text"
                            label="Description"
                            onChange={handleInputChange}
                            value={formData.deskripsi}
                            name="deskripsi"
                            size="small"
                            sx={{ minWidth: "100%" }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Box display="flex" justifyContent="center" mt="20px" m={1} position="relative">
                    <Button autoFocus type="submit" disabled={loadingSubmit}>
                    Update
                    </Button>
                    {loadingSubmit && (
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