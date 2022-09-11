import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';


function TeachingFileComponent(props) {
    return (
        <List>
            <ListItem>
                <ListItemIcon>
                    <FolderIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Single-line item"
                />
            </ListItem>
        </List>
    )
}

export default TeachingFileComponent;