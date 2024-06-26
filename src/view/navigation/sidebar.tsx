import * as React from 'react';
import { styled, Theme, CSSObject, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { SidebarMenu } from './menu/sidebar_menu';
import { Avatar, Menu, MenuItem, Typography, useMediaQuery } from '@mui/material';
import authentication from '../../api/authentication';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
    const [selected, setSelected] = React.useState(0);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const ref = React.useRef(null) as any;
    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    
    React.useEffect(() => {
        ref.current.staticStart();
        setLoaded(true);
        ref.current.complete();

        const currentRoute = window.location.pathname;
        const menuIndex = SidebarMenu.findIndex(menu => menu.route === currentRoute);
        setSelected(menuIndex);
    }, []);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderMenuItems = () => {
        return SidebarMenu.slice(4).map((item, index) => (
            <MenuItem
                key={index + 4}
                onClick={() => {
                    setSelected(index + 4);
                    navigate(item.route);
                    handleClose();
                }}
            >
                {item.name}
            </MenuItem>
        ));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />
            <Navbar open={open} isLoaded={isLoaded} callback={handleDrawerToggle}/>
            {isMobile ? (
                <>
                <BottomNavigation
                    showLabels
                    sx={{ width: '100%', position: 'fixed', bottom: 0, zIndex: 1000 }}
                    value={selected}
                    onChange={(_event, newValue) => {
                        setSelected(newValue);
                    }}
                >
                    {SidebarMenu.slice(0, 4).map((menu) => (
                        <BottomNavigationAction
                            key={menu.name}
                            label={menu.name}
                            icon={menu.icon}
                            onClick={() => navigate(menu.route)}
                        />
                    ))}
                    {SidebarMenu.length > 4 && (
                        <BottomNavigationAction
                            label="More"
                            icon={<MoreVertIcon />}
                            onClick={handleClick}
                        />
                    )}
                </BottomNavigation>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {renderMenuItems()}
                </Menu>
                </>
            ) : (
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {open && (
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
                        )}
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
            )}
            <LoadingBar color={'#f11946'} ref={ref} />
        </Box>
    );
}
