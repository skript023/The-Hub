import { Box, Button, Modal, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

const ModalContent = styled('div')({
    textAlign: 'center',
    padding: '16px',
    borderRadius: '30px',
    '& .path': {
        strokeDasharray: '1000',
        strokeDashoffset: '0',
        animation: 'dash 0.9s ease-in-out',
    },
    '& .path.line': {
        strokeDashoffset: '1000',
        animation: 'dash 0.95s 0.35s ease-in-out forwards',
    },
    '& .path.check': {
        strokeDashoffset: '-100',
        animation: 'dash-check 0.95s 0.35s ease-in-out forwards',
    },
    '@keyframes dash': {
        '0%': {
            strokeDashoffset: '1000',
        },
        '100%': {
            strokeDashoffset: '0',
        },
    },
    '@keyframes dash-check': {
        '0%': {
            strokeDashoffset: '-100',
        },
        '100%': {
            strokeDashoffset: '900',
        },
    },
});

const Svg = styled('svg')({
    width: '100px',
    display: 'block',
    margin: '0 auto',
});

class notificationhandle
{
    constructor()
    {
        this.id = '';
        this.message = '';
        this.title = '';
        this.open = false;
        this.setOpen = () => {};
    }
    private id: string;
    private title: string;
    private message: string;
    private open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

    success(title: string, msg: string)
    {
        this.id = 'success';
        this.title = title;
        this.message = msg;
        this.open = true;
        this.setOpen(true);
    }

    error(title: string, msg: string)
    {
        this.id = 'error';
        this.title = title;
        this.message = msg;
        this.open = true;
        this.setOpen(true);
    }

    render(): JSX.Element
    {
        const handleClose = () => { this.open = false; this.setOpen(false); }

        return (
            <Modal
                open={this.open}
                slotProps={{ backdrop: { invisible: false } }}
                aria-labelledby={`${this.id}-title`}
                aria-describedby={`${this.id}-description`}
            >
                <Box sx={style}>
                    <ModalContent>
                        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                            {this.id === 'error' ? (
                                <>
                                    <circle className="path circle" fill="none" stroke="#db3646" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1" /> 
                                    <line className="path line" fill="none" stroke="#db3646" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3" />
                                    <line className="path line" fill="none" stroke="#db3646" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2" /> 
                                </>
                            ) : (
                                <>
                                    <circle className="path circle" fill="none" stroke="#198754" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                                    <polyline className="path check" fill="none" stroke="#198754" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                                </>
                            )}
                        </Svg>
                        <Box height={20}/>
                        <Typography variant="h4" color={this.id === 'error' ? 'error' : 'success'} id={`${this.id}-title`} gutterBottom>
                            {this.title}
                        </Typography>
                        <Typography id={`${this.id}-description`} gutterBottom>
                            {this.message}
                        </Typography>
                        <Button variant="outlined" color={this.id === 'error' ? 'error' : 'success'} onClick={handleClose}>
                            Ok
                        </Button>
                    </ModalContent>
                </Box>
            </Modal>
        );
    }
}

const notification = new notificationhandle();

export default function Notification() 
{
    const [_open, setOpen] = useState(false);
    notification.setOpen = setOpen;

    return notification.render();
};

export { notification };