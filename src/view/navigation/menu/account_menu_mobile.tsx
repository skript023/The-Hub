import { Avatar, Divider, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import authentication from "../../../api/authentication";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { useRef, useState } from "react";
import Loading from "../../../components/backdrop";
import { base } from "../../../util/base";
import { useNavigate } from "react-router-dom";


export default function AccountMenuMobile({mobileMenuId, isMobileMenuOpen, handleMobileMenuClose, handleMenuClose}: any)
{
    const anchorRef = useRef<HTMLElement>();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    if (loading)
    {
        <Loading open={loading}/>
    }
    else
    {
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
                <MenuItem onClick={() => { setLoading(true); authentication.logout().then((success) => { success ?? navigate(`${base}`); setLoading(false);  } ); handleMenuClose(); }}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        );
    }
}