import { Box, Button, CircularProgress, DialogActions, DialogContent, Grid, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { toast } from "../../../components/snackbar";
import { notification } from "../../../components/notification";
import type Access from "../../../interfaces/access";
import access from "../../../api/access";

export default function AddAccess({ callback } : { callback: () => void })
{
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    
    const [formData, setFormData] = useState<Access | any>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, });
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        try 
        {
            setLoadingSubmit(true);

            e.preventDefault();
            
            access.create(formData).then((response) => {
                if (response?.success)
                {
                    toast.success('Access', response.message);
                    notification.success('Add Access', 'You have successfully add role');
                }
                else
                {
                    toast.error('Access', response?.message);
                    notification.error('Add Access', response?.message as string);
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
                            label="Type"
                            onChange={handleInputChange}
                            value={formData.type}
                            name="type"
                            size="small"
                            sx={{ minWidth: "100%" }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            variant="standard"
                            type="text"
                            label="Frontend"
                            onChange={handleInputChange}
                            value={formData.type}
                            name="frontend"
                            size="small"
                            sx={{ minWidth: "100%" }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            variant="standard"
                            type="text"
                            label="Backend"
                            onChange={handleInputChange}
                            value={formData.type}
                            name="backend"
                            size="small"
                            sx={{ minWidth: "100%" }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Box display="flex" justifyContent="center" mt="20px" m={1} position="relative">
                    <Button autoFocus type="submit" disabled={loadingSubmit}>
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