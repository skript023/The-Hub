import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { base } from '../../../util/base';
import useRoute from '../../../hooks/route';
import authentication from '../../../api/authentication';

const ForbiddenPage: React.FC = () => 
{
    const navigate = useNavigate();
    const { setRoute } = useRoute();

    const handleLoginRedirect = () => 
    {
        const access = authentication.data()?.route.some(route => route.frontend === '/home') as boolean;
        setRoute(access);
        navigate(`${base}home`);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            textAlign="center"
            bgcolor="#f5f5f5"
        >
            <Typography variant="h3" gutterBottom>
                Forbidden
            </Typography>
            <Typography variant="body1" gutterBottom>
                You do not have permission to access this page.
            </Typography>
            <Button type="button" variant="contained" color="primary" onClick={handleLoginRedirect}>
                Go to Home
            </Button>
        </Box>
    );
};

export default ForbiddenPage;
