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

export default function CreateInteractiveQuizForm(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.pathname.split("/").slice(2, 3).join("/");
  const assessmentsPath = location.state.assessmentsPathProp;
  const createAssessmentPath = location.state.createAssessmentPathProp;
  const createQuizFormPath = location.pathname;
  const currentQuiz = location.state.newQuizProp;
  const [question, setQuestion] = useState({
    localid: "1",
    questionTitle: "this is waryl",
    questionType: "shortAnswer",
    questionContent: "Type Question Body here...",
    questionMaxPoints: 0.0,
    options: [],
    correctOption: "",
  });
  // const [formQuestions, setFormQuestions] = useState([]);
  const [textField, setTextField] = useState("");
  // const [questionCounter, setQuestionCounter] = useState(0);
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
    // currentQuiz.questions = formQuestions;
    console.log("heres the question: ", question);
  }, []);

  const [open, setOpen] = React.useState(false);
  function handleOpenSettingsDialogue() {
    setOpen(true);
  }

  function validateQuiz() {
    // setMaxPointsError({ value: false, errorMessage: "" });
    // // for (const question of formQuestions) {
    //   // if (question.questionMaxPoints == "") {
    //   //   // setMaxPointsError({
    //   //   //   value: true,
    //   //   //   errorMessage:
    //   //   //     "Max Points of question: " +
    //   //   //     question.questionTitle +
    //   //   //     " cannot be empty!",
    //   //   // });
    //   //   return false;
    //   // }
    //   if (question.questionType == "mcq" && question.correctOption == "") {
    //     // setCorrectOptionError({
    //     //   value: true,
    //     //   errorMessage:
    //     //     "Correct Option for question: " +
    //     //     question.questionTitle +
    //     //     " cannot be empty!",
    //     // });
    //     handleClickSnackbar();
    //     return false;
    //   }
    // }
    // return true;
  }


  function handleCloseSettingsDialogue(ed) {
    setOpen(false);
  }

  //need function to link questions to quiz prop
  // function linkQuizQuestions() {
  //   currentQuiz.questions = formQuestions;
  // }
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
    currentQuiz.assessmentTitle = title;
    currentQuiz.assessmentDescription = description;
    currentQuiz.assessmentMaxScore = maxScore;
    currentQuiz.assessmentStartDate = startDate;
    currentQuiz.assessmentEndDate = endDate;
    currentQuiz.hasTimeLimit = hasTimeLimit;
    currentQuiz.timeLimit = timeLimit;
    currentQuiz.isAutoRelease = isAutoRelease;
  }

  function editQuestionTitle(localId, questionTitle) {
    console.log("passing in: ", questionTitle)
    question.questionTitle = questionTitle;
    setQuestion(question)
    console.log("question title now: ", question.questionTitle)
  }

  // function editQuestionType(questionId, questionType) {
  //   const tempFormQuestions = [...formQuestions];
  //   const questionIndex = tempFormQuestions.findIndex(
  //     (f) => f.localid == questionId
  //   );
  //   if (questionIndex > -1) {
  //     tempFormQuestions[questionIndex].questionType = questionType;
  //     setFormQuestions(tempFormQuestions);
  //   }
  // }

  // function editQuestionContent(questionId, questionContent) {
  //   const tempFormQuestions = [...formQuestions];
  //   const questionIndex = tempFormQuestions.findIndex(
  //     (f) => f.localid == questionId
  //   );
  //   if (questionIndex > -1) {
  //     tempFormQuestions[questionIndex].questionContent = questionContent;
  //     setFormQuestions(tempFormQuestions);
  //   }
  // }

  // function editQuestionMaxPoints(questionId, questionMaxPoints) {
  //   const tempFormQuestions = [...formQuestions];
  //   const questionIndex = tempFormQuestions.findIndex(
  //     (f) => f.localid == questionId
  //   );
  //   if (questionIndex > -1) {
  //     tempFormQuestions[questionIndex].questionMaxPoints = questionMaxPoints;
  //     setFormQuestions(tempFormQuestions);
  //     console.log("updated questionMaxPoints");
  //   }
  // }

  // function addQuestionOption(questionId, option) {
  //   const tempFormQuestions = [...formQuestions];
  //   const questionIndex = tempFormQuestions.findIndex(
  //     (f) => f.localid == questionId
  //   );
  //   if (option && option != "") {
  //     tempFormQuestions[questionIndex].options.push(option);
  //     setFormQuestions(tempFormQuestions);
  //     setTextField("");
  //   }
  // }

  // function removeQuestionOption(questionId, updatedOptions) {
  //   console.log("remove option called");
  //   const tempFormQuestions = [...formQuestions];
  //   const questionIndex = tempFormQuestions.findIndex(
  //     (f) => f.localid == questionId
  //   );
  //   if (updatedOptions && updatedOptions != "") {
  //     tempFormQuestions[questionIndex].options = updatedOptions;
  //   }
  //   console.log(
  //     "options after removal: ",
  //     tempFormQuestions[questionIndex].options
  //   );
  //   console.log("supposed to assign this: ", updatedOptions);
  // }

  // function selectCorrectQuestionOption(questionId, option) {
  //   const tempFormQuestions = [...formQuestions];
  //   const questionIndex = tempFormQuestions.findIndex(
  //     (f) => f.localid == questionId
  //   );
  //   if (option && option != "") {
  //     tempFormQuestions[questionIndex].correctOption = option;
  //     setFormQuestions(tempFormQuestions);
  //     console.log("correct option selected: ", option);
  //   }
  // }

  // const handleQuizDateConversions = (quizObject) => {
  //   const formattedStart = dayjs(quizObject.assessmentStartDate.d).format(
  //     "YYYY-MM-DD"
  //   );
  //   const formattedEnd = dayjs(quizObject.assessmentEndDate.d).format(
  //     "YYYY-MM-DD"
  //   );
  //   quizObject.assessmentStartDate = formattedStart;
  //   quizObject.assessmentEndDate = formattedEnd;
  //   return quizObject;
  // };

  // function calculateMaxQuizScore() {
  //   var maxScore = 0;
  //   for (const question of formQuestions) {
  //     maxScore += question.questionMaxPoints;
  //   }
  //   console.log("quiz max score: ", maxScore);
  // }

  const handleSave = (e) => {
    e.preventDefault();
    //edit validatequiz to just make sure the mcq/ truefalse questions have a non-null questionGuide or somehting
    if (validateQuiz()) {
      // const updatedQuiz = handleQuizDateConversions(currentQuiz);
      // linkQuizQuestions();

      // fetch("http://localhost:8080/quiz/createQuiz/" + courseId, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },

      //   body: JSON.stringify(updatedQuiz),
      // }).then((res) => res.json());
      handleCancel();
    }
  };

  const handleCancel = (e) => {
    //need to implement
    //do something like close dialogue
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
          </Grid>
          <Paper elevation={3} style={{ padding: 30, marginTop: 50 }}>
            <QuizQuestionComponent
              textFieldProp={textField}
              setTextFieldProp={setTextField}
              questionProp={question}
              editQuestionTitleProp={editQuestionTitle}
              // editQuestionTypeProp={editQuestionType}
              // selectCorrectOptionProp={selectCorrectQuestionOption}
              // editQuestionContentProp={editQuestionContent}
              // removeQuestionProp={removeQuestion}
              // editQuestionMaxPointsProp={editQuestionMaxPoints}
            />
          </Paper>

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
  )
}
