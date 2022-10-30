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
  const paperStyle = { padding: "50px 20px", width: 1200, margin: "20px auto" };
  const quizSettings = props.quizSettingsProp;
  const [questions, setQuestions] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [hasTimeLimit, setHasTimeLimit] = useState("");
  const [timeLimit, setTimeLimit] = useState();
  const [hasMaxAttempts, setHasMaxAttempts] = useState("");
  const [maxAttempts, setMaxAttempts] = useState();

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

  React.useEffect(() => {
    setQuestions(quizSettings.questions);
    setTitle(quizSettings.assessmentTitle);
    setDescription(quizSettings.assessmentDescription);
    // setMaxScore(quizSettings.assessmentMaxScore);
    props.calculateMaxQuizScoreProp();
    setMaxScore(quizSettings.assessmentMaxScore);
    setStartDate(quizSettings.assessmentStartDate);
    setEndDate(quizSettings.assessmentEndDate);
    setHasTimeLimit(quizSettings.hasTimeLimit);
    setTimeLimit(quizSettings.timeLimit);
    setHasMaxAttempts(quizSettings.hasMaxAttempts);
    setMaxAttempts(quizSettings.maxAttempts);
    setIsAutoRelease(quizSettings.isAutoRelease);
    startDateString = dayjs(startDate.d).format("YYYY/MM/DD");
    endDateString = dayjs(endDate.d).format("YYYY/MM/DD");
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
    hasMaxAttempts,
    maxAttempts,
    isAutoRelease
  ) {
    props.editQuizSettingsProp(
      title,
      description,
      startDate,
      endDate,
      hasTimeLimit,
      timeLimit,
      hasMaxAttempts,
      maxAttempts,
      isAutoRelease
    );
  }

  function validateQuizSettings() {
    const tempStartDate = startDate;
    const tempEndDate = endDate;
    const dateComparisonBoolean = tempEndDate >= tempStartDate;
    if (hasTimeLimit == "true" || hasMaxAttempts == "true") {
      if (hasTimeLimit == "true" && hasMaxAttempts == "true") {
        console.log("fail dis");
        return (
          title &&
          description &&
          maxScore &&
          dateComparisonBoolean &&
          timeLimit > 4 &&
          maxAttempts > 0
        );
      } else if (hasTimeLimit == "true") {
        console.log("fail dat");
        return (
          title &&
          description &&
          maxScore &&
          dateComparisonBoolean &&
          timeLimit > 4
        );
      } else {
        console.log("fail dat other one");

        return (
          title &&
          description &&
          maxScore &&
          dateComparisonBoolean &&
          maxAttempts > 0
        );
      }
    } else {
      return title && description && maxScore && dateComparisonBoolean;
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
    if (maxAttempts < 1) {
      setMaxAttemptsError({
        value: true,
        errorMessage: "Maximum Quiz Attempts Allowed must be more than 0!",
      });
    }
    if (validateQuizSettings()) {
      console.log("passedValidations");
      editQuizSettings(
        title,
        description,
        maxScore,
        startDate,
        endDate,
        hasTimeLimit,
        timeLimit,
        isAutoRelease,
        hasMaxAttempts,
        maxAttempts
      );
      handleCancel();
    } else {
      console.log("did not pass the vibe check");
    }
  };

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
    console.log("new start date: ", startDate);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
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
          <Paper elevation={1} style={{ padding: "10px", marginBottom: "20px"}}>
            <p style={{ color: "grey" }}>Quiz Max Score (Auto-Generated)</p>
            <br/>
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
                inputFormat="MM/DD/YYYY"
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
                inputFormat="MM/DD/YYYY"
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
          {/* <Stack
            spacing={1}
            style={{ paddingBottom: "10px", marginTop: "20px" }}
          >
            <p style={{ color: "grey" }}>Quiz Has Max Attempts</p>
            <Select
              id="select-trueFalse"
              value={hasMaxAttempts}
              onChange={(e) => setHasMaxAttempts(e.target.value)}
              defaultValue={hasMaxAttempts}
            >
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">False</MenuItem>
            </Select>

            {hasMaxAttempts == "true" && (
              <TextField
                error={maxAttemptsError.value}
                helperText={maxAttemptsError.errorMessage}
                id="outlined-basic"
                label="Maximum Attempts Allowed"
                variant="outlined"
                fullWidth
                style={{
                  paddingBottom: "10px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
                value={maxAttempts}
                defaultValue={maxAttempts}
                onChange={(e) => setMaxAttempts(e.target.value)}
              />
            )}
          </Stack> */}

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
