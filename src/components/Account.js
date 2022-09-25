import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Link, useLocation, useParams } from 'react-router-dom';
import TeachingCoursesDrawer from './TeachingCoursesDrawer';
import { Grid } from '@mui/material';

import { Button } from '@mui/material';

import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import { useAuth } from '../context/AuthProvider';

import Avatar from '@mui/material/Avatar';

import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import {
    Typography,
    LinearProgress,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import UploadService from "../services/UploadFilesService";

function Account(props) {

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

    const auth = useAuth()
    const user = auth.user

    const [currentFile, setCurrentFile] = useState(undefined);
    const [previewImage, setPreviewImage] = useState(
        user.profilePictureURL
    );
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);

    const [editedProfilePictureURL, setEditedProfilePictureURL] = useState(user.profilePictureURL)

    const selectFile = (event) => {
        setCurrentFile(event.target.files[0]);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
        setProgress(0);
        setMessage("");
    };

    const uploadImage = () => {
        setProgress(0);
        UploadService.upload(currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {
                setMessage("Succesfully Uploaded!");
                setEditedProfilePictureURL(response.data.fileURL);
                setIsError(false);
                setIsUploaded(true);
                console.log(response);
            })
            .catch((err) => {
                setMessage("Could not upload the image!");
                setIsError(true);
                setProgress(0);
                setCurrentFile(undefined);
            });
    };

    // React.useEffect(() => {
    //     var userId = user.userId;

    //     const userData = {,
    //     password: password,
    //     userType: "LEARNER"}
    //     fetch("http://localhost:8080/account/", {
    //         method:"GET", 
    //         headers:{"Content-Type":"application/json"}, 
    //         body:JSON.stringify(newComment)
    //     }).then(()=>{
    //         console.log("Account Fetched Successfully!")
    //     })
    // }, [])

    //paths
    const location = useLocation();
    const forumsPath = location.pathname.split('/').slice(0, 4).join('/')

    const courseId = location.pathname.split('/')[2];

    const [open, setOpen] = React.useState(false);

    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);

    const [editedEmail, setEditedEmail] = useState(user.email)
    const [editedPassword, setEditedPassword] = useState(user.password)

    const logout = () => {
        auth.logout()
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleClickEditDialogOpen = () => {
        if (previewImage === null) {
            setPreviewImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")
        }
        setEditDialogOpen(true)
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const deleteAccount = (e) => {
        e.preventDefault()
        //mandatory unchanged variables
        var userId = user.userId
        var username = user.username
        var userType = user.userType

        const editAccountDTO = { userId, username, userType }
        fetch("http://localhost:8080/account/delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editAccountDTO)
        }).then(() => {
            console.log("Account Deleted Successfully!")
            handleEditDialogClose()
            auth.logout()
        })
    }

    const editAccount = (e) => {
        e.preventDefault()
        //mandatory unchanged variables
        var userId = user.userId
        var username = user.username
        var userType = user.userType
        //changed variables
        var email = editedEmail
        var password = editedPassword
        var profilePictureURL = editedProfilePictureURL
        const editAccountDTO = { userId, username, userType, email, password, profilePictureURL }
        fetch("http://localhost:8080/account/edit", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editAccountDTO)
        }).then(() => {
            console.log("Account Edited Successfully!")
            handleEditDialogClose()
            handleClickOpen()
        })
    }

    return (
        <div>
            {/* <Grid container spacing={0}>
                <Grid item xs={2}>
                    <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}> */}
            <div style={{ justifyContent: 'center' }}>
                <h1 style={{ marginLeft: 'auto' }}>Account Details</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', borderColor: 'black', border: '10px', padding: 50}}>
                <div>
                    <TableContainer component={Paper}
                        // style={{justifyContent: 'center'}} 
                        sx={{ minWidth: 200, maxWidth: 300, justifyContent: 'center' }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2} style={{ textAlign: 'center' }}>User Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>{user.userId}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Password</TableCell>
                                    <TableCell>{user.password}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Profile Picture</TableCell>
                                    <TableCell>
                                        <Avatar alt="avatar" src={user.profilePictureURL} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>User Type</TableCell>
                                    <TableCell>{user.userType}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>User Enum</TableCell>
                                    <TableCell>{user.userEnum}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    className="btn-upload"
                    color="primary"
                    variant="contained"
                    component="span"
                    onClick={handleClickEditDialogOpen}
                    style={{ float: 'right' }}
                >
                    Edit Account
                </Button>
                &nbsp;
                <Button
                    className="btn-upload"
                    color="error"
                    variant="contained"
                    component="span"
                    onClick={handleClickDeleteDialogOpen}
                    style={{ float: 'right' }}
                >
                    Delete Account
                </Button>
            </div>
            {/* </Grid>
            </Grid> */}
            {/* <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Create New Forum</DialogTitle>
                    <DialogContent>
                    <TextField id="outlined-basic" label="Forum Title" variant="outlined" fullWidth 
                        style={{margin: '6px 0'}}
                        value={forumTitle}
                        onChange={(e)=>setForumTitle(e.target.value)}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={createNewForum}>Create</Button>
                    </DialogActions>
                </Dialog>
            </div> */}
            <div>
                <Dialog
                    open={deleteDialogOpen}
                    onClose={handleDeleteDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete your account?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            These will delete your account and all the information inside.
                            You will not be able to undo this action. Are you sure you want to delete?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                        <Button onClick={deleteAccount} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog
                    open={editDialogOpen}
                    onClose={handleEditDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Enter the New Account Details"}
                    </DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText id="alert-dialog-description">
                        Enter the new account details
                        </DialogContentText> */}
                        <TextField id="outlined-basic" label="Email Address" variant="outlined" fullWidth
                            style={{ margin: '6px 0' }}
                            value={editedEmail}
                            onChange={(e) => setEditedEmail(e.target.value)}
                        />
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth
                            style={{ margin: '6px 0' }}
                            value={editedPassword}
                            onChange={(e) => setEditedPassword(e.target.value)}
                        />
                        <div>
                            {previewImage && (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img
                                        className="preview my20"
                                        src={previewImage}
                                        alt=""
                                        style={{ height: "40%", width: "40%", justifySelf: 'center' }}
                                    />
                                </div>
                            )}
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
                            {message && (
                                <Typography
                                    variant="subtitle2"
                                    className={`upload-message ${isError ? "error" : ""}`}
                                >
                                    {message}
                                </Typography>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <label htmlFor="btn-upload">
                                    <input
                                        id="btn-upload"
                                        name="btn-upload"
                                        style={{ display: "none" }}
                                        type="file"
                                        accept="image/*"
                                        onChange={selectFile}
                                    />
                                    <Button className="btn-choose" variant="outlined" component="span">
                                        Choose Profile Image
                                    </Button>
                                </label>
                                <Button
                                    className="btn-upload"
                                    color="primary"
                                    variant="contained"
                                    component="span"
                                    disabled={!currentFile}
                                    onClick={uploadImage}
                                >
                                    Upload
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditDialogClose}>Cancel</Button>
                        <Button onClick={editAccount} autoFocus>
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Successfully Updated!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Your account has been edited succesfully. Please proceed to log back in to reflect the changes.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={logout}>Log Out</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div >
    )
}

export default Account;