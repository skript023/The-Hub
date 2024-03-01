import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { Divider, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { useRef, useState } from "react";
import AvatarIcon from "../../../components/avatar";
import authentication from "../../../api/authentication";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/backdrop";
import { base } from "../../../util/base";


export default function AccountMenu({menuId, isMenuOpen, handleMenuClose}: any)
{
    const anchorRef = useRef<HTMLElement>();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const SignOut = async () => {
        setLoading(true); 
        if (await authentication.logout())
        {
            navigate(`${base}`); 
            setLoading(false);  
        }
        handleMenuClose();
    }

    return (() => {
        if (loading)
        {
            return (
                <>
                <Loading open={loading}/>
                </>
            )
        }
        else
        {
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
    })()
}