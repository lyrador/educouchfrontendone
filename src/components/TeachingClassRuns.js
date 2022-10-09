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
import { Grid, MenuItem } from "@mui/material";

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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { HexColorPicker, HexColorInput } from "react-colorful";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TeachingClassRuns(props) {
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleClickSnackbar = () => { setOpenSnackbar(true) };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") { return }
        setOpenSnackbar(false);
    };

    const [openDeleteSnackbar, setOpenDeleteSnackbar] = React.useState(false);

    const handleClickDeleteSnackbar = () => { setOpenDeleteSnackbar(true) };

    const handleCloseDeleteSnackbar = (event, reason) => {
        if (reason === "clickaway") { return }
        setOpenDeleteSnackbar(false);
    };

    const [openEditSnackbar, setOpenEditSnackbar] = React.useState(false);

    const handleClickEditSnackbar = () => { setOpenEditSnackbar(true) };

    const handleCloseEditSnackbar = (event, reason) => {
        if (reason === "clickaway") { return }
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

    const [refreshPage, setRefreshPage] = useState("");

    //paths
    const location = useLocation();
    const classRunsPath = location.pathname.split("/").slice(0, 4).join("/");

    const courseId = location.pathname.split("/")[2];
    const [course, setCourse] = useState('')

    const [state, setState] = React.useState({
        mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false
    });

    const { mon, tue, wed, thu, fri, sat, sun } = state;
    // const error = [mon, tue, wed, thu, fri, sat, sun].filter((v) => v).length < 1;

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
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

    const [classRuns, setClassRuns] = useState([])
    const [classRunStartDateNonString, setClassRunStartDateNonString] = useState("");
    const [classRunEndDateNonString, setClassRunEndDateNonString] = useState("");
    const [classRunStartTimeNonString, setClassRunStartTimeNonString] = useState("");
    const [classRunEndTimeNonString, setClassRunEndTimeNonString] = useState("");
    const [minClassSize, setMinClassSize] = useState("");
    const [maximumCapacity, setMaximumCapacity] = useState("");
    const [recurringEnumString, setRecurringEnumString] = useState("");
    const [calendarId, setCalendarId] = useState("");
    const [instructorUsername, setInstructorUsername] = useState("");
    const [classRunName, setClassRunName] = useState("");
    const [classRunDescription, setClassRunDescription] = useState("");
    // const [classRunColor, setClassRunColor] = useState("#aabbcc");

    const [classRunStartDateNonStringError, setClassRunStartDateNonStringError] = useState({ value: false, errorMessage: '' })
    const [classRunEndDateNonStringError, setClassRunEndDateNonStringError] = useState({ value: false, errorMessage: '' })
    const [classRunStartTimeNonStringError, setClassRunStartTimeNonStringError] = useState({ value: false, errorMessage: '' })
    const [classRunEndTimeNonStringError, setClassRunEndTimeNonStringError] = useState({ value: false, errorMessage: '' })
    const [minClassSizeError, setMinClassSizeError] = useState({ value: false, errorMessage: '' })
    const [maximumCapacityError, setMaximumCapacityError] = useState({ value: false, errorMessage: '' })
    const [recurringEnumStringError, setRecurringEnumStringError] = useState({ value: false, errorMessage: '' })
    const [calendarIdError, setCalendarIdError] = useState({ value: false, errorMessage: '' })
    const [instructorUsernameError, setInstructorUsernameError] = useState({ value: false, errorMessage: '' })
    const [classRunNameError, setClassRunNameError] = useState({ value: false, errorMessage: '' })
    const [classRunDescriptionError, setClassRunDescriptionError] = useState({ value: false, errorMessage: '' })

    //add
    const [openAddClassRun, setOpenAddClassRun] = React.useState(false);

    const recurringEnums = [{ value: 'WEEKLY', }, { value: 'ALTERNATE', }, { value: 'CUSTOM', }];

    const handleChangeRecurringEnumString = (event) => {
        setRecurringEnumString(event.target.value);
    };

    const handleClickOpenAddClassRun = () => {
        setOpenAddClassRun(true);
    };

    const handleCloseAddClassRun = () => {
        setOpenAddClassRun(false);
    };

    //delete
    const [classRunIdToDelete, setClassRunIdToDelete] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    const handleClickDeleteDialogOpen = (event, classRunId) => {
        console.log(classRunId)
        setClassRunIdToDelete(classRunId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    //edit
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [confirmEditDialogOpen, setConfirmEditDialogOpen] = React.useState(false);

    const handleConfirmEditDialogOpen = () => {
        setEditClassRunStartDateNonStringError({ value: false, errorMessage: '' })
        setEditClassRunEndDateNonStringError({ value: false, errorMessage: '' })
        setEditClassRunStartTimeNonStringError({ value: false, errorMessage: '' })
        setEditClassRunEndTimeNonStringError({ value: false, errorMessage: '' })
        setEditMinClassSizeError({ value: false, errorMessage: '' })
        setEditMaximumCapacityError({ value: false, errorMessage: '' })
        setEditRecurringEnumStringError({ value: false, errorMessage: '' })
        setEditInstructorUsernameError({ value: false, errorMessage: '' })
        setEditClassRunNameError({ value: false, errorMessage: '' })
        setEditClassRunDescriptionError({ value: false, errorMessage: '' })
        if (editClassRunStartDateNonString == '') {
            setEditClassRunStartDateNonStringError({ value: true, errorMessage: 'Start Date cannot be empty!' })
        }
        if (editClassRunEndDateNonString == '') {
            setEditClassRunEndDateNonStringError({ value: true, errorMessage: 'End Date cannot be empty!' })
        }
        if (editClassRunStartTimeNonString == '') {
            setEditClassRunStartTimeNonStringError({ value: true, errorMessage: 'Start Time cannot be empty!' })
        }
        if (editClassRunEndTimeNonString == '') {
            setEditClassRunEndTimeNonStringError({ value: true, errorMessage: 'End Time cannot be empty!' })
        }
        if (editMinClassSize == '') {
            setEditMinClassSizeError({ value: true, errorMessage: 'Min Size cannot be empty!' })
        }
        if (editMinClassSize < 0) {
            setEditMinClassSizeError({ value: true, errorMessage: 'Min Size cannot be a negative number!' })
        }
        if (editMaximumCapacity == '') {
            setEditMaximumCapacityError({ value: true, errorMessage: 'Max Capacity cannot be empty!' })
        }
        if (editMaximumCapacity < 0) {
            setEditMaximumCapacityError({ value: true, errorMessage: 'Max Capacity cannot be a negative number!' })
        }
        if (editRecurringEnumString == '') {
            setEditRecurringEnumStringError({ value: true, errorMessage: 'Recurring Frequency cannot be empty!' })
        }
        if (editInstructorUsername == '') {
            setEditInstructorUsernameError({ value: true, errorMessage: 'Instructor Username cannot be empty!' })
        }
        if (editClassRunName == '') {
            setEditClassRunNameError({ value: true, errorMessage: 'Classrun Name cannot be empty!' })
        }
        if (editClassRunDescription == '') {
            setEditClassRunDescriptionError({ value: true, errorMessage: 'Classrun Description cannot be empty!' })
        }

        if (dayjs(editClassRunStartDateNonString).isValid() === false) {
            setEditClassRunStartDateNonStringError({ value: true, errorMessage: 'Invalid Start Date!' })
        }
        if (dayjs(editClassRunEndDateNonString).isValid() === false) {
            setEditClassRunEndDateNonStringError({ value: true, errorMessage: 'Invalid End Date!' })
        }
        if (dayjs(editClassRunStartTimeNonString).isValid() === false) {
            setEditClassRunStartTimeNonStringError({ value: true, errorMessage: 'Invalid Start Time!' })
        }
        if (dayjs(editClassRunEndTimeNonString).isValid() === false) {
            setEditClassRunEndTimeNonStringError({ value: true, errorMessage: 'Invalid End Time!' })
        }
        if (dayjs(editClassRunStartDateNonString).isAfter(dayjs(editClassRunEndDateNonString))) {
            setEditClassRunStartDateNonStringError({ value: true, errorMessage: 'End Date cannot be earlier than Start Date!' })
            setEditClassRunEndDateNonStringError({ value: true, errorMessage: 'End Date cannot be earlier than Start Date!' })
        }
        else if (dayjs(editClassRunStartDateNonString).isSame(dayjs(editClassRunEndDateNonString)) && dayjs(editClassRunStartTimeNonString).isAfter(dayjs(editClassRunEndTimeNonString))) {
            setEditClassRunStartTimeNonStringError({ value: true, errorMessage: 'End Time cannot be earlier than Start Time!' })
            setEditClassRunEndTimeNonStringError({ value: true, errorMessage: 'End Time cannot be earlier than Start Time!' })
        }
        else if (editClassRunStartDateNonString && editClassRunEndDateNonString && editClassRunStartTimeNonString && editClassRunEndTimeNonString
            && editMinClassSize && editMaximumCapacity && editRecurringEnumString && editInstructorUsername && editClassRunName && editClassRunDescription
            && editMinClassSize >= 0 && editMaximumCapacity >= 0 && dayjs(editClassRunStartDateNonString).isValid() && dayjs(editClassRunEndDateNonString).isValid()
            && dayjs(editClassRunStartTimeNonString).isValid() && dayjs(editClassRunEndTimeNonString).isValid()) {
                setConfirmEditDialogOpen(true);
        }
    };

    const handleConfirmEditDialogClose = () => {
        setConfirmEditDialogOpen(false);
    };

    const [editClassRunId, setEditClassRunId] = useState("");
    const [editClassRunStartDateNonString, setEditClassRunStartDateNonString] = useState("");
    const [editClassRunEndDateNonString, setEditClassRunEndDateNonString] = useState("");
    const [editClassRunStartTimeNonString, setEditClassRunStartTimeNonString] = useState("");
    const [editClassRunEndTimeNonString, setEditClassRunEndTimeNonString] = useState("");
    const [editMinClassSize, setEditMinClassSize] = useState("");
    const [editMaximumCapacity, setEditMaximumCapacity] = useState("");
    const [editClassRunDaysOfTheWeek, setEditClassRunDaysOfTheWeek] = useState([]);
    const [editRecurringEnumString, setEditRecurringEnumString] = useState("");
    const [editCalendarId, setEditCalendarId] = useState("");
    const [editInstructorUsername, setEditInstructorUsername] = useState("");
    const [editClassRunName, setEditClassRunName] = useState("");
    const [editClassRunDescription, setEditClassRunDescription] = useState("");

    const [editClassRunStartDateNonStringError, setEditClassRunStartDateNonStringError] = useState({ value: false, errorMessage: '' })
    const [editClassRunEndDateNonStringError, setEditClassRunEndDateNonStringError] = useState({ value: false, errorMessage: '' })
    const [editClassRunStartTimeNonStringError, setEditClassRunStartTimeNonStringError] = useState({ value: false, errorMessage: '' })
    const [editClassRunEndTimeNonStringError, setEditClassRunEndTimeNonStringError] = useState({ value: false, errorMessage: '' })
    const [editMinClassSizeError, setEditMinClassSizeError] = useState({ value: false, errorMessage: '' })
    const [editMaximumCapacityError, setEditMaximumCapacityError] = useState({ value: false, errorMessage: '' })
    const [editRecurringEnumStringError, setEditRecurringEnumStringError] = useState({ value: false, errorMessage: '' })
    const [editCalendarIdError, setEditCalendarIdError] = useState({ value: false, errorMessage: '' })
    const [editInstructorUsernameError, setEditInstructorUsernameError] = useState({ value: false, errorMessage: '' })
    const [editClassRunNameError, setEditClassRunNameError] = useState({ value: false, errorMessage: '' })
    const [editClassRunDescriptionError, setEditClassRunDescriptionError] = useState({ value: false, errorMessage: '' })

    const [editMon, setEditMon] = React.useState(false);
    const [editTue, setEditTue] = React.useState(false);
    const [editWed, setEditWed] = React.useState(false);
    const [editThu, setEditThu] = React.useState(false);
    const [editFri, setEditFri] = React.useState(false);
    const [editSat, setEditSat] = React.useState(false);
    const [editSun, setEditSun] = React.useState(false);

    const handleChangeEditRecurringEnumString = (event) => {
        setEditRecurringEnumString(event.target.value);
    };

    const handleChangeEditMon = (event) => {
        if (editMon === true) { setEditMon(false) } else { setEditMon(true) }
    };

    const handleChangeEditTue = (event) => {
        if (editTue === true) { setEditTue(false) } else { setEditTue(true) }
    };

    const handleChangeEditWed = (event) => {
        if (editWed === true) { setEditWed(false) } else { setEditWed(true) }
    };

    const handleChangeEditThu = (event) => {
        if (editThu === true) { setEditThu(false) } else { setEditThu(true) }
    };

    const handleChangeEditFri = (event) => {
        if (editFri === true) { setEditFri(false) } else { setEditFri(true) }
    };

    const handleChangeEditSat = (event) => {
        if (editSat === true) { setEditSat(false) } else { setEditSat(true) }
    };

    const handleChangeEditSun = (event) => {
        if (editSun === true) { setEditSun(false) } else { setEditSun(true) }
    };

    const editError = [editMon, editTue, editWed, editThu, editFri, editSat, editSun].filter((v) => v).length < 1;

    const handleClickEditDialogOpen = (event, classRunId, classRunName, classRunDescription, classRunStart, classRunEnd, classRunStartTime,
        classRunEndTime, minClassSize, maximumCapacity, classRunDaysOfTheWeek, recurringEnumString, instructorUsername) => {
        setEditClassRunId(classRunId)
        setEditClassRunStartDateNonString(classRunStart)
        setEditClassRunEndDateNonString(classRunEnd)
        var fullStartDateTimeString = classRunStart + " " + classRunStartTime + ":00"
        setEditClassRunStartTimeNonString(dayjs(fullStartDateTimeString))
        var fullEndDateTimeString = classRunEnd + " " + classRunEndTime + ":00"
        setEditClassRunEndTimeNonString(dayjs(fullEndDateTimeString))
        setEditMinClassSize(minClassSize)
        setEditMaximumCapacity(maximumCapacity)
        setEditClassRunDaysOfTheWeek(classRunDaysOfTheWeek)
        for (var i = 0; i < classRunDaysOfTheWeek.length; i++) {
            if (classRunDaysOfTheWeek[i] === 0) { setEditSun(true) }
            if (classRunDaysOfTheWeek[i] === 1) { setEditMon(true) }
            if (classRunDaysOfTheWeek[i] === 2) { setEditTue(true) }
            if (classRunDaysOfTheWeek[i] === 3) { setEditWed(true) }
            if (classRunDaysOfTheWeek[i] === 4) { setEditThu(true) }
            if (classRunDaysOfTheWeek[i] === 5) { setEditFri(true) }
            if (classRunDaysOfTheWeek[i] === 6) { setEditSat(true) }
        }
        console.log(classRunDaysOfTheWeek)
        setEditRecurringEnumString(recurringEnumString)
        setEditInstructorUsername(instructorUsername)
        setEditClassRunName(classRunName)
        setEditClassRunDescription(classRunDescription)
        
        setEditClassRunStartDateNonStringError({ value: false, errorMessage: '' })
        setEditClassRunEndDateNonStringError({ value: false, errorMessage: '' })
        setEditClassRunStartTimeNonStringError({ value: false, errorMessage: '' })
        setEditClassRunEndTimeNonStringError({ value: false, errorMessage: '' })
        setEditMinClassSizeError({ value: false, errorMessage: '' })
        setEditMaximumCapacityError({ value: false, errorMessage: '' })
        setEditRecurringEnumStringError({ value: false, errorMessage: '' })
        setEditInstructorUsernameError({ value: false, errorMessage: '' })
        setEditClassRunNameError({ value: false, errorMessage: '' })
        setEditClassRunDescriptionError({ value: false, errorMessage: '' })

        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const createClassRun = async (e) => {
        e.preventDefault()
        setClassRunStartDateNonStringError({ value: false, errorMessage: '' })
        setClassRunEndDateNonStringError({ value: false, errorMessage: '' })
        setClassRunStartTimeNonStringError({ value: false, errorMessage: '' })
        setClassRunEndTimeNonStringError({ value: false, errorMessage: '' })
        setMinClassSizeError({ value: false, errorMessage: '' })
        setMaximumCapacityError({ value: false, errorMessage: '' })
        setRecurringEnumStringError({ value: false, errorMessage: '' })
        setInstructorUsernameError({ value: false, errorMessage: '' })
        setClassRunNameError({ value: false, errorMessage: '' })
        setClassRunDescriptionError({ value: false, errorMessage: '' })
        if (classRunStartDateNonString == '') {
            setClassRunStartDateNonStringError({ value: true, errorMessage: 'Start Date cannot be empty!' })
        }
        if (classRunEndDateNonString == '') {
            setClassRunEndDateNonStringError({ value: true, errorMessage: 'End Date cannot be empty!' })
        }
        if (classRunStartTimeNonString == '') {
            setClassRunStartTimeNonStringError({ value: true, errorMessage: 'Start Time cannot be empty!' })
        }
        if (classRunEndTimeNonString == '') {
            setClassRunEndTimeNonStringError({ value: true, errorMessage: 'End Time cannot be empty!' })
        }
        if (minClassSize == '') {
            setMinClassSizeError({ value: true, errorMessage: 'Min Size cannot be empty!' })
        }
        if (minClassSize < 0) {
            setMinClassSizeError({ value: true, errorMessage: 'Min Size cannot be a negative number!' })
        }
        if (maximumCapacity == '') {
            setMaximumCapacityError({ value: true, errorMessage: 'Max Capacity cannot be empty!' })
        }
        if (maximumCapacity < 0) {
            setMaximumCapacityError({ value: true, errorMessage: 'Max Capacity cannot be a negative number!' })
        }
        if (recurringEnumString == '') {
            setRecurringEnumStringError({ value: true, errorMessage: 'Recurring Frequency cannot be empty!' })
        }
        if (instructorUsername == '') {
            setInstructorUsernameError({ value: true, errorMessage: 'Instructor Username cannot be empty!' })
        }
        if (classRunName == '') {
            setClassRunNameError({ value: true, errorMessage: 'Classrun Name cannot be empty!' })
        }
        if (classRunDescription == '') {
            setClassRunDescriptionError({ value: true, errorMessage: 'Classrun Description cannot be empty!' })
        }
        var daysArray = new Array()
        if (sun === true) { daysArray.push(0) }
        if (mon === true) { daysArray.push(1) }
        if (tue === true) { daysArray.push(2) }
        if (wed === true) { daysArray.push(3) }
        if (thu === true) { daysArray.push(4) }
        if (fri === true) { daysArray.push(5) }
        if (sat === true) { daysArray.push(6) }
        var classRunDaysOfTheWeek = daysArray
        var classRunStartTime = ""
        var classRunEndTime = ""
        var classRunStart = ""
        var classRunEnd = ""
        if (classRunStartTimeNonString) {
            classRunStartTime = classRunStartTimeNonString.format("HH:mm")
        }
        if (classRunEndTimeNonString) {
            classRunEndTime = classRunEndTimeNonString.format("HH:mm")
        }
        if (classRunStartDateNonString) {
            classRunStart = classRunStartDateNonString.format("YYYY-MM-DD")
        }
        if (classRunEndDateNonString) {
            classRunEnd = classRunEndDateNonString.format("YYYY-MM-DD")
        }
        // var color = classRunColor
        const newClassRun = {
            classRunName, classRunDescription, classRunDaysOfTheWeek,
            classRunStart, classRunEnd, classRunStartTime: classRunStartTime, classRunEndTime,
            calendarId, instructorUsername, recurringEnumString, minClassSize, maximumCapacity 
        }
        if (dayjs(classRunStartDateNonString).isValid() === false) {
            setClassRunStartDateNonStringError({ value: true, errorMessage: 'Invalid Start Date!' })
        }
        if (dayjs(classRunEndDateNonString).isValid() === false) {
            setClassRunEndDateNonStringError({ value: true, errorMessage: 'Invalid End Date!' })
        }
        if (dayjs(classRunStartTimeNonString).isValid() === false) {
            setClassRunStartTimeNonStringError({ value: true, errorMessage: 'Invalid Start Time!' })
        }
        if (dayjs(classRunEndTimeNonString).isValid() === false) {
            setClassRunEndTimeNonStringError({ value: true, errorMessage: 'Invalid End Time!' })
        }
        if (classRunStartDateNonString.isAfter(classRunEndDateNonString)) {
            setClassRunStartDateNonStringError({ value: true, errorMessage: 'End Date cannot be earlier than Start Date!' })
            setClassRunEndDateNonStringError({ value: true, errorMessage: 'End Date cannot be earlier than Start Date!' })
        }
        else if (classRunStartDateNonString.isSame(classRunEndDateNonString) && classRunStartTimeNonString.isAfter(classRunEndTimeNonString)) {
            setClassRunStartTimeNonStringError({ value: true, errorMessage: 'End Time cannot be earlier than Start Time!' })
            setClassRunEndTimeNonStringError({ value: true, errorMessage: 'End Time cannot be earlier than Start Time!' })
        }
        else if (classRunStartDateNonString && classRunEndDateNonString && classRunStartTimeNonString && classRunEndTimeNonString
            && minClassSize && maximumCapacity && recurringEnumString && instructorUsername && classRunName && classRunDescription
            && minClassSize >= 0 && maximumCapacity >= 0 && dayjs(classRunStartDateNonString).isValid() && dayjs(classRunEndDateNonString).isValid()
            && dayjs(classRunStartTimeNonString).isValid() && dayjs(classRunEndTimeNonString).isValid()) {
            try {
                const response = await fetch("http://localhost:8080/classRun/addToCourseId/" + courseId, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newClassRun)
                });
                console.log(response);
                if (response.ok == false) {
                    console.log("Error");
                    handleClickErrorSnackbar()
                } else {
                    console.log("Classrun Created Successfully!");
                    handleClickSnackbar()
                }
            } catch (err) {
                console.log(err);
                handleClickErrorSnackbar()
            }
            setRefreshPage(true)
            handleCloseAddClassRun()
        }
    };

    const editClassRun = async (e) => {
        e.preventDefault()
        var daysArray = new Array()
        if (editSun === true) { daysArray.push(0) }
        if (editMon === true) { daysArray.push(1) }
        if (editTue === true) { daysArray.push(2) }
        if (editWed === true) { daysArray.push(3) }
        if (editThu === true) { daysArray.push(4) }
        if (editFri === true) { daysArray.push(5) }
        if (editSat === true) { daysArray.push(6) }
        var classRunDaysOfTheWeek = daysArray
        var classRunStartTime = ""
        var classRunEndTime = ""
        var classRunStart = ""
        var classRunEnd = ""
        if (editClassRunStartTimeNonString) {
            classRunStartTime = dayjs(editClassRunStartTimeNonString).format("HH:mm")
        }
        if (editClassRunEndTimeNonString) {
            classRunEndTime = dayjs(editClassRunEndTimeNonString).format("HH:mm")
        }
        if (editClassRunStartDateNonString) {
            classRunStart = dayjs(editClassRunStartDateNonString).format("YYYY-MM-DD")
        }
        if (editClassRunEndDateNonString) {
            classRunEnd = dayjs(editClassRunEndDateNonString).format("YYYY-MM-DD")
        }
        // var classRunStartTime = dayjs(editClassRunStartTimeNonString).format("HH:mm")
        // var classRunEndTime = dayjs(editClassRunEndTimeNonString).format("HH:mm")
        // var classRunStart = dayjs(editClassRunStartDateNonString).format("YYYY-MM-DD")
        // var classRunEnd = dayjs(editClassRunEndDateNonString).format("YYYY-MM-DD")
        var classRunName = editClassRunName
        var classRunDescription = editClassRunDescription
        var instructorUsername = editInstructorUsername
        var recurringEnumString = editRecurringEnumString
        var minClassSize = editMinClassSize
        var maximumCapacity = editMaximumCapacity
        var classRunId = editClassRunId
        // var color = classRunColor
        const editedClassRun = {
            classRunId, classRunName, classRunDescription, classRunDaysOfTheWeek,
            classRunStart, classRunEnd, classRunStartTime: classRunStartTime, classRunEndTime,
            calendarId, instructorUsername, recurringEnumString, minClassSize, maximumCapacity
        }
        
        try {
            const response = await fetch("http://localhost:8080/classRun/update/" + editClassRunId, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editedClassRun)
            });
            console.log(response)
            if (response.ok == false) {
                console.log("Error");
                handleClickErrorSnackbar()
            } else {
                console.log("Classrun Updated Successfully!")
                handleClickEditSnackbar()
                setRefreshPage(true)
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        handleEditDialogClose()
        handleConfirmEditDialogClose()
    }

    const deleteClassRun = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/classRun/delete/" + classRunIdToDelete, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            console.log(response)
            if (response.ok == false) {
                console.log("Error");
                handleClickErrorSnackbar()
            } else {
                console.log("Classrun Deleted Successfully!");
                setRefreshPage(true);
                handleClickDeleteSnackbar()
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        handleDeleteDialogClose();
    };

    // const generateClassEventsForClassRun = (e, classRunIdToGenerate) => {
    //     console.log("HELLO")
    //     console.log(classRunIdToGenerate)
    //     e.preventDefault();
    //     fetch("http://localhost:8080/classRun/generateClassEventsFromClassRunId/" + classRunIdToGenerate, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //     }).then(() => {
    //         console.log("Class Events Generated Successfully!");
    //         setRefreshPage(true);
    //     });
    // };

    const convertNumericDaysToString = (classRunDaysOfTheWeek) => {
        var daysString = new Array()
        for (var i = 0; i < classRunDaysOfTheWeek.length; i++) {
            if (classRunDaysOfTheWeek[i] === 0) { daysString.push("Sun") }
            if (classRunDaysOfTheWeek[i] === 1) { daysString.push("Mon") }
            if (classRunDaysOfTheWeek[i] === 2) { daysString.push("Tue") }
            if (classRunDaysOfTheWeek[i] === 3) { daysString.push("Wed") }
            if (classRunDaysOfTheWeek[i] === 4) { daysString.push("Thu") }
            if (classRunDaysOfTheWeek[i] === 5) { daysString.push("Fri") }
            if (classRunDaysOfTheWeek[i] === 6) { daysString.push("Sat") }
        }
        return daysString.toString()
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
                            {/* state={{ classRunName: classRunName }} */}
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
                            onClick={handleClickOpenAddClassRun}
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
                                            key={row.id}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            {/* <TableCell component="th" scope="row">
                                                <Link
                                                    to={`${classRunsPath}/${row.id}`}
                                                    state={{ classRunName: row.classRunName }}
                                                    style={{ textDecoration: "none" }}
                                                >
                                                    {row.id}
                                                </Link>
                                            </TableCell>
                                            <TableCell align="right">{row.classRunName}</TableCell> */}
                                            <TableCell component="th" scope="row">
                                                <Link
                                                    to={`${classRunsPath}/${row.id}`}
                                                    state={{ classRunName: row.classRunName }}
                                                    style={{ textDecoration: "none" }}
                                                >
                                                    {row.classRunName}
                                                </Link>
                                            </TableCell>
                                            <TableCell align="right">{row.classRunDescription}</TableCell>
                                            <TableCell align="right">{row.classRunStart}</TableCell>
                                            <TableCell align="right">{row.classRunEnd}</TableCell>
                                            <TableCell align="right">{row.classRunStartTime}</TableCell>
                                            <TableCell align="right">{row.classRunEndTime}</TableCell>
                                            <TableCell align="right">{row.minClassSize}</TableCell>
                                            <TableCell align="right">{row.maximumCapacity}</TableCell>
                                            <TableCell align="right">{convertNumericDaysToString(row.classRunDaysOfTheWeek)}</TableCell>
                                            <TableCell align="right">{row.recurringEnumString}</TableCell>
                                            <TableCell align="right">{row.instructorUsername}</TableCell>
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
                                                            handleClickEditDialogOpen(event,
                                                                row.id,
                                                                row.classRunName,
                                                                row.classRunDescription,
                                                                row.classRunStart,
                                                                row.classRunEnd,
                                                                row.classRunStartTime,
                                                                row.classRunEndTime,
                                                                row.minClassSize,
                                                                row.maximumCapacity,
                                                                row.classRunDaysOfTheWeek,
                                                                row.recurringEnumString,
                                                                row.instructorUsername)
                                                        }
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
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
                            required
                            style={{ margin: '6px 0' }}
                            value={classRunName}
                            onChange={(e) => setClassRunName(e.target.value)}
                            error={classRunNameError.value}
                            helperText={classRunNameError.errorMessage}
                        />

                        <TextField id="outlined-multiline-static" label="ClassRun Description" multiline rows={6} fullWidth defaultValue=""
                            required
                            style={{ margin: '6px 0' }}
                            value={classRunDescription}
                            onChange={(e) => setClassRunDescription(e.target.value)}
                            error={classRunDescriptionError.value}
                            helperText={classRunDescriptionError.errorMessage}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                            <Stack spacing={1} style={{ margin: '8px 0' }}>
                                <DatePicker
                                    value={classRunStartDateNonString}
                                    onChange={(newValue) => setClassRunStartDateNonString(newValue)}
                                    renderInput={(params) => <TextField {...params}
                                        error={classRunStartDateNonStringError.value}
                                        helperText={classRunStartDateNonStringError.errorMessage}
                                        required />}
                                    ampm={false}
                                    label="Classrun Start Date"
                                />
                            </Stack>
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                            <Stack spacing={1} style={{ margin: '8px 0' }}>
                                <DatePicker
                                    value={classRunEndDateNonString}
                                    onChange={(newValue) => setClassRunEndDateNonString(newValue)}
                                    renderInput={(params) => <TextField {...params}
                                        error={classRunEndDateNonStringError.value}
                                        helperText={classRunEndDateNonStringError.errorMessage}
                                        required />}
                                    ampm={false}
                                    label="Classrun End Date"
                                />
                            </Stack>
                        </LocalizationProvider>

                        <div>
                            <Paper variant="outlined">
                                <div style={{ padding: '15px' }}>
                                    <FormLabel component="legend" style={{ paddingBottom: '5px' }}>Class Days of the Week</FormLabel>
                                    <FormControl
                                        required
                                        // error={error}
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
                                        {/* <FormHelperText>Pick at least one day*</FormHelperText> */}
                                    </FormControl>
                                </div>
                            </Paper>
                        </div>

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                            <Stack spacing={1} style={{ margin: '8px 0' }}>
                                <TimePicker
                                    value={classRunStartTimeNonString}
                                    onChange={(newValue) => setClassRunStartTimeNonString(newValue)}
                                    renderInput={(params) => <TextField {...params}
                                        label="Classrun Start Time"
                                        error={classRunStartTimeNonStringError.value}
                                        helperText={classRunStartTimeNonStringError.errorMessage}
                                        required />}
                                    ampm={false}
                                />
                            </Stack>
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                            <Stack spacing={1} style={{ margin: '8px 0' }}>
                                <TimePicker
                                    value={classRunEndTimeNonString}
                                    onChange={(newValue) => setClassRunEndTimeNonString(newValue)}
                                    renderInput={(params) => <TextField {...params}
                                        label="Classrun End Time"
                                        error={classRunEndTimeNonStringError.value}
                                        helperText={classRunEndTimeNonStringError.errorMessage}
                                        required />}
                                    ampm={false}
                                />
                            </Stack>
                        </LocalizationProvider>

                        <TextField id="outlined-basic" label="Min Size" fullWidth defaultValue=""
                            style={{ margin: '6px 0' }}
                            value={minClassSize}
                            onChange={(e) => setMinClassSize(e.target.value)}
                            error={minClassSizeError.value}
                            helperText={minClassSizeError.errorMessage}
                            required
                        />

                        <TextField id="outlined-basic" label="Max Size" fullWidth defaultValue=""
                            style={{ margin: '6px 0' }}
                            value={maximumCapacity}
                            onChange={(e) => setMaximumCapacity(e.target.value)}
                            error={maximumCapacityError.value}
                            helperText={maximumCapacityError.errorMessage}
                            required
                        />

                        <TextField id="outlined-select-age" select label="Recurring Frequency" fullWidth
                            style={{ margin: '6px 0' }}
                            value={recurringEnumString}
                            onChange={handleChangeRecurringEnumString}
                            error={recurringEnumStringError.value}
                            helperText={recurringEnumStringError.errorMessage}
                            required
                        >
                            {recurringEnums.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField id="outlined-basic" label="Instructor Username" fullWidth defaultValue=""
                            style={{ margin: '6px 0' }}
                            value={instructorUsername}
                            onChange={(e) => setInstructorUsername(e.target.value)}
                            error={instructorUsernameError.value}
                            helperText={instructorUsernameError.errorMessage}
                            required
                        />

                        {/* <HexColorPicker color={classRunColor} onChange={setClassRunColor} />
                        <HexColorInput color={classRunColor} onChange={setClassRunColor} /> */}

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
            <div>
                <Dialog
                    open={confirmEditDialogOpen}
                    onClose={handleConfirmEditDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Confirm changes?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            These will reset and regenerate all the class events inside the
                            class run. You will not be able to undo this action.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleConfirmEditDialogClose}>Cancel</Button>
                        <Button onClick={editClassRun} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
                    <DialogTitle>Edit Class Run</DialogTitle>
                    <DialogContent>
                        <TextField id="outlined-basic" label="ClassRun Name" fullWidth defaultValue=""
                            style={{ margin: '6px 0' }}
                            value={editClassRunName}
                            onChange={(e) => setEditClassRunName(e.target.value)}
                            error={editClassRunNameError.value}
                            helperText={editClassRunNameError.errorMessage}
                            required
                        />
                        <TextField id="outlined-multiline-static" label="ClassRun Description" multiline rows={6} fullWidth defaultValue=""
                            style={{ margin: '6px 0' }}
                            value={editClassRunDescription}
                            onChange={(e) => setEditClassRunDescription(e.target.value)}
                            error={editClassRunDescriptionError.value}
                            helperText={editClassRunDescriptionError.errorMessage}
                            required
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                            <Stack spacing={1} style={{ margin: '8px 0' }}>
                                <DatePicker
                                    value={editClassRunStartDateNonString}
                                    onChange={(newValue) => setEditClassRunStartDateNonString(newValue)}
                                    renderInput={(params) => <TextField {...params} 
                                        error={editClassRunStartDateNonStringError.value}
                                        helperText={editClassRunStartDateNonStringError.errorMessage}
                                        required/>}
                                    ampm={false}
                                    label="Classrun Start Date"
                                />
                            </Stack>
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                            <Stack spacing={1} style={{ margin: '8px 0' }}>
                                <DatePicker
                                    value={editClassRunEndDateNonString}
                                    onChange={(newValue) => setEditClassRunEndDateNonString(newValue)}
                                    renderInput={(params) => <TextField {...params} 
                                        error={editClassRunEndDateNonStringError.value}
                                        helperText={editClassRunEndDateNonStringError.errorMessage}
                                        required/>}
                                    ampm={false}
                                    label="Classrun End Date"
                                />
                            </Stack>
                        </LocalizationProvider>

                        <div>
                            <Paper variant="outlined">
                                <div style={{ padding: '15px' }}>
                                    <FormLabel component="legend" style={{ paddingBottom: '5px' }}>Class Days of the Week</FormLabel>
                                    <FormControl
                                        required
                                        // error={editError}
                                        component="fieldset"
                                        sx={{ m: 0 }}
                                        variant="standard"
                                    >
                                        {/* <FormLabel component="legend">Pick at least one</FormLabel> */}
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={editMon} onChange={handleChangeEditMon} name="editMon" />
                                                }
                                                label="Mon"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={editTue} onChange={handleChangeEditTue} name="editTue" />
                                                }
                                                label="Tue"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={editWed} onChange={handleChangeEditWed} name="editWed" />
                                                }
                                                label="Wed"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={editThu} onChange={handleChangeEditThu} name="editThu" />
                                                }
                                                label="Thu"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={editFri} onChange={handleChangeEditFri} name="editFri" />
                                                }
                                                label="Fri"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={editSat} onChange={handleChangeEditSat} name="editSat" />
                                                }
                                                label="Sat"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={editSun} onChange={handleChangeEditSun} name="editSun" />
                                                }
                                                label="Sun"
                                            />
                                        </FormGroup>
                                        {/* <FormHelperText>Pick at least one day*</FormHelperText> */}
                                    </FormControl>
                                </div>
                            </Paper>
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                            <Stack spacing={1} style={{ margin: '8px 0' }}>
                                <TimePicker
                                    value={editClassRunStartTimeNonString}
                                    onChange={(newValue) => setEditClassRunStartTimeNonString(newValue)}
                                    renderInput={(params) => <TextField {...params} 
                                        error={editClassRunStartTimeNonStringError.value}
                                        helperText={editClassRunStartTimeNonStringError.errorMessage}
                                        required/>}
                                    ampm={false}
                                    label="Classrun Start Time"
                                />
                            </Stack>
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                            <Stack spacing={1} style={{ margin: '8px 0' }}>
                                <TimePicker
                                    value={editClassRunEndTimeNonString}
                                    onChange={(newValue) => setEditClassRunEndTimeNonString(newValue)}
                                    renderInput={(params) => <TextField {...params} 
                                        error={editClassRunEndTimeNonStringError.value}
                                        helperText={editClassRunEndTimeNonStringError.errorMessage}
                                        required/>}
                                    ampm={false}
                                    label="Classrun End Time"
                                />
                            </Stack>
                        </LocalizationProvider>

                        <TextField id="outlined-basic" label="Min Size" fullWidth defaultValue=""
                            style={{ margin: '6px 0' }}
                            value={editMinClassSize}
                            onChange={(e) => setEditMinClassSize(e.target.value)}
                            error={editMinClassSizeError.value}
                            helperText={editMinClassSizeError.errorMessage}
                            required
                        />

                        <TextField id="outlined-basic" label="Max Size" fullWidth defaultValue=""
                            style={{ margin: '6px 0' }}
                            value={editMaximumCapacity}
                            onChange={(e) => setEditMaximumCapacity(e.target.value)}
                            error={editMaximumCapacityError.value}
                            helperText={editMaximumCapacityError.errorMessage}
                            required
                        />

                        <TextField id="outlined-select-age" select label="Recurring Frequency" fullWidth
                            style={{ margin: '6px 0' }}
                            value={editRecurringEnumString}
                            onChange={handleChangeEditRecurringEnumString}
                            error={editRecurringEnumStringError.value}
                            helperText={editRecurringEnumStringError.errorMessage}
                            required
                        >
                            {recurringEnums.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField id="outlined-basic" label="Instructor Username" fullWidth defaultValue=""
                            style={{ margin: '6px 0' }}
                            value={editInstructorUsername}
                            onChange={(e) => setEditInstructorUsername(e.target.value)}
                            error={editInstructorUsernameError.value}
                            helperText={editInstructorUsernameError.errorMessage}
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditDialogClose}>Cancel</Button>
                        <Button onClick={handleConfirmEditDialogOpen}>Edit</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default TeachingClassRuns;
