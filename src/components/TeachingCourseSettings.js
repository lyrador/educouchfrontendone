import * as React from 'react';
import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TeachingCourseSettings(props) {


    const [openDeleteSnackbar, setOpenDeleteSnackbar] = React.useState(false);

    const handleClickDeleteSnackbar = () => {
        setOpenDeleteSnackbar(true);
    };

    const handleCloseDeleteSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenDeleteSnackbar(false);
    };

    const [openEditSnackbar, setOpenEditSnackbar] = React.useState(false);

    const handleClickEditSnackbar = () => {
        setOpenEditSnackbar(true);
    };

    const handleCloseEditSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenEditSnackbar(false);
    };

    const [refreshPage, setRefreshPage] = useState('')


    const location = useLocation(props);
    const settingsPath = location.pathname.split('/').slice(0, 4).join('/')

    // const courseId = useParams();
    // console.log(JSON.stringify(courseId));

    const courseId = location.pathname.split('/')[2];
    const [course, setCourse] = useState('')

    React.useEffect(() => {
        setRefreshPage(false);
        fetch("http://localhost:8080/course/courses/" + courseId).
            then(res => res.json()).then((result) => {
                setCourse(result);
            }
            )
    }, [refreshPage])

    const paperStyle = {
        padding: '50px 20px',
        width: 1000,
        margin: "20px auto",
        justifyContent: 'center',
        alignItems: 'center',
    }

    const [courseCode1, setCourseCode1] = useState(course.courseCode)
    const [courseTitle1, setCourseTitle1] = useState(course.courseTitle)
    const [courseDescription1, setCourseDescription1] = useState(course.courseDescription)
    const [courseTimeline1, setCourseTimeline1] = useState(course.courseTimeline)
    const [courseMaxScore1, setCourseMaxScore1] = useState(course.courseMaxScore)
    const [ageGroup1, setAgeGroup1] = useState(course.ageGroup)

    const [open, setOpen] = React.useState(false);

    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    const handleClickOpen = (event, courseCode, courseTitle, courseDescription, courseTimeline, courseMaxScore, ageGroup) => {
        setCourseCode1(courseCode);
        setCourseTitle1(courseTitle)
        setCourseDescription1(courseDescription)
        setCourseTimeline1(courseTimeline)
        setCourseMaxScore1(courseMaxScore)
        setAgeGroup1(ageGroup)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [courseIdToDelete, setCourseIdToDelete] = useState('')

    const handleClickDeleteDialogOpen = (event, courseId) => {
        setCourseIdToDelete(courseId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };



    const deleteCourse = (e) => {
        e.preventDefault()
        fetch("http://localhost:8080/course/courses/" + courseIdToDelete, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }).then(() => {
            console.log("Course Deleted Successfully!")
            window.location.reload();
            setRefreshPage(true)
            handleDeleteDialogClose()
            handleClickDeleteSnackbar()
        })
    }

    const ageGroups = [
        {
            value: 'Adults',
        },
        {
            value: 'Kids',
        },
    ];


    const handleChange1 = (event) => {
        setAgeGroup1(event.target.value);
    };

    const handleClick = (e) => {
        e.preventDefault()
        var courseCode = courseCode1
        var courseTitle = courseTitle1
        var courseDescription = courseDescription1
        var courseTimeline = courseTimeline1
        var courseMaxScore = courseMaxScore1
        var ageGroup = ageGroup1

        const course1 = { courseCode, courseTitle, courseDescription, courseTimeline, courseMaxScore, ageGroup }
        fetch("http://localhost:8080/course/courses/" + courseId, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(course1)
        }).then(() => {
            console.log("Course Updated Successfully!")
            setRefreshPage(true)
            handleClickEditSnackbar();
        })
        handleClose()
    }

    const headingStyle = {
        color: "blue",
        textAlign: "left",
        position: "relative",
        top: "-30px",
        fontFamily: "Fira Mono"

    };

    const refresh = () => {
        fetch("http://localhost:8080/course/courses/" + courseId.courseId).
            then(res => res.json()).then((result) => {
                setCourse(result);
            }
            );
    };

    return (
        <div>
            <Snackbar open={openDeleteSnackbar} autoHideDuration={5000} onClose={handleCloseDeleteSnackbar}>
                <Alert onClose={handleCloseDeleteSnackbar} severity="success" sx={{ width: '100%' }}>
                    Course Deleted Succesfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openEditSnackbar} autoHideDuration={5000} onClose={handleCloseEditSnackbar}>
                <Alert onClose={handleCloseEditSnackbar} severity="success" sx={{ width: '100%' }}>
                    Course Updated Succesfully!
                </Alert>
            </Snackbar>
            <Container>
                <Grid container spacing={0}>
                    <Grid item xs={2}>
                        <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
                    </Grid>
                    <Grid item xs={10}>
                        <CourseStatusAccordion course={course} refresh={refresh}></CourseStatusAccordion>
                        <br />
                        <CourseTags courseId={courseId}></CourseTags>
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

                        <Button
                            className="btn-upload"
                            color="primary"
                            variant="contained"
                            component="span"
                            onClick={event => handleClickOpen(event, course.courseCode, course.courseTitle, course.courseDescription, course.courseTimeline, course.courseMaxScore, course.ageGroup, course.courseApprovalStatus)}
                            style={{ float: 'right', marginLeft: 'auto', margin: '0px 6px', left: "150px" }}>
                            Update
                        </Button>
                        <Button
                            className="btn-upload"
                            color="primary"
                            variant="contained"
                            component="span"
                            onClick={event => handleClickDeleteDialogOpen(event, course.courseId)}
                            style={{ float: 'right', marginLeft: 'auto', margin: '0px 6px', left: "150px" }}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Update Course</DialogTitle>
                    <DialogContent>
                        <TextField id="outlined-basic" label="Course Code" variant="outlined" fullWidth
                            style={{ margin: '6px 0' }}
                            value={courseCode1}
                            onChange={(e) => setCourseCode1(e.target.value)} />


                        <TextField id="outlined-basic" label="Course Title" variant="outlined" fullWidth
                            style={{ margin: '6px 0' }}
                            value={courseTitle1}
                            onChange={(e) => setCourseTitle1(e.target.value)} />

                        <TextField id="outlined-multiline-static" label="Course Description" multiline rows={6} fullWidth defaultValue=""
                            style={{ margin: '6px 0' }}
                            value={courseDescription1}
                            onChange={(e) => setCourseDescription1(e.target.value.replace(/↵/g, "\n"))}
                        />

                        <TextField id="outlined-multiline-static" label="Course Timeline" multiline rows={6} fullWidth defaultValue=""
                            style={{ margin: '6px 0' }}
                            value={courseTimeline1}
                            onChange={(e) => setCourseTimeline1(e.target.value)}
                        />

                        <TextField id="outlined-basic" label="Course Max Score" variant="outlined" fullWidth
                            style={{ margin: '6px 0' }}
                            value={courseMaxScore1}
                            onChange={(e) => setCourseMaxScore1(e.target.value)} />

                        <TextField id="outlined-select-age" select label="Age Group" fullWidth
                            style={{ margin: '6px 0' }}
                            value={ageGroup1}
                            onChange={handleChange1}
                            helperText="Please select your age group"
                        >
                            {ageGroups.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClick}>Update</Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div>
                <Dialog
                    open={deleteDialogOpen}
                    onClose={handleDeleteDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete this Course"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This will delete all the content inside the course.
                            You will not be able to undo this action. Are you sure you want to delete?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                        <Button onClick={deleteCourse} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>);


}