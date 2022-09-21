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
import folderPicture from '../assets/file.png';
import { Grid, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import '../css/TeachingFileList.css';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import InstantErrorMessage from './InstantErrorMessage';
import InstantSuccessMessage from './InstantSuccessMessage';
import DownloadIcon from '@mui/icons-material/Download';






function AttachmentComponent({ attachment, courseId, handleRefreshDelete, handleRefreshUpdate, refresh }) {

    // opening mini menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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

    // download file
    const downloadFile = () => {
        var fileUrl = "";
        window.open(attachment.fileURL, '_blank');
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
                        primary={attachment.fileOriginalName}
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


                    <MenuItem onClick={downloadFile}>
                        <ListItemIcon>
                            <DownloadIcon fontSize="small" />
                        </ListItemIcon>
                        Download
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        Delete
                    </MenuItem>
                    <MenuItem>
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

export default AttachmentComponent;