import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import { useAuth } from "../context/AuthProvider";
import dayjs from "dayjs";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import LinkMaterial from "@mui/material/Link";

import {
  Breadcrumbs,
  Grid,
  IconButton,
  Modal,
  Paper,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import TeachingCoursesDrawer from "../components/TeachingCoursesDrawer";
import QuizQuestionComponent from "../components/QuizComponents/QuizQuestionComponent";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import QuizSettingsComponents from "../components/QuizComponents/QuizSettingsComponent";
import { Construction } from "@mui/icons-material";

export default function CreateQuizForm(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.pathname.split("/").slice(2, 3).join("/");
  const assessmentsPath = location.state.assessmentsPathProp;
  const createAssessmentPath = location.state.createAssessmentPathProp;
  const createQuizFormPath = location.pathname;
  const currentQuiz = location.state.newQuizProp;
  const maxAssessmentDiscountPoints = location.state.maxAssessmentDiscountPointsProp;
  const [formQuestions, setFormQuestions] = useState([]);
  const [textField, setTextField] = useState("");
  const [questionCounter, setQuestionCounter] = useState(0);
  const [openOptionErrorSnackbar, setOpenOptionErrorSnackbar] =
    React.useState(false);
  const [openMaxPointsErrorSnackbar, setopenMaxPointsErrorSnackbar] =
    React.useState(false);

  const [maxPointsError, setMaxPointsError] = useState({
    value: false,
    errorMessage: "",
  });
  const [correctOptionError, setCorrectOptionError] = useState({
    value: false,
    errorMessage: "",
  });

  const handleClickSnackbar = () => {
    setOpenOptionErrorSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenOptionErrorSnackbar(false);
  };

  React.useEffect(() => {
    currentQuiz.questions = formQuestions;
  }, []);

  const [open, setOpen] = React.useState(false);
  function handleOpenSettingsDialogue() {
    setOpen(true);
  }

  function validateQuiz() {
    setMaxPointsError({ value: false, errorMessage: "" });
    for (const question of formQuestions) {
      // if (question.questionMaxPoints == "") {
      //   // setMaxPointsError({
      //   //   value: true,
      //   //   errorMessage:
      //   //     "Max Points of question: " +
      //   //     question.questionTitle +
      //   //     " cannot be empty!",
      //   // });
      //   return false;
      // }
      if (question.questionType == "mcq" && question.correctOption == "") {
        // setCorrectOptionError({
        //   value: true,
        //   errorMessage:
        //     "Correct Option for question: " +
        //     question.questionTitle +
        //     " cannot be empty!",
        // });
        handleClickSnackbar();
        return false;
      }
    }
    return true;
  }

  function handleCloseSettingsDialogue(ed) {
    setOpen(false);
  }

  //need function to link questions to quiz prop
  function linkQuizQuestions() {
    currentQuiz.questions = formQuestions;
  }
  function editQuizSettings(
    title,
    description,
    discountPointForAssessment,
    discountPointToTopPercent,
    startDate,
    endDate,
    hasTimeLimit,
    timeLimit,
    isAutoRelease
  ) {
    console.log("editQuizSettings :: received startDate: ", startDate);
    console.log("editQuizSettings :: received endDate: ", endDate);

    currentQuiz.assessmentTitle = title;
    currentQuiz.assessmentDescription = description;
    currentQuiz.discountPointForAssessment = discountPointForAssessment;
    currentQuiz.discountPointToTopPercent = discountPointToTopPercent;
    currentQuiz.assessmentStartDate = startDate;
    currentQuiz.assessmentEndDate = endDate;
    currentQuiz.hasTimeLimit = hasTimeLimit;
    currentQuiz.timeLimit = timeLimit;
    currentQuiz.isAutoRelease = isAutoRelease;
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
      console.log("updated questionMaxPoints");
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
    console.log(
      "options after removal: ",
      tempFormQuestions[questionIndex].options
    );
    console.log("supposed to assign this: ", updatedOptions);
  }

  function selectCorrectQuestionOption(questionId, option) {
    console.log("correct option selected: ", option);
    const tempFormQuestions = [...formQuestions];
    const questionIndex = tempFormQuestions.findIndex(
      (f) => f.localid == questionId
    );
    console.log("here agaz");
    tempFormQuestions[questionIndex].correctOption = option;
    setFormQuestions(tempFormQuestions);
  }

  const addQuestion = () => {
    setQuestionCounter(questionCounter + 1);
    currentQuiz.questionCounter = questionCounter;
    const question = {
      localid: "question" + questionCounter,
      questionTitle: "Untitled Question",
      questionType: "shortAnswer",
      questionContent: "Type Question Body here...",
      questionHint: "Type Question Guide here...",
      questionMaxPoints: 0.0,
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
    return quizObject;
  };

  function calculateMaxQuizScore() {
    var maxScore = 0.0;
    for (const question of formQuestions) {
      maxScore = parseFloat(maxScore) + parseFloat(question.questionMaxPoints);
    }
    currentQuiz.assessmentMaxScore = maxScore;
    console.log("quiz max score: ", currentQuiz.assessmentMaxScore);
  }

  const handleSave = (e) => {
    e.preventDefault();
    calculateMaxQuizScore();
    if (validateQuiz()) {
      const updatedQuiz = handleQuizDateConversions(currentQuiz);
      linkQuizQuestions();
      console.log("quiz going to save: ", updatedQuiz);

      fetch("http://localhost:8080/quiz/createQuiz/" + courseId, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(updatedQuiz),
      }).then((res) => res.json());
      console.log("created Quiz: ", updatedQuiz);
      handleCancel();
    }
  };

  const handleCancel = (e) => {
    navigate(`${assessmentsPath}`);
  };

  return (
    <Grid container spacing={0}>
      <Snackbar
        open={openOptionErrorSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Select Correct MCQ Option Field cannot be empty!
        </Alert>
      </Snackbar>

      <Grid item xs={2}>
        <TeachingCoursesDrawer></TeachingCoursesDrawer>
      </Grid>
      <Grid item xs={10}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to={`${assessmentsPath}`}
            state={{
              assessmentsPathProp: { assessmentsPath },
            }}
            style={{ textDecoration: "none", color: "grey" }}
          >
            <LinkMaterial underline="hover" color="inherit">
              Assessments
            </LinkMaterial>
          </Link>
          <Link
            to={`${createAssessmentPath}`}
            style={{ textDecoration: "none", color: "grey" }}
            state={{
              createAssessmentPathProp: { createAssessmentPath },
              assessmentsPathProp: { assessmentsPath },
            }}
          >
            <LinkMaterial underline="hover" color="inherit">
              Create Assessment
            </LinkMaterial>
          </Link>
          <Link
            to={`${createQuizFormPath}`}
            style={{ textDecoration: "none", color: "grey" }}
            state={{
              createAssessmentPathProp: { createAssessmentPath },
              assessmentsPathProp: { assessmentsPath },
            }}
          >
            <LinkMaterial underline="hover" color="inherit">
              Create Quiz
            </LinkMaterial>
          </Link>
        </Breadcrumbs>

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
            <h1 style={{ color: "whitesmoke" }}>Quiz Creation</h1>
            <Button
              aria-label="settings"
              variant="contained"
              style={{ backgroundColor: "#989898" }}
              onClick={() => handleOpenSettingsDialogue()}
            >
              <SettingsIcon style={{ marginRight: 10 }} />
              Edit Settings
            </Button>
            <Modal
              open={open}
              onClose={handleCloseSettingsDialogue}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <QuizSettingsComponents
                quizSettingsProp={currentQuiz}
                maxAssessmentDiscountPointsProp={maxAssessmentDiscountPoints}
                startDateProp={currentQuiz.assessmentStartDate}
                endDateProp={currentQuiz.assessmentEndDate}
                editQuizSettingsProp={editQuizSettings}
                closeQuizSettingsProp={handleCloseSettingsDialogue}
                calculateMaxQuizScoreProp={calculateMaxQuizScore}
              ></QuizSettingsComponents>
            </Modal>
          </Grid>
          {formQuestions.length == 0 && (
            <Paper elevation={3} style={{ padding: 30, marginTop: 50 }}>
              <h3>Currently no questions!</h3>
              <br />
              <p>Start adding questions by clicking on "Add Question" Button</p>
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
            justifyContent={"space-between"}
            style={{ marginTop: "80px" }}
          >
            <Button variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Create Quiz
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
