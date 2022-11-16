import * as React from "react";
import dayjs from "dayjs";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import LinkMaterial from "@mui/material/Link";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Breadcrumbs,
  Grid,
  Modal,
  Paper,
  Button,
  TextField,
  Stack,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import TeachingCoursesDrawer from "../components/TeachingCoursesDrawer";
import QuizQuestionComponent from "../components/QuizComponents/QuizQuestionComponent";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import QuizSettingsComponents from "../components/QuizComponents/QuizSettingsComponent";
import EditSettingsComponent from "../components/QuizComponents/EditQuizSettingsComponent";
import EditQuizSettingsComponent from "../components/QuizComponents/EditQuizSettingsComponent";
import { CatchingPokemonSharp } from "@mui/icons-material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";

export default function EditQuizPage() {
  const location = useLocation();
  const navigate = useNavigate();

  var utc = require("dayjs/plugin/utc");
  var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
  dayjs.extend(utc);
  dayjs.extend(timezone);
 
  let currentDate = new Date();
  const offset = currentDate.getTimezoneOffset();
  currentDate = new Date(currentDate.getTime() + offset * 60 * 1000);

  const courseId = location.pathname.split("/").slice(2, 3).join("/");
  const assessmentsPath = location.state.assessmentPathProp;
  const editQuizPath = location.pathname;
  const assessmentId = location.state.assessmentIdProp;
  const [currentQuiz, setCurrentQuiz] = useState();
  const [formQuestions, setFormQuestions] = useState([]);
  const [textField, setTextField] = useState("");
  const [editSettings, setEditSettings] = useState("");
  const [questionCounter, setQuestionCounter] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [maxScore, setMaxScore] = useState();
  const [startDate, setStartDate] = useState(dayjs(currentDate.toISOString().split('T')[0]));
  const [endDate, setEndDate] = useState(dayjs(currentDate.toISOString().split('T')[0]));
  const [hasTimeLimit, setHasTimeLimit] = useState("true");
  const [timeLimit, setTimeLimit] = useState();
  const [isAutoRelease, setIsAutoRelease] = useState("false");
  const [open, setOpen] = React.useState(false);
  const [hasMaxAttempts, setHasMaxAttempts] = useState("");
  const [maxAttempts, setMaxAttempts] = useState(0);
  const paperStyle = { padding: "50px 20px", width: 1200, margin: "20px auto" };
  var startDateString = "";
  var endDateString = "";

  React.useEffect(() => {
    fetch(
      "http://localhost:8080/quiz/getQuizById/" +
        location.state.assessmentIdProp
    )
      .then((res) => res.json())
      .then((result) => {
        setCurrentQuiz(result);
        setFormQuestions(result.questions);
        setQuestionCounter(result.questionCounter + 1);
        setTitle(result.assessmentTitle);
        setDescription(result.assessmentDescription);
        setMaxScore(result.assessmentMaxScore);
        setStartDate(dayjs(result.assessmentStartDate).local().format());
        setEndDate(dayjs(result.assessmentEndDate).local().format());
        setHasTimeLimit(result.hasTimeLimit);
        setTimeLimit(result.timeLimit);
        setHasMaxAttempts(result.hasMaxAttempts);
        setMaxAttempts(result.maxAttempts);
        setIsAutoRelease(result.isAutoRelease);
      });
  }, []);

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
  const [maxAttemptsError, setMaxAttemptsError] = useState({
    value: false,
    errorMessage: "",
  });

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
    const dateComparisonBoolean = tempEndDate < tempStartDate;
    console.log("dateComparison pass: ", dateComparisonBoolean);
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
      editQuizSettings(
        title,
        description,
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
    setStartDate(dayjs(newDate).local().format());
    console.log("new start date: ", startDate);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(dayjs(newDate).local().format());
  };

  function handleProceedQuestions() {
    setFormQuestions(currentQuiz.questions);
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
        hasMaxAttempts,
        maxAttempts,
        isAutoRelease
      );
      setEditSettings("false");
    } else {
      console.log("did not pass the vibe check");
    }
  }
  function handleBackToSettings() {
    calculateMaxQuizScore();
    setEditSettings("true");
  }

  function validateQuiz() {
    setMaxScoreError({ value: false, errorMessage: "" });
    for (const question of formQuestions) {
      if (question.questionMaxPoints == "") {
        setMaxScoreError({
          value: true,
          errorMessage:
            "Max Points of question: " +
            question.questionTitle +
            " cannot be empty!",
        });
        return false;
      }
    }
    return true;
  }

  function linkQuizQuestions() {
    currentQuiz.questions = formQuestions;
  }

  function editQuizSettings(
    title1,
    description1,
    maxScore1,
    startDate1,
    endDate1,
    hasTimeLimit1,
    timeLimit1,
    isAutoRelease1
  ) {
    setTitle(title1);
    setDescription(description1);
    setMaxScore(maxScore1);
    setStartDate(startDate1);
    setEndDate(endDate1);
    setHasTimeLimit(hasTimeLimit1);
    setTimeLimit(timeLimit1);
    setIsAutoRelease(isAutoRelease1);
  }

  function editQuestionTitle(questionId, questionTitle) {
    const tempFormQuestions = [...formQuestions];
    const questionIndex = tempFormQuestions.findIndex(
      (f) => f.localid == questionId
    );
    if (questionIndex > -1) {
      tempFormQuestions[questionIndex].questionTitle = questionTitle;
      setFormQuestions(tempFormQuestions);
    }
  }

  function editQuestionType(questionId, questionType) {
    const tempFormQuestions = [...formQuestions];
    const questionIndex = tempFormQuestions.findIndex(
      (f) => f.localid == questionId
    );
    if (questionIndex > -1) {
      tempFormQuestions[questionIndex].questionType = questionType;
      setFormQuestions(tempFormQuestions);
    }
  }

  function editQuestionContent(questionId, questionContent) {
    const tempFormQuestions = [...formQuestions];
    const questionIndex = tempFormQuestions.findIndex(
      (f) => f.localid == questionId
    );
    if (questionIndex > -1) {
      tempFormQuestions[questionIndex].questionContent = questionContent;
      setFormQuestions(tempFormQuestions);
    }
  }

  function editQuestionHint(questionId, questionHint) {
    const tempFormQuestions = [...formQuestions];
    const questionIndex = tempFormQuestions.findIndex(
      (f) => f.localid == questionId
    );
    if (questionIndex > -1) {
      tempFormQuestions[questionIndex].questionHint = questionHint;
      setFormQuestions(tempFormQuestions);
    }
  }

  function editQuestionMaxPoints(questionId, questionMaxPoints) {
    const tempFormQuestions = [...formQuestions];
    const questionIndex = tempFormQuestions.findIndex(
      (f) => f.localid == questionId
    );
    if (questionIndex > -1) {
      tempFormQuestions[questionIndex].questionMaxPoints = questionMaxPoints;
      setFormQuestions(tempFormQuestions);
    }
  }

  function addQuestionOption(questionId, option) {
    const tempFormQuestions = [...formQuestions];
    const questionIndex = tempFormQuestions.findIndex(
      (f) => f.localid == questionId
    );
    if (option && option != "") {
      tempFormQuestions[questionIndex].options.push(option);
      setFormQuestions(tempFormQuestions);
      setTextField("");
    }
  }

  function removeQuestionOption(questionId, updatedOptions) {
    console.log("remove option called");
    const tempFormQuestions = [...formQuestions];
    const questionIndex = tempFormQuestions.findIndex(
      (f) => f.localid == questionId
    );
    if (updatedOptions && updatedOptions != "") {
      tempFormQuestions[questionIndex].options = updatedOptions;
    }
    setFormQuestions(tempFormQuestions);
    console.log(
      "options after removal: ",
      tempFormQuestions[questionIndex].options
    );
    console.log("supposed to assign this: ", updatedOptions);
  }

  function selectCorrectQuestionOption(questionId, option) {
    const tempFormQuestions = [...formQuestions];
    const questionIndex = tempFormQuestions.findIndex(
      (f) => f.localid == questionId
    );
    if (option && option != "") {
      tempFormQuestions[questionIndex].correctOption = option;
      setFormQuestions(tempFormQuestions);
      setTextField("");
    }
  }

  const addQuestion = () => {
    console.log("editQuiz questioncounter: ", questionCounter);
    setQuestionCounter(questionCounter + 1);
    currentQuiz.questionCounter = questionCounter;
    const question = {
      localid: "question" + questionCounter,
      questionTitle: "Untitled Question",
      questionType: "shortAnswer",
      questionContent: "Type Question Body here...",
      questionMaxPoints: "0.0 points",
      options: [],
      correctOption: "",
    };
    setFormQuestions([...formQuestions, question]);
  };

  const removeQuestion = (questionId) => {
    const questionIndex = formQuestions.findIndex(
      (f) => f.localid == questionId
    );
    const tempFormQuestions = [...formQuestions];
    if (questionIndex > -1) {
      setFormQuestions(
        tempFormQuestions.filter((question) => {
          return question.localid !== questionId;
        })
      );
    }
    console.log("removed question: " + questionId);
  };

  const handleQuizDateConversions = (quizObject) => {
    // const formattedStart = dayjs(quizObject.assessmentStartDate.d).format(
    //   "YYYY-MM-DD"
    // );
    // const formattedEnd = dayjs(quizObject.assessmentEndDate.d).format(
    //   "YYYY-MM-DD"
    // );
    // quizObject.assessmentStartDate = formattedStart;
    // quizObject.assessmentEndDate = formattedEnd;
    return quizObject;
  };

  function calculateMaxQuizScore() {
    var tempMaxScore = 0;
    for (const question of formQuestions) {
      tempMaxScore =
        parseFloat(tempMaxScore) + parseFloat(question.questionMaxPoints);
    }
    setMaxScore(tempMaxScore);
    console.log("quiz max score: ", tempMaxScore);
  }

  const handleSave = (e) => {
    e.preventDefault();
    linkQuizQuestions();
    calculateMaxQuizScore();
    currentQuiz.assessmentTitle = title;
    currentQuiz.assessmentDescription = description;
    currentQuiz.assessmentMaxScore = maxScore;
    currentQuiz.assessmentStartDate = startDate;
    currentQuiz.assessmentEndDate = endDate;
    currentQuiz.hasTimeLimit = hasTimeLimit;
    currentQuiz.timeLimit = timeLimit;
    currentQuiz.isAutoRelease = isAutoRelease;
    currentQuiz.hasMaxAttempts = hasMaxAttempts;
    currentQuiz.maxAttempts = maxAttempts;
    const updatedQuiz = handleQuizDateConversions(currentQuiz);
    console.log("trying to update quiz: ", updatedQuiz);
    fetch(
      "http://localhost:8080/quiz/updateQuizById/" + currentQuiz.assessmentId,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedQuiz),
      }
    )
      .then((res) => res.json())
      .then(console.log("saved: ", updatedQuiz));
    handleCancel();
  };

  const handleCancel = (e) => {
    navigate(`${assessmentsPath}`);
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={2}>
        <TeachingCoursesDrawer></TeachingCoursesDrawer>
      </Grid>
      <Grid item xs={10}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to={`${assessmentsPath}`}
            style={{ textDecoration: "none", color: "grey" }}
          >
            <LinkMaterial underline="hover" color="inherit">
              Assessments
            </LinkMaterial>
          </Link>
          <Link
            to={`${editQuizPath}`}
            state={{ assessmentPathProp: assessmentsPath }}
            style={{ textDecoration: "none", color: "grey" }}
          >
            <LinkMaterial underline="hover" color="inherit">
              Edit Quiz
            </LinkMaterial>
          </Link>
        </Breadcrumbs>

        {editSettings == "false" ? (
          <Grid item width={"80%"}>
            <Grid
              container
              direction={"row"}
              justifyContent={"space-between"}
              style={{
                marginTop: 30,
                backgroundColor: "#1975D2",
                paddingLeft: 10,
              }}
            >
              <h1 style={{ color: "whitesmoke" }}>Edit Quiz Questions</h1>
              <Button
                aria-label="settings"
                variant="contained"
                style={{ backgroundColor: "#989898" }}
                onClick={() => handleBackToSettings()}
              >
                <SettingsIcon style={{ marginRight: 10 }} />
                Back To Settings
              </Button>
            </Grid>
            {formQuestions.length == 0 && (
              <Paper elevation={3} style={{ padding: 30, marginTop: 50 }}>
                <h3>Currently no questions!</h3>
                <br />
                <p>
                  Start adding questions by clicking on "Add Question" Button
                </p>
              </Paper>
            )}

            {formQuestions.map((question, index) => {
              return (
                <Paper elevation={3} style={{ padding: 30, marginTop: 50 }}>
                  <QuizQuestionComponent
                    textFieldProp={textField}
                    setTextFieldProp={setTextField}
                    questionProp={question}
                    editQuestionTitleProp={editQuestionTitle}
                    editQuestionTypeProp={editQuestionType}
                    addQuestionOptionProp={addQuestionOption}
                    removeQuestionOptionProp={removeQuestionOption}
                    selectCorrectOptionProp={selectCorrectQuestionOption}
                    editQuestionContentProp={editQuestionContent}
                    editQuestionHintProp={editQuestionHint}
                    removeQuestionProp={removeQuestion}
                    editQuestionMaxPointsProp={editQuestionMaxPoints}
                  />
                </Paper>
              );
            })}

            <Grid
              container
              style={{ marginBottom: 90, marginTop: 20 }}
              direction="row"
              justifyContent={"space-between"}
            >
              <Button
                color="secondary"
                variant="contained"
                onClick={() => addQuestion()}
              >
                <AddIcon style={{ marginRight: "10px" }} />
                Add Question
              </Button>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent={"center"}
              style={{ marginTop: "80px" }}
            >
              <Button variant="contained" onClick={handleSave}>
                <SaveIcon style={{ marginRight: "10" }} />
                Save Quiz
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid item width={"80%"}>
            <Grid
              container
              direction={"row"}
              justifyContent={"space-between"}
              style={{
                marginTop: 30,
                backgroundColor: "#1975D2",
                paddingLeft: 10,
              }}
            >
              <h1 style={{ color: "whitesmoke" }}>Edit Quiz Settings</h1>
              <Button
                aria-label="settings"
                variant="contained"
                style={{ backgroundColor: "#989898" }}
                onClick={() => handleProceedQuestions()}
              >
                Proceed to Questions
              </Button>
            </Grid>
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
                    label={startDateString}
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
              <Grid container justifyContent={"space-between"}></Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
