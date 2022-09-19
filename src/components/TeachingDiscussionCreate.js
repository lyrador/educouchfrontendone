import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container ,Paper, Button, MenuItem} from '@mui/material';
import { Link, useLocation, useParams } from 'react-router-dom';

export default function TeachingDiscussionCreate() {

    //paths
    const location = useLocation();

    const courseId = location.pathname.split('/')[2];
    console.log(courseId);

    const forumId = location.pathname.split('/')[4];
    console.log(forumId);

    const paperStyle={
        padding: '50px 20px', 
        width:600,
        margin:"20px auto", 
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: '1'
    }

    const [forumDiscussionTitle,setForumDiscussionTitle]=useState('')
    const [forumDiscussionDescription,setForumDiscussionDescription]=useState('')

    const handleClick=(e)=>{
        e.preventDefault()
        const newDiscussion={forumDiscussionTitle, forumDiscussionDescription}
        console.log(newDiscussion)
        fetch("http://localhost:8080/forumDiscussion/forums/" + forumId + "/forumDiscussions", {
            method:"POST", 
            headers:{"Content-Type":"application/json"}, 
            body:JSON.stringify(newDiscussion)
        }).then(()=>{
            console.log("New Discussion Created Successfully!")
        })
    }


  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color: "blue"}}> Create New Discussion </h1>
        <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1},
        }}
        noValidate
        autoComplete="off"
        >
        <TextField id="outlined-basic" label="Discussion Title" variant="outlined" fullWidth 
        value={forumDiscussionTitle}
        onChange={(e)=>setForumDiscussionTitle(e.target.value)}
        />
        <TextField id="outlined-basic" label="Discussion Description" variant="outlined" fullWidth 
        value={forumDiscussionDescription}
        onChange={(e)=>setForumDiscussionDescription(e.target.value)}
        />

        <Button variant="outlined" onClick={handleClick}>Submit</Button>
        </Box>
        </Paper>
    </Container>
  );
}
