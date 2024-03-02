import { Avatar, Divider, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import authentication from "../../../api/authentication";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { useRef } from "react";
import { loading } from "../../../components/backdrop";
import useAuth from "../../../hooks/authentication";


export default function AccountMenuMobile({mobileMenuId, isMobileMenuOpen, handleMobileMenuClose, handleMenuClose}: any)
{
    const anchorRef = useRef<HTMLElement>();
    const { setAuth } = useAuth();

    const SignOut = async () => {
        loading.start();
        if (await authentication.logout())
        {
            setAuth(null);
            loading.stop();
            window.location.reload();
        }
        handleMenuClose();
    }

    return (
        <Menu
            anchorEl={anchorRef?.current}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <Avatar alt="Profile" src={authentication.avatar()}/><Typography sx={{ marginLeft:1 }}>{authentication.data()?.fullname}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose} disabled>
                <ListItemIcon>
                    <PersonAdd fontSize="small" />
                </ListItemIcon>
                    Add another account
            </MenuItem>
            <MenuItem onClick={handleMenuClose} disabled>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem onClick={SignOut}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );
}