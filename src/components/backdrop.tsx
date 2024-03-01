import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

export default function Loading({ open }: { open: boolean; })
{
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh', // Optionally, set a minimum height to center vertically
            }}>
                <CircularProgress  color="inherit"/>
                <Typography variant="h6" component="div" sx={{ mt: 3 }}>
                    Loading, please wait...
                </Typography>
            </Box>
        </Backdrop>
    )
}