import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { Link, useLocation } from 'react-router-dom';

import '../css/DrawerLeft.css';

function TeachingCoursesDrawer(props) {

  const location = useLocation();
  const modulePath = location.pathname.split('/').slice(0,3).join('/')

  function handleChange(event, text) {
    props.onChange(text);
  }

  const drawer = (
    <div>
      <div className='drawerContainer'>
        <List>
            {['Course Name'].map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton>
                <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        <br/><br/>
        <Divider />
            <List>
                <Link to={`${modulePath}/courseSettings`} style={{textDecoration: 'none', color: 'black'}}>
                    <ListItemButton>
                      <ListItemText primary="Course Settings"/>
                    </ListItemButton>
                </Link>
                <Link to={`${modulePath}/schedule`} style={{textDecoration: 'none', color: 'black'}}>
                    <ListItemButton>
                      <ListItemText primary="Schedule"/>
                    </ListItemButton>
                </Link>
            </List>
            <Divider />
            <List>
                <Link to={`${modulePath}/announcements`} style={{textDecoration: 'none', color: 'black'}}>
                    <ListItemButton>
                      <ListItemText primary="Announcements"/>
                    </ListItemButton>
                </Link>
                <Link to={`${modulePath}/files`} style={{textDecoration: 'none', color: 'black'}}>
                    <ListItemButton>
                      <ListItemText primary="Files"/>
                    </ListItemButton>
                </Link>
                <Link to={{
                  pathname: `${modulePath}/forum`,
                  // state: {stateParam : true}
                }} style={{textDecoration: 'none', color: 'black'}}>
                    <ListItemButton>
                      <ListItemText primary="Forum"/>
                    </ListItemButton>
                </Link>
                <Link to={`${modulePath}/assessments`} style={{textDecoration: 'none', color: 'black'}}>
                    <ListItemButton>
                      <ListItemText primary="Assessments"/>
                    </ListItemButton>
                </Link>
                <Link to={`${modulePath}/gradebook`} style={{textDecoration: 'none', color: 'black'}}>
                    <ListItemButton>
                      <ListItemText primary="Gradebook"/>
                    </ListItemButton>
                </Link>
                <Link to={`${modulePath}/whiteboard`} style={{textDecoration: 'none', color: 'black'}}>
                    <ListItemButton>
                      <ListItemText primary="Whiteboard"/>
                    </ListItemButton>
                </Link>
                <Link to={`/myTeachingCourse/${props.moduleCode}/inClass`} style={{textDecoration: 'none', color: 'black'}}>
                    <ListItemButton>
                      <ListItemText primary="In-Class"/>
                    </ListItemButton>
                </Link>
            </List>
      </div>
    </div>
  );

  return (
    <Box sx={{ display: 'flex'}}>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '15%' , top: '123px', minWidth: '200px'},
          }}
          open
        >
          {drawer}
        </Drawer>
    </Box>
  );
}

export default TeachingCoursesDrawer;
