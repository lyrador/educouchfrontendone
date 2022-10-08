import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { Link, useLocation } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";

import '../css/DrawerLeft.css';

function LearnerCoursesDrawer({courseId}) {

    const auth = useAuth();
    const user = auth.user;

    const location = useLocation();
    const coursePath = location.pathname.split('/').slice(0, 3).join('/');

    const drawer = (
        <div>
            <div className='drawerContainer'>
                <br /><br />
                <Divider>
                    <Link to={`/myTeachingCourse/${courseId}/courseEnrollment`} style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItemButton>
                            <ListItemText primary="Enrolment Status" />
                        </ListItemButton>
                    </Link>
                </Divider>
                <Divider />
                <List>
                    {user.userType != "LEARNER" && (
                        <Link to={{
                            pathname: `${coursePath}/courseSettings`,
                        }} style={{ textDecoration: 'none', color: 'black' }}>
                            <ListItemButton>
                                <ListItemText primary="Course Settings" />
                            </ListItemButton>
                        </Link>
                    )}
                    <Link to={`${coursePath}/courseCalender`} style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItemButton>
                            <ListItemText primary="Course Calender" />
                        </ListItemButton>
                    </Link>
                    <Link to={`${coursePath}/classRuns`} style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItemButton>
                            <ListItemText primary="Class Runs" />
                        </ListItemButton>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link to={`${coursePath}/announcements`} style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItemButton>
                            <ListItemText primary="Announcements" />
                        </ListItemButton>
                    </Link>
                    <Link to={`${coursePath}/files`} style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItemButton>
                            <ListItemText primary="Files" />
                        </ListItemButton>
                    </Link>
                    <Link to={{
                        pathname: `${coursePath}/forum`,
                        // state: {stateParam : true}
                    }} style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItemButton>
                            <ListItemText primary="Forum" />
                        </ListItemButton>
                    </Link>
                    <Link to={`${coursePath}/assessments`} style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItemButton>
                            <ListItemText primary="Assessments" />
                        </ListItemButton>
                    </Link>
                    <Link to={`${coursePath}/gradebook`} style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItemButton>
                            <ListItemText primary="Gradebook" />
                        </ListItemButton>
                    </Link>
                    <Link to={`${coursePath}/whiteboard`} style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItemButton>
                            <ListItemText primary="Whiteboard" />
                        </ListItemButton>
                    </Link>
                    <Link to={`/myTeachingCourse/${courseId}/inClass`} style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItemButton>
                            <ListItemText primary="In-Class" />
                        </ListItemButton>
                    </Link>
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

export default LearnerCoursesDrawer;