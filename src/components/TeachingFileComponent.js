import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import folderPicture from '../assets/folder.png';
import '../css/TeachingFileList.css';


function TeachingFileComponent({ folder, courseId }) {
    return (
        <List>
            <ListItem>
                <ListItemButton href = {`/myTeachingCourse/${courseId}/files/${folder.folderId}`}>
                    <ListItemIcon>
                        <img class="folder-picture" src={folderPicture} />
                    </ListItemIcon>
                    <ListItemText
                        primary={folder.folderName}
                    />
                    {/* <Link to={`/myTeachingCourse/${moduleCode}/files/${folder.folderId}`}>
                        <ListItemIcon>
                            <img class="folder-picture" src={folderPicture} />
                        </ListItemIcon>
                        <ListItemText
                            primary={folder.folderName}
                        />
                    </Link> */}


                </ListItemButton>

            </ListItem>
        </List>
    )
}

export default TeachingFileComponent;