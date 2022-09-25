import * as React from 'react';
import '../App.css';
import '../css/TeachingFileList.css';
import { useParams } from 'react-router-dom';
import TeachingCoursesDrawer from './TeachingCoursesDrawer';
import {
    Grid, LinearProgress, ThemeProvider,
    createTheme, Typography, Button, TextField,
    Dialog, DialogActions, DialogContent,
    DialogContentText, Box
} from '@mui/material';
import TeachingFileComponent from './TeachingFileComponent';
import AttachmentComponent from './AttachmentComponent';
import { useState } from 'react';

import InstantErrorMessage from './InstantErrorMessage';
import InstantSuccessMessage from './InstantSuccessMessage';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import UploadService from "../services/UploadFilesService";


function TeachingChildFileList() {
    var courseId = useParams();
    courseId = courseId.moduleCode;

    var folderId = useParams();
    folderId = folderId.folderId;

    const [folderList, setFolderList] = useState([]);
    const [attachmentList, setAttachmentList] = useState([]);

    function changeFolderIdWrapper(num){
        console.log("Reach " + num);
        fetch("http://localhost:8080/folder/getFolderByFolderId/" + num)
            .then(res => res.json())
            .then((result) => {
                
                var fol = result;
                setFolderList(fol.childFolders);
                setAttachmentList(fol.attachments);
            }
            ).catch((err) => {
                console.log(err.message);
            });
    }

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
                console.log(JSON.stringify(fol));
                setFolderList(fol.childFolders);
                setAttachmentList(fol.attachments);
                console.log("Length of folder is " + folderList.length);
                console.log("Length of attachment is " + attachmentList.length);
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




    // upload dialog box
    const [uploadDialogBox, setUploadDialogBox] = useState(false);

    const openUploadDialogBox = () => {
        setUploadDialogBox(true);
    };

    const closeUploadDialogBox = () => {
        setUploadDialogBox(false);
    };

    // dial speed
    const actions = [
        { icon: <CreateNewFolderIcon />, name: 'Create new folder', action: openCreateFolderDialogBox },
        { icon: <AttachFileIcon />, name: 'Upload new file', action: openUploadDialogBox },
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

        const childFolder = { "courseId": courseId, "parentFolderId": folderId, "folder": { "folderName": folderName } };
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
        setMessage("Item is successfully deleted!");
        setError(false);
        setSuccess(true);

    };

    const handleRefreshUpdate = () => {
        refresh();
        //notification
        setMessage("Item is successfully updated!");
        setError(false);
        setSuccess(true);
    }

    // uploading function
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);

    const selectFile = (event) => {
        setCurrentFile(event.target.files[0]);
        setProgress(0);
        setMessage("");
    };

    const uploadAttachment = () => {
        setProgress(0);
        UploadService.uploadAttachment(folderId, currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {
                setMessage("Succesfully Uploaded!");
                setError(false);
                console.log(response);
                closeUploadDialogBox();
                refresh();
            })
            .catch((err) => {
                setMessage("Could not upload the image!");
                setError(true);
                setProgress(0);
                setCurrentFile(undefined);
            });
    };

    // progress bar
    const theme = createTheme({
        components: {
            MuiLinearProgress: {
                styleOverrides: {
                    root: {
                        height: 15,
                        borderRadius: 5,
                    },
                    colorPrimary: {
                        backgroundColor: "#EEEEEE",
                    },
                    bar: {
                        borderRadius: 5,
                        backgroundColor: "#1a90ff",
                    },
                },
            },
        },
    });



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
                        {folderList && folderList.length > 0 &&
                            folderList
                                .map((folder) => (<TeachingFileComponent folder={folder} courseId={courseId} handleRefreshDelete={handleRefreshDelete} handleRefreshUpdate={handleRefreshUpdate} changeFolderIdWrapper = {changeFolderIdWrapper}></TeachingFileComponent>))
                        }
                        {attachmentList && attachmentList.length > 0 &&
                            attachmentList
                                .map((attachment) => (<AttachmentComponent attachment={attachment} courseId={courseId} handleRefreshDelete={handleRefreshDelete} handleRefreshUpdate={handleRefreshUpdate}></AttachmentComponent>))
                        }
                        {(!folderList || folderList.length <= 0) && (!attachmentList || attachmentList.length <= 0) &&
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
                                onClick={action.action}
                            />
                        ))}
                    </SpeedDial>
                    <Dialog open={uploadDialogBox} onClose={closeUploadDialogBox} fullWidth="lg">
                        <DialogContent>
                            <DialogContentText>
                                Upload file
                            </DialogContentText>
                            
                            <br />
                            <label htmlFor="btn-upload">
                                <input
                                    id="btn-upload"
                                    name="btn-upload"
                                    style={{ display: "none" }}
                                    type="file"
                                    accept=".doc,.docx,.pdf, .mp4"
                                    onChange={selectFile}
                                />
                                <Button className="btn-choose" variant="outlined" component="span">
                                    Choose File
                                </Button>
                            </label>
                            <divider></divider>
                            {currentFile && (
                                <Box className="my20" display="flex" alignItems="center">
                                    <Box width="100%" mr={1}>
                                        <ThemeProvider theme={theme}>
                                            <LinearProgress variant="determinate" value={progress} />
                                        </ThemeProvider>
                                    </Box>
                                    <Box minWidth={35}>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >{`${progress}%`}</Typography>
                                    </Box>
                                </Box>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button disabled={!currentFile}
                                onClick={uploadAttachment}>Upload</Button>
                            <Button onClick={closeUploadDialogBox}>Cancel</Button>
                        </DialogActions>
                    </Dialog>


                </Grid>
            </Grid>




        </div>
    )
}

export default TeachingChildFileList;