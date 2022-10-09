import * as React from 'react';
import { useState } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import LearnerCourseDrawer from '../components/LearnerCourseDrawer';
import { Container, Paper, Box, Typography, Button, MenuItem, Grid, CircularProgress } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useAuth } from "../context/AuthProvider";
import CourseTags from '../components/CourseTags';


const headingStyle = {
    color: "blue",
    textAlign: "left",
    position: "relative",
    top: "-30px",
    fontFamily: "Fira Mono"

};

const paperStyle = {
    padding: '50px 20px',
    width: '100%',
    margin: "20px auto",
    justifyContent: 'center',
    alignItems: 'center',
};
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LearnerCourseDetails(props) {

    // user
    const auth = useAuth();
    const user = auth.user;

    const location = useLocation(props);
    const courseId = location.pathname.split('/')[2];

    const [course, setCourse] = useState('');
    const [refreshPage, setRefreshPage] = useState('');

    const [learnerStatus, setLearnerStatus] = useState('');

    React.useEffect(() => {
        setRefreshPage(false);
        fetch("http://localhost:8080/course/courses/" + courseId)
            .then(res => res.json())
            .then((result) => {
                setCourse(result);
                var checkStatusUrl = "http://localhost:8080/course/enquiryCourseEnrolment?learnerId=" + user.userId + "&courseId=" + courseId;
                fetch(checkStatusUrl)
                    .then(res => res.json())
                    .then((result) => {
                        setLearnerStatus(result.enrolled);
                        console.log('Learner status is ' + learnerStatus);

                    }
                    )
                    .catch((err) => {
                        console.log(err);
                    });
            }
            );
    }, [refreshPage]);



    return (
        <div>
            <Container>
                <Grid container spacing={0}>
                    <Grid item xs={2}>
                        <LearnerCourseDrawer courseId={courseId} learnerStatus={learnerStatus}></LearnerCourseDrawer>
                    </Grid>
                    <Grid item xs={10}>
                        <CourseTags courseId={courseId} isLearner={true}></CourseTags>
                        <Paper elevation={3} style={paperStyle}>
                            <Typography color="grey">
                                {course.courseCode}
                            </Typography>
                            <Typography variant="h4">
                                {course.courseTitle}
                            </Typography>
                            <br />
                            <Typography>
                                Start date: {course.startDate}
                            </Typography>
                            <Typography>
                                End date: {course.endDate}
                            </Typography>
                            <Typography>
                                Course fee: SGD {course.courseFee}
                            </Typography>
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
                            <Typography variant="h4">
                                Course Description
                            </Typography>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1 },
                                }}
                                noValidate
                                autoComplete="off"
                            >   <br/>
                                <Typography>{course.courseDescription}</Typography>
                                <Typography>This course is catered for {course.ageGroup} learners!</Typography>

                            </Box>
                        </Paper>

                        <Paper elevation={3} style={paperStyle}>
                        <Typography variant="h4">
                                Course Timeline
                            </Typography>
                            <br/>
                            <Typography>{course.courseTimeline}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>);


}