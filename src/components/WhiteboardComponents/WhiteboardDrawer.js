import * as React from 'react';
import '../../css/DrawerLeft.css';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';


function WhiteboardDrawer(props) {

    const auth = useAuth();
    const user = auth.user;
    function handleChange(event, text) {
        props.onChange(text);
    }

    const drawer = (
        <div>
            <div className='drawerContainer'>
                <List>

                    <Link to={'/whiteboardHomepage'} style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItemButton>
                            {(user.userEnum === "KID") && <ListItemText primary="📲 Join existing room" />}
                            {!(user.userEnum === "KID") && <ListItemText primary="Join existing room" />}
                        </ListItemButton>
                    </Link>
                    {user.userType !== "LEARNER" &&
                        <Link to={'/createWhiteboardHomepage'} style={{ textDecoration: 'none', color: 'black' }}>
                            <ListItemButton>
                                <ListItemText primary="Create room" />
                            </ListItemButton>
                        </Link>

                    }
                    {user.userType !== "LEARNER" &&
                        <Link to={'/viewAllRoomPage'} style={{ textDecoration: 'none', color: 'black' }}>
                            <ListItemButton>
                                <ListItemText primary="View all rooms" />
                            </ListItemButton>
                        </Link>
                    }


                </List>
            </div>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '15%', top: '123px', minWidth: '200px' },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}

export default WhiteboardDrawer;
