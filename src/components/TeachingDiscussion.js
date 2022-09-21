import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import TeachingCoursesDrawer from './TeachingCoursesDrawer';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMaterial from '@mui/material/Link';

import { Button } from '@mui/material';
import CommentCard from './CommentCard';


function TeachingDiscussion(props) {

    //paths
    const location = useLocation();
    const forumPath = location.pathname.split('/').slice(0,4).join('/')
    const discussionsPath = location.pathname.split('/').slice(0,5).join('/')

    console.log(location.state)

    const params = location.state;
    const discussionTitle = params.discussionTitle;
    const forumTitle = params.forumTitle;

    console.log(discussionTitle);

    const courseId = location.pathname.split('/')[2];
    // console.log(courseId);

    const forumId = location.pathname.split('/')[4];
    // console.log(forumId);

    const discussionId = location.pathname.split('/')[5];
    // console.log(discussionId);

    console.log(discussionTitle)

    const [comments,setComments]=useState([])

    React.useEffect(() => {
        fetch("http://localhost:8080/comment/forumDiscussions/" + discussionId + "/comments").
        then(res=>res.json()).
        then((result)=>{
          setComments(result);
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
                        <LinkMaterial underline="hover" color="inherit" href={`${forumPath}`}>
                            Forum
                        </LinkMaterial>
                        <Link to={`${discussionsPath}`} 
                            state={{ discussionTitle: discussionTitle, forumTitle: forumTitle }} 
                            style={{textDecoration: 'none', color: 'grey'}}>
                            <LinkMaterial underline="hover" color="inherit">
                                {forumTitle}
                            </LinkMaterial>
                        </Link>
                        <Link to={`${location.pathname}`} 
                            state={{ discussionTitle: discussionTitle, forumTitle: forumTitle }} 
                            style={{textDecoration: 'none', color: 'grey'}}>
                            <LinkMaterial underline="hover" color="inherit">
                                {discussionTitle}
                            </LinkMaterial>
                        </Link>
                    </Breadcrumbs>
                    <div style={{justifyContent: 'center'}}>
                        <h1 style={{justifySelf: 'center', marginLeft: 'auto'}}>List of Comments</h1>
                        <Link to ={`/myTeachingCourse/${courseId}/forum/${forumId}/${discussionId}/newComment`} style={{textDecoration: 'none'}}>
                            <Button
                                className="btn-upload"
                                color="primary"
                                variant="contained"
                                component="span"
                                // onClick={createNewForum}
                                style={{float: 'right', marginLeft: 'auto'}}
                                >
                                Create New Comment
                            </Button>
                        </Link>
                    </div>
                    <div style={{padding: '5%'}}>
                        {/* <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                <TableCell>Comment Content</TableCell>
                                <TableCell>Time Created</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {comments.map((comment) => (
                                <TableRow
                                    key={comment.commentId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{comment.content}</TableCell>
                                    <TableCell>{comment.timestamp}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer> */}
                        {comments.map(comment=>(
                              <CommentCard
                              timestamp={comment.timestamp}
                              content={comment.content}
                              />
                            ))
                          }
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default TeachingDiscussion;