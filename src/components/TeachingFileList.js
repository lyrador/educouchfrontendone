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

    // notification
    const [message, setMessage] = useState('');
    const [isError, setError] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    // from child component
    const handleRefreshDelete = () => {
        refresh();
        //notification
        setMessage("Folder is successfully deleted!");
        setError(false);
        setSuccess(true);
        
    };

    var courseId = useParams();
    courseId = courseId.courseId;

    React.useEffect(() => {
        fetch("http://localhost:8080/folder/getFoldersByCourseId/" + courseId)
            .then(res => res.json())
            .then((result) => {
                setFolderList(result);
            }
            ).catch((err) => {
                console.log(err.message);
            });
    }, []);

    const refresh = () => {
        fetch("http://localhost:8080/folder/getFoldersByCourseId/" + courseId)
            .then(res => res.json())
            .then((result) => {
                setFolderList(result);
            }
            ).catch((err) => {
                console.log(err.message);
            });
    };

    const clickSubmitButton = (e) => {
        e.preventDefault();
        if (folderName.length == 0) {
            setError(true);

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
                    <Button
                        color="primary"
                        variant="contained"
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
                                .map((folder) => (<TeachingFileComponent folder={folder} courseId={courseId} handleRefreshDelete={handleRefreshDelete}></TeachingFileComponent>))
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