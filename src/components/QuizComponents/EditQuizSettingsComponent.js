import {
  Alert,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
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

export default function EditQuizSettingsComponent(props) {
  const paperStyle = { padding: "50px 20px", width: 1200, margin: "20px auto" };
  const [currentQuiz, setCurrentQuiz] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [hasTimeLimit, setHasTimeLimit] = useState("");
  const [timeLimit, setTimeLimit] = useState();
  const [isAutoRelease, setIsAutoRelease] = useState("");
  var startDateString = "";
  var endDateString = "";

  const [openReleaseSnackbar, setOpenReleaseSnackbar] = React.useState(false);

  const handleClickReleaseSnackbar = () => {
    setOpenReleaseSnackbar(true);
  };

  const handleCloseReleaseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenReleaseSnackbar(false);
  };

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
    setCurrentQuiz(props.quizProp);
    setTitle(props.titleProp);
    setDescription(props.descriptionProp);
    setMaxScore(props.maxScoreProp);
    setStartDate(props.startDateProp);
    setEndDate(props.endDateProp);
    setHasTimeLimit(props.hasTimeLimitProp);
    setTimeLimit(props.timeLimitProp);
    setIsAutoRelease(props.isAutoReleaseProp);
    startDateString = dayjs(startDate.$d).format("YYYY/MM/DD");
    endDateString = dayjs(endDate.$d).format("YYYY/MM/DD");
    console.log("heres title prop: ", props.titleProp);
  }, []);

  function handleCancel() {
    setTitle(props.titleProp);
    setDescription(props.descriptionProp);
    setMaxScore(props.maxScoreProp);
    setStartDate(props.startDateProp);
    setEndDate(props.endDateProp);
    setHasTimeLimit(props.hasTimeLimitProp);
    setTimeLimit(props.timeLimitProp);
    setIsAutoRelease(props.isAutoReleaseProp);
    startDateString = dayjs(startDate.d).format("YYYY/MM/DD");
    endDateString = dayjs(endDate.d).format("YYYY/MM/DD");
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
    props.editSettingsProp(
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
      props.editSettingsProp(
        title,
        description,
        maxScore,
        startDate,
        endDate,
        hasTimeLimit,
        timeLimit,
        isAutoRelease
      );
      console.log("passedValidations");
      handleClickReleaseSnackbar();
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
        <Snackbar
          open={openReleaseSnackbar}
          autoHideDuration={5000}
          onClose={handleCloseReleaseSnackbar}
        >
          <Alert
            onClose={handleCloseReleaseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Quiz Settings Changes Applied!
          </Alert>
        </Snackbar>

        <Paper elevation={3} style={paperStyle}>
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
          <p style={{ color: "grey" }}>Quiz Max Score</p>
          <TextField
            required
            error={maxScoreError.value}
            helperText={maxScoreError.errorMessage}
            id="outlined-basic"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px", marginBottom: "20px" }}
            value={maxScore}
            onChange={(e) => setMaxScore(e.target.value)}
          />
          <Stack
            spacing={1}
            style={{ paddingBottom: "10px", marginBottom: "20px" }}
          >
            <p style={{ color: "grey" }}>Quiz Start Date</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label={startDateString}
                inputFormat="YYYY/MM/DD"
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
                label={endDateString}
                inputFormat="YYYY/MM/DD"
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
              onClick={handleCancel}
            >
              Discard Changes
            </Button>
            <Button
              variant="contained"
              style={{ marginTop: "40px" }}
              onClick={handleClick}
            >
              Apply Changes
            </Button>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
