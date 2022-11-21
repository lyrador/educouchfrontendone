import * as React from 'react';
import '../App.css';
import '../css/TeachingFileList.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import TeachingCoursesDrawer from './TeachingCoursesDrawer';
import {
    Grid, Typography, Button, TextField, Dialog, DialogActions, DialogContent, Alert, Snackbar,
    DialogContentText, DialogTitle
} from '@mui/material';
import TeachingFileComponent from './TeachingFileComponent';
import { useState } from 'react';
import InstantErrorMessage from './InstantErrorMessage';
import InstantSuccessMessage from './InstantSuccessMessage';
import { JavascriptOutlined } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




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


    // from child component
    const handleRefreshDelete = () => {
        refresh();
        toast.success("Folder is successfully deleted.");

    };

    const handleRefreshUpdate = () => {
        refresh();
        toast.success("Folder is successfully updated.");
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
                toast.error("Unable to retrieve the folders.");
            });
    }, []);

    const refresh = () => {
        fetch("http://localhost:8080/folder/getFoldersByCourseId/" + courseId)
            .then(res => res.json())
            .then((result) => {
                setFolderList(result);
            }
            ).catch((err) => {
                toast.error("Unable to retrieve folders.");
            });
    };

    const clickSubmitButton = async (e) => {
        e.preventDefault();
        if (folderName.length == 0) {
            toast.warn("Please choose a valid name.");

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
        }).then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson ? await response.json() : null;

            if (!response.ok) {
                const error = (data && data.message) || response.status;
                console.log('Error is ' + error);
                

                return Promise.reject(error);
            } else {
                closeCreateFolderDialogBox();
                //notification
                toast.success("Folder is successfully created.");
                refresh();
            }
        }).catch((error) => {
            //notification
            closeCreateFolderDialogBox();
            toast.error(error);


        })
    }


    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                    <ToastContainer position = "bottom-left"></ToastContainer>
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
                                .map((folder) => (<TeachingFileComponent folder={folder} courseId={courseId} handleRefreshDelete={handleRefreshDelete} handleRefreshUpdate={handleRefreshUpdate} isLearner={false}></TeachingFileComponent>))
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