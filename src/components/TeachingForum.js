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

function TeachingForum(props) {

    // let { courseId } = useParams();

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

    // function createData(discussionId, discussionName, numofComments, lastActivity) {
    //     return {discussionId, discussionName, numofComments, lastActivity};
    // }
    
    // const rows = [
    //     createData(1, 'Tutorial Grp 1', 20, "1 Sep 2359hrs"),
    //     createData(2, 'Tutorial Grp 2', 80, "2 Sep 1200hrs"),
    //     createData(3, 'Tutorial Grp 3', 789, "31 May 2359hrs"),
    //     createData(4, 'Tutorial Grp 4', 432, "22 Jul 2000hrs"),
    // ];

    const [discussions,setDiscussions]=useState([])

    React.useEffect(() => {
        fetch("http://localhost:8080/forumDiscussion/forums/" + forumId + "/forumDiscussions").
        then(res=>res.json()).
        then((result)=>{
          setDiscussions(result);
        }
      )
      }, [])

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
                        <Link to ={`/myTeachingCourse/${courseId}/forum/${forumId}/newDiscussion`} style={{textDecoration: 'none'}}>
                            <Button
                                className="btn-upload"
                                color="primary"
                                variant="contained"
                                component="span"
                                // onClick={createNewForum}
                                style={{float: 'right', marginLeft: 'auto'}}
                                >
                                Create New Discussion
                            </Button>
                        </Link>
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
        </div>
    )
}

export default TeachingForum;