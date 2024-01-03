import { Alert } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';

class SnackbarHandle 
{
    private open = false;
    private message = '';
    private type = '';

    success(msg: string)
    {
        if (!this.isOpen())
        {
            this.handleOpen();
        }

        this.setMessage(msg);
        this.setType("success");
    }

    handleOpen()
    {
        this.open = true;
    }

    setMessage(msg: string)
    {
        this.message = msg;
    }
    
    setType(tp: string)
    {
        this.type = tp;
    }

    handleClose()
    {
        this.open = false;
    }

    isOpen() 
    {
        return this.open;
    }

    getMessage()
    {
        return this.message;
    }
    
    getType()
    {
        return this.type;
    }
}

const snackbar = new SnackbarHandle();

export {snackbar};

export default function Snackbars()
{
    return (
        <Snackbar open={snackbar.isOpen()} autoHideDuration={3000} onClose={snackbar.handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={snackbar.handleClose} severity="success" sx={{ width: '100%' }}>
                    {snackbar.getMessage()}
                </Alert>
        </Snackbar>
    );
}