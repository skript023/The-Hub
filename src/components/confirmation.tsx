import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import './style/anim.css'
import { useEffect, useState } from 'react';

interface StatusModalProps {
    title: string;
    message: string;
    open: boolean;
    agree: () => void;
    disagree: () => void;
}

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

export default function Confirmation({ title, message, open, agree, disagree }: StatusModalProps) 
{
    const [toggle, setToggle] = useState('warning');

    useEffect(() => {open ? setToggle('warning toggle') : setToggle('warning'); }, [open])

    return (
        <Modal
            open={open}
            slotProps={{ backdrop: { invisible: false } }}
            aria-labelledby={`confirm-title`}
            aria-describedby={`confirm-description`}
        >
            <Box sx={style}>
                <ModalContent>
                    <svg style={{ width: '100px', display: 'block', margin: '0 auto' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className={toggle}>
                        <circle className="solid" fill="none" stroke-linecap="round" stroke-width="4" stroke-miterlimit="10" cx="32" cy="32" r="30"/>
                        <circle className="animation" fill="none" stroke-linecap="round" stroke-width="4" stroke-miterlimit="10" cx="32" cy="32" r="30"/>
                        <path fill="none" stroke="#000" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" d="M32 15v20"/>
                        <line fill="none" stroke="#000" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" x1="32" y1="46" x2="32" y2="46"/>
                    </svg>
                    <Typography variant="h4" color={'error'} id={`confirm-title`} gutterBottom>
                        {title}
                    </Typography>
                    <Typography id={`confirm-description`} gutterBottom>
                        {message}
                    </Typography>
                    <Box display={'flex'} justifyContent={'center'}>
                        <Stack spacing={2} direction={'row'}>
                            <Button variant="outlined" color={'error'} onClick={disagree}>
                                No
                            </Button>
                            <Button variant="outlined" color={'success'} onClick={agree}>
                                Ok
                            </Button>
                        </Stack>
                    </Box>
                </ModalContent>
            </Box>
        </Modal>
    );
};