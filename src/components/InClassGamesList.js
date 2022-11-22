//essentials
import * as React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { render } from "@testing-library/react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button, Grid, Select, MenuItem, ToggleButton, ToggleButtonGroup, Paper, Stack } from "@mui/material";

//nav
import Breadcrumbs from "@mui/material/Breadcrumbs";
import LinkMaterial from "@mui/material/Link";

//table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//forms
import TextField from "@mui/material/TextField";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

//alerts
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

//icons
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

//dayjs
import dayjs from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/ar-sa";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import InputLabel from "@mui/material/InputLabel";

//components
import TeachingCoursesDrawer from "./TeachingCoursesDrawer";

const Alert = React.forwardRef(function Alert(props, ref) { return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} /> });

export default function InClassGamesList(props) {
  //snackbars config
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleClickSnackbar = () => { setOpenSnackbar(true); };
  const handleCloseSnackbar = (event, reason) => { if (reason === "clickaway") { return; } setOpenSnackbar(false); };
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = React.useState(false);
  const handleClickDeleteSnackbar = () => { setOpenDeleteSnackbar(true); };
  const handleCloseDeleteSnackbar = (event, reason) => { if (reason === "clickaway") { return; } setOpenDeleteSnackbar(false); };
  const [openEditSnackbar, setOpenEditSnackbar] = React.useState(false);
  const handleClickEditSnackbar = () => { setOpenEditSnackbar(true); };
  const handleCloseEditSnackbar = (event, reason) => { if (reason === "clickaway") { return; } setOpenEditSnackbar(false); };
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);
  const handleClickErrorSnackbar = () => { setOpenErrorSnackbar(true); };
  const handleCloseErrorSnackbar = (event, reason) => { if (reason === "clickaway") { return; } setOpenErrorSnackbar(false); };

  //user
  const auth = useAuth();
  const user = auth.user;

  //timezone
  var utc = require("dayjs/plugin/utc");
  var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
  dayjs.extend(utc);
  dayjs.extend(timezone);
  let currentDate = new Date();
  const offset = currentDate.getTimezoneOffset();
  currentDate = new Date(currentDate.getTime() + offset * 60 * 1000);

  //refresh
  const [refreshPage, setRefreshPage] = useState("");

  //paths
  const location = useLocation();
  const inClassPath = location.pathname.split("/").slice(0, 4).join("/");
  const classEventsPath = location.pathname.split("/").slice(0, 5).join("/");
  // const classRunName = location.state.classRunName;
  // var classRunNameDup = classRunName;
  const courseId = location.pathname.split("/")[2];
  const classRunId = location.pathname.split("/")[4];

  //get states
  const [games, setGames] = useState([]);

  const [classRuns, setClassRuns] = useState([])
  const [selectedClassRun, setSelectedClassRun] = useState([])
  React.useEffect(() => {
    setRefreshPage(false);
    fetch("http://localhost:8080/classRun/getClassRunsFromCourseId/" + courseId).
      then(res => res.json())
      .then((result) => {
        console.log(result)
        setClassRuns(result);
      });
  }, [refreshPage]);

  const fetchGamesFromClassRun = (classRun) => {
    fetch("http://localhost:8080/triviaQuiz/getAllPollsAndTriviaFromClassRun/" + classRun.id)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setGames(result);
      });
  }

  const handleChangeClassRunSelect = (event) => {
    setSelectedClassRun(event.target.value);
    console.log(event.target.value)
    fetchGamesFromClassRun(event.target.value)
  };

  //create states
  const [addGameDialogOpen, setAddGameDialogOpen] = React.useState(false);
  const [newGameTitle, setNewGameTitle] = useState("");
  const [newGameDescription, setNewGameDescription] = useState("");
  const [newGameType, setNewGameType] = React.useState("TRIVIA");

  const [newGameTitleError, setNewGameTitleError] = useState({ value: false, errorMessage: "" });
  const [newGameDescriptionError, setNewGameDescriptionError] = useState({ value: false, errorMessage: "" });
  const [newGameTypeError, setNewGameTypeError] = useState({ value: false, errorMessage: "" });

  const handleSelectGameType = (event) => {
    setNewGameType(event.target.value);
  };

  //const [newGameCreatedDateTime, setNewGameCreatedDateTime] = React.useState(dayjs(currentDate.toISOString().split("T")[0]));
  // const [newGameCreatedDateTimeError, setNewGameCreatedDateTimeError] = useState({ value: false, errorMessage: "" });

  //edit states
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [editClassEventId, setEditClassEventId] = useState("");
  const [editClassEventTitle, setEditClassEventTitle] = useState("");
  const [editClassEventDescription, setEditClassEventDescription] = useState("");
  const [editClassEventStartDateTime, setEditClassEventStartDateTime] = React.useState(dayjs(currentDate.toISOString().split("T")[0]));
  const [editClassEventEndDateTime, setEditClassEventEndDateTime] = React.useState(dayjs(currentDate.toISOString().split("T")[0]));

  const [editClassEventTitleError, setEditClassEventTitleError] = useState({ value: false, errorMessage: "", });
  const [editClassEventDescriptionError, setEditClassEventDescriptionError] = useState({ value: false, errorMessage: "" });
  const [editClassEventStartDateTimeError, setEditClassEventStartDateTimeError] = useState({ value: false, errorMessage: "" });
  const [editClassEventEndDateTimeError, setEditClassEventEndDateTimeError] = useState({ value: false, errorMessage: "" });

  //delete states
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [gameIdToDelete, setGameIdToDelete] = useState("");
  const [gameTypeToDelete, setGameTypeToDelete] = useState("");

  //enums
  const gameTypeEnum = [{ value: "TRIVIA" }, { value: "QUIZ" }];

  //add methods
  const handleClickOpenAddGame = () => {
    setAddGameDialogOpen(true);
  };

  const handleCloseAddGame = () => {
    setAddGameDialogOpen(false);
  };

  const createNewGame = async (e) => {
    setNewGameTitleError({ value: false, errorMessage: "" });
    setNewGameDescriptionError({ value: false, errorMessage: "" });
    setNewGameTypeError({ value: false, errorMessage: "" });
    if (newGameTitle == "") { setNewGameTitleError({ value: true, errorMessage: "Game title cannot be empty!" }) }
    if (newGameDescription == "") { setNewGameDescriptionError({ value: true, errorMessage: "Game Description cannot be empty!" }) }
    if (newGameType == "") { setNewGameTypeError({ value: true, errorMessage: "Game Type cannot be empty!" }) }
    else if (newGameTitle && newGameDescription && newGameType) {
      e.preventDefault();
      if (newGameType == "TRIVIA") {
        try {
          var triviaQuizTitle = newGameTitle;
          var triviaQuizDescription = newGameDescription;
          var newTrivia = { triviaQuizTitle, triviaQuizDescription };
          const response = await fetch(
            "http://localhost:8080/triviaQuiz/classRun/" + selectedClassRun.id + "/triviaQuiz/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newTrivia),
            }
          );
          console.log(response);
          if (response.ok == false) {
            console.log("Error");
            handleClickErrorSnackbar();
          } else {
            console.log("New Trivia created Successfully!");
            handleClickSnackbar();
            fetchGamesFromClassRun(selectedClassRun)
          }
        } catch (err) {
          console.log(err);
          handleClickErrorSnackbar();
        }
      } else {
        try {
          var pollTitle = newGameTitle;
          var pollDescription = newGameDescription;
          var newPoll = { pollTitle, pollDescription };
          const response = await fetch(
            "http://localhost:8080/poll/classRun/" + selectedClassRun.id + "/poll/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newPoll),
            }
          );
          console.log(response);
          if (response.ok == false) {
            console.log("Error");
            handleClickErrorSnackbar();
          } else {
            console.log("New Poll created Successfully!");
            handleClickSnackbar();
            fetchGamesFromClassRun(selectedClassRun)
          }
        } catch (err) {
          console.log(err);
          handleClickErrorSnackbar();
        }
      }
      setRefreshPage(true);
      handleCloseAddGame();
    }
  };

  //edit methods
  const handleClickEditDialogOpen = (event, gameType, gameId, gameTitle, gameDescription) => {
    // setEditClassEventId(classEventId);
    // setEditClassEventTitle(classEventTitle);
    // setEditClassEventDescription(classEventNotes);
    // setEditClassEventStartDateTime(dayjs(classEventStartDateTime).local().format());
    // setEditClassEventEndDateTime(dayjs(classEventEndDateTime).local().format());
    // setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleClickDeleteDialogOpen = (event, gameType, gameId) => {
    setGameIdToDelete(gameId);
    setGameTypeToDelete(gameType)
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const editClassEvent = async (e) => {
    // setEditClassEventTitleError({ value: false, errorMessage: "" });
    // setEditClassEventDescriptionError({ value: false, errorMessage: "" });
    // setEditClassEventStartDateTimeError({ value: false, errorMessage: "" });
    // setEditClassEventEndDateTimeError({ value: false, errorMessage: "" });
    // if (editClassEventTitle == "") { setEditClassEventTitleError({ value: true, errorMessage: "Event title cannot be empty!" }) }
    // if (editClassEventDescription == "") { setEditClassEventDescriptionError({ value: true, errorMessage: "Event Description cannot be empty!" }) }
    // if (editClassEventStartDateTime == "") { setEditClassEventStartDateTimeError({ value: true, errorMessage: "Event Start DateTime cannot be empty!" }) }
    // if (editClassEventEndDateTime == "") { setEditClassEventEndDateTimeError({ value: true, errorMessage: "Event End DateTime cannot be empty!" }) }
    // if (dayjs(editClassEventStartDateTime).isValid() === false) { setEditClassEventStartDateTimeError({ value: true, errorMessage: "Invalid Start DateTime!" }) }
    // if (dayjs(editClassEventEndDateTime).isValid() === false) { setEditClassEventEndDateTimeError({ value: true, errorMessage: "Invalid End DateTime!" }) }
    // if (dayjs(editClassEventStartDateTime).isAfter(dayjs(editClassEventEndDateTime))) {
    //   setEditClassEventStartDateTimeError({ value: true, errorMessage: "End DateTime cannot be earlier than Start DateTime!" })
    //   setEditClassEventEndDateTimeError({ value: true, errorMessage: "End DateTime cannot be earlier than Start DateTime!" })
    // } else if (editClassEventTitle && editClassEventDescription && dayjs(editClassEventStartDateTime).isValid() && dayjs(editClassEventEndDateTime).isValid()) {
    //   var title = editClassEventTitle;
    //   var notes = editClassEventDescription;
    //   var startDate = editClassEventStartDateTime;
    //   var endDate = editClassEventEndDateTime;
    //   var allDay = false;
    //   var editClassEvent = { title, notes, startDate, endDate, allDay };
    //   e.preventDefault();
    //   try {
    //     const response = await fetch(
    //       "http://localhost:8080/event/events/" + editClassEventId,
    //       {
    //         method: "PUT",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(editClassEvent),
    //       }
    //     );
    //     console.log(response);
    //     if (response.ok == false) {
    //       console.log("Error");
    //       handleClickErrorSnackbar();
    //     } else {
    //       console.log("Class Event edited Successfully!");
    //       handleClickEditSnackbar();
    //     }
    //   } catch (err) {
    //     console.log(err);
    //     handleClickErrorSnackbar();
    //   }
    //   setRefreshPage(true);
    //   handleEditDialogClose();
    // }
  };

  //delete methods
  const deleteGame = (e) => {
    e.preventDefault();
    if (gameTypeToDelete == "TRIVIA") {
      fetch("http://localhost:8080/triviaQuiz/triviaQuizzes/" + gameIdToDelete, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then(() => {
        console.log("Trivia Deleted Successfully!");
        setRefreshPage(true);
        handleDeleteDialogClose();
        fetchGamesFromClassRun(selectedClassRun)
      });
    } else {
      fetch("http://localhost:8080/poll/polls/" + gameIdToDelete, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then(() => {
        console.log("Poll Deleted Successfully!");
        setRefreshPage(true);
        handleDeleteDialogClose();
        fetchGamesFromClassRun(selectedClassRun)
      });
    }
  };

  //conditional rendering
  const renderEmptyRowMessage = () => {
    if (selectedClassRun.length == 0) {
      return (
        <TableRow>
          <TableCell colSpan={12} style={{ textAlign: "center" }}>
            Please select a classrun!
          </TableCell>
        </TableRow>
      );
    } else if (games.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={12} style={{ textAlign: "center" }}>
            There are currently no games in this classrun!
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <TeachingCoursesDrawer courseId={courseId} />
        </Grid>
        <Grid item xs={10}>
          <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar} >
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>Game Created Succesfully!</Alert>
          </Snackbar>
          <Snackbar open={openDeleteSnackbar} autoHideDuration={5000} onClose={handleCloseDeleteSnackbar}>
            <Alert onClose={handleCloseDeleteSnackbar} severity="success" sx={{ width: "100%" }}>Game Deleted Succesfully!</Alert>
          </Snackbar>
          <Snackbar open={openEditSnackbar} autoHideDuration={5000} onClose={handleCloseEditSnackbar}>
            <Alert onClose={handleCloseEditSnackbar} severity="success" sx={{ width: "100%" }}>Game Updated Succesfully! </Alert>
          </Snackbar>
          <Snackbar open={openErrorSnackbar} autoHideDuration={5000} onClose={handleCloseErrorSnackbar}>
            <Alert onClose={handleCloseErrorSnackbar} severity="error" sx={{ width: "100%" }}>Error!</Alert>
          </Snackbar>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              to={`${inClassPath}`}
              style={{ textDecoration: "none", color: "grey" }}
            >
              <LinkMaterial underline="hover" color="inherit">
                In-Class
              </LinkMaterial>
            </Link>

          </Breadcrumbs>
          <div style={{ justifyContent: "center" }}>
            <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
              List of In-Class Games
            </h1>
            <FormControl style={{ width: "20%" }}>
              <InputLabel id="demo-simple-select-label">Classrun</InputLabel>
              <Select
                labelId="classrun-select-label"
                id="classrun-select"
                value={selectedClassRun}
                label="Classrun"
                onChange={handleChangeClassRunSelect}
              >
                {classRuns.map((classRun) => (
                  <MenuItem value={classRun}>{classRun.classRunName}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              className="btn-upload"
              color="primary"
              variant="contained"
              component="span"
              onClick={handleClickOpenAddGame}
              style={{ float: "right", marginLeft: "auto", right: "3%" }}
            >
              Create New Game
            </Button>
          </div>
          <div style={{ padding: "5%" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Created Date</TableCell>
                    <TableCell align="right">Game Type</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {renderEmptyRowMessage()}
                  {games.map((row) => (
                    <TableRow key={row.gameId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row" align="right">
                        <Link
                          to={`${inClassPath}/${row.gameType.toLowerCase()}/${row.gameId}`}
                          state={{ classRunName: row.classRunName }}
                          style={{ textDecoration: "none" }}
                        >
                          {row.gameTitle}
                        </Link>
                      </TableCell>
                      <TableCell align="right">{row.gameDescription}</TableCell>
                      <TableCell align="right">{dayjs(row.startDate).local().format().substring(0, 10)}</TableCell>
                      <TableCell align="right">{row.gameType}</TableCell>
                      <TableCell align="right">
                        <div>
                          <IconButton
                            aria-label="settings"
                            onClick={(event) =>
                              handleClickDeleteDialogOpen(event, row.gameType, row.gameId)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            aria-label="settings"
                            onClick={(event) =>
                              handleClickEditDialogOpen(event, row.gameId, row.gameType, row.gameTitle, row.gameDescription)
                            }
                          >
                            <EditIcon />
                          </IconButton>
                          {row.gameType == "TRIVIA" && <Link
                            to={`${inClassPath}/${row.gameType.toLowerCase()}/${row.gameId}/triviaHosting`}
                            style={{ textDecoration: "none" }}
                          >
                            <IconButton
                              aria-label="settings"
                            >
                              <PlayCircleFilledWhiteIcon />
                            </IconButton>
                          </Link>
                          }
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
      <div>
        <Dialog open={addGameDialogOpen} onClose={handleCloseAddGame}>
          <DialogTitle>Create New Game</DialogTitle>
          <DialogContent>
            <TextField
              id="outlined-basic"
              label="Game Name"
              fullWidth
              defaultValue=""
              style={{ margin: "6px 0" }}
              value={newGameTitle}
              onChange={(e) => setNewGameTitle(e.target.value)}
              error={newGameTitleError.value}
              helperText={newGameTitleError.errorMessage}
              required
            />

            <TextField
              id="outlined-multiline-static"
              label="Game Description"
              multiline
              rows={6}
              fullWidth
              defaultValue=""
              style={{ margin: "6px 0" }}
              value={newGameDescription}
              onChange={(e) => setNewGameDescription(e.target.value)}
              error={newGameDescriptionError.value}
              helperText={newGameDescriptionError.errorMessage}
              required
            />

            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">Game Type</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={newGameType}
                onChange={handleSelectGameType}
              >
                <FormControlLabel value="TRIVIA" control={<Radio />} label="Trivia" />
                <FormControlLabel value="POLL" control={<Radio />} label="Poll" />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddGame}>Cancel</Button>
            <Button onClick={createNewGame}>Create</Button>
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
            {"Delete this game?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You will not be able to undo this action. Are you sure you want to
              delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose}>Cancel</Button>
            <Button onClick={deleteGame} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
          <DialogTitle>Edit Class Event</DialogTitle>
          <DialogContent>
            <TextField
              id="outlined-basic"
              label="Class Event Name"
              fullWidth
              defaultValue=""
              style={{ margin: "6px 0" }}
              value={editClassEventTitle}
              onChange={(e) => setEditClassEventTitle(e.target.value)}
              error={editClassEventTitleError.value}
              helperText={editClassEventTitleError.errorMessage}
              required
            />

            <TextField
              id="outlined-multiline-static"
              label="Class Event Description"
              multiline
              rows={6}
              fullWidth
              defaultValue=""
              style={{ margin: "6px 0" }}
              value={editClassEventDescription}
              onChange={(e) => setEditClassEventDescription(e.target.value)}
              error={editClassEventDescriptionError.value}
              helperText={editClassEventDescriptionError.errorMessage}
              required
            />

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
              <Stack spacing={1} style={{ margin: "8px 0" }}>
                <DateTimePicker
                  value={editClassEventStartDateTime}
                  onChange={(newValue) =>
                    setEditClassEventStartDateTime(newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={editClassEventStartDateTimeError.value}
                      helperText={editClassEventStartDateTimeError.errorMessage}
                      required
                    />
                  )}
                  ampm={false}
                  label="Event Start Date Time"
                />
              </Stack>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
              <Stack spacing={1} style={{ margin: "12px 0" }}>
                <DateTimePicker
                  value={editClassEventEndDateTime}
                  onChange={(newValue) =>
                    setEditClassEventEndDateTime(newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={editClassEventEndDateTimeError.value}
                      helperText={editClassEventEndDateTimeError.errorMessage}
                      required
                    />
                  )}
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
