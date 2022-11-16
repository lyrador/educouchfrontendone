import * as React from "react";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useState } from "react";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/ar-sa";

import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Grid,
  MenuItem,
  Modal,
  Snackbar,
  TextField,
} from "@mui/material";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import LinkMaterial from "@mui/material/Link";

export default function PartialCreateAssessment(props) {
  React.useEffect(() => {
    setAssessmentStartDate(dayjs(currentDate.toISOString().split("T")[0]));
    setAssessmentEndDate(dayjs(currentDate.toISOString().split("T")[0]));
  }, []);


  var utc = require("dayjs/plugin/utc");
  var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
  dayjs.extend(utc);
  dayjs.extend(timezone);
  let currentDate = new Date();
  const offset = currentDate.getTimezoneOffset();
  currentDate = new Date(currentDate.getTime() + offset * 60 * 1000);
  
  const navigate = useNavigate();
  const location = useLocation();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);

  const courseId = location.pathname.split("/")[2];

  const assessmentsPath = location.pathname.split("/").slice(0, 4).join("/");
  console.log(assessmentsPath);
  const createAssessmentPath = location.pathname;


  const [assessments, setAssessments] = useState([]);
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [assessmentDescription, setAssessmentDescription] = useState("");
  const [assessmentMaxScore, setAssessmentMaxScore] = useState("");
  const [assessmentStartDate, setAssessmentStartDate] = useState(
    dayjs(currentDate.toISOString().split("T")[0])
  );
  const [assessmentEndDate, setAssessmentEndDate] = useState(
    dayjs(currentDate.toISOString().split("T")[0])
  );
  const [newFileSub, setNewFileSub] = useState();
  const [newQuiz, setNewQuiz] = useState("emptyQuiz");

  const handleStartDateChange = (newAssessmentStartDate) => {
    setAssessmentStartDate(dayjs(newAssessmentStartDate).local().format());
  };

  const handleEndDateChange = (newAssessmentEndDate) => {
    setAssessmentEndDate(dayjs(newAssessmentEndDate).local().format());
  };

  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleClickErrorSnackbar = () => {
    setOpenErrorSnackbar(true);
  };

  const handleCloseErrorSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorSnackbar(false);
  };

  const [assessmentTitleError, setAssessmentTitleError] = useState({
    value: false,
    errorMessage: "",
  });
  const [assessmentDescriptionError, setAssessmentDescriptionError] = useState({
    value: false,
    errorMessage: "",
  });
  const [assessmentMaxScoreError, setAssessmentMaxScoreError] = useState({
    value: false,
    errorMessage: "",
  });
  const [assessmentStartDateError, setAssessmentStartDateError] = useState({
    value: false,
    errorMessage: "",
  });
  const [assessmentEndDateError, setAssessmentEndDateError] = useState({
    value: false,
    errorMessage: "",
  });
  const [
    assessmentFileSubmissionEnumError,
    setAssessmentFileSubmissionEnumError,
  ] = useState({ value: false, errorMessage: "" });

  // const [refreshPage, setRefreshPage] = useState(false);
  // //   const refreshFunction = () => {
  // //     setRefreshPage(!refreshPage);
  // //   };

  function cleanupFields() {
    setAssessmentTitle("");
    setAssessmentDescription("");
    setAssessmentMaxScore("");
  }

  function validateNewAssessment() {
    setAssessmentTitleError({ value: false, errorMessage: "" });
    setAssessmentDescriptionError({ value: false, errorMessage: "" });
    setAssessmentMaxScoreError({ value: false, errorMessage: "" });
    setAssessmentStartDateError({ value: false, errorMessage: "" });
    setAssessmentEndDateError({ value: false, errorMessage: "" });
    setAssessmentFileSubmissionEnumError({ value: false, errorMessage: "" });

    if (assessmentTitle == "") {
      setAssessmentTitleError({
        value: true,
        errorMessage: "Assessment Title cannot be empty!",
      });
    }
    if (assessmentDescription == "") {
      setAssessmentDescriptionError({
        value: true,
        errorMessage: "Assessment Description cannot be empty!",
      });
    }
    if (isNaN(assessmentMaxScore)) {
      setAssessmentMaxScoreError({
        value: true,
        errorMessage: "Assessment max score is not a valid number!",
      });
    }
    if (assessmentMaxScore == "") {
      setAssessmentMaxScoreError({
        value: true,
        errorMessage: "Assessment MaxScore cannot be empty!",
      });
    }
    if (assessmentStartDate == "") {
      setAssessmentStartDateError({
        value: true,
        errorMessage: "Assessment Start Date cannot be empty!",
      });
    }

    if (assessmentEndDate == "") {
      setAssessmentEndDateError({
        value: true,
        errorMessage: "Assessment End Date cannot be empty!",
      });
    }
    const newStartDate = assessmentStartDate;
    const newEndDate = assessmentEndDate;
    const dateComparisonBoolean = newEndDate < newStartDate;

    if (dateComparisonBoolean) {
      setAssessmentEndDateError({
        value: true,
        errorMessage: "Assessment End Date cannot be earlier than Start Date!",
      });
      setAssessmentStartDateError({
        value: true,
        errorMessage: "Assessment End Date cannot be earlier than Start Date!",
      });
    }
    if (
      assessmentTitle &&
      assessmentDescription &&
      assessmentMaxScore &&
      assessmentStartDate &&
      assessmentEndDate &&
      !isNaN(assessmentMaxScore) &&
      !dateComparisonBoolean
    ) {
      return true;
    }
  }

  function continueAsFileSubmission() {
    if (validateNewAssessment()) {
      const newFileSub = {
        assessmentTitle: assessmentTitle,
        assessmentDescription: assessmentDescription,
        assessmentMaxScore: assessmentMaxScore,
        assessmentStartDate: assessmentStartDate,
        assessmentEndDate: assessmentEndDate,
        assessmentIsOpen: "false",
        assessmentStatusEnum: "PENDING",
        assessmentFileSubmissionEnum: "INDIVIDUAL",
      };

      fetch(
        "http://localhost:8080/assessment/addNewFileSubmission/" + courseId,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newFileSub),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          setNewFileSub(result);
        })
        .then((response) => {
          cleanupFields();
          handleClickSnackbar();
        });

      navigate(`${assessmentsPath}`);
    }
  }

  function continueAsQuiz() {
    if (validateNewAssessment()) {
      const newQuiz = {
        assessmentTitle: assessmentTitle,
        assessmentDescription: assessmentDescription,
        assessmentMaxScore: assessmentMaxScore,
        assessmentStartDate: assessmentStartDate,
        assessmentEndDate: assessmentEndDate,
        assessmentIsOpen: "false",
        assessmentStatusEnum: "PENDING",
        hasTimeLimit: "false",
        timeLimit: 60,
        hasMaxAttempts: "false",
        maxAttempts: 0,
        isAutoRelease: "false",
        questions: [],
        questionCounter: 0,
      };

      setNewQuiz(newQuiz);
      navigate(`${assessmentsPath}/createQuiz`, {
        state: {
          assessmentsPathProp: assessmentsPath,
          createAssessmentPathProp: createAssessmentPath,
          newQuizProp: newQuiz,
        },
      });
    }
  }

  return (
    <Grid
      container
      style={{ marginTop: 20, marginBottom: 20, width: "60%" }}
      flexDirection={"column"}
      alignItems="center"
    >
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
          Assessment Created Succesfully!
        </Alert>
      </Snackbar>

      <Paper style={{ width: "70%" }}>
        <TextField
          required
          error={assessmentTitleError.value}
          helperText={assessmentTitleError.errorMessage}
          id="outlined-basic"
          label="Assessment Title"
          variant="outlined"
          fullWidth
          style={{ margin: "6px 0" }}
          value={assessmentTitle}
          onChange={(e) => setAssessmentTitle(e.target.value)}
        />
        <TextField
          required
          error={assessmentDescriptionError.value}
          helperText={assessmentDescriptionError.errorMessage}
          id="outlined-basic"
          label="Assessment Description"
          variant="outlined"
          fullWidth
          style={{ margin: "6px 0" }}
          value={assessmentDescription}
          onChange={(e) => setAssessmentDescription(e.target.value)}
        />
        <TextField
          required
          error={assessmentMaxScoreError.value}
          helperText={assessmentMaxScoreError.errorMessage}
          id="outlined-basic"
          label="Assessment Max Score, this can be edited in later stages"
          variant="outlined"
          fullWidth
          style={{ margin: "6px 0" }}
          value={assessmentMaxScore}
          onChange={(e) => setAssessmentMaxScore(e.target.value)}
        />
        <Stack spacing={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
            <DesktopDatePicker
              label="Start Date"
              value={assessmentStartDate}
              onChange={handleStartDateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: "100%" }}
                  error={assessmentStartDateError.value}
                  helperText={assessmentStartDateError.errorMessage}
                />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
            <DesktopDatePicker
              label="End Date"
              value={assessmentEndDate}
              onChange={handleEndDateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: "100%" }}
                  error={assessmentEndDateError.value}
                  helperText={assessmentEndDateError.errorMessage}
                />
              )}
            />
          </LocalizationProvider>
        </Stack>
      </Paper>

      <Grid
        container
        direction="row"
        justifyContent={"space-between"}
        alignContent={"center"}
        style={{ marginTop: 60 }}
      >
        <Button variant="contained" type="submit" onClick={continueAsQuiz}>
          Continue as New Quiz
        </Button>
        <Button
          variant="contained"
          type="submit"
          onClick={continueAsFileSubmission}
        >
          Continue as File Submission
        </Button>
      </Grid>
    </Grid>
  );
}
