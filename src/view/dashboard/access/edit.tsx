import { Box, Button, CircularProgress, DialogActions, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "../../../components/snackbar";
import { notification } from "../../../components/notification";
import access from "../../../api/access";
import type Access from "../../../interfaces/access";
import { loading } from "../../../components/backdrop";
import role from "../../../api/role";
import Role from "../../../interfaces/role.dto";

export default function EditAccess({ selectedAccess, callback }: { selectedAccess: Access, callback: () => void})
{
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [roles, setRoles] = useState([] as Role[]);
    const [formData, setFormData] = useState<Access>(selectedAccess);

    useEffect(() => {
        loading.start();
        role.get().then((response) => { if (response?.success) setRoles(response.data as Role[]); });
        loading.stop();
    }, []);

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
            
            access.update(selectedAccess._id, formData).then((response) => {
                if (response?.success)
                {
                    toast.success('Role', response.message);
                    notification.success('Update Role', 'You have successfully update role');
                }
                else
                {
                    toast.error('Role', response?.message);
                    notification.error('Update Role', response?.message as string);
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
                { loading.is_loading() ? <CircularProgress size={50} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px'}}/> : <></> }
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center">
                        <FormControl sx={{ m: 1, minWidth: 500 }} size="small">
                            <InputLabel id="demo-select-small-label">Role</InputLabel>
                            <Select 
                                disabled={loading.is_loading()}
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
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            required
                            variant="standard"
                            type="text"
                            label="Fullname"
                            onChange={handleInputChange}
                            value={formData.name}
                            name="fullname"
                            size="small"
                            sx={{ minWidth: "100%" }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            variant="standard"
                            type="number"
                            label="Level"
                            onChange={handleInputChange}
                            value={formData.name}
                            name="level"
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