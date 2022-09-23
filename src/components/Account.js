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

function Account(props) {

    const auth = useAuth()
    const user = auth.user
    
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
    const forumsPath = location.pathname.split('/').slice(0,4).join('/')

    const courseId = location.pathname.split('/')[2];

    const [open, setOpen] = React.useState(false);
    const [forums,setForums]=useState([])
    const [forumTitle,setForumTitle]=useState('')
    const [forumIdToDelete,setForumIdToDelete]=useState('')

    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);

    const [editForumTitle,setEditForumTitle]=useState('')
    const [forumIdToEdit,setForumIdToEdit]=useState('')

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleClickDeleteDialogOpen = (event, forumId) => {
        setForumIdToDelete(forumId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleClickEditDialogOpen = (event, forumId, forumTitle, forumDescription) => {
        setEditForumTitle(forumTitle)
        setForumIdToEdit(forumId)
        setEditDialogOpen(true)
    };
  
    const handleEditDialogClose = () => {
      setEditDialogOpen(false);
    };

    const deleteAccount=(e)=>{
        // e.preventDefault()
        // fetch("http://localhost:8080/forum/forums/" + forumIdToDelete, {
        //     method:"DELETE", 
        //     headers:{"Content-Type":"application/json"}, 
        //     // body:JSON.stringify(newComment)
        // }).then(()=>{
        //     console.log("Forum Deleted Successfully!")
        //     window.location.reload();
        // })
    }

    const editAccount=(e)=>{
        // e.preventDefault()
        // var forumTitle = editForumTitle;
        // const newEditedForum ={forumTitle}
        // fetch("http://localhost:8080/forum/forums/" + forumIdToEdit, {
        //     method:"PUT", 
        //     headers:{"Content-Type":"application/json"}, 
        //     body:JSON.stringify(newEditedForum)
        // }).then(()=>{
        //     console.log("Forum Edited Successfully!")
        //     window.location.reload();
        // })
    }

    return (
        <div>
            {/* <Grid container spacing={0}>
                <Grid item xs={2}>
                    <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}> */}
                    <div style={{justifyContent: 'center'}}>
                        <h1 style={{justifySelf: 'center', marginLeft: 'auto'}}>Account Details</h1>
                        <Button
                            className="btn-upload"
                            color="primary"
                            variant="contained"
                            component="span"
                            onClick={handleClickOpen}
                            style={{float: 'right', marginLeft: 'auto'}}
                            >
                            Update Account
                        </Button>
                    </div>
                    <div style={{padding: '5%'}}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                <TableCell>User Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Password</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Profile Pic</TableCell>
                                <TableCell>User Type</TableCell>
                                <TableCell>User Enum</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    <TableCell component="th" scope="row">{user.userId}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.password}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>
                                        <Avatar alt="avatar" src={user.profilePictureURL} />
                                    </TableCell>
                                    <TableCell>{user.userType}</TableCell>
                                    <TableCell>{user.userEnum}</TableCell>
                                    {/* <TableCell>
                                        <div>
                                            <IconButton aria-label="settings" 
                                                onClick={event => handleClickDeleteDialogOpen(event, forum.forumId)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                            <IconButton aria-label="settings" 
                                                onClick={event => handleClickEditDialogOpen(event, forum.forumId, forum.forumTitle)}>
                                                <EditIcon/>
                                            </IconButton>
                                        </div>
                                    </TableCell> */}
                            </TableBody>
                            </Table>
                        </TableContainer>
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
            </div>
            <div>
                <Dialog
                    open={deleteDialogOpen}
                    onClose={handleDeleteDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete this forum?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            These will delete all the discussions and comments inside the forum.
                            You will not be able to undo this action. Are you sure you want to delete?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                        <Button onClick={deleteForum} autoFocus>
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
                        {"You are editing this forum"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        Enter the new forum details
                        </DialogContentText>
                        <TextField id="outlined-basic" label="Discussion Title" variant="outlined" fullWidth 
                        style={{margin: '6px 0'}}
                        value={editForumTitle}
                        onChange={(e)=>setEditForumTitle(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditDialogClose}>Cancel</Button>
                        <Button onClick={editForum} autoFocus>
                        Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div> */}
        </div>
    )
}

export default Account;