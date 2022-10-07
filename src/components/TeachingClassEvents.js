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

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/ar-sa';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';


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

    const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);

    const handleClickErrorSnackbar = () => { setOpenErrorSnackbar(true) };

    const handleCloseErrorSnackbar = (event, reason) => {
        if (reason === "clickaway") { return }
        setOpenErrorSnackbar(false);
    };

    const auth = useAuth();
    const user = auth.user;

    var utc = require('dayjs/plugin/utc')
    var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
    dayjs.extend(utc)
    dayjs.extend(timezone)

    const [refreshPage, setRefreshPage] = useState("");

    //paths
    const location = useLocation();
    const classRunsPath = location.pathname.split("/").slice(0, 4).join("/");
    const classEventsPath = location.pathname.split("/").slice(0, 5).join("/");
    const classRunName = location.state.classRunName;
    var classRunNameDup = classRunName;

    const courseId = location.pathname.split("/")[2];

    const classRunId = location.pathname.split('/')[4];

    const [classEvents, setClassEvents] = useState([])

    let currentDate = new Date()
    const offset = currentDate.getTimezoneOffset();
    currentDate = new Date(currentDate.getTime() + (offset * 60 * 1000));

    const [newClassEventTitle, setNewClassEventTitle] = useState("");
    const [newClassEventDescription, setNewClassEventDescription] = useState("");
    const [newClassEventStartDateTime, setNewClassEventStartDateTime] = React.useState(dayjs(currentDate.toISOString().split('T')[0]));
    const [newClassEventEndDateTime, setNewClassEventEndDateTime] = React.useState(dayjs(currentDate.toISOString().split('T')[0]));

    const [newClassEventTitleError, setNewClassEventTitleError] = useState({ value: false, errorMessage: '' })
    const [newClassEventDescriptionError, setNewClassEventDescriptionError] = useState({ value: false, errorMessage: '' })
    const [newClassEventStartDateTimeError, setNewClassEventStartDateTimeError] = useState({ value: false, errorMessage: '' })
    const [newClassEventEndDateTimeError, setNewClassEventEndDateTimeError] = useState({ value: false, errorMessage: '' })

    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [classEventIdToDelete, setClassEventIdToDelete] = useState("");

    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [editClassEventId, setEditClassEventId] = useState("");
    const [editClassEventTitle, setEditClassEventTitle] = useState("");
    const [editClassEventDescription, setEditClassEventDescription] = useState("");
    const [editClassEventStartDateTime, setEditClassEventStartDateTime] = React.useState(dayjs(currentDate.toISOString().split('T')[0]));
    const [editClassEventEndDateTime, setEditClassEventEndDateTime] = React.useState(dayjs(currentDate.toISOString().split('T')[0]));

    const [editClassEventTitleError, setEditClassEventTitleError] = useState({ value: false, errorMessage: '' })
    const [editClassEventDescriptionError, setEditClassEventDescriptionError] = useState({ value: false, errorMessage: '' })
    const [editClassEventStartDateTimeError, setEditClassEventStartDateTimeError] = useState({ value: false, errorMessage: '' })
    const [editClassEventEndDateTimeError, setEditClassEventEndDateTimeError] = useState({ value: false, errorMessage: '' })

    React.useEffect(() => {
        setRefreshPage(false);
        fetch("http://localhost:8080/event/classRuns/" + classRunId + "/events/").
            then(res => res.json())
            .then((result) => {
                console.log(result)
                setClassEvents(result);
            });
    }, [refreshPage]);

    const [openAddClassEvent, setOpenAddClassEvent] = React.useState(false);

    const ageGroups = [{ value: 'Adults', }, { value: 'Kids', }];

    //add
    const handleClickOpenAddClassEvent = () => {
        setOpenAddClassEvent(true);
    };

    const handleCloseAddClassEvent = () => {
        setOpenAddClassEvent(false);
    };

    const handleClose = () => {
        setOpenAddClassEvent(false);
    };

    //edit
    const handleClickEditDialogOpen = (event, classEventId, classEventTitle, classEventNotes, classEventStartDateTime, classEventEndDateTime) => {
        setEditClassEventId(classEventId)
        setEditClassEventTitle(classEventTitle)
        setEditClassEventDescription(classEventNotes)
        setEditClassEventStartDateTime(dayjs(classEventStartDateTime).local().format())
        setEditClassEventEndDateTime(dayjs(classEventEndDateTime).local().format())
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };


    const handleClickDeleteDialogOpen = (event, classEventId) => {
        setClassEventIdToDelete(classEventId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const createNewClassEvent = async (e) => {
        setNewClassEventTitleError({ value: false, errorMessage: '' })
        setNewClassEventDescriptionError({ value: false, errorMessage: '' })
        setNewClassEventStartDateTimeError({ value: false, errorMessage: '' })
        setNewClassEventEndDateTimeError({ value: false, errorMessage: '' })
        if (newClassEventTitle == '') {
            setNewClassEventTitleError({ value: true, errorMessage: 'Event title cannot be empty!' })
        }
        if (newClassEventDescription == '') {
            setNewClassEventDescriptionError({ value: true, errorMessage: 'Event Description cannot be empty!' })
        }
        if (newClassEventStartDateTime == '') {
            setNewClassEventStartDateTimeError({ value: true, errorMessage: 'Event Start DateTime cannot be empty!' })
        }
        if (newClassEventEndDateTime == '') {
            setNewClassEventEndDateTimeError({ value: true, errorMessage: 'Event End DateTime cannot be empty!' })
        }
        if (dayjs(newClassEventStartDateTime).isValid() === false) {
            setNewClassEventStartDateTimeError({ value: true, errorMessage: 'Invalid Start DateTime!' })
        }
        if (dayjs(newClassEventEndDateTime).isValid() === false) {
            setNewClassEventEndDateTimeError({ value: true, errorMessage: 'Invalid End DateTime!' })
        }
        if (dayjs(newClassEventStartDateTime).isAfter(dayjs(newClassEventEndDateTime))) {
            setNewClassEventStartDateTimeError({ value: true, errorMessage: 'End DateTime cannot be earlier than Start DateTime!' })
            setNewClassEventEndDateTimeError({ value: true, errorMessage: 'End DateTime cannot be earlier than Start DateTime!' })
        }
        else if (newClassEventTitle && newClassEventDescription
            && dayjs(newClassEventStartDateTime).isValid() && dayjs(newClassEventEndDateTime).isValid()) {
            var title = newClassEventTitle;
            var notes = newClassEventDescription;
            var startDate = newClassEventStartDateTime;
            var endDate = newClassEventEndDateTime;
            var allDay = false;
            var newClassEvent = { title, notes, startDate, endDate, allDay };
            e.preventDefault();
            try {
                const response = await fetch("http://localhost:8080/event/classRun/" + classRunId + "/events/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newClassEvent)
                });
                console.log(response);
                if (response.ok == false) {
                    console.log("Error");
                    handleClickErrorSnackbar()
                } else {
                    console.log("New Class Event created Successfully!");
                    handleClickSnackbar()
                }
            } catch (err) {
                console.log(err);
                handleClickErrorSnackbar()
            }
            setRefreshPage(true)
            handleCloseAddClassEvent()
        }
    };

    const editClassEvent = async (e) => {
        setEditClassEventTitleError({ value: false, errorMessage: '' })
        setEditClassEventDescriptionError({ value: false, errorMessage: '' })
        setEditClassEventStartDateTimeError({ value: false, errorMessage: '' })
        setEditClassEventEndDateTimeError({ value: false, errorMessage: '' })
        if (editClassEventTitle == '') {
            setEditClassEventTitleError({ value: true, errorMessage: 'Event title cannot be empty!' })
        }
        if (editClassEventDescription == '') {
            setEditClassEventDescriptionError({ value: true, errorMessage: 'Event Description cannot be empty!' })
        }
        if (editClassEventStartDateTime == '') {
            setEditClassEventStartDateTimeError({ value: true, errorMessage: 'Event Start DateTime cannot be empty!' })
        }
        if (editClassEventEndDateTime == '') {
            setEditClassEventEndDateTimeError({ value: true, errorMessage: 'Event End DateTime cannot be empty!' })
        }
        if (dayjs(editClassEventStartDateTime).isValid() === false) {
            setEditClassEventStartDateTimeError({ value: true, errorMessage: 'Invalid Start DateTime!' })
        }
        if (dayjs(editClassEventEndDateTime).isValid() === false) {
            setEditClassEventEndDateTimeError({ value: true, errorMessage: 'Invalid End DateTime!' })
        }
        if (dayjs(editClassEventStartDateTime).isAfter(dayjs(editClassEventEndDateTime))) {
            setEditClassEventStartDateTimeError({ value: true, errorMessage: 'End DateTime cannot be earlier than Start DateTime!' })
            setEditClassEventEndDateTimeError({ value: true, errorMessage: 'End DateTime cannot be earlier than Start DateTime!' })
        }
        else if (editClassEventTitle && editClassEventDescription
            && dayjs(editClassEventStartDateTime).isValid() && dayjs(editClassEventEndDateTime).isValid()) {
            var title = editClassEventTitle;
            var notes = editClassEventDescription;
            var startDate = editClassEventStartDateTime;
            var endDate = editClassEventEndDateTime;
            var allDay = false;
            var editClassEvent = { title, notes, startDate, endDate, allDay };
            e.preventDefault();
            try {
                const response = await fetch("http://localhost:8080/event/events/" + editClassEventId, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editClassEvent)
                });
                console.log(response)
                if (response.ok == false) {
                    console.log("Error");
                    handleClickErrorSnackbar()
                } else {
                    console.log("Class Event edited Successfully!");
                    handleClickEditSnackbar()
                }
            } catch (err) {
                console.log(err);
                handleClickErrorSnackbar()
            }
            setRefreshPage(true)
            handleEditDialogClose();
        }
    };

    const deleteClassEvent = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/event/events/" + classEventIdToDelete, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }).then(() => {
            console.log("Class Event Deleted Successfully!");
            setRefreshPage(true);
            handleDeleteDialogClose();
        });
    };

    const renderEmptyRowMessage = () => {
        if (classEvents.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={12} style={{ textAlign: "center" }}>
                        There are currently no events in this classrun!
                    </TableCell>
                </TableRow>
            );
        }
    };

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
                            Class Event Created Succesfully!
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
                            Class Event Deleted Succesfully!
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
                            Class Event Updated Succesfully!
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        open={openErrorSnackbar}
                        autoHideDuration={5000}
                        onClose={handleCloseErrorSnackbar}
                    >
                        <Alert
                            onClose={handleCloseErrorSnackbar}
                            severity="error"
                            sx={{ width: "100%" }}
                        >
                            Error!
                        </Alert>
                    </Snackbar>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to={`${classRunsPath}`}
                            style={{ textDecoration: 'none', color: 'grey' }}>
                            <LinkMaterial underline="hover" color="inherit">
                                Classruns
                            </LinkMaterial>
                        </Link>
                        <Link to={`${classEventsPath}`}
                            state={{ classRunName: classRunNameDup }}
                            style={{ textDecoration: 'none', color: 'grey' }}>
                            <LinkMaterial underline="hover" color="inherit">
                                {classRunName}
                            </LinkMaterial>
                        </Link>
                    </Breadcrumbs>
                    <div style={{ justifyContent: "center" }}>
                        <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
                            List of Class Events
                        </h1>
                        <Button
                            className="btn-upload"
                            color="primary"
                            variant="contained"
                            component="span"
                            onClick={handleClickOpenAddClassEvent}
                            style={{ float: "right", marginLeft: "auto" }}
                        >
                            Create New Class Event
                        </Button>
                    </div>
                    <div style={{ padding: "5%" }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Event ID</TableCell>
                                        <TableCell align="right">Title</TableCell>
                                        <TableCell align="right">Description</TableCell>
                                        <TableCell align="right">Start Date</TableCell>
                                        <TableCell align="right">Start Time</TableCell>
                                        <TableCell align="right">End Date</TableCell>
                                        <TableCell align="right">End Time</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {renderEmptyRowMessage()}
                                    {classEvents.map((row) => (
                                        <TableRow
                                            key={row.classRunId}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="right">{row.title}</TableCell>
                                            <TableCell align="right">{row.notes}</TableCell>
                                            <TableCell align="right">{dayjs(row.startDate).local().format().substring(0, 10)}</TableCell>
                                            <TableCell align="right">{dayjs(row.startDate).local().format().substring(11, 16)}</TableCell>
                                            <TableCell align="right">{dayjs(row.endDate).local().format().substring(0, 10)}</TableCell>
                                            <TableCell align="right">{dayjs(row.endDate).local().format().substring(11, 16)}</TableCell>
                                            <TableCell align="right">
                                                <div>
                                                    <IconButton
                                                        aria-label="settings"
                                                        onClick={(event) => handleClickDeleteDialogOpen(event, row.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label="settings"
                                                        onClick={(event) =>
                                                            handleClickEditDialogOpen(event, row.id, row.title, row.notes, row.startDate, row.endDate)
                                                        }
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
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
                <Dialog open={openAddClassEvent} onClose={handleCloseAddClassEvent}>
                    <DialogTitle>Add Class Event</DialogTitle>
                    <DialogContent>
                        <TextField id="outlined-basic" label="Class Event Name" fullWidth defaultValue=""
                            style={{ margin: '6px 0' }}
                            value={newClassEventTitle}
                            onChange={(e) => setNewClassEventTitle(e.target.value)}
                            error={newClassEventTitleError.value}
                            helperText={newClassEventTitleError.errorMessage}
                            required
                        />

                        <TextField id="outlined-multiline-static" label="Class Event Description" multiline rows={6} fullWidth defaultValue=""
                            style={{ margin: '6px 0' }}
                            value={newClassEventDescription}
                            onChange={(e) => setNewClassEventDescription(e.target.value)}
                            error={newClassEventDescriptionError.value}
                            helperText={newClassEventDescriptionError.errorMessage}
                            required
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                            <Stack spacing={1} style={{ margin: '8px 0' }}>
                                <DateTimePicker
                                    value={newClassEventStartDateTime}
                                    onChange={(newValue) => setNewClassEventStartDateTime(newValue)}
                                    renderInput={(params) => <TextField {...params}
                                        error={newClassEventStartDateTimeError.value}
                                        helperText={newClassEventStartDateTimeError.errorMessage}
                                        required />}
                                    ampm={false}
                                    label="Event Start Date Time"
                                />
                                {/* <TimePicker
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                    renderInput={(params) => <TextField {...params} />}
                                    ampm={false}
                                /> */}
                            </Stack>
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                            <Stack spacing={1} style={{ margin: '12px 0' }}>
                                <DateTimePicker
                                    value={newClassEventEndDateTime}
                                    onChange={(newValue) => setNewClassEventEndDateTime(newValue)}
                                    renderInput={(params) => <TextField {...params}
                                        error={newClassEventEndDateTimeError.value}
                                        helperText={newClassEventEndDateTimeError.errorMessage}
                                        required />}
                                    ampm={false}
                                    label="Event End Date Time"
                                />
                            </Stack>
                        </LocalizationProvider>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={createNewClassEvent}>Create</Button>
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
                        {"Delete this class event?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You will not be able to undo this action. Are you sure you
                            want to delete?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                        <Button onClick={deleteClassEvent} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
                    <DialogTitle>Edit Class Event</DialogTitle>
                    <DialogContent>
                        <TextField id="outlined-basic" label="Class Event Name" fullWidth defaultValue=""
                            style={{ margin: '6px 0' }}
                            value={editClassEventTitle}
                            onChange={(e) => setEditClassEventTitle(e.target.value)}
                            error={editClassEventTitleError.value}
                            helperText={editClassEventTitleError.errorMessage}
                            required
                        />

                        <TextField id="outlined-multiline-static" label="Class Event Description" multiline rows={6} fullWidth defaultValue=""
                            style={{ margin: '6px 0' }}
                            value={editClassEventDescription}
                            onChange={(e) => setEditClassEventDescription(e.target.value)}
                            error={editClassEventDescriptionError.value}
                            helperText={editClassEventDescriptionError.errorMessage}
                            required
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                            <Stack spacing={1} style={{ margin: '8px 0' }}>
                                <DateTimePicker
                                    value={editClassEventStartDateTime}
                                    onChange={(newValue) => setEditClassEventStartDateTime(newValue)}
                                    renderInput={(params) => <TextField {...params}
                                        error={editClassEventStartDateTimeError.value}
                                        helperText={editClassEventStartDateTimeError.errorMessage}
                                        required />}
                                    ampm={false}
                                    label="Event Start Date Time"
                                />
                            </Stack>
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                            <Stack spacing={1} style={{ margin: '12px 0' }}>
                                <DateTimePicker
                                    value={editClassEventEndDateTime}
                                    onChange={(newValue) => setEditClassEventEndDateTime(newValue)}
                                    renderInput={(params) => <TextField {...params}
                                        error={editClassEventEndDateTimeError.value}
                                        helperText={editClassEventEndDateTimeError.errorMessage}
                                        required />}
                                    ampm={false}
                                    label="Event End Date Time"
                                />
                            </Stack>
                        </LocalizationProvider>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditDialogClose}>Cancel</Button>
                        <Button onClick={editClassEvent}>Edit</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default TeachingClassRuns;
