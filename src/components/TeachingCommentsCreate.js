import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container ,Paper, Button, MenuItem} from '@mui/material';
import { Link, useLocation, useParams } from 'react-router-dom';

export default function TeachingCommentsCreate() {

    //paths
    const location = useLocation();

    const courseId = location.pathname.split('/')[2];
    console.log(courseId);

    // const forumId = location.pathname.split('/')[4];
    // console.log(forumId);

    const discussionId = location.pathname.split('/')[5];
    console.log(discussionId);

    const paperStyle={
        padding: '50px 20px', 
        width:600,
        margin:"20px auto", 
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: '1'
    }

    const [content,setContent]=useState('')

    const handleClick=(e)=>{
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


  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color: "blue"}}> Create New Comment </h1>
        <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1},
        }}
        noValidate
        autoComplete="off"
        >
        <TextField id="outlined-basic" label="Content" variant="outlined" fullWidth 
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        />

        <Button variant="outlined" onClick={handleClick}>Submit</Button>
        </Box>
        </Paper>
    </Container>
  );
}
