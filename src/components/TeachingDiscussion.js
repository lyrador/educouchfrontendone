import * as React from 'react';

import TeachingCoursesDrawer from './TeachingCoursesDrawer';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMaterial from '@mui/material/Link';

import { Button } from '@mui/material';
import CommentCard from './CommentCard';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import TextField from '@mui/material/TextField';

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

    const [content,setContent]=useState('')
    const [comments,setComments]=useState([])

    const createComment=(e)=>{
        e.preventDefault()
        const newComment={content}
        console.log(newComment)
        fetch("http://localhost:8080/comment/forumDiscussions/" + discussionId + "/comments", {
            method:"POST", 
            headers:{"Content-Type":"application/json"}, 
            body:JSON.stringify(newComment)
        }).then(()=>{
            console.log("New Comment Created Successfully!")
        })
    }


    React.useEffect(() => {
        fetch("http://localhost:8080/comment/forumDiscussions/" + discussionId + "/comments").
        then(res=>res.json()).
        then((result)=>{
          setComments(result);
        }
      )
      }, [])

      const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
        );
    
        const card = (
        <React.Fragment>
            <CardContent>
            {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Comment
            </Typography>
            <Typography variant="h5" component="div">
                be{bull}nev{bull}o{bull}lent
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
            </Typography>
            <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
            </Typography> */}
            <TextField id="outlined-basic" label="Comment Content" variant="outlined" fullWidth 
                style={{margin: '5px 0'}}
                value={content}
                onChange={(e)=>setContent(e.target.value)}
            />
            </CardContent>
            <CardActions>
            <Button size="small">Post</Button>
            </CardActions>
        </React.Fragment>
        );

    return (
        <div>
            <Grid container spacing={0} sx={{height: '80vh'}}>
                <Grid item xs={2}>
                    <TeachingCoursesDrawer></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                    <div style={{marginRight: '20px'}}>
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
                    <div style={{paddingTop: '4%', paddingBottom: '1%', height: '50vh'}}>
                    <React.Fragment>
                        <CssBaseline />
                        <Container maxWidth="sm">
                            {comments.map(comment=>(
                                <CommentCard
                                timestamp={comment.timestamp}
                                content={comment.content}
                                />
                                ))
                            }
                        </Container>
                    </React.Fragment>
                    </div>
                    <Box sx={{ minWidth: 275, bottom: '0px'}}>
                        <Card variant="outlined">{card}</Card>
                    </Box>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default TeachingDiscussion;