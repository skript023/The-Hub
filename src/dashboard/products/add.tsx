import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

export default function AddProduct()
{
    const checkoutSchema = yup.object().shape({
        name: yup.string().required("Name is required"),
        description: yup.string().required("Description is required"),
        price: yup.number().required("Price is required"),
    });
    const initialValues = {
        name: "",
        price: 0,
        description: "",
    };

    const handleFormSubmit = () => {
        
    };

    return (
        <>
            <Box sx={{ m: 2 }}/>
            <Typography variant="h5" align="center">
            Add Product
            </Typography>
            <Box height={20}/>
            <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    variant="filled"
                                    type="text"
                                    label="Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name}
                                    name="name"
                                    error={!!touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                    size="small"
                                    sx={{ minWidth: "100%" }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    variant="filled"
                                    type="number"
                                    label="Price"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.price}
                                    name="price"
                                    error={!!touched.price && !!errors.price}
                                    helperText={touched.price && errors.price}
                                    size="small"
                                    sx={{ minWidth: "100%" }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    variant="filled"
                                    type="text"
                                    label="Description"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.description}
                                    name="description"
                                    error={!!touched.description && !!errors.description}
                                    helperText={touched.description && errors.description}
                                    size="small"
                                    sx={{ minWidth: "100%" }}
                                />
                            </Grid>
                        </Grid>
                        <Box display="flex" justifyContent="center" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                            Add
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </>

    )
}