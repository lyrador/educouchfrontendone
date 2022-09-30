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
import { useAuth } from "../context/AuthProvider";

import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function TeachingCourseClassRuns(props) {

    function createData(name, calories, fat, carbs, protein, price) {
        return {
            name,
            calories,
            fat,
            carbs,
            protein,
            price,
            history: [
                {
                    date: '2020-01-05',
                    customerId: '11091700',
                    amount: 3,
                },
                {
                    date: '2020-01-02',
                    customerId: 'Anonymous',
                    amount: 1,
                },
            ],
        };
    }

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.classRunId}
                    </TableCell>
                    <TableCell align="right">{row.classRunName}</TableCell>
                    <TableCell align="right">{row.classRunDescription}</TableCell>
                    <TableCell align="right">{row.classRunStart}</TableCell>
                    <TableCell align="right">{row.classRunEnd}</TableCell>
                    <TableCell align="right">{row.minClassSize}</TableCell>
                    <TableCell align="right">{row.maximumCapacity}</TableCell>
                    <TableCell align="right">{row.classRunDaysOfTheWeek.toString()}</TableCell>
                    <TableCell align="right">{row.recurringEnumString}</TableCell>
                    <TableCell align="right">{row.instructorUsername}</TableCell>
                </TableRow>
                {/* <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Class Events
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Start Time</TableCell>
                                            <TableCell>End Time</TableCell>
                                            <TableCell>Customer</TableCell>
                                            <TableCell align="right">Amount</TableCell
                                            <TableCell align="right">Total price ($)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.history.map((historyRow) => (
                                            <TableRow key={historyRow.date}>
                                                <TableCell component="th" scope="row">
                                                    {historyRow.date}
                                                </TableCell>
                                                <TableCell>{historyRow.customerId}</TableCell>
                                                <TableCell align="right">{historyRow.amount}</TableCell>
                                                <TableCell align="right">
                                                    {Math.round(historyRow.amount * row.price * 100) / 100}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow> */}
            </React.Fragment>
        );
    }

    Row.propTypes = {
        row: PropTypes.shape({
            calories: PropTypes.number.isRequired,
            carbs: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            history: PropTypes.arrayOf(
                PropTypes.shape({
                    amount: PropTypes.number.isRequired,
                    customerId: PropTypes.string.isRequired,
                    date: PropTypes.string.isRequired,
                }),
            ).isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            protein: PropTypes.number.isRequired,
        }).isRequired,
    };

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    ];

    const auth = useAuth();
    const user = auth.user;

    const [refreshPage, setRefreshPage] = useState('')

    const location = useLocation(props);
    const settingsPath = location.pathname.split('/').slice(0, 4).join('/')

    const courseId = location.pathname.split('/')[2];
    const [course, setCourse] = useState('')

    const [classRuns, setClassRuns] = useState([])
    const [classRunId, setClassRunId] = useState("");
    const [classRunStart, setClassRunStart] = useState("");
    const [classRunEnd, setClassRunEnd] = useState("");
    const [minClassSize, setMinClassSize] = useState("");
    const [maximumCapacity, setMaximumCapacity] = useState("");
    const [classRunDaysOfTheWeek, setClassRunDaysOfTheWeek] = useState([]);
    const [recurringEnumString, setRecurringEnumString] = useState("");
    const [calendarId, setCalendarId] = useState("");
    const [instructorUsername, setInstructorUsername] = useState("");
    const [classRunName, setClassRunName] = useState("");
    const [classRunDescription, setClassRunDescription] = useState("");

    React.useEffect(() => {
        setRefreshPage(false);
        fetch("http://localhost:8080/classRun/getClassRunsFromCourseId/" + courseId).
            then(res => res.json())
            .then((result) => {
                console.log(result)
                // console.log(result.instructor.username)
                setClassRuns(result);
            });
    }, [refreshPage]);

    // const paperStyle = {
    //     padding: '30px 10px',
    //     width: 1000,
    //     margin: "10px auto",
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // }

    const [openAddClassRun, setOpenAddClassRun] = React.useState(false);

    const handleClickOpenAddClassRun = (event, courseCode, courseTitle, courseDescription, courseTimeline, courseMaxScore, ageGroup) => {
        // setCourseCode1(courseCode);
        // setCourseTitle1(courseTitle)
        // setCourseDescription1(courseDescription)
        // setCourseTimeline1(courseTimeline)
        // setCourseMaxScore1(courseMaxScore)
        // setAgeGroup1(ageGroup)
        setOpenAddClassRun(true);
    };

    const handleCloseAddClassRun = () => {
        setOpenAddClassRun(false);
    };


    // const deleteCourse = (e) => {
    //     e.preventDefault()
    //     fetch("http://localhost:8080/course/courses/" + courseIdToDelete, {
    //         method: "DELETE",
    //         headers: { "Content-Type": "application/json" },
    //     }).then(() => {
    //         console.log("Course Deleted Successfully!")
    //         window.location.reload();
    //         setRefreshPage(true)
    //         handleDeleteDialogClose()
    //         handleClickDeleteSnackbar()
    //     })
    // }

    const ageGroups = [{ value: 'Adults', }, { value: 'Kids', }];


    // const handleChange1 = (event) => {
    //     setAgeGroup1(event.target.value);
    // };

    // const handleClick = (e) => {
    //     e.preventDefault()
    //     var courseCode = courseCode1
    //     var courseTitle = courseTitle1
    //     var courseDescription = courseDescription1
    //     var courseTimeline = courseTimeline1
    //     var courseMaxScore = courseMaxScore1
    //     var ageGroup = ageGroup1

    //     const course1 = { courseCode, courseTitle, courseDescription, courseTimeline, courseMaxScore, ageGroup }
    //     fetch("http://localhost:8080/course/courses/" + courseId, {
    //         method: "PUT",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(course1)
    //     }).then(() => {
    //         console.log("Course Updated Successfully!")
    //         setRefreshPage(true)
    //     })
    //     handleClose()
    // }

    const createClassRun = (e) => {
        e.preventDefault()
        var days = [0, 2];
        setClassRunDaysOfTheWeek(days)
        const newClassRun = {
            classRunName, classRunDescription, classRunDaysOfTheWeek,
            classRunStart, classRunEnd, calendarId, instructorUsername, recurringEnumString, minClassSize, maximumCapacity
        }
        fetch("http://localhost:8080/classRun/addToCourseId/" + courseId, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newClassRun)
        }).then(() => {
            console.log("Course Updated Successfully!")
            setRefreshPage(true)
        })
        handleCloseAddClassRun()
    }

    const headingStyle = {
        color: "blue",
        textAlign: "left",
        position: "relative",
        top: "-30px",
        fontFamily: "Fira Mono"

    };

    return (
        <div>
            <Container>
                <Grid container spacing={0}>
                    <Grid item xs={1}>
                        <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
                    </Grid>
                    <Grid item xs={10}>
                        <div style={{ width: "100%", padding: "0 0 0 0", margin: "0 0 0 0", maxWidth: "1920px" }}>
                            <h1 style={headingStyle}> Class Runs</h1>
                            <div>
                                <TableContainer component={Paper} style={{ width: "1150px" }}>
                                    <Table aria-label="collapsible table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell />
                                                <TableCell>Class ID</TableCell>
                                                <TableCell align="right">ClassRun Name</TableCell>
                                                <TableCell align="right">Description</TableCell>
                                                <TableCell align="right">Start Date</TableCell>
                                                <TableCell align="right">End Date</TableCell>
                                                <TableCell align="right">Min Size</TableCell>
                                                <TableCell align="right">Max Size</TableCell>
                                                <TableCell align="right">Days of the Week</TableCell>
                                                <TableCell align="right">Recurring Enum</TableCell>
                                                <TableCell align="right">Instructor Username</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {classRuns.map((row) => (
                                                <Row key={row.name} row={row} />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>

                        <div>
                            <Button
                                className="btn-upload"
                                color="primary"
                                variant="contained"
                                component="span"
                                onClick={event => handleClickOpenAddClassRun(event, course.courseId)}
                                style={{ float: 'right', marginLeft: 'auto', margin: '0px 6px', left: "150px" }}>
                                Add Class Run
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Container>
            <div>
                <Dialog open={openAddClassRun} onClose={handleCloseAddClassRun}>
                    <DialogTitle>Add Class Run</DialogTitle>
                    <DialogContent>
                        <TextField id="outlined-basic" label="ClassRun Name" fullWidth defaultValue=""
                            style={{ margin: '6px 0' }}
                            value={classRunName}
                            onChange={(e) => setClassRunName(e.target.value)}
                        />

                        <TextField id="outlined-multiline-static" label="ClassRun Description" multiline rows={6} fullWidth defaultValue=""
                            style={{ margin: '6px 0' }}
                            value={classRunDescription}
                            onChange={(e) => setClassRunDescription(e.target.value)}
                        />

                        <TextField id="outlined-basic" label="Start Date" variant="outlined" fullWidth
                            style={{ margin: '6px 0' }}
                            value={classRunStart}
                            onChange={(e) => setClassRunStart(e.target.value)} />


                        <TextField id="outlined-basic" label="End Date" variant="outlined" fullWidth
                            style={{ margin: '6px 0' }}
                            value={classRunEnd}
                            onChange={(e) => setClassRunEnd(e.target.value)} />

                        <TextField id="outlined-basic" label="Min Size" fullWidth defaultValue=""
                            style={{ margin: '6px 0' }}
                            value={minClassSize}
                            onChange={(e) => setMinClassSize(e.target.value)}
                        />

                        <TextField id="outlined-basic" label="Max Size" fullWidth defaultValue=""
                            style={{ margin: '6px 0' }}
                            value={maximumCapacity}
                            onChange={(e) => setMaximumCapacity(e.target.value)}
                        />

                        <TextField id="outlined-basic" label="Recurring Enum" variant="outlined" fullWidth
                            style={{ margin: '6px 0' }}
                            value={recurringEnumString}
                            onChange={(e) => setRecurringEnumString(e.target.value)} />

                        <TextField id="outlined-basic" label="Instructor Username" fullWidth defaultValue=""
                            style={{ margin: '6px 0' }}
                            value={instructorUsername}
                            onChange={(e) => setInstructorUsername(e.target.value)}
                        />
                        {/* 
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
                        </TextField> */}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAddClassRun}>Cancel</Button>
                        <Button onClick={createClassRun}>Create</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>);


}