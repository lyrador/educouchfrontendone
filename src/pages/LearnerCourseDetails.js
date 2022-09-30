import * as React from 'react';
import { useState } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import TeachingCoursesDrawer from '../components/TeachingCoursesDrawer';
import CourseStatusAccordion from '../components/CourseStatusAccordion';
import { Container, Paper, Box, Button, MenuItem, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CourseTags from '../components/CourseTags';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useAuth } from "../context/AuthProvider";

const headingStyle = {
    color: "blue",
    textAlign: "left",
    position: "relative",
    top: "-30px",
    fontFamily: "Fira Mono"

};

const paperStyle = {
    padding: '50px 20px',
    width: 1000,
    margin: "20px auto",
    justifyContent: 'center',
    alignItems: 'center',
};
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LearnerCourseDetails(props) {
    console.log('Opened this');
    const location = useLocation(props);
    const courseId = location.pathname.split('/')[2];
    const [course, setCourse] = useState('');
    const navigate = useNavigate();
    const [refreshPage, setRefreshPage] = useState('');

    React.useEffect(() => {
        setRefreshPage(false);
        fetch("http://localhost:8080/course/courses/" + courseId).
            then(res => res.json()).then((result) => {
                setCourse(result);
            }
            )
    }, [refreshPage])

    const navigateToCourseEnrollment = () => {
        navigate(`/myTeachingCourse/${course.courseId}/courseEnrollment`);
    };

    


    return (
        <div>
            <Container>
                <Grid container spacing={0}>
                    <Grid item xs={2}>
                        <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
                    </Grid>
                    <Grid item xs={10}>
                        <CourseTags courseId={courseId}></CourseTags>
                        <Button variant="outlined" onClick = {navigateToCourseEnrollment} >Enroll</Button>
                        <Paper elevation={3} style={paperStyle}>
                            <h1 style={headingStyle}> {course.courseCode} - {course.courseTitle} </h1>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1 },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                            </Box>
                        </Paper>

                        <Paper elevation={3} style={paperStyle}>
                            <h1 style={headingStyle}> Course Description</h1>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1 },
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
                    </Grid>
                </Grid>
            </Container>
        </div>);


}