import * as React from 'react';
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import '../css/Appbar.css';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Appbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const showButton = () => {
      if (window.innerWidth <= 960) {
          setButton(false);
      } else {
          setButton(true);
      }
  }

  useEffect(() => {
      showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  return (<>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
            <Typography variant="h6" noWrap component="div" style={{marginLeft:"40px"}}>
              EduCouch
            </Typography>
            <div style={{marginLeft:"auto"}}>
              <ul className={'top-nav-menu'}>
                  <li>
                      <Link to ='/settings' className='top-nav-links'>
                        <IconButton color="primary" aria-label="upload picture" component="label">
                          <SettingsIcon color="disabled"></SettingsIcon>
                        </IconButton>
                      </Link>
                  </li>
                  <li>
                      <Link to ='/learnerCreation' className='top-nav-links'>
                        <IconButton color="primary" aria-label="upload picture" component="label">
                          <LogoutIcon color="disabled"></LogoutIcon>
                        </IconButton>
                      </Link>
                  </li>
              </ul>
            </div>
        </Toolbar>
        <nav className="navbar">
            <div className="navbar-container">
                <ul className={'nav-menu'}>
                    <li className='nav-item'>
                        <Link to ='/' className='nav-links'>
                            Dashboard
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to ='/myTeachingCoursesList' className='nav-links'>
                            Teaching Courses
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to ='/' className='nav-links'>
                            Course Explorer
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to ='/' className='nav-links'>
                            Points Config
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to ='/' className='nav-links'>
                            Social Media
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to ='/settings' className='nav-links'>
                            AdminTesting
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
      </AppBar>
    </Box>
    <div style={{height:"150px"}}></div>
    </>
  );
}
