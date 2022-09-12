import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import '../css/DrawerLeft.css';

function TeachingCoursesDrawer(props) {
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
                {['Course Settings', 'Schedule'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                    {/* <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon> */}
                    <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Announcements', 'Files', 'Forum', 'Assessments', 'Quiz', 'Gradebook', 'Whiteboard', 'In-Class'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton  onClick = {event => handleChange(event, text)}>
                    {/* <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon> */}
                    <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                ))}
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '12%' , top: '123px'},
          }}
          open
        >
          {drawer}
        </Drawer>
    </Box>
  );
}

export default TeachingCoursesDrawer;
