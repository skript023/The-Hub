import { Box, Button, CircularProgress, DialogActions, DialogContent, FormControl, Grid, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import user from "../../../api/user";
import User from "../../../interfaces/user.dto";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "../../../components/snackbar";
import role from "../../../api/role";
import Role from "../../../interfaces/role.dto";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { notification } from "../../../components/notification";

export default function AddUser({ callback } : { callback: () => void })
{
    const [loading, setLoading] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [roles, setRoles] = useState([] as Role[]);
    
    const [image, setImage] = useState<string>('');
    const [expiredDate, setExpiredDate] = useState<Dayjs>(dayjs(new Date()));
    const [recentLogin, setRecentLogin] = useState<Dayjs>(dayjs(new Date()));
    const [formData, setFormData] = useState<User>({
        _id: '',
        role_id: '',
        username: '',
        password: '',
        email: '',
        fullname: '',
        computer_name: '',
        expired: '',
        hardware_id: '',
        image: '',
        recent_login: '',
        remember_token: ''
    });

    useEffect(() => {
        setLoading(true);
        role.get().then((response) => {
            if (response?.success)
                setRoles(response.data as Role[]);

            setLoading(false);
        })
    }, []);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Update formData with the image file name
            const imageName = file.name;
            setImage(imageName);
            setFormData(prevState => ({
                ...prevState,
                image: file
            }));
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value, });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, });
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        try 
        {
            setLoadingSubmit(true);

            e.preventDefault();
            formData.expired = expiredDate.toDate().toLocaleDateString();
            formData.recent_login = recentLogin.toDate().toLocaleDateString();
            
            setFormData(formData);
            
            user.create(formData).then((response) => {
                if (response?.success)
                {
                    toast.success('Registeration', response.message);
                    notification.success('Add User', 'You have successfully add user');
                }
                else
                {
                    toast.error('Registeration', response?.message);
                    notification.error('Add User', response?.message as string);
                }

                callback();
                setLoadingSubmit(false);
            })
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
                { loading ? <CircularProgress size={50} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px'}}/> : <></> }
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Input
                                disabled={loading}
                                style={{ display: 'none' }}
                                id={`avatar`}
                                type="file"
                                name={`image`}
                                inputProps={{ accept: 'image/*' }}
                                onChange={handleImageChange}
                            />
                            <label htmlFor={`avatar`}>
                                <Button disabled={loading} variant="outlined" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                                    {image ? image : `Upload avatar`}
                                </Button>
                            </label>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <FormControl sx={{ m: 1, minWidth: 500 }} size="small">
                                <InputLabel id="demo-select-small-label">Role</InputLabel>
                                <Select 
                                    disabled={loading}
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={formData.role_id}
                                    label="Role"
                                    name="role_id"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    { roles.map((role) => {
                                        return (
                                            <MenuItem value={role._id}>{role.name}</MenuItem>
                                        );
                                    }) }
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            variant="standard"
                            type="text"
                            label="Fullname"
                            onChange={handleInputChange}
                            value={formData.fullname}
                            name="fullname"
                            size="small"
                            sx={{ minWidth: "100%" }}
                            disabled={loading}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            variant="standard"
                            type="text"
                            label="Username"
                            onChange={handleInputChange}
                            value={formData.username}
                            name="username"
                            size="small"
                            sx={{ minWidth: "100%" }}
                            disabled={loading}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            variant="standard"
                            type="text"
                            label="Email"
                            onChange={handleInputChange}
                            value={formData.email}
                            name="email"
                            size="small"
                            sx={{ minWidth: "100%" }}
                            disabled={loading}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            variant="standard"
                            type="password"
                            label="Password"
                            onChange={handleInputChange}
                            value={formData.password}
                            name="password"
                            error={formData.password.length < 8}
                            size="small"
                            sx={{ minWidth: "100%" }}
                            disabled={loading}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                autoFocus
                                label="Expired Date"
                                value={expiredDate}
                                onChange={value => setExpiredDate(value as Dayjs)}
                                defaultValue={expiredDate}
                                disabled={loading}
                            />
                        </LocalizationProvider>
                        <div hidden>
                            <TextField
                                disabled={true}
                                hidden={true}
                                variant="filled"
                                type="text"
                                label="Expired Date"
                                onChange={handleInputChange}
                                value={expiredDate}
                                name="expired"
                                size="small"
                                sx={{ minWidth: "100%" }}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                autoFocus
                                label="Recent Login"
                                value={recentLogin}
                                onChange={value => setRecentLogin(value as Dayjs)}
                                defaultValue={recentLogin}
                                disabled={loading}
                            />
                        </LocalizationProvider>
                        <div hidden>
                            <TextField
                                disabled={true}
                                hidden={true}
                                variant="filled"
                                type="text"
                                label="Recent Login"
                                onChange={handleInputChange}
                                value={recentLogin}
                                name="recent_login"
                                size="small"
                                sx={{ minWidth: "100%" }}
                            />
                        </div>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Box display="flex" justifyContent="center" mt="20px" m={1} position="relative">
                    <Button autoFocus type="submit" disabled={loadingSubmit || loading}>
                    Add
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