import { Box, Button, CircularProgress, DialogActions, DialogContent, Grid, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { toast } from "../../../components/snackbar";
import { notification } from "../../../components/notification";
import access from "../../../api/access";
import type Access from "../../../interfaces/access";

export default function EditAccess({ selectedAccess, callback }: { selectedAccess: Access, callback: () => void})
{
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    
    const [formData, setFormData] = useState<Access>({
        _id: selectedAccess._id,
        role_id: selectedAccess.role_id,
        name: selectedAccess.name,
        type: selectedAccess.type,
        backend: selectedAccess.backend,
        frontend: selectedAccess.frontend,
    });

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