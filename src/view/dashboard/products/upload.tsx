import { Button, Typography, DialogActions, DialogContent, Grid, Box, Stack, Input } from '@mui/material';
import { useState, ChangeEvent } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Product from '../../../interfaces/product.dto';
import product from '../../../api/product';
import { toast } from '../../../components/snackbar';

interface Uploads
{
    upload: Product
}

function FileUpload({upload}: Uploads)
{
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        setSelectedFiles(files);
    };

    const uploadFiles = async () => 
    {
        if (!selectedFiles) return;

        const formData = new FormData();

        // Append each selected file to the FormData object
        for (let i = 0; i < selectedFiles.length; i++) 
        {
            formData.append('capture', selectedFiles[i]);
        }

        formData.forEach((value, key) => {
            console.log(`${key}:${value}`);
            
        })

        try 
        {
            // Make a POST request to the server endpoint
            product.uploadEvident(upload._id as string, formData).
            then((response) => {
                if (response?.success)
                {
                    toast.success('Upload', response.message);
                }
                else
                {
                    toast.error('Upload Fail', response?.message);
                }
            }).catch((error: any) => {
                toast.error('Error Upload', error.message);
            });
        } 
        catch (error) 
        {
            console.error('Error uploading files:', error);
        }
    };

    return (
        <DialogContent dividers>
            <Grid container>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" mt="20px" mb="20px" position="relative" width="550px">
                        <Grid item xs={12}>
                            <Stack spacing={2}>
                                <Typography variant="h6">Selected Files:</Typography>
                                {selectedFiles && (
                                <ul>
                                    {Array.from(selectedFiles).map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                    ))}
                                </ul>
                                )}
                            </Stack>
                        </Grid>
                    </Box>
                    <Input
                        style={{ display: 'none' }}
                        id="file-upload-input"
                        type="file"
                        name="capture"
                        inputProps={{ accept: 'image/*', multiple: true }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload-input">
                        <Button variant="outlined" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                            Choose Files
                        </Button>
                    </label>
                </Grid>
            </Grid>
            <DialogActions>
                <Box display="flex" justifyContent="center" mt="20px" m={1} position="relative">
                    <Button  autoFocus type="submit" onClick={uploadFiles}>
                        Upload Files
                    </Button>
                </Box>
            </DialogActions>
        </DialogContent>
    );
};

export default FileUpload;
