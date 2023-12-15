import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

export default function Loading({open}: any)
{
    return (
        <>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
            <Box sx={{ m: 1, position: 'relative' }}>
                <CircularProgress  color="inherit" sx={{ justifyContent: 'center' }} />
                <Typography variant="h6" component="div" sx={{ justifyContent: 'center', marginLeft: -10, mt: 3 }}>
                    Loading, please wait...
                </Typography>
            </Box>
        </Backdrop>
        </>
    )
}