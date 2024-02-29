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

export default function AddUser({ callback } : { callback: () => void })
{
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([] as Role[]);
    const [selectedRole, setSelectedRole] = useState({} as Role);
    
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
        role.findAll().then((response) => {
            if (response?.success)
                setRoles(response.data);
        })
    }, []);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Update formData with the image file name
            const imageName = file.name;
            setFormData(prevState => ({
                ...prevState,
                image: imageName
            }));
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setSelectedRole({ ...selectedRole, [name]: value, });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, });
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        try 
        {
            setLoading(true);

            e.preventDefault();
            formData.expired = expiredDate.toDate().toLocaleDateString();
            formData.recent_login = recentLogin.toDate().toLocaleDateString();
            
            setFormData(formData);
            
            user.create(formData).then((response) => {
                if (response?.success)
                    toast.success('Registeration', response.message);
                else
                    toast.error('Registeration', response?.message);

                callback();
                setLoading(false);
            })
        } 
        catch (error: any) 
        {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <DialogContent dividers>
                <Box sx={{ m: 1 }}/>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Input
                                style={{ display: 'none' }}
                                id={`avatar`}
                                type="file"
                                name={`image`}
                                inputProps={{ accept: 'image/*' }}
                                onChange={handleImageChange}
                            />
                            <label htmlFor={`avatar`}>
                                <Button variant="outlined" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                                    {formData.image ? formData.image : `Upload avatar`}
                                </Button>
                            </label>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <FormControl sx={{ m: 1, minWidth: 500 }} size="small">
                                <InputLabel id="demo-select-small-label">Role</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={selectedRole._id}
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
                <Box display="flex" justifyContent="center" mt="20px">
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