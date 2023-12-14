import { Backdrop, Box, CircularProgress, Grid, Typography } from "@mui/material";

export default function Loading({open}: any)
{
    return (
        <>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
                <Box sx={{ display: 'flex' }}>
                    <Grid container columns={16}>
                        <Grid item xs={8}>
                            <CircularProgress color="inherit" />
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h6" component="div">
                                Loading
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
        </Backdrop>
        </>
    )
}