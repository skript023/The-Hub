import { Alert, AlertColor, AlertTitle } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import { useState } from "react";
import Slide, { SlideProps } from '@mui/material/Slide';

type TransitionProps = Omit<SlideProps, 'direction'>;

class ToastHandler 
{
    constructor()
    {
        this.open = false;
        this.message = '';
        this.title = '';
        this.type = undefined;
        this.setOpen = () => {};
    }
    private open: boolean;
    private message: string;
    private title: string;
    private type: AlertColor | undefined
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

    success(title: string, msg: string)
    {
        this.setMessage(msg);
        this.setTitle(title);
        this.setType("success");
        this.open = true;
        this.setOpen(true);
    }

    error(title: string, msg: string)
    {
        this.setMessage(msg);
        this.setTitle(title);
        this.setType("error");
        this.open = true;
        this.setOpen(true);
    }
    
    private setMessage(msg: string)
    {
        this.message = msg;
    }

    private setTitle(title: string)
    {
        this.title = title;
    }

    private setType(type: AlertColor)
    {
        this.type = type;
    }

    private getMessage()
    {
        return this.message;
    }

    private getTitle()
    {
        return this.title;
    }

    private TransitionDown(props: TransitionProps) 
    {
        return <Slide {...props} direction="down" />;
    }

    render()
    {
        const handleClose = () => { this.open = false; this.setOpen(false); }

        return (
            <Snackbar open={this.open} autoHideDuration={2000} onClose={handleClose} TransitionComponent={this.TransitionDown} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity={this.type} sx={{ width: '100%' }}>
                    <AlertTitle>{this.getTitle()}</AlertTitle>
                    {this.getMessage()}
                </Alert>
            </Snackbar>
        );
    }
}

const toast = new ToastHandler();

export default function Toast()
{
    const [_open, setOpen] = useState(false);
    toast.setOpen = setOpen;

    return toast.render();
}

export { toast };