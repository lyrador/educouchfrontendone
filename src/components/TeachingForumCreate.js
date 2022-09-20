import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container ,Paper, Button, MenuItem} from '@mui/material';
import { Link, useLocation, useParams } from 'react-router-dom';

export default function TeachingForumCreate() {

    //paths
    const location = useLocation();
    const courseId = location.pathname.split('/')[2];
    console.log(courseId);

    const paperStyle={
        padding: '50px 20px', 
        width:600,
        margin:"20px auto", 
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: '1'
    }

    const [forumTitle,setForumTitle]=useState('')

    const handleClick=(e)=>{
        e.preventDefault()
        const newForum={forumTitle}
        console.log(newForum)
        fetch("http://localhost:8080/forum/courses/" + courseId + "/forums", {
            method:"POST", 
            headers:{"Content-Type":"application/json"}, 
            body:JSON.stringify(newForum)
        }).then(()=>{
            console.log("New Forum Created Successfully!")
        })
    }


  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color: "blue"}}> Create New Forum </h1>
        <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1},
        }}
        noValidate
        autoComplete="off"
        >
        <TextField id="outlined-basic" label="Forum Title" variant="outlined" fullWidth 
        value={forumTitle}
        onChange={(e)=>setForumTitle(e.target.value)}
        />

        <Button variant="outlined" onClick={handleClick}>Submit</Button>
        </Box>
        </Paper>
    </Container>
  );
}
