import { Backdrop, Box, Typography } from "@mui/material";
import { useState } from "react";
import SpinningDot from "./spinningdot";

class loadingHandle
{
    constructor()
    {
        this.loading = false;
        this.setLoading = () => {};
    }
    private loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

    start()
    {
        this.loading = true;
        this.setLoading(this.loading);
    }

    stop()
    {
        this.loading = false;
        this.setLoading(this.loading);
    }

    is_loading(): boolean
    {
        return this.loading;
    }

    render(): JSX.Element
    {
        return (
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={this.loading}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh', // Optionally, set a minimum height to center vertically
                }}>
                    {/* <CircularProgress  color="inherit" size={70}/> */}
                    <SpinningDot/>
                    <Typography variant="h6" component="div" sx={{ mt: 3 }}>
                        Just a moment, we're getting things ready...
                    </Typography>
                </Box>
            </Backdrop>
        );
    }
}

const loading = new loadingHandle();

export default function Loading()
{
    const [_open, setOpen] = useState(false);
    loading.setLoading = setOpen;

    return loading.render();
}

export { loading };