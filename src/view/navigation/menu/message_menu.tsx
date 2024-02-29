import { Avatar, Divider, ListItemAvatar, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import React, { useRef } from "react";

export default function MessageMenu({menuId, isMenuOpen, handleMenuClose}:any) 
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
            <MenuItem>
                <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="https://icons.iconarchive.com/icons/aha-soft/free-large-boss/256/Admin-icon.png" />
                </ListItemAvatar>
                <ListItemText
                primary="Brunch this weekend?"
                secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                }
                />
            </MenuItem>
            <Divider variant="inset" component="li" />
            <MenuItem>
                <ListItemAvatar>
                <Avatar alt="Travis Howard" src="https://icons.iconarchive.com/icons/aha-soft/free-large-boss/256/Admin-icon.png" />
                </ListItemAvatar>
                <ListItemText
                primary="Summer BBQ"
                secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        to Scott, Alex, Jennifer
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                    </React.Fragment>
                }
                />
            </MenuItem>
            <Divider variant="inset" component="li" />
            <MenuItem>
                <ListItemAvatar>
                <Avatar alt="Cindy Baker" src="https://icons.iconarchive.com/icons/aha-soft/free-large-boss/256/Admin-icon.png" />
                </ListItemAvatar>
                <ListItemText
                primary="Oui Oui"
                secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        Sandra Adams
                    </Typography>
                    {' — Do you have Paris recommendations? Have you ever…'}
                    </React.Fragment>
                }
                />
            </MenuItem>
        </Menu>
    );
}