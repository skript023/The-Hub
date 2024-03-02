import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { SidebarMenu } from './menu/sidebar_menu';
import { Avatar, Typography } from '@mui/material';
import authentication from '../../api/authentication';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Sidenav() 
{
    const [isLoaded, setLoaded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const ref = React.useRef(null) as any;
    
    React.useEffect(() => {
        ref.current.staticStart();
        setLoaded(true);
        ref.current.complete();
    }
    , [])

    const handleDrawerToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar open={open} isLoaded={isLoaded} callback={handleDrawerToggle}/>
            <Drawer variant="permanent" open={open} sx={{ ...(!open && {'@media (max-width: 768px)': {  display: 'none'}}) }}>
                <DrawerHeader sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    { open && (
                        <>
                        <Box height={20}/>
                        <Avatar alt="User Avatar" src={authentication.avatar()} sx={{ width: 140, height: 140, marginBottom: 1 }}/>
                        <Typography variant="subtitle1" gutterBottom>
                            {authentication.data()?.fullname}
                        </Typography>
                        <Typography variant="subtitle1" color="green" sx={{ fontWeight: 'bold' }}>
                            {authentication.data()?.role?.name}
                        </Typography>
                        </>
                    ) }
                </DrawerHeader>
                <Divider />
                <List>
                    {SidebarMenu.map((menu) => (
                        <ListItem key={menu.name} disablePadding sx={{ display: 'block' }} onClick={() => navigate(menu.route)}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.name} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <LoadingBar color={'#f11946'} ref={ref} />
        </Box>
    );
}
