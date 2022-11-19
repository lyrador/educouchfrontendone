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
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import "../css/Appbar.css";
import "../css/KidsAppbar.scss";

import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

// icon
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/Book';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Face3Icon from '@mui/icons-material/Face3';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';

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

  if (user.userEnum === "KID") {
    return (
      <>
        <Box sx={{ display: "flex" }} style={{ backgroundColor: "black" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open} style={{ backgroundImage: "url('https://img.freepik.com/free-vector/alien-planet-landscape-night-martian-surface_107791-14299.jpg?w=1380&t=st=1667753063~exp=1667753663~hmac=86005d23f15db216e624c171f51090a025cd8e001567db95f2799ff0bb671858')" }}
          >
            <Toolbar>
              <Typography
                variant="h4"
                noWrap
                component="div"
                style={{ marginLeft: "40px", fontWeight: "1000px" }}
              >
                EduCouch Kids
              </Typography>
              <div style={{ marginLeft: "auto" }}>
                <Box sx={{ flexGrow: 0 }}>
                  <div style={{ float: 'left', paddingRight: 10 }}>
                    <Typography variant="body2">Name: {user.name}</Typography>
                    {user.userType === "INSTRUCTOR" && (
                      <Typography variant="body2">Role: {user.userEnum}</Typography>
                    )}
                    {user.userType !== "INSTRUCTOR" && (
                      <Typography variant="body2">Role: {user.userType}</Typography>
                    )}
                  </div>
                  <div style={{ float: 'right' }}>
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
                        <MenuItem style={{ justifyContent: "left" }}>
                          <AccountCircleIcon color="disabled" />
                          &nbsp;
                          <Typography>Profile</Typography>
                        </MenuItem>
                      </Link>
                      {user.userEnum === "KID" &&
                        <Link
                          to="/myPoints"
                          style={{ textDecoration: "none", color: "black" }}
                          onClick={handleCloseUserMenu}
                        >
                          <MenuItem style={{ justifyContent: "left" }}>
                            <AccountBalanceWalletIcon color="disabled" />
                            &nbsp;
                            <Typography>My Wallet</Typography>
                          </MenuItem>
                        </Link>
                      }
                      <MenuItem
                        style={{ justifyContent: "left" }}
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
                    <Link to="/learnerHome" className="nav-links">
                      📰 Dashboard

                    </Link>
                  </li>
                  {user.userType == "LEARNER" &&
                    <li className="nav-item">
                      <Link to="/myLearnerCoursesList" className="nav-links">
                        📖 My Courses
                      </Link>
                    </li>

                  }
                  {user.userType != "LEARNER" &&
                    <li className="nav-item">
                      <Link to="/myTeachingCoursesList" className="nav-links">
                        My Teaching Courses
                      </Link>
                    </li>

                  }

                  {user.userType === "LEARNER" &&
                    <li className="nav-item">
                      <Link to="/courseExplorer" className="nav-links">
                        🔍 Course Explorer
                      </Link>
                    </li>
                  }

                  {user.userType === "LEARNER" &&
                    <li className="nav-item">
                      <Link to="/learnerCalendar" className="nav-links">
                        📅 My Calendar
                      </Link>
                    </li>
                  }

                  {user.userType === "ORG_ADMIN" && (
                    <li className="nav-item">
                      <Link to="/pointsConfig" className="nav-links">
                        Points Config
                      </Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link to="/home" className="nav-links">
                      📸 Social Media
                    </Link>
                  </li>
                  {user.userType === "ORG_ADMIN" && (
                    <li className="nav-item">
                      <Link to="/adminDrawer" className="nav-links">
                        Organisation Settings
                      </Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link to="/whiteboardHomepage" className="nav-links">
                      💻 Whiteboard
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </AppBar>
        </Box>
        <div style={{ height: "150px" }}></div>
      </>
    );
  } else {
    return (
      <>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open} style={{ backgroundImage: "linear-gradient(to right, #413C58, #A3C4BC)" }}
          >
            <Toolbar>
              <Typography
                variant="h4"
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
                  <div style={{ float: 'left', paddingRight: 10 }}>
                    <Typography variant="body2">Name: {user.name}</Typography>
                    {user.userType === "INSTRUCTOR" && (
                      <Typography variant="body2">Role: {user.userEnum}</Typography>
                    )}
                    {user.userType !== "INSTRUCTOR" && (
                      <Typography variant="body2">Role: {user.userType}</Typography>
                    )}
                  </div>
                  <div style={{ float: 'right' }}>
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
                        <MenuItem style={{ justifyContent: "left" }}>
                          <AccountCircleIcon color="disabled" />
                          &nbsp;
                          <Typography>Profile</Typography>
                        </MenuItem>
                      </Link>
                      {user.userEnum === "KID" &&
                        <Link
                          to="/myPoints"
                          style={{ textDecoration: "none", color: "black" }}
                          onClick={handleCloseUserMenu}
                        >
                          <MenuItem style={{ justifyContent: "left" }}>
                            <AccountBalanceWalletIcon color="disabled" />
                            &nbsp;
                            <Typography>My Wallet</Typography>
                          </MenuItem>
                        </Link>
                      }
                      <MenuItem
                        style={{ justifyContent: "left" }}
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
                    <Link to="/learnerHome" className="nav-links">
                      Dashboard
                    </Link>
                  </li>
                  {user.userType == "LEARNER" &&
                    <li className="nav-item">
                      <Link to="/myLearnerCoursesList" className="nav-links">
                        My Courses
                      </Link>
                    </li>

                  }
                  {user.userType != "LEARNER" &&
                    <li className="nav-item">
                      <Link to="/myTeachingCoursesList" className="nav-links">
                        My Teaching Courses
                      </Link>
                    </li>

                  }

                  {user.userType === "LEARNER" &&
                    <li className="nav-item">
                      <Link to="/courseExplorer" className="nav-links">
                        Course Explorer
                      </Link>
                    </li>
                  }

                  {user.userType === "LEARNER" &&
                    <li className="nav-item">
                      <Link to="/learnerCalendar" className="nav-links">
                        My Calendar
                      </Link>
                    </li>
                  }

                  {user.userType === "ORG_ADMIN" && (
                    <li className="nav-item">
                      <Link to="/pointsConfig" className="nav-links">
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
                  <li className="nav-item">
                    <Link to="/whiteboardHomepage" className="nav-links">
                      Whiteboard
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </AppBar>
        </Box>
        <div style={{ height: "150px" }}></div>
      </>
    );
  }


}