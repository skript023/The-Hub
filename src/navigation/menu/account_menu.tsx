import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { Divider, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { useRef } from "react";
import AvatarIcon from "../../components/avatar";
import authentication from "../../api/authentication";


export default function AccountMenu({menuId, isMenuOpen, handleMenuClose}: any)
{
    const anchorRef = useRef<HTMLElement>();

    return (
        <Menu
            anchorEl={anchorRef?.current}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <AvatarIcon alt="Profile" src={authentication.avatar()}/><Typography sx={{ marginLeft:1 }}>{authentication.data()?.fullname}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose} disabled>
                <ListItemIcon>
                    <PersonAdd fontSize="small" />
                </ListItemIcon>
                    Add another account
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );
}