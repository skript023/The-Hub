import { Box, Button, CircularProgress, DialogActions, DialogContent, Grid, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { toast } from "../../../components/snackbar";
import role from "../../../api/role";
import Role from "../../../interfaces/role.dto";
import { notification } from "../../../components/notification";

export default function AddRple({ callback } : { callback: () => void })
{
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    
    const [formData, setFormData] = useState<Role>({
        _id: '',
        name: '',
        level: 0,
        access: {
            create: false,
            read: false,
            update: false,
            delete: false,
            suspend: false,
            system: false
        }
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
            
            role.create(formData).then((response) => {
                if (response?.success)
                {
                    toast.success('Role', response.message);
                    notification.success('Add Role', 'You have successfully add role');
                }
                else
                {
                    toast.error('Role', response?.message);
                    notification.error('Add Role', response?.message as string);
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
                            value={formData.level}
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