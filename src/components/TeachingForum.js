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

function TeachingForum(props) {

    //paths
    const location = useLocation();
    const forumsPath = location.pathname.split('/').slice(0,4).join('/')
    const discussionsPath = location.pathname

    const courseId = location.pathname.split('/')[2];
    console.log(courseId);

    const forumId = location.pathname.split('/')[4];
    console.log(forumId);

    console.log(location.state)
    const forumTitle = location.state.forumTitle;

    const paperStyle={
        padding: '50px 20px', 
        width:600,
        margin:"20px auto", 
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: '1'
    }
    console.log(courseId);

    const [open, setOpen] = React.useState(false);
    const [forums,setForums]=useState([])

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [discussions,setDiscussions]=useState([])

    const [forumDiscussionTitle,setForumDiscussionTitle]=useState('')
    const [forumDiscussionDescription,setForumDiscussionDescription]=useState('')

    React.useEffect(() => {
        fetch("http://localhost:8080/forumDiscussion/forums/" + forumId + "/forumDiscussions").
        then(res=>res.json()).
        then((result)=>{
          setDiscussions(result);
        }
      )
      }, [])

    const createNewDiscussion=(e)=>{
        e.preventDefault()
        const newDiscussion={forumDiscussionTitle, forumDiscussionDescription}
        console.log(newDiscussion)
        fetch("http://localhost:8080/forumDiscussion/forums/" + forumId + "/forumDiscussions", {
            method:"POST", 
            headers:{"Content-Type":"application/json"}, 
            body:JSON.stringify(newDiscussion)
        }).then(()=>{
            console.log("New Discussion Created Successfully!")
            setForumDiscussionTitle("")
            setForumDiscussionDescription("")
            window.location.reload();
        })
    }

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <TeachingCoursesDrawer></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <LinkMaterial underline="hover" color="inherit" href={`${forumsPath}`}>
                            Forum
                        </LinkMaterial>
                        <Link to={`${discussionsPath}`} 
                            state={{ forumTitle: forumTitle }} 
                            style={{textDecoration: 'none', color: 'grey'}}>
                            <LinkMaterial underline="hover" color="inherit">
                                {forumTitle}
                            </LinkMaterial>
                        </Link>
                    </Breadcrumbs>
                    <div style={{justifyContent: 'center'}}>
                        <h1 style={{justifySelf: 'center', marginLeft: 'auto'}}>List of Discussions</h1>
                        <Button
                            className="btn-upload"
                            color="primary"
                            variant="contained"
                            component="span"
                            onClick={handleClickOpen}
                            style={{float: 'right', marginLeft: 'auto'}}
                            >
                            Create New Discussion
                        </Button>
                    </div>
                    <div style={{padding: '5%'}}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                <TableCell>Discussion Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Time Created</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {discussions.map((discussion) => (
                                <TableRow
                                    key={discussion.discussionId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Link 
                                            to={`${discussionsPath}/${discussion.forumDiscussionId}`} 
                                            state={{ discussionTitle: discussion.forumDiscussionTitle, forumTitle: forumTitle }} 
                                            style={{textDecoration: 'none'}}>
                                            {discussion.forumDiscussionTitle}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{discussion.forumDiscussionDescription}</TableCell>
                                    <TableCell>{discussion.timestamp}</TableCell>
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
                        style={{margin: '5px 0'}}
                        value={forumDiscussionTitle}
                        onChange={(e)=>setForumDiscussionTitle(e.target.value)}
                        />
                    <TextField id="outlined-basic" label="Discussion Description" variant="outlined" fullWidth 
                        style={{margin: '5px 0'}}
                        value={forumDiscussionDescription}
                        onChange={(e)=>setForumDiscussionDescription(e.target.value)}
                    />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={createNewDiscussion}>Create</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default TeachingForum;