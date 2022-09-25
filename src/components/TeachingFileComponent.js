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
import { Grid, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import '../css/TeachingFileList.css';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import InstantErrorMessage from './InstantErrorMessage';
import InstantSuccessMessage from './InstantSuccessMessage';







function TeachingFileComponent({ folder, courseId, handleRefreshDelete, handleRefreshUpdate, changeFolderIdWrapper}) {
    
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

            handleRefreshDelete();
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

    // rename dialog box
    const [renameDialogBox, setRenameDialogBox] = useState(false);

    const openRenameDialogBox = () => {
        handleClose();
        setRenameDialogBox(true);
    };

    const closeRenameDialogBox = () => {
        setRenameDialogBox(false);
    };

    // rename form input
    const [currFolderName, setCurrFolderName] = useState(folder.folderName);

    const clickRenameButton = (e) => {
        e.preventDefault();
        if (currFolderName.length === 0) {
            setError(true);
        };
        var apiUrl = "http://localhost:8080/folder/renameFolderByFolderId?folderId=" + folder.folderId + "&folderName=" + currFolderName;

        fetch(apiUrl)
            .then(() => {
                setRenameDialogBox(false);
                handleRefreshUpdate();
            })
            .catch((error) => {
                setRenameDialogBox(false);

                //notification
                setMessage("Could not rename folder.");
                setError(true);
                setSuccess(false);
                console.log(error);

            })
    };

    // navigate to child folder
    const navigate = useNavigate();
    const navigateChildFolder = () => {
        navigate(`/myTeachingCourse/${courseId}/files/${folder.folderId}`);
        changeFolderIdWrapper(folder.folderId);
        console.log("Running " + folder.folderId);
        
    };


    return (

        <List>
            {message && isError && (
                <InstantErrorMessage message={message}></InstantErrorMessage>
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


                    <MenuItem onClick = {navigateChildFolder}>
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
                    <MenuItem onClick={openRenameDialogBox}>
                        <ListItemIcon>
                            <DriveFileRenameOutlineIcon fontSize="small" />
                        </ListItemIcon>
                        Rename
                    </MenuItem>
                </Menu>
                <Dialog open={renameDialogBox} onClose={closeRenameDialogBox} fullWidth="lg">
                    <DialogContent>
                        <DialogContentText>
                            Rename folder
                        </DialogContentText>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="parentFolderTitleField"
                            label="Folder Title"
                            type="text"
                            fullWidth
                            variant="standard"
                            defaultValue={folder.folderName}
                            onChange={(e) => setCurrFolderName(e.target.value)} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={clickRenameButton}>Rename</Button>
                        <Button onClick={closeRenameDialogBox}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                


            </ListItem>
        </List>

    )
}

export default TeachingFileComponent;