import * as React from 'react';
import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import TeachingCoursesDrawer from '../components/TeachingCoursesDrawer';
import { Container, Paper, Box, Button, MenuItem, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
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

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';

export default function TeachingCourseClassRuns(props) {

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
                    <TableCell align="right">{row.classRunStartTime}</TableCell>
                    <TableCell align="right">{row.classRunEndTime}</TableCell>
                    <TableCell align="right">{row.minClassSize}</TableCell>
                    <TableCell align="right">{row.maximumCapacity}</TableCell>
                    <TableCell align="right">{row.classRunDaysOfTheWeek.toString()}</TableCell>
                    <TableCell align="right">{row.recurringEnumString}</TableCell>
                    <TableCell align="right">{row.instructorUsername}</TableCell>
                    <TableCell align="right">
                        <div>
                            <IconButton
                                aria-label="settings"
                                onClick={(event) => handleClickDeleteDialogOpen(event, row.classRunId)}
                            >
                                <DeleteIcon />
                            </IconButton>
                            {/* <IconButton
                                aria-label="settings"
                                onClick={(event) =>
                                    handleClickEditDialogOpen(event, forumId, forumTitle)
                                }
                            >
                                <EditIcon />
                            </IconButton> */}
                            <Button variant='contained' onClick={(event) => generateClassEventsForClassRun(event, row.classRunId)}>
                                Generate Events
                            </Button>
                        </div></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={13}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Class Events
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Event ID</TableCell>
                                            <TableCell align="right">Title</TableCell>
                                            <TableCell align="right">Description</TableCell>
                                            <TableCell align="right">Date</TableCell>
                                            <TableCell align="right">Start Time</TableCell>
                                            <TableCell align="right">End Time</TableCell>
                                            <TableCell align="right" width="700">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.classEvents.map((classEventRow) => (
                                            <TableRow key={classEventRow.date}>
                                                <TableCell component="th" scope="row">
                                                    {classEventRow.eventId}
                                                </TableCell>
                                                <TableCell align="right">{classEventRow.title}</TableCell>
                                                <TableCell align="right">{classEventRow.eventDescription}</TableCell>
                                                <TableCell align="right">{classEventRow.startDate.substring(0, 10)}</TableCell>
                                                <TableCell align="right">{classEventRow.startDate.substring(11, 16)}</TableCell>
                                                <TableCell align="right">{classEventRow.endDate.substring(11, 16)}</TableCell>
                                                <TableCell align="right">
                                                    <div>
                                                        <IconButton
                                                            aria-label="settings"
                                                            onClick={(event) => handleClickDeleteEventDialogOpen(event, classEventRow.eventId)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                        {/* <IconButton
                                                            aria-label="settings"
                                                            onClick={(event) => generateClassEventsForClassRun(event, row.classRunId)}
                                                        >
                                                            <DoneIcon />
                                                        </IconButton> */}
                                                        <IconButton
                                                            aria-label="settings"
                                                            onClick={(event) => deleteClassEvent(event, classEventRow.eventId)}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell>New Class Event</TableCell>
                                            <TableCell align="right">
                                                <TextField id="outlined-basic" label="Title" variant="outlined" fullWidth
                                                    style={{ margin: '6px 0' }}
                                                    value={classRunStartTime}
                                                    // inputProps={{style: {fontSize: 11}}}
                                                    // size="small"
                                                    sx={{ width: 100 }}
                                                    InputProps={{ sx: { height: '35px' }, style: { fontSize: 15 } }}
                                                    onChange={(e) => setClassRunStartTime(e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth
                                                    style={{ margin: '6px 0' }}
                                                    value={classRunStartTime}
                                                    // inputProps={{style: {fontSize: 11}}}
                                                    // size="small"
                                                    sx={{ width: 140 }}
                                                    InputProps={{ sx: { height: '35px' }, style: { fontSize: 15 } }}
                                                    onChange={(e) => setClassRunStartTime(e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField id="outlined-basic" label="Date" variant="outlined" fullWidth
                                                    style={{ margin: '6px 0' }}
                                                    value={classRunStartTime}
                                                    // inputProps={{style: {fontSize: 11}}}
                                                    // size="small"
                                                    sx={{ width: 100 }}
                                                    InputProps={{ sx: { height: '35px' }, style: { fontSize: 15 } }}
                                                    onChange={(e) => setClassRunStartTime(e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField id="outlined-basic" label="Start Time" variant="outlined" fullWidth
                                                    style={{ margin: '6px 0' }}
                                                    value={classRunStartTime}
                                                    // inputProps={{style: {fontSize: 11}}}
                                                    // size="small"
                                                    sx={{ width: 80 }}
                                                    InputProps={{ sx: { height: '35px' }, style: { fontSize: 15 } }}
                                                    onChange={(e) => setClassRunStartTime(e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField id="outlined-basic" label="End Time" variant="outlined" fullWidth
                                                    style={{ margin: '6px 0' }}
                                                    value={classRunStartTime}
                                                    sx={{ width: 80 }}
                                                    InputProps={{ sx: { height: '35px' }, style: { fontSize: 15 } }}
                                                    onChange={(e) => setClassRunStartTime(e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <div>
                                                    <IconButton
                                                        aria-label="settings"
                                                        onClick={(event) => handleClickDeleteDialogOpen(event, row.classRunId)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label="settings"
                                                        onClick={(event) => generateClassEventsForClassRun(event, row.classRunId)}
                                                    >
                                                        <DoneIcon />
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={13} style={{ textAlign: "center" }}>
                                                <Button variant='contained' onClick={(event) => generateClassEventsForClassRun(event, row.classRunId)}>
                                                    <AddIcon style={{fontSize: '16px'}}/>
                                                    Add New Class Event
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    // Row.propTypes = {
    //     row: PropTypes.shape({
    //         calories: PropTypes.number.isRequired,
    //         carbs: PropTypes.number.isRequired,
    //         fat: PropTypes.number.isRequired,
    //         history: PropTypes.arrayOf(
    //             PropTypes.shape({
    //                 amount: PropTypes.number.isRequired,
    //                 customerId: PropTypes.string.isRequired,
    //                 date: PropTypes.string.isRequired,
    //             }),
    //         ).isRequired,
    //         name: PropTypes.string.isRequired,
    //         price: PropTypes.number.isRequired,
    //         protein: PropTypes.number.isRequired,
    //     }).isRequired,
    // };

    const auth = useAuth();
    const user = auth.user;

    const [refreshPage, setRefreshPage] = useState('')

    const location = useLocation(props);
    const settingsPath = location.pathname.split('/').slice(0, 4).join('/')

    const courseId = location.pathname.split('/')[2];
    const [course, setCourse] = useState('')

    const [state, setState] = React.useState({
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
        // setClassRunDaysOfTheWeek(daysArray)
    };

    const { mon, tue, wed, thu, fri, sat, sun } = state;
    const error = [mon, tue, wed, thu, fri, sat, sun].filter((v) => v).length < 1;

    const [classRuns, setClassRuns] = useState([])
    const [classRunId, setClassRunId] = useState("");
    const [classRunStart, setClassRunStart] = useState("");
    const [classRunEnd, setClassRunEnd] = useState("");
    const [classRunStartTime, setClassRunStartTime] = useState("");
    const [classRunEndTime, setClassRunEndTime] = useState("");
    const [minClassSize, setMinClassSize] = useState("");
    const [maximumCapacity, setMaximumCapacity] = useState("");
    const [classRunDaysOfTheWeek, setClassRunDaysOfTheWeek] = useState([]);
    const [recurringEnumString, setRecurringEnumString] = useState("");
    const [calendarId, setCalendarId] = useState("");
    const [instructorUsername, setInstructorUsername] = useState("");
    const [classRunName, setClassRunName] = useState("");
    const [classRunDescription, setClassRunDescription] = useState("");

    const [newClassEventTitle, setNewClassEventTitle] = useState("");
    const [newClassEventDescription, setNewClassEventDescription] = useState("");
    const [newClassEventDate, setNewClassEventDate] = useState("");
    const [newClassEventStartTime, setNewClassEventStartTime] = useState("");
    const [newClassEventEndTime, setNewClassEventEndTime] = useState("");


    const [classRunIdToDelete, setClassRunIdToDelete] = useState("");
    const [classRunIdToGenerate, setClassRunIdToGenerate] = useState("");

    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);

    const handleClickDeleteDialogOpen = (event, classRunId) => {
        setClassRunIdToDelete(classRunId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const [deleteEventDialogOpen, setDeleteEventDialogOpen] = React.useState(false);
    const [classEventIdToDelete, setClassEventIdToDelete] = useState("");

    const handleClickDeleteEventDialogOpen = (event, classEventId) => {
        setClassEventIdToDelete(classEventId);
        setDeleteEventDialogOpen(true);
    };

    const handleDeleteEventDialogClose = () => {
        setDeleteEventDialogOpen(false);
    };

    // const handleClickEditDialogOpen = (event, forumId, forumTitle) => {
    //     setEditForumTitle(forumTitle);
    //     setForumIdToEdit(forumId);
    //     setEditDialogOpen(true);
    // };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    React.useEffect(() => {
        setRefreshPage(false);
        fetch("http://localhost:8080/classRun/getClassRunsFromCourseId/" + courseId).
            then(res => res.json())
            .then((result) => {
                console.log(result)
                setClassRuns(result);
            });
    }, [refreshPage]);

    const [openAddClassRun, setOpenAddClassRun] = React.useState(false);

    const handleClickOpenAddClassRun = (event, courseId) => {
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
        var daysArray = new Array()
        if (sun === true) { daysArray.push(0) }
        if (mon === true) { daysArray.push(1) }
        if (tue === true) { daysArray.push(2) }
        if (wed === true) { daysArray.push(3) }
        if (thu === true) { daysArray.push(4) }
        if (fri === true) { daysArray.push(5) }
        if (sat === true) { daysArray.push(6) }
        console.log(daysArray)
        var classRunDaysOfTheWeek = daysArray
        const newClassRun = {
            classRunName, classRunDescription, classRunDaysOfTheWeek,
            classRunStart, classRunEnd, classRunStartTime, classRunEndTime,
            calendarId, instructorUsername, recurringEnumString, minClassSize, maximumCapacity
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

    const deleteClassRun = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/classRun/delete/" + classRunIdToDelete, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }).then(() => {
            console.log("Class Run Deleted Successfully!");
            setRefreshPage(true);
            handleDeleteDialogClose();
        });
    };

    const generateClassEventsForClassRun = (e, classRunIdToGenerate) => {
        console.log("HELLO")
        console.log(classRunIdToGenerate)
        e.preventDefault();
        fetch("http://localhost:8080/classRun/generateClassEventsFromClassRunId/" + classRunIdToGenerate, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }).then(() => {
            console.log("Class Events Generated Successfully!");
            setRefreshPage(true);
        });
    };

    const createNewClassEvent = (e, classRunIdToGenerate) => {
        var title = newClassEventTitle;
        var eventDescription = newClassEventDescription;
        var startDate = newClassEventDate;
        var endDate = newClassEventDate;
        var endDate = newClassEventEndTime;
        e.preventDefault();
        fetch("http://localhost:8080/classRun/generateClassEventsFromClassRunId/" + classRunIdToGenerate, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }).then(() => {
            console.log("New Class Event created Successfully!");
            setRefreshPage(true);
        });
    };

    const headingStyle = {
        color: "blue",
        textAlign: "left",
        position: "relative",
        top: "-30px",
        fontFamily: "Fira Mono"

    };

    const deleteClassEvent = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/classRun/classEvents/delete/" + classEventIdToDelete, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }).then(() => {
            console.log("Class Event Deleted Successfully!");
            setRefreshPage(true);
            handleDeleteEventDialogClose();
        });
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
                                                <TableCell align="right">Start Time</TableCell>
                                                <TableCell align="right">End Time</TableCell>
                                                <TableCell align="right">Min Size</TableCell>
                                                <TableCell align="right">Max Size</TableCell>
                                                <TableCell align="right">Days of the Week</TableCell>
                                                <TableCell align="right">Recurring Enum</TableCell>
                                                <TableCell align="right">Instructor Username</TableCell>
                                                <TableCell align="right">Actions</TableCell>
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
                            onChange={(e) => setClassRunStart(e.target.value)}
                        />

                        <TextField id="outlined-basic" label="End Date" variant="outlined" fullWidth
                            style={{ margin: '6px 0' }}
                            value={classRunEnd}
                            onChange={(e) => setClassRunEnd(e.target.value)}
                        />
                        <div>
                            <Paper variant="outlined">
                                <div style={{ padding: '15px' }}>
                                    <FormLabel component="legend" style={{ paddingBottom: '5px' }}>Class Days of the Week</FormLabel>
                                    <FormControl
                                        required
                                        error={error}
                                        component="fieldset"
                                        sx={{ m: 0 }}
                                        variant="standard"
                                    >
                                        {/* <FormLabel component="legend">Pick at least one</FormLabel> */}
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={mon} onChange={handleChange} name="mon" />
                                                }
                                                label="Mon"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={tue} onChange={handleChange} name="tue" />
                                                }
                                                label="Tue"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={wed} onChange={handleChange} name="wed" />
                                                }
                                                label="Wed"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={thu} onChange={handleChange} name="thu" />
                                                }
                                                label="Thu"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={fri} onChange={handleChange} name="fri" />
                                                }
                                                label="Fri"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={sat} onChange={handleChange} name="sat" />
                                                }
                                                label="Sat"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={sun} onChange={handleChange} name="sun" />
                                                }
                                                label="Sun"
                                            />
                                        </FormGroup>
                                        <FormHelperText>Pick at least one day*</FormHelperText>
                                    </FormControl>
                                </div>
                            </Paper>
                        </div>
                        <TextField id="outlined-basic" label="Start Time" variant="outlined" fullWidth
                            style={{ margin: '6px 0' }}
                            value={classRunStartTime}
                            onChange={(e) => setClassRunStartTime(e.target.value)}
                        />

                        <TextField id="outlined-basic" label="End Time" variant="outlined" fullWidth
                            style={{ margin: '6px 0' }}
                            value={classRunEndTime}
                            onChange={(e) => setClassRunEndTime(e.target.value)}
                        />

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
            <div>
                <Dialog
                    open={deleteDialogOpen}
                    onClose={handleDeleteDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete this class run?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            These will delete all the class events inside the
                            class run. You will not be able to undo this action. Are you sure you
                            want to delete?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                        <Button onClick={deleteClassRun} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            {/* <div>
                <Dialog
                    open={editDialogOpen}
                    onClose={handleEditDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"You are editing this forum"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Enter the new forum details
                        </DialogContentText>
                        <TextField
                            id="outlined-basic"
                            label="Discussion Title"
                            variant="outlined"
                            fullWidth
                            style={{ margin: "6px 0" }}
                            value={editForumTitle}
                            onChange={(e) => setEditForumTitle(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditDialogClose}>Cancel</Button>
                        <Button onClick={editForum} autoFocus>
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div> */}
            <div>
                <Dialog
                    open={deleteEventDialogOpen}
                    onClose={handleDeleteEventDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete this class event?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You cannot undo this action. Confirm delete?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteEventDialogClose}>Cancel</Button>
                        <Button onClick={deleteClassEvent} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>);


}