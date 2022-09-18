import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container ,Paper, Button, MenuItem} from '@mui/material';

export default function TeachingCourseCreate() {
    const paperStyle={
        padding: '50px 20px', 
        width:600,
        margin:"20px auto", 
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: '1'
    }

    const ageGroups = [
        {
            value:'Adults', 
        }, 
        {
            value: 'Kids',
        },
    ];

    const courseApprovalStatuses = [
        {
            value: 'Pending Approval', 
        }, 
        {
            value: 'Live',
        }, 
        {
            value: 'Under Construction',
        }, 
        {
            value: 'Rejected',
        }, 
        {
            value: 'Appealed',
        },
    ];

    const[courseCode,setCourseCode] = useState('')
    const[courseTitle,setCourseTitle]=useState('')
    const[courseDescription, setCourseDescription] = useState('')
    const[courseTimeline, setCourseTimeline] = useState('')
    const[courseMaxScore, setCourseMaxScore] = useState('')
    const[ageGroup, setAgeGroup] = useState('EUR')
    const[courseApprovalStatus, setCourseApprovalStatus] = useState('EUR')

    const handleChange1 = (event) => {
        setAgeGroup(event.target.value); 
    }; 

    const handleChange2 = (event) => {
        setCourseApprovalStatus(event.target.value); 
    }; 

    const handleClick=(e)=>{
        e.preventDefault()
        const course={courseCode, courseTitle, courseDescription, courseTimeline, courseMaxScore, ageGroup, courseApprovalStatus}
        console.log(course)
        fetch("http://localhost:8080/course/courses", {
            method:"POST", 
            headers:{"Content-Type":"application/json"}, 
            body:JSON.stringify(course)
        }).then(()=>{
            console.log("New Course Created Successfully!")
        })
    }


  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color: "blue"}}> Create New Course </h1>
        <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1},
        }}
        noValidate
        autoComplete="off"
        >
        <TextField id="outlined-basic" label="Course Code" variant="outlined" fullWidth 
        value={courseCode}
        onChange={(e)=>setCourseCode(e.target.value)}
        />
        
        <TextField id="outlined-basic" label="Course Title" variant="outlined" fullWidth
        value={courseTitle}
        onChange={(e)=>setCourseTitle(e.target.value)}
        />
             
        <TextField id="outlined-basic" label="Course Description" variant="outlined" fullWidth
        value={courseDescription}
        onChange={(e)=>setCourseDescription(e.target.value)}
        />

        <TextField id="outlined-basic" label="Course Timeline" variant="outlined" fullWidth
        value={courseTimeline}
        onChange={(e)=>setCourseTimeline(e.target.value)}
        />

        <TextField id="outlined-basic" label="Course Max Score" variant="outlined" fullWidth
        value={courseMaxScore}
        onChange={(e)=>setCourseMaxScore(e.target.value)}
        />

        <TextField id="outlined-select-age" select label="Age Group" fullWidth
         value={ageGroup}
         onChange={handleChange1}
         helperText="Please select your age group"
         >
            {ageGroups.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.value}
                </MenuItem>
            ))}
        </TextField>

        <TextField id="outlined-select-status" select label="Approval Status" fullWidth
         value={courseApprovalStatus}
         onChange={handleChange2}
         helperText="Please select your approval status"
         >
            {courseApprovalStatuses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.value}
                </MenuItem>
            ))}
        </TextField>

         <Button variant="outlined" onClick={handleClick}>Submit</Button>
        </Box>
        </Paper>
    </Container>
  );
}
