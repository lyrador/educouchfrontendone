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

import { useAuth } from '../context/AuthProvider';

function TeachingDiscussion(props) {

    const auth = useAuth()
    const user = auth.user

    //paths
    const location = useLocation();
    const forumPath = location.pathname.split('/').slice(0,4).join('/')
    const discussionsPath = location.pathname.split('/').slice(0,5).join('/')

    const params = location.state;
    const discussionTitle = params.discussionTitle;
    const forumTitle = params.forumTitle;

    const courseId = location.pathname.split('/')[2];
    const forumId = location.pathname.split('/')[4];
    const discussionId = location.pathname.split('/')[5];

    const [commentTitle, setCommentTitle]=useState('')
    const [content,setContent]=useState('')
    const [comments,setComments]=useState([])

    const [commentTitleError, setCommentTitleError] = useState({ value: false, errorMessage: '' })
    const [contentError, setContentError] = useState({ value: false, errorMessage: '' })

    const [refreshPage,setRefreshPage]=useState('')

    React.useEffect(() => {
        console.log("HELLO")
        setRefreshPage(false)
        fetch("http://localhost:8080/comment/forumDiscussions/" + discussionId + "/comments").
        then(res=>res.json()).
        then((result)=>{
          setComments(result);
        }
      )
      }, [refreshPage])

    const createComment=(e)=>{
        e.preventDefault()
        setCommentTitleError({ value: false, errorMessage: '' })
        setContentError({ value: false, errorMessage: '' })
        if (commentTitle == '') {
            setCommentTitleError({ value: true, errorMessage: 'Comment Title cannot be empty!' })
        }
        if (content == '') {
            setContentError({ value: true, errorMessage: 'Content cannot be empty!' })
        }
        if (commentTitle && content) {
            var createdByUserId = user.userId
            var createdByUserName = user.username
            var createdByUserType = user.userType
            const newComment={commentTitle, content, createdByUserId, createdByUserName, createdByUserType}
            console.log(newComment)
            fetch("http://localhost:8080/comment/forumDiscussions/" + discussionId + "/comments", {
                method:"POST", 
                headers:{"Content-Type":"application/json"}, 
                body:JSON.stringify(newComment)
            }).then(()=>{
                console.log("New Comment Created Successfully!")
                setRefreshPage(true)
                setCommentTitle("")
                setContent("")
            })
        }
    }

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
        <TextField id="outlined-basic" label="Comment Title" variant="outlined" fullWidth 
            required
            style={{margin: '6px 0'}}
            value={commentTitle}
            onChange={(e)=>setCommentTitle(e.target.value)}
            error={commentTitleError.value}
            helperText={commentTitleError.errorMessage}
        />
        <TextField
            id="filled-multiline-static" label="Comment Content" multiline rows={4} defaultValue="Default Value" variant="filled" fullWidth
            required
            style={{margin: '6px 0'}}
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            error={contentError.value}
            helperText={contentError.errorMessage}
        />
        </CardContent>
        <CardActions>
        <Button 
            size="small"
            onClick={createComment}>
            Post
        </Button>
        </CardActions>
    </React.Fragment>
    );

    const renderEmptyRowMessage = () => {
        if (comments.length === 0) {
            return <div style={{textAlign: 'center'}}>
                    There are currently no comments in this discussion!
                </div>
            ;
        }
    }

    return (
        <div>
            <Grid container spacing={0} sx={{height: '80vh'}}>
                <Grid item xs={2}>
                    <TeachingCoursesDrawer></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                    <div style={{marginRight: '20px'}}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link to={`${forumPath}`} 
                                style={{textDecoration: 'none', color: 'grey'}}>
                                <LinkMaterial underline="hover" color="inherit">
                                    Forum
                                </LinkMaterial>
                            </Link>
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
                        </div>
                        <div style={{paddingTop: '4%', paddingBottom: '1%', minHeight: '40vh'}}>
                            <Container>
                                {renderEmptyRowMessage()}
                                {comments.map(comment=>(
                                    <CommentCard
                                    commentId={comment.commentId}
                                    commentTitle={comment.commentTitle}
                                    timestamp={comment.createdDateTime}
                                    content={comment.content}
                                    createdByUserName={comment.createdByUserName}
                                    createdByUserType={comment.createdByUserType}
                                    createdByUserId={comment.createdByUserId}
                                    profilePictureURL={comment.createdByUserProfilePictureURL}
                                    refreshPage={refreshPage}
                                    setRefreshPage={setRefreshPage}
                                    />
                                    ))
                                }
                            </Container>
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