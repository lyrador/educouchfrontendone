import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container} from '@mui/system';
import { Paper, Button } from '@mui/material';
import { useState } from 'react';

export default function Learner() {
    const paperStyle={padding: '50px 20px', width:600, margin:'20px auto'}
    const [name,setName]=useState('')
    const [address,setAddress]=useState('')
    const [learners,setLearners]=useState([])

    const handleClick=(e)=> {
        e.preventDefault()
        const learner={name,address}
        console.log(learner)
        fetch("http://localhost:8080/learner/add", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(learner)
    }).then(()=>{
        console.log("New Learner added")
    })
    }

    React.useEffect(()=>{
        fetch("http://localhost:8080/learner/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setLearners(result);
        }
    )
    },[])

    // console.log(learners)

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { 
            //m: 1, 
            // width: '25ch' 
        },
      }}
      noValidate
      autoComplete="off"
    >
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 
        // style={{color:"blue"}}
        >
            <u>Add Learner</u>
        </h1>
        {/* <form className={classes.root} noValidate autoComplete="off"> */}
        <TextField id="outlined-basic" label="Learner Name" variant="outlined" fullWidth style={{paddingBottom:"10px"}}
        value={name}
        onChange={(e)=>setName(e.target.value)}/>
        <TextField id="outlined-basic" label="Learner Address" variant="outlined" fullWidth style={{paddingBottom:"10px"}}
        value={address}
        onChange={(e)=>setAddress(e.target.value)}/>
        {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}
        {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
        {/* </form> */}
        <br/>
        {name}
        <br/>
        {address}
        <br/>
        <br/>
        <Button variant="contained" onClick={handleClick}>Submit</Button>
      </Paper>

      <h1>
        <u>Display All Learners</u>
      </h1>
      <Paper elevation={3} style={paperStyle}>
        {learners.map(learner=>(
            <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}} key={learner.learnerId}>
                LearnerId: {learner.learnerId}
                <br/>
                Name: {learner.name}
                <br/>
                Address: {learner.address}
            </Paper>
        ))
        }
      </Paper>
    </Container>
    </Box>
  );
}
