import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import "../css/Appbar.css";

import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { useAuth } from "../context/AuthProvider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Appbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const auth = useAuth();
  const user = auth.user;
  const profilePictureURL = user.profilePictureURL;
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              style={{ marginLeft: "40px" }}
            >
              EduCouch
            </Typography>
            {/* <div style={{marginLeft:"auto"}}>
              <ul className={'top-nav-menu'}>
                  <li>
                      <Link to ='/settings' className='top-nav-links'>
                        <IconButton color="primary" aria-label="upload picture" component="label">
                          <SettingsIcon color="disabled"/>
                        </IconButton>
                      </Link>
                  </li>
                  <li>
                      <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleLogout}>
                        <LogoutIcon color="disabled"/>
                      </IconButton>
                  </li>
              </ul>
            </div> */}
            <div style={{ marginLeft: "auto" }}>
              <Box sx={{ flexGrow: 0 }}>
                <div style={{float: 'left', paddingRight: 10}}>
                  <Typography variant="body2">Name: {user.name}</Typography>
                  <Typography variant="body2">Role: {user.userType}</Typography>
                </div>
                <div style={{float: 'right'}}>
                  <Tooltip title="Open settings">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                      style={{ marginLeft: "auto" }}
                    >
                      <Avatar alt="avatar" src={profilePictureURL} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Link
                      to="/account"
                      style={{ textDecoration: "none", color: "black" }}
                      onClick={handleCloseUserMenu}
                    >
                      <MenuItem style={{ justifyContent: "center" }}>
                        <AccountCircleIcon color="disabled" />
                        &nbsp;
                        <Typography>Profile</Typography>
                      </MenuItem>
                    </Link>
                    <MenuItem
                      style={{ justifyContent: "center" }}
                      onClick={handleLogout}
                    >
                      <LogoutIcon color="disabled" />
                      &nbsp;
                      <Typography>Logout</Typography>
                    </MenuItem>
                  </Menu>
                </div>
              </Box>
            </div>
          </Toolbar>
          <nav className="navbar">
            <div className="navbar-container">
              <ul className={"nav-menu"}>
                <li className="nav-item">
                  <Link to="/home" className="nav-links">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/myTeachingCoursesList" className="nav-links">
                    {user.userType == "LEARNER" ? 'My Courses' : 'Teaching Courses'}
                  </Link>
                </li>
                {user.userType === "LEARNER" &&
                  <li className="nav-item">
                    <Link to="/courseExplorer" className="nav-links">
                      Course Explorer
                    </Link>
                  </li>
                }

                {user.userType === "ORG_ADMIN" && (
                  <li className="nav-item">
                    <Link to="/home" className="nav-links">
                      Points Config
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link to="/home" className="nav-links">
                    Social Media
                  </Link>
                </li>
                {user.userType === "ORG_ADMIN" && (
                  <li className="nav-item">
                    <Link to="/adminDrawer" className="nav-links">
                      Organisation Settings
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </AppBar>
      </Box>
      <div style={{ height: "150px" }}></div>
    </>
  );
}