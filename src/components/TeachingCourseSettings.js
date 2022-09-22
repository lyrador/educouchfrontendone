import * as React from 'react';
import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import TeachingCoursesDrawer from '../components/TeachingCoursesDrawer';
import { Container, Paper, Box, Button} from '@mui/material';

export default function TeachingCourseSettings(props) {


    const location = useLocation(props);

    const courseId = useParams();
    console.log(JSON.stringify(courseId.courseId));

    const[course, setCourse] = useState('')

    React.useEffect(() => {
        fetch("http://localhost:8080/course/courses/" + courseId.courseId).
        then(res=>res.json()).then((result)=>{
            setCourse(result); 
            }
        )
    }, [])

    const paperStyle={
        padding: '50px 20px', 
        width:1000,
        margin:"20px auto", 
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: '1'
    }

    const headingStyle={
        color: "blue", 
        textAlign: "left", 
        position: "relative", 
        top: "-30px", 
        fontFamily:"Fira Mono"

    }

    return (
        <Container>
            <TeachingCoursesDrawer courseId = {courseId }></TeachingCoursesDrawer>
            <Link to ={`/myTeachingCourse/${courseId.courseId}/updateCourse`} style={{textDecoration: 'none'}}>
                <Button
                    className="btn-upload"
                    color="primary"
                    variant="contained"
                    component="span"
                    style={{float: 'right', marginLeft: 'auto'}}>
                Update
                </Button>
            </Link>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={headingStyle}> Course Description</h1>
                <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1},
                }}
                noValidate
                autoComplete="off"
                >
                <p>{course.courseDescription}</p>
                <p>This course is catered for {course.ageGroup} learners!</p> 
                </Box>
            </Paper>

            <Paper elevation={3} style={paperStyle}>
                <h1 style={headingStyle}> Course Timeline</h1>
                <p>{course.courseTimeline}</p>
                
            </Paper>
    </Container>

    ); 


}