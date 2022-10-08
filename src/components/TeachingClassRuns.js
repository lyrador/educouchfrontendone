import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Link, useLocation, useParams } from "react-router-dom";
import TeachingCoursesDrawer from "./TeachingCoursesDrawer";
import { Grid } from "@mui/material";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import LinkMaterial from "@mui/material/Link";

import { Button } from "@mui/material";

import { useState } from "react";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

import { useAuth } from "../context/AuthProvider";
import { render } from "@testing-library/react";

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/ar-sa';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TeachingClassRuns(props) {
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleClickSnackbar = () => {
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };

    const [openDeleteSnackbar, setOpenDeleteSnackbar] = React.useState(false);

    const handleClickDeleteSnackbar = () => {
        setOpenDeleteSnackbar(true);
    };

    const handleCloseDeleteSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenDeleteSnackbar(false);
    };

    const [openEditSnackbar, setOpenEditSnackbar] = React.useState(false);

    const handleClickEditSnackbar = () => {
        setOpenEditSnackbar(true);
    };

    const handleCloseEditSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenEditSnackbar(false);
    };



    const auth = useAuth();
    const user = auth.user;

    const [refreshPage, setRefreshPage] = useState("");

    //paths
    const location = useLocation();
    const classRunsPath = location.pathname.split("/").slice(0, 4).join("/");

    const courseId = location.pathname.split("/")[2];
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

    const { mon, tue, wed, thu, fri, sat, sun } = state;
    const error = [mon, tue, wed, thu, fri, sat, sun].filter((v) => v).length < 1;

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
        // setClassRunDaysOfTheWeek(daysArray)
    };

    // const [forumTitleError, setForumTitleError] = useState({
    //     value: false,
    //     errorMessage: "",
    // });

    const [classRuns, setClassRuns] = useState([])
    const [classRunId, setClassRunId] = useState("");
    const [classRunStart, setClassRunStart] = useState("");
    const [classRunEnd, setClassRunEnd] = useState("");
    const [classRunStartTimeNonString, setClassRunStartTimeNonString] = useState("");
    const [classRunEndTimeNonString, setClassRunEndTimeNonString] = useState("");
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

    React.useEffect(() => {
        setRefreshPage(false);
        fetch("http://localhost:8080/classRun/getClassRunsFromCourseId/" + courseId).
            then(res => res.json())
            .then((result) => {
                console.log(result)
                setClassRuns(result);
            });
    }, [refreshPage]);

    // const [open, setOpen] = React.useState(false);

    const [openAddClassRun, setOpenAddClassRun] = React.useState(false);

    const ageGroups = [{ value: 'Adults', }, { value: 'Kids', }];

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

    const handleClickOpen = () => {
        setOpenAddClassRun(true);
    };

    const handleClose = () => {
        setOpenAddClassRun(false);
    };

    // const handleClickEditDialogOpen = (event, forumId, forumTitle) => {
    //     setEditForumTitle(forumTitle);
    //     setForumIdToEdit(forumId);
    //     setEditDialogOpen(true);
    // };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

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
        var classRunStartTime = classRunStartTimeNonString.format("HH:mm")
        var classRunEndTime = classRunEndTimeNonString.format("HH:mm")
        const newClassRun = {
            classRunName, classRunDescription, classRunDaysOfTheWeek,
            classRunStart, classRunEnd, classRunStartTime: classRunStartTime, classRunEndTime,
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

    const renderEmptyRowMessage = () => {
        if (classRuns.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={12} style={{ textAlign: "center" }}>
                        There are currently no classruns in this course!
                    </TableCell>
                </TableRow>
            );
        }
    };

    // const renderExtraActions = (
    //     forumId,
    //     forumTitle,
    //     createdByUserId,
    //     createdByUserType
    // ) => {
    //     if (
    //         createdByUserId === user.userId &&
    //         createdByUserType === user.userType
    //     ) {
    //         return (
    //             <div>
    //                 <IconButton
    //                     aria-label="settings"
    //                     onClick={(event) => handleClickDeleteDialogOpen(event, forumId)}
    //                 >
    //                     <DeleteIcon />
    //                 </IconButton>
    //                 <IconButton
    //                     aria-label="settings"
    //                     onClick={(event) =>
    //                         handleClickEditDialogOpen(event, forumId, forumTitle)
    //                     }
    //                 >
    //                     <EditIcon />
    //                 </IconButton>
    //             </div>
    //         );
    //     }
    // };

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={5000}
                        onClose={handleCloseSnackbar}
                    >
                        <Alert
                            onClose={handleCloseSnackbar}
                            severity="success"
                            sx={{ width: "100%" }}
                        >
                            Classrun Created Succesfully!
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        open={openDeleteSnackbar}
                        autoHideDuration={5000}
                        onClose={handleCloseDeleteSnackbar}
                    >
                        <Alert
                            onClose={handleCloseDeleteSnackbar}
                            severity="success"
                            sx={{ width: "100%" }}
                        >
                            Classrun Deleted Succesfully!
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        open={openEditSnackbar}
                        autoHideDuration={5000}
                        onClose={handleCloseEditSnackbar}
                    >
                        <Alert
                            onClose={handleCloseEditSnackbar}
                            severity="success"
                            sx={{ width: "100%" }}
                        >
                            Classrun Updated Succesfully!
                        </Alert>
                    </Snackbar>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to={`${classRunsPath}`}
                            style={{ textDecoration: 'none', color: 'grey' }}>
                            <LinkMaterial underline="hover" color="inherit">
                                Classruns
                            </LinkMaterial>
                        </Link>
                    </Breadcrumbs>
                    <div style={{ justifyContent: "center" }}>
                        <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
                            List of Class Runs
                        </h1>
                        <Button
                            className="btn-upload"
                            color="primary"
                            variant="contained"
                            component="span"
                            onClick={handleClickOpen}
                            style={{ float: "right", marginLeft: "auto" }}
                        >
                            Create New ClassRun
                        </Button>
                        {/* <Button
                            className="btn-upload"
                            color="primary"
                            variant="contained"
                            component="span"
                            onClick={event => handleClickOpenAddClassRun(event, course.courseId)}
                            style={{ float: 'right', marginLeft: 'auto', margin: '0px 6px', left: "150px" }}>
                            Add Class Run
                        </Button> */}
                    </div>
                    <div style={{ padding: "5%" }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
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
                                    {renderEmptyRowMessage()}
                                    {classRuns.map((row) => (
                                        <TableRow
                                            key={row.classRunId}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Link
                                                    to={`${classRunsPath}/${row.classRunId}`}
                                                    state={{ classRunName: row.classRunName }}
                                                    style={{ textDecoration: "none" }}
                                                >
                                                    {row.classRunId}
                                                </Link>
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
                                                    {/* <Button variant='contained' onClick={(event) => generateClassEventsForClassRun(event, row.classRunId)}>
                                                        Generate Events
                                                    </Button> */}
                                                </div>
                                            </TableCell>
                                            {/* <TableCell>
                                                <div>
                                                    {renderExtraActions(
                                                        forum.forumId,
                                                        forum.forumTitle,
                                                        forum.createdByUserId,
                                                        forum.createdByUserType
                                                    )}
                                                </div>
                                            </TableCell> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Grid>
            </Grid>
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
                        {/* <TextField id="outlined-basic" label="Start Time" variant="outlined" fullWidth
                            style={{ margin: '6px 0' }}
                            value={classRunStartTime}
                            onChange={(e) => setClassRunStartTime(e.target.value)}
                        />

                        <TextField id="outlined-basic" label="End Time" variant="outlined" fullWidth
                            style={{ margin: '6px 0' }}
                            value={classRunEndTime}
                            onChange={(e) => setClassRunEndTime(e.target.value)}
                        /> */}

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                            <Stack spacing={1} style={{ margin: '8px 0' }}>
                                <TimePicker
                                    value={classRunStartTimeNonString}
                                    onChange={(newValue) => setClassRunStartTimeNonString(newValue)}
                                    renderInput={(params) => <TextField {...params} />}
                                    ampm={false}
                                    label="Classrun Start Time"
                                />
                            </Stack>
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                            <Stack spacing={1} style={{ margin: '8px 0' }}>
                                <TimePicker
                                    value={classRunEndTimeNonString}
                                    onChange={(newValue) => setClassRunEndTimeNonString(newValue)}
                                    renderInput={(params) => <TextField {...params} />}
                                    ampm={false}
                                    label="Classrun End Time"
                                />
                            </Stack>
                        </LocalizationProvider>

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
        </div>
    );
}

export default TeachingClassRuns;
