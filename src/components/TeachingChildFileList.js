import * as React from 'react';
import '../App.css';
import '../css/TeachingFileList.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import TeachingCoursesDrawer from './TeachingCoursesDrawer';
import { Grid, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import TeachingFileComponent from './TeachingFileComponent';
import { useState } from 'react';

import InstantErrorMessage from './InstantErrorMessage';
import InstantSuccessMessage from './InstantSuccessMessage';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AttachFileIcon from '@mui/icons-material/AttachFile';

function TeachingChildFileList({ folderId }) {
    var courseId = useParams();
    courseId = courseId.moduleCode;
    

    const [folderList, setFolderList] = useState([]);
    const [attachmentList, setAttachmentList] = useState([]);

    React.useEffect(() => {
        fetch("http://localhost:8080/folder/getFolderByFolderId/" + folderId)
            .then(res => res.json())
            .then((result) => {
                var fol = result;
                setFolderList(fol.childFolders);
                setAttachmentList(fol.attachments);
            }
            ).catch((err) => {
                console.log(err.message);
            });
    }, []);

    const refresh = () => {
        fetch("http://localhost:8080/folder/getFolderByFolderId/" + folderId)
            .then(res => res.json())
            .then((result) => {
                var fol = result;
                setFolderList(fol.childFolders);
                setAttachmentList(fol.attachments);
            }
            ).catch((err) => {
                console.log(err.message);
            });
    };
     // create new folder dialog box
     const [open, setOpen] = useState(false);

     const openCreateFolderDialogBox = () => {
         setOpen(true);
     };
 
     const closeCreateFolderDialogBox = () => {
         setOpen(false);
     };

    // dial speed
    const actions = [
        { icon: <CreateNewFolderIcon />, name: 'Create new folder', action: openCreateFolderDialogBox},
        { icon: <AttachFileIcon />, name: 'Upload new file', action: openCreateFolderDialogBox },
    ];

   

    // create new folder form
    const [folderName, setFolderName] = useState('');

    // notification
    const [message, setMessage] = useState('');
    const [isError, setError] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    const createNewFolder = (e) => {
        e.preventDefault();

        if (folderName.length === 0) {
            setError(true);
        };

        const childFolder = {"courseId": courseId, "parentFolderId": folderId, "folder":{"folderName": folderName}};
        console.log('JSON IS ' + JSON.stringify(childFolder));

        fetch("http://localhost:8080/folder/addSubFolder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(childFolder)
        }).then(() => {
            setOpen(false);

            //notification
            setMessage("Folder is successfully created!");
            setError(false);
            setSuccess(true);
            refresh();


        }).catch((error) => {
            setOpen(false);

            //notification
            setMessage("Could not create folder.");
            setError(true);
            setSuccess(false);
            console.log(error);

        })
    }

    // from child component
    const handleRefreshDelete = () => {
        refresh();
        //notification
        setMessage("Folder is successfully deleted!");
        setError(false);
        setSuccess(true);

    };

    const handleRefreshUpdate = () => {
        refresh();
        //notification
        setMessage("Folder is successfully updated!");
        setError(false);
        setSuccess(true);
    }



    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                    {message && isError && (
                        <InstantErrorMessage message={message}></InstantErrorMessage>
                    )}
                    {message && isSuccess && (
                        <InstantSuccessMessage message={message}></InstantSuccessMessage>
                    )}
                    <Typography variant="h5">
                        Content Files Uploading
                    </Typography>
                    <divider></divider>
                    <br />
                    <div>
                        {folderList.length > 0 &&
                            folderList
                                .map((folder) => (<TeachingFileComponent folder={folder} courseId={courseId} handleRefreshDelete={handleRefreshDelete} handleRefreshUpdate={handleRefreshUpdate}></TeachingFileComponent>))
                        }
                        {folderList.length <= 0 && attachmentList.length <= 0 &&
                            <p>This folder doesn't have any content currently.</p>}
                    </div>
                    <Dialog open={open} onClose={closeCreateFolderDialogBox} fullWidth="lg">
                        <DialogContent>
                            <DialogContentText>
                                Create a new folder
                            </DialogContentText>

                            <TextField
                                autoFocus
                                margin="dense"
                                id="childFolderTitleField"
                                label="Folder Title"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setFolderName(e.target.value)} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={createNewFolder}>Create</Button>
                            <Button onClick={closeCreateFolderDialogBox}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                    <SpeedDial
                        ariaLabel="SpeedDial openIcon example"
                        sx={{ position: 'absolute', bottom: 16, right: 16 }}
                        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick = {action.action}
                            />
                        ))}
                    </SpeedDial>


                </Grid>
            </Grid>




        </div>
    )
}

export default TeachingChildFileList;