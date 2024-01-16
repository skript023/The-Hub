import { Box, Button, DialogActions, DialogContent, Divider, Grid, TextField } from "@mui/material";
import authentication from "../../api/authentication";
import Product from "../../interfaces/product.dto";
import { useState } from "react";
interface Edit
{
    products: Product
}

export default function DetailProduct({products}: Edit)
{
    const [formData, _setFormData] = useState<Product>({
        _id: products._id,
        user_id: authentication.data()?._id,
        name: products.name,
        start_date: products.start_date,
        end_date: products.end_date,
        status: products.status,
        detail: products.detail,
        user: products.user
    });

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
                                variant="filled"
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
                                variant="filled"
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
                                variant="filled"
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
                                variant="filled"
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
                            <Divider sx={{ mb: 3 }}>Skenario Detail {index + 1}</Divider>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        disabled={true}
                                        variant="standard"
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
                                        variant="standard"
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
                                        variant="standard"
                                        type="text"
                                        label="Status"
                                        value={detail.status}
                                        name={`detail[${index}].status`}
                                        size="small"
                                        sx={{ minWidth: "100%" }}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Box display="flex" justifyContent="center" mt="20px" m={1} position="relative">
                        <Button autoFocus type="submit" disabled={true}>
                            Generate D2P Document
                        </Button>
                    </Box>
                </DialogActions>
            </form>
        </>

    )
}