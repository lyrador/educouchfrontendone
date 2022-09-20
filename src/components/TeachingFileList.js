import * as React from 'react';
import '../App.css';
import '../css/TeachingFileList.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import TeachingCoursesDrawer from './TeachingCoursesDrawer';
import { Grid, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import TeachingFileComponent from './TeachingFileComponent';
import { useState } from 'react';

function TeachingFileList() {

    var moduleCode = useParams();
    moduleCode = moduleCode.moduleCode;
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
    const[folderName, setFolderName] = useState('');

    

    React.useEffect(() => {
        fetch("http://localhost:8080/folder/getFoldersByCourseCode/" + moduleCode)
            .then(res => res.json())
            .then((result) => {
                setFolderList(result);
            }
            ).catch((err) => {
                console.log(err.message);
            });
    }, []);



    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <TeachingCoursesDrawer moduleCode={moduleCode}></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
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
                    <Dialog open={open} onClose={closeCreateFolderDialogBox} fullWidth = "lg">
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
                                variant="standard" />
                        </DialogContent>
                        <DialogActions>
                            <Button>Create</Button>
                            <Button onClick={closeCreateFolderDialogBox}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                    <br />
                    {
                        folderList
                            .map((folder) => (<TeachingFileComponent folder={folder} moduleCode={moduleCode}></TeachingFileComponent>))
                    }

                </Grid>
            </Grid>




        </div>
    )
}

export default TeachingFileList;