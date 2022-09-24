import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Grid from '@mui/material/Grid';
import { useState } from 'react';

import TeachingCoursesDrawer from '../components/TeachingCoursesDrawer';
import TeachingForumList from '../components/TeachingForumList';
import TeachingDiscussion from './TeachingDiscussion';

import { Link, useLocation, useParams } from 'react-router-dom';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMaterial from '@mui/material/Link';

import { Button } from '@mui/material';

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

function TeachingForum(props) {

    const auth = useAuth()
    const user = auth.user

    //paths
    const location = useLocation();
    const forumsPath = location.pathname.split('/').slice(0, 4).join('/')
    const discussionsPath = location.pathname

    const courseId = location.pathname.split('/')[2];
    const forumId = location.pathname.split('/')[4];
    const forumTitle = location.state.forumTitle;

    const [discussions, setDiscussions] = useState([])

    const [refreshPage, setRefreshPage] = useState('')

    React.useEffect(() => {
        setRefreshPage(false)
        fetch("http://localhost:8080/forumDiscussion/forums/" + forumId + "/forumDiscussions").
            then(res => res.json()).
            then((result) => {
                setDiscussions(result);
            }
            )
    }, [refreshPage])

    const [open, setOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);

    const [forumDiscussionTitle, setForumDiscussionTitle] = useState('')
    const [forumDiscussionDescription, setForumDiscussionDescription] = useState('')

    const [discussionIdToDelete, setDiscussionIdToDelete] = useState('')

    const [editForumDiscussionTitle, setEditForumDiscussionTitle] = useState('')
    const [editForumDiscussionDescription, setEditForumDiscussionDescription] = useState('')
    const [discussionIdToEdit, setDiscussionIdToEdit] = useState('')

    const [forumDiscussionTitleError, setForumDiscussionTitleError] = useState({ value: false, errorMessage: '' })
    const [forumDiscussionDescriptionError, setForumDiscussionDescriptionError] = useState({ value: false, errorMessage: '' })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickDeleteDialogOpen = (event, discussionId) => {
        setDiscussionIdToDelete(discussionId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleClickEditDialogOpen = (event, discussionId, discussionTitle, discussionDescription) => {
        setEditForumDiscussionTitle(discussionTitle)
        setEditForumDiscussionDescription(discussionDescription)
        setDiscussionIdToEdit(discussionId)
        setEditDialogOpen(true)
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const deleteDiscussion = (e) => {
        e.preventDefault()
        fetch("http://localhost:8080/forumDiscussion/forumDiscussions/" + discussionIdToDelete, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            // body:JSON.stringify(newComment)
        }).then(() => {
            console.log("Discussion Deleted Successfully!")
            setRefreshPage(true)
            handleDeleteDialogClose()
        })
    }

    const createNewDiscussion = (e) => {
        e.preventDefault()
        setForumDiscussionTitleError({ value: false, errorMessage: '' })
        setForumDiscussionDescriptionError({ value: false, errorMessage: '' })
        if (forumDiscussionTitle == '') {
            setForumDiscussionTitleError({ value: true, errorMessage: 'Discussion Title cannot be empty!' })
        }
        if (forumDiscussionDescription == '') {
            setForumDiscussionDescriptionError({ value: true, errorMessage: 'Discussion Description cannot be empty!' })
        }
        if (forumDiscussionTitle && forumDiscussionDescription) {
            var createdByUserId = user.userId
            var createdByUserName = user.username
            var createdByUserType = user.userType
            const newDiscussion = { forumDiscussionTitle, forumDiscussionDescription, createdByUserId, createdByUserName, createdByUserType }
            fetch("http://localhost:8080/forumDiscussion/forums/" + forumId + "/forumDiscussions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newDiscussion)
            }).then(() => {
                console.log("New Discussion Created Successfully!")
                setRefreshPage(true)
                setForumDiscussionTitle("")
                setForumDiscussionDescription("")
                handleClose()
            })
        }
    }

    const editDiscussion = (e) => {
        e.preventDefault()
        var forumDiscussionTitle = editForumDiscussionTitle;
        var forumDiscussionDescription = editForumDiscussionDescription;
        const newEditedDiscussion = { forumDiscussionTitle, forumDiscussionDescription }
        fetch("http://localhost:8080/forumDiscussion/forumDiscussions/" + discussionIdToEdit, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEditedDiscussion)
        }).then(() => {
            console.log("Discussion Edited Successfully!")
            setRefreshPage(true)
            handleEditDialogClose()
        })
    }

    const renderEmptyRowMessage = () => {
        if (discussions.length === 0) {
            return <TableRow>
                <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                    There are currently no discussions in this forum!
                </TableCell>
            </TableRow>
                ;
        }
    }

    const renderExtraActions = (forumDiscussionId, forumDiscussionTitle, forumDiscussionDescription, createdByUserId, createdByUserType) => {
        if (createdByUserId === user.userId && createdByUserType === user.userType) {
            return <div>
                <IconButton aria-label="settings"
                    onClick={event => handleClickDeleteDialogOpen(event, forumDiscussionId)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="settings"
                    onClick={event => handleClickEditDialogOpen(event, forumDiscussionId, forumDiscussionTitle, forumDiscussionDescription)}>
                    <EditIcon />
                </IconButton>
            </div>
                ;
        }
    }

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <TeachingCoursesDrawer></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to={`${forumsPath}`}
                            style={{ textDecoration: 'none', color: 'grey' }}>
                            <LinkMaterial underline="hover" color="inherit">
                                Forum
                            </LinkMaterial>
                        </Link>
                        <Link to={`${discussionsPath}`}
                            state={{ forumTitle: forumTitle }}
                            style={{ textDecoration: 'none', color: 'grey' }}>
                            <LinkMaterial underline="hover" color="inherit">
                                {forumTitle}
                            </LinkMaterial>
                        </Link>
                    </Breadcrumbs>
                    <div style={{ justifyContent: 'center' }}>
                        <h1 style={{ justifySelf: 'center', marginLeft: 'auto' }}>List of Discussions</h1>
                        <Button
                            className="btn-upload"
                            color="primary"
                            variant="contained"
                            component="span"
                            onClick={handleClickOpen}
                            style={{ float: 'right', marginLeft: 'auto' }}
                        >
                            Create New Discussion
                        </Button>
                    </div>
                    <div style={{ padding: '5%' }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Discussion Title</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Created By</TableCell>
                                        <TableCell>Created On</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {renderEmptyRowMessage()}
                                    {discussions.map((discussion) => (
                                        <TableRow
                                            key={discussion.forumDiscussionId}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Link
                                                    to={`${discussionsPath}/${discussion.forumDiscussionId}`}
                                                    state={{ discussionTitle: discussion.forumDiscussionTitle, forumTitle: forumTitle }}
                                                    style={{ textDecoration: 'none' }}>
                                                    {discussion.forumDiscussionTitle}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{discussion.forumDiscussionDescription}</TableCell>
                                            <TableCell>{discussion.createdByUserName}</TableCell>
                                            <TableCell>{discussion.createdDateTime}</TableCell>
                                            <TableCell>
                                                {renderExtraActions(
                                                    discussion.forumDiscussionId,
                                                    discussion.forumDiscussionTitle,
                                                    discussion.forumDiscussionDescription,
                                                    discussion.createdByUserId,
                                                    discussion.createdByUserType)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Grid>
            </Grid>
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Create New Discussion</DialogTitle>
                    <DialogContent>
                        <TextField id="outlined-basic" label="Discussion Title" variant="outlined" fullWidth
                            required
                            style={{ margin: '6px 0' }}
                            value={forumDiscussionTitle}
                            onChange={(e) => setForumDiscussionTitle(e.target.value)}
                            error={forumDiscussionTitleError.value}
                            helperText={forumDiscussionTitleError.errorMessage}
                        />
                        <TextField
                            id="filled-multiline-static" label="Discussion Description" multiline rows={4} defaultValue="Default Value" variant="filled" fullWidth
                            required
                            style={{ margin: '6px 0' }}
                            value={forumDiscussionDescription}
                            onChange={(e) => setForumDiscussionDescription(e.target.value)}
                            error={forumDiscussionDescriptionError.value}
                            helperText={forumDiscussionDescriptionError.errorMessage}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={createNewDiscussion}>Create</Button>
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
                        {"Delete this discussion?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            These will delete all the comments inside the discussion.
                            You will not be able to undo this action. Are you sure you want to delete?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                        <Button onClick={deleteDiscussion} autoFocus>
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
                        {"You are editing this discussion"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Enter the new discussion details
                        </DialogContentText>
                        <TextField id="outlined-basic" label="Discussion Title" variant="outlined" fullWidth
                            style={{ margin: '6px 0' }}
                            value={editForumDiscussionTitle}
                            onChange={(e) => setEditForumDiscussionTitle(e.target.value)}
                        />
                        <TextField
                            id="filled-multiline-static" label="Discussion Description" multiline rows={4} defaultValue="Default Value" variant="filled" fullWidth
                            style={{ margin: '6px 0' }}
                            value={editForumDiscussionDescription}
                            onChange={(e) => setEditForumDiscussionDescription(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditDialogClose}>Cancel</Button>
                        <Button onClick={editDiscussion} autoFocus>
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default TeachingForum;