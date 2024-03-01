import { Box, Button, CircularProgress, DialogActions, DialogContent, Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import authentication from "../../../api/authentication";
import Product from "../../../interfaces/product.dto";
import { useState } from "react";
import product from "../../../api/product";
import { toast } from "../../../components/snackbar";

export default function DetailProduct({products}: {products: Product})
{
    const [formData, _setFormData] = useState<Product>({
        _id: products._id,
        user_id: authentication.data()?._id,
        name: products.name,
        start_date: products.start_date,
        end_date: products.end_date,
        status: products.status,
        detail: products.detail,
        user: products.user,
    });

    const [loading, setLoading] = useState(false);

    function handleGenerate()
    {
        setLoading(true);

        product.generateDocument(products._id as string).
        then((response) => {
            const url = window.URL.createObjectURL(response as Blob);
            const link = document.createElement('a');
            link.href = url;

            const product_split = products.name.split('UAT ');
            const product_name = product_split[product_split.length - 1];
            const filename = `Deployment_to_Production_${product_name.replace(' ', '_')}.docx`;
            link.download = filename;

            // Append the link to the document
            document.body.appendChild(link);

            // Trigger a click on the link to start the download
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);

            // Revoke the Blob URL to free up resources
            window.URL.revokeObjectURL(url);

            setLoading(false);
        }).catch((error: any) => {
            toast.error('Generate Error', error.message);
            setLoading(false);
        });
    }

    return (
        <>
            <form>
                <DialogContent dividers>
                    <Box sx={{ m: 2 }}/>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                required
                                disabled={true}
                                type="text"
                                label="Name"
                                value={formData.name}
                                name="name"
                                size="small"
                                sx={{ minWidth: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled={true}
                                type="text"
                                label="Status"
                                value={formData.status}
                                name="status"
                                size="small"
                                sx={{ minWidth: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled={true}
                                type="text"
                                label="Start Date"
                                value={formData.start_date}
                                name="start_date"
                                size="small"
                                sx={{ minWidth: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled={true}
                                type="text"
                                label="End Date"
                                value={formData.end_date}
                                name="end_date"
                                size="small"
                                sx={{ minWidth: "100%" }}
                            />
                        </Grid>
                    </Grid>
                    {formData.detail.map((detail, index) => (
                        <div key={index}>
                            <Box height={50}/>
                            <Divider sx={{ mb: 3 }}>{detail.type}</Divider>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        disabled={true}
                                        type="text"
                                        label="Order#"
                                        value={detail.order_num}
                                        name={`detail[${index}].order_num`}
                                        size="small"
                                        sx={{ minWidth: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        disabled={true}
                                        type="text"
                                        label="Type"
                                        value={detail.type}
                                        name={`detail[${index}].type`}
                                        size="small"
                                        sx={{ minWidth: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        disabled={true}
                                        type="text"
                                        label="Status"
                                        value={detail.status}
                                        name={`detail[${index}].status`}
                                        size="small"
                                        sx={{ minWidth: "100%" }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                {detail.attributes?.map((attr) => (
                                    <>
                                        <Grid item xs={6}>
                                            <TextField
                                                disabled
                                                variant="standard"
                                                type="text"
                                                label={`Name ${index}`}
                                                value={attr.name}
                                                name={`attribute[${index}].name`}
                                                size="small"
                                                sx={{ minWidth: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                disabled
                                                variant="standard"
                                                type="text"
                                                label={`Value ${index}`}
                                                value={attr.value}
                                                name={`attributes[${index}].value`}
                                                size="small"
                                                sx={{ minWidth: "100%" }}
                                            />
                                        </Grid>
                                    </>
                                ))}
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="center" mt="20px" mb="20px" position="relative" width="550px">
                                        <Grid item xs={12}>
                                            <Stack spacing={2}>
                                                <Typography variant="h6">Uploaded Files:</Typography>
                                                {detail.captures && (
                                                <ul>
                                                    {detail.captures.map((capture, captureIndex) => (
                                                        <li key={captureIndex}>{capture.image}</li>
                                                    ))}
                                                </ul>
                                                )}
                                            </Stack>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Box display="flex" justifyContent="center" mt="20px" m={1} position="relative">
                        <Button autoFocus type="button" disabled={products.status != 'Completed' || loading} onClick={handleGenerate}>
                            Generate D2P Document
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