import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Padding, SettingsOutlined } from "@mui/icons-material";
import dayjs from "dayjs";

export default function QuizSettingsComponents(props) {
  let currentDate = new Date()
  const offset = currentDate.getTimezoneOffset();
  currentDate = new Date(currentDate.getTime() + (offset * 60 * 1000));

  const paperStyle = { padding: "50px 20px", width: 1200, margin: "20px auto" };
  const quizSettings = props.quizSettingsProp;
  const [questions, setQuestions] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [startDate, setStartDate] = useState(dayjs(currentDate.toISOString().split('T')[0]));
  const [endDate, setEndDate] = useState(dayjs(currentDate.toISOString().split('T')[0]));
  const [hasTimeLimit, setHasTimeLimit] = useState("");
  const [timeLimit, setTimeLimit] = useState();

  const [isAutoRelease, setIsAutoRelease] = useState("");
  var startDateString = "";
  var endDateString = "";

  const [titleError, setTitleError] = useState({
    value: false,
    errorMessage: "",
  });
  const [descriptionError, setDescriptionError] = useState({
    value: false,
    errorMessage: "",
  });
  const [maxScoreError, setMaxScoreError] = useState({
    value: false,
    errorMessage: "",
  });
  const [startDateError, setStartDateError] = useState({
    value: false,
    errorMessage: "",
  });
  const [endDateError, setEndDateError] = useState({
    value: false,
    errorMessage: "",
  });
  const [timeLimitError, setTimeLimitError] = useState({
    value: false,
    errorMessage: "",
  });
  const [maxAttemptsError, setMaxAttemptsError] = useState({
    value: false,
    errorMessage: "",
  });

  var utc = require("dayjs/plugin/utc");
  var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
  dayjs.extend(utc);
  dayjs.extend(timezone);

  React.useEffect(() => {
    console.log("received startDate: ", props.startDateProp);
    console.log("received endDate: ", props.endDateProp);
    setQuestions(quizSettings.questions);
    setTitle(quizSettings.assessmentTitle);
    setDescription(quizSettings.assessmentDescription);
    props.calculateMaxQuizScoreProp();
    setMaxScore(quizSettings.assessmentMaxScore);
    setHasTimeLimit(quizSettings.hasTimeLimit);
    setTimeLimit(quizSettings.timeLimit);
    setIsAutoRelease(quizSettings.isAutoRelease);

    setStartDate(dayjs(quizSettings.assessmentStartDate).local().format());
    setEndDate(dayjs(quizSettings.assessmentEndDate).local().format());
  }, []);

  function handleCancel() {
    props.closeQuizSettingsProp();
  }
  function editQuizSettings(
    title,
    description,
    startDate,
    endDate,
    hasTimeLimit,
    timeLimit,
    isAutoRelease
  ) {
    props.editQuizSettingsProp(
      title,
      description,
      startDate,
      endDate,
      hasTimeLimit,
      timeLimit,
      isAutoRelease
    );
  }

  function validateQuizSettings() {
    const tempStartDate = startDate;
    const tempEndDate = endDate;
    console.log("validate startDate: ", tempStartDate);
    console.log("validate endDate: ", tempEndDate);

    const dateComparisonBoolean = tempEndDate >= tempStartDate;
    console.log("pass date comparison: ", dateComparisonBoolean);
    if (hasTimeLimit == "true") {
      console.log("has time limit");
      return title && description && dateComparisonBoolean && timeLimit > 4;
    } else {
      console.log("no time limit");
      return title && description && dateComparisonBoolean;
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    const tempStartDate = startDate;
    const tempEndDate = endDate;
    setTitleError({ value: false, errorMessage: "" });
    setDescriptionError({ value: false, errorMessage: "" });
    setMaxScoreError({ value: false, errorMessage: "" });
    setStartDateError({ value: false, errorMessage: "" });
    setEndDateError({ value: false, errorMessage: "" });
    setTimeLimitError({ value: false, errorMessage: "" });
    setMaxAttemptsError({ value: false, errorMessage: "" });
    if (title == "") {
      setTitleError({
        value: true,
        errorMessage: "Title field cannot be left empty!",
      });
    }
    if (description == "") {
      setDescriptionError({
        value: true,
        errorMessage: "Description Field cannot be left empty!",
      });
    }
    if (maxScore == "") {
      setMaxScoreError({
        value: true,
        errorMessage: "Max Score Field cannot be left empty!",
      });
    }
    const dateComparisonBoolean = tempEndDate < tempStartDate;
    console.log("startDate: ", tempStartDate);
    console.log("endDate: ", tempEndDate);
    if (dateComparisonBoolean) {
      setStartDateError({
        value: true,
        errorMessage: "Quiz End Date cannot be earlier than Start Date!",
      });
      setEndDateError({
        value: true,
        errorMessage: "Quiz End Date cannot be earlier than Start Date!",
      });
    }
    if (timeLimit < 5) {
      setTimeLimitError({
        value: true,
        errorMessage: "Quiz Time Limit cannot be less than 5 minutes!",
      });
    }
    // if (maxAttempts < 1) {
    //   setMaxAttemptsError({
    //     value: true,
    //     errorMessage: "Maximum Quiz Attempts Allowed must be more than 0!",
    //   });
    // }
    if (validateQuizSettings()) {
      console.log("passedValidations");
      console.log("passing in startDate: ", startDate);
      editQuizSettings(
        title,
        description,
        startDate,
        endDate,
        hasTimeLimit,
        timeLimit,
        isAutoRelease
      );
      handleCancel();
    } else {
      console.log("did not pass the vibe check");
    }
  };

  const handleStartDateChange = (newDate) => {
    setStartDate(dayjs(newDate).local().format());
    console.log("new start date: ", startDate);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(dayjs(newDate).local().format());
  };

  return (
    <Box component="form">
      <Container>
        <Paper elevation={3} style={paperStyle}>
          <h3
            style={{
              backgroundColor: "#1975D2",
              color: "whitesmoke",
              fontSize: "30px",
              marginBottom: "40px",
              padding: "6px",
            }}
          >
            Quiz Settings{" "}
          </h3>
          <p style={{ color: "grey" }}>Quiz Title</p>
          <TextField
            required
            error={titleError.value}
            helperText={titleError.errorMessage}
            id="outlined-basic"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px", marginBottom: "20px" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p style={{ color: "grey" }}>Quiz Description</p>
          <TextField
            multiline
            required
            error={descriptionError.value}
            helperText={descriptionError.errorMessage}
            id="outlined-basic"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px", marginBottom: "20px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Paper
            elevation={1}
            style={{ padding: "10px", marginBottom: "20px" }}
          >
            <p style={{ color: "grey" }}>Quiz Max Score (Auto-Generated)</p>
            <br />
            <p style={{ color: "grey" }}>{maxScore}</p>
          </Paper>
          <Stack
            spacing={1}
            style={{ paddingBottom: "10px", marginBottom: "20px" }}
          >
            <p style={{ color: "grey" }}>Quiz Start Date</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Start Date"
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ width: "100%" }}
                    error={startDateError.value}
                    helperText={startDateError.errorMessage}
                  />
                )}
              />
              <p style={{ color: "grey" }}>Quiz End Date</p>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="End Date"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ width: "100%" }}
                    error={endDateError.value}
                    helperText={endDateError.errorMessage}
                  />
                )}
              />
            </LocalizationProvider>
          </Stack>

          <Stack
            spacing={1}
            style={{ paddingBottom: "10px", marginTop: "20px" }}
          >
            <p style={{ color: "grey" }}>Quiz Time Limit</p>
            <Select
              id="select-trueFalse"
              value={hasTimeLimit}
              onChange={(e) => setHasTimeLimit(e.target.value)}
              defaultValue={hasTimeLimit}
            >
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">False</MenuItem>
            </Select>
          </Stack>

          {hasTimeLimit == "true" && (
            <TextField
              error={timeLimitError.value}
              helperText={timeLimitError.errorMessage}
              id="outlined-basic"
              label="Time Limit in minutes"
              variant="outlined"
              fullWidth
              style={{
                paddingBottom: "10px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
              value={timeLimit}
              defaultValue={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
            />
          )}

          <Stack spacing={1}>
            <InputLabel id="select-autoReleaseResults-trueFalse">
              Auto Release Quiz Results
            </InputLabel>
            <Select
              id="select-trueFalse"
              value={isAutoRelease}
              onChange={(e) => setIsAutoRelease(e.target.value)}
            >
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">False</MenuItem>
            </Select>
          </Stack>
          <Grid container justifyContent={"space-between"}>
            <Button
              variant="contained"
              style={{ marginTop: "40px" }}
              onClick={handleClick}
            >
              Apply Quiz Settings
            </Button>
            <Button
              variant="contained"
              style={{ marginTop: "40px" }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
