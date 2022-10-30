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
  console.log(location)
  //console.log(props.pageId); 
  const navigate = useNavigate();
  const courseId = location.pathname.split("/").slice(2, 3).join("/");
  const createQuizFormPath = location.pathname;
  const currentQuiz = location.state.newQuizProp;
  const [question, setQuestion] = useState({localid: "1",
  questionTitle: "title",
  questionType: "shortAnswer",
  questionContent: "Type Question Body here...",
  questionMaxPoints: 0.0,
  options: [],
  correctOption: ""}); 

  const [quiz1, setQuiz1] = useState({
    assessmentTitle: "dummy",
    assessmentDescription: "dummy",
    assessmentMaxScore: 100,
    assessmentStartDate: new Date(),
    assessmentEndDate: new Date(),
    assessmentIsOpen: "false",
    assessmentStatusEnum: "PENDING",
    hasTimeLimit: "false",
    timeLimit: 60,
    hasMaxAttempts: "false",
    maxAttempts: 0,
    isAutoRelease: "false",
    questions: [],
    questionCounter: 0,
  })
  const [count, setCount] = useState(""); 
  var x = 1; 
  // const [formQuestions, setFormQuestions] = useState([]);
  const [textField, setTextField] = useState("");
  const [questionList, setQuestionList] = useState([]); 
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
    x = 1; 
    console.log("heres the question: ", question);
    console.log("getting triggered"); 
  }, [x]);

  const [open, setOpen] = React.useState(false);
  function handleOpenSettingsDialogue() {
    setOpen(true);
  }

  function validateQuiz() {
    setMaxPointsError({ value: false, errorMessage: "" });
      if (question.questionMaxPoints == "") {
        setMaxPointsError({
          value: true,
          errorMessage:
            "Max Points of question: " +
            question.questionTitle +
            " cannot be empty!",
        });
        return false;
      }
      if (question.questionType == "mcq" && question.correctOption == "") {
        setCorrectOptionError({
          value: true,
          errorMessage:
            "Correct Option for question: " +
            question.questionTitle +
            " cannot be empty!",
        });
        handleClickSnackbar();
        return false;
      }
    return true;
  }

  // function handleCloseSettingsDialogue(ed) {
  //   setOpen(false);
  // }

 //need function to link questions to quiz prop
  function linkQuizQuestions() {    
      // questionList.push(question)
      // setQuestionList(questionList)
      // console.log(questionList); 
      quiz1.questions.push(question); 
      console.log(quiz1)
  }
  function editQuizSettings(
    title,
    description,
    maxScore,
    startDate,
    endDate,
    hasTimeLimit,
    timeLimit,
    isAutoRelease, 
    questions
  ) 
  {
    currentQuiz.assessmentTitle = title;
    currentQuiz.assessmentDescription = description;
    currentQuiz.assessmentMaxScore = maxScore;
    currentQuiz.assessmentStartDate = startDate;
    currentQuiz.assessmentEndDate = endDate;
    currentQuiz.hasTimeLimit = hasTimeLimit;
    currentQuiz.timeLimit = timeLimit;
    currentQuiz.isAutoRelease = isAutoRelease;
    currentQuiz.questions = questions
  }

  function editQuestionTitle(localId, questionTitle) {
    console.log("passing in: ", questionTitle)
    question.questionTitle = questionTitle;
    setQuestion(question)
    console.log(question); 
    console.log("question title now: ", question.questionTitle)
  }

  function editQuestionType(localId, questionType) {
    question.questionType = questionType; 
    setQuestion(question); 
    console.log("question type now: ", question.questionType)
  }

  function editQuestionContent(localId, questionContent) {
    question.questionContent = questionContent; 
    setQuestion(question); 
    console.log("question content now: ", question.questionContent)
  }

  function editQuestionHint(localId, questionHint) {
    question.questionHint = questionHint; 
    setQuestion(question); 
    console.log("question hint is now: ", question.questionHint)
  }

  function editQuestionMaxPoints(localId, questionMaxPoints) {
    question.questionMaxPoints = questionMaxPoints; 
    setQuestion(question); 
    console.log("question max points is now", question.questionMaxPoints)
  }

  function addQuestionOption(localId, option) {
    if (option && option != "") {
      question.options.push(option);
      setQuestion(question);
      setTextField("");
    }
  }

  function removeQuestionOption(localId, updatedOptions) {
    console.log("remove option called");
    if (updatedOptions && updatedOptions != "") {
      question.options = updatedOptions;
    }
    console.log(
      "options after removal: ",
      question.options
    );
    console.log("supposed to assign this: ", updatedOptions);
  }

  function selectCorrectQuestionOption(localId, option) {
    if (option && option != "") {
      question.correctOption = option;
      setQuestion(question);
      console.log("correct option selected: ", option);
    }
  }

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
       //const updatedQuiz = handleQuizDateConversions(currentQuiz);
      linkQuizQuestions();
      console.log(quiz1)

      fetch("http://localhost:8080/quiz/createQuizForInteractivePage/" + 1, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(quiz1),
      }).then((res) => res.json());
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
              editQuestionTypeProp={editQuestionType}
              addQuestionOptionProp={addQuestionOption}
              selectCorrectOptionProp={selectCorrectQuestionOption}
              editQuestionContentProp={editQuestionContent}
              removeQuestionOptionProp={removeQuestionOption}
              editQuestionHintProp={ editQuestionHint}
              editQuestionMaxPointsProp={editQuestionMaxPoints}
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
