import * as React from 'react';
import '../App.css';
import '../css/TeachingFileList.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import TeachingCoursesDrawer from './TeachingCoursesDrawer';
import { Grid, Typography, Button, TextField, Dialog, DialogActions, DialogContent, Alert, Snackbar,
     DialogContentText, DialogTitle } from '@mui/material';
import TeachingFileComponent from './TeachingFileComponent';
import { useState } from 'react';
import InstantErrorMessage from './InstantErrorMessage';
import InstantSuccessMessage from './InstantSuccessMessage';
import { JavascriptOutlined } from '@mui/icons-material';




function TeachingFileList() {

    // list of folders
    const [folderList, setFolderList] = useState([]);

    // create new folder dialog box
    const [open, setOpen] = useState(false);

    const openCreateFolderDialogBox = () => {
        setOpen(true);
    };

    const closeCreateFolderDialogBox = () => {
        setOpen(false);
    };

    // create new folder form
    const [folderName, setFolderName] = useState('');

    //  success notification
    const [openSuccessSnackBar, setOpenSuccessSnackBar] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState("");

    const handleClickSuccessSnackBar = (feedback) => {
        setSuccessMessage(feedback);
        setOpenSuccessSnackBar(true)
    };

    const handleCloseSuccessSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccessSnackBar(false);
    };

    //  error notification
    const [openErrorSnackBar, setOpenErrorSnackBar] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleClickErrorSnackBar = (feedback) => {
        setErrorMessage(feedback);
        setOpenErrorSnackBar(true)
    };

    const handleCloseErrorSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenErrorSnackBar(false);
    };

    // from child component
    const handleRefreshDelete = () => {
        refresh();
        //notification
        setSuccessMessage("Folder is successfully deleted.");
        setOpenSuccessSnackBar(true);

    };

    const handleRefreshUpdate = () => {
        refresh();
        //notification
        setSuccessMessage("Folder is successfully updated.");
        setOpenSuccessSnackBar(true);
    }

    var courseId = useParams();
    courseId = courseId.moduleCode;

    React.useEffect(() => {
        fetch("http://localhost:8080/folder/getFoldersByCourseId/" + courseId)
            .then(res => res.json())
            .then((result) => {
                setFolderList(result);
            }
            ).catch((err) => {
                setErrorMessage("Unable to retrieve folders.");
                setOpenErrorSnackBar(true);
            });
    }, []);

    const refresh = () => {
        fetch("http://localhost:8080/folder/getFoldersByCourseId/" + courseId)
            .then(res => res.json())
            .then((result) => {
                setFolderList(result);
            }
            ).catch((err) => {
                setErrorMessage("Unable to retrieve folders.");
                setOpenErrorSnackBar(true);
            });
    };

    const clickSubmitButton = (e) => {
        e.preventDefault();
        if (folderName.length == 0) {
            setErrorMessage("Please choose a valid name.");
            handleClickErrorSnackBar();

        };
        console.log("reach here");
        const parentFolder = {
            'folder': {
                'folderName': folderName
            },
            'courseId': courseId
        };
        console.log('JSON IS ' + JSON.stringify(parentFolder));
        fetch("http://localhost:8080/folder/addParentFolder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parentFolder)
        }).then(() => {

            //notification
            setSuccessMessage("Folder is successfully created.");
            setOpenSuccessSnackBar(true);
            closeCreateFolderDialogBox();
            refresh();


        }).catch((error) => {

            //notification
            setErrorMessage(error.message);
            handleClickErrorSnackBar();

        })
    }


    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                    <Snackbar open={openSuccessSnackBar} autoHideDuration={5000} onClose={handleCloseSuccessSnackBar}>
                        <Alert onClose={handleCloseSuccessSnackBar} severity="success" sx={{ width: '100%' }}>
                            {successMessage}
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openErrorSnackBar} autoHideDuration={5000} onClose={handleCloseErrorSnackBar}>
                        <Alert onClose={handleCloseErrorSnackBar} severity="error" sx={{ width: '100%' }}>
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                    <Typography variant="h5">
                        Content Files Uploading
                    </Typography>
                    <divider></divider>
                    <br />
                    <Button
                        color="primary"
                        variant="outlined"
                        component="span"
                        onClick={openCreateFolderDialogBox}
                    >
                        Create New Folder
                    </Button>
                    <Dialog open={open} onClose={closeCreateFolderDialogBox} fullWidth="lg">
                        <DialogContent>
                            <DialogContentText>
                                Create a new folder
                            </DialogContentText>

                            <TextField
                                autoFocus
                                margin="dense"
                                id="parentFolderTitleField"
                                label="Folder Title"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setFolderName(e.target.value)} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={clickSubmitButton}>Create</Button>
                            <Button onClick={closeCreateFolderDialogBox}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                    <br />
                    <br />
                    <div>
                        {folderList.length > 0 &&
                            folderList
                                .map((folder) => (<TeachingFileComponent folder={folder} courseId={courseId} handleRefreshDelete={handleRefreshDelete} handleRefreshUpdate={handleRefreshUpdate}></TeachingFileComponent>))
                        }
                        {folderList.length <= 0 &&
                            <p>This course currently doesn't have any teaching folder.</p>
                        }
                    </div>




                </Grid>
            </Grid>




        </div>
    )


}

export default TeachingFileList;