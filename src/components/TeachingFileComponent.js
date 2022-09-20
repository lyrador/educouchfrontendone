import * as React from 'react';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import folderPicture from '../assets/folder.png';
import '../css/TeachingFileList.css';
import { Link } from 'react-router-dom';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import InstantErrorMessage from './InstantErrorMessage';
import InstantSuccessMessage from './InstantSuccessMessage';




function TeachingFileComponent({ folder, courseId }) {

    // opening mini menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const processDeletion = () => {
        fetch("http://localhost:8080/folder/deleteFolder/" + folder.folderId, {
            method: "DELETE"
        }).then(() => {
            //notification
            setMessage("Folder is successfully deleted!");
            setError(false);
            setSuccess(true);
        }).catch((err) => {
            //notification
            setMessage("Could not delete folder.");
            setError(true);
            setSuccess(false);
            console.log(err.message);
        });

        handleClose();
    };

    // notification
    const [message, setMessage] = useState('');
    const [isError, setError] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    return (

        <List>
            {message && isError && (
                <InstantErrorMessage message={message}></InstantErrorMessage>
            )}
            {message && isSuccess && (
                <InstantSuccessMessage message={message}></InstantSuccessMessage>
            )}
            <ListItem>
                {/* <ListItemButton href={`/myTeachingCourse/${courseId}/files/${folder.folderId}`}> */}
                <ListItemButton aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
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
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >


                    <MenuItem component={Link} to={`/myTeachingCourse/${courseId}/files/${folder.folderId}`}>
                        <ListItemIcon>
                            <FolderOpenIcon fontSize="small" />
                        </ListItemIcon>
                        Open
                    </MenuItem>
                    <MenuItem onClick={processDeletion}>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        Delete
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <DriveFileRenameOutlineIcon fontSize="small" />
                        </ListItemIcon>
                        Rename
                    </MenuItem>
                </Menu>

            </ListItem>
        </List>
    )
}

export default TeachingFileComponent;