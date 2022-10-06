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
import { SettingsOutlined } from "@mui/icons-material";

export default function QuizSettingsComponents(props) {
  const paperStyle = { padding: "50px 20px", width: 1200, margin: "20px auto" };
  const quizSettings = props.quizSettingsProp;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hasTimeLimit, setHasTimeLimit] = useState("");
  const [timeLimit, setTimeLimit] = useState();
  const [isAutoRelease, setIsAutoRelease] = useState("");

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

  React.useEffect(() => {
    setTitle(quizSettings.assessmentTitle);
    setDescription(quizSettings.assessmentDescription);
    setMaxScore(quizSettings.assessmentMaxScore);
    setStartDate(quizSettings.assessmentStartDate);
    setEndDate(quizSettings.assessmentEndDate);
    setHasTimeLimit(quizSettings.hasTimeLimit);
    setTimeLimit(quizSettings.timeLimit);
    setIsAutoRelease(quizSettings.isAutoRelease);
  }, []);

  function handleCancel() {
    props.closeQuizSettingsProp();
  }

  function editQuizSettings(
    title,
    description,
    maxScore,
    startDate,
    endDate,
    hasTimeLimit,
    timeLimit,
    isAutoRelease
  ) {
    props.editQuizSettingsProp(
      title,
      description,
      maxScore,
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
    const dateComparisonBoolean = tempEndDate >= tempStartDate;
    if (hasTimeLimit == "true") {
      return (
        title &&
        description &&
        maxScore &&
        dateComparisonBoolean &&
        timeLimit > 4
      );
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
        isAutoRelease
      );
      handleCancel()
    } else {
      console.log("did not pass the vibe check");
    }
  };

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
  };

  return (
    <Box component="form">
      <Container>
        <Paper elevation={3} style={paperStyle}>
          <h1> quiz settings dis 1</h1>
          <TextField
            required
            error={titleError.value}
            helperText={titleError.errorMessage}
            id="outlined-basic"
            label="Quiz Title"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            multiline
            required
            error={descriptionError.value}
            helperText={descriptionError.errorMessage}
            id="outlined-basic"
            label="Quiz Description"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            required
            error={maxScoreError.value}
            helperText={maxScoreError.errorMessage}
            id="outlined-basic"
            label="Quiz Max Score"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={maxScore}
            onChange={(e) => setMaxScore(e.target.value)}
          />
          <Stack spacing={1}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Quiz Start Date"
                inputFormat="DD/MM/YYYY"
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
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="End Date"
                inputFormat="DD/MM/YYYY"
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
            <InputLabel id="select-timeLimit-trueFalse">
              Quiz Time Limit
            </InputLabel>
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
              style={{ paddingBottom: "10px", marginTop: "20px" }}
              value={timeLimit}
              defaultValue={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)
              }
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
