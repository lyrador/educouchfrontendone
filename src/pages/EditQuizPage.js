import * as React from "react";
import dayjs from "dayjs";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import LinkMaterial from "@mui/material/Link";

import { Breadcrumbs, Grid, Modal, Paper, Button } from "@mui/material";
import { useState } from "react";
import TeachingCoursesDrawer from "../components/TeachingCoursesDrawer";
import QuizQuestionComponent from "../components/QuizComponents/QuizQuestionComponent";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import QuizSettingsComponents from "../components/QuizComponents/QuizSettingsComponent";
import EditSettingsComponent from "../components/QuizComponents/EditQuizSettingsComponent";
import EditQuizSettingsComponent from "../components/QuizComponents/EditQuizSettingsComponent";

export default function EditQuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.pathname.split("/").slice(2, 3).join("/");
  const assessmentsPath = location.state.assessmentPathProp;
  const editQuizPath = location.pathname;
  const assessmentId = location.state.assessmentIdProp;
  const [currentQuiz, setCurrentQuiz] = useState();
  const [formQuestions, setFormQuestions] = useState([]);
  const [textField, setTextField] = useState("");
  const [editSettings, setEditSettings] = useState("");

  const [maxPointsError, setMaxPointsError] = useState({
    value: false,
    errorMessage: "",
  });

  React.useEffect(() => {
    fetch(
      "http://localhost:8080/quiz/getQuizById/" +
        location.state.assessmentIdProp
    )
      .then((res) => res.json())
      .then((result) => {
        setCurrentQuiz(result);
        setFormQuestions(result.questions);
        console.log("here is the quiz: ", currentQuiz);
      });
  }, [editSettings]);

  const [open, setOpen] = React.useState(false);
  function handleProceedQuestions() {
      setFormQuestions(currentQuiz.questions);
    setEditSettings("false");
  }
  function handleBackToSettings() {
    setEditSettings("true");
  }

  function validateQuiz() {
    setMaxPointsError({ value: false, errorMessage: "" });
    for (const question of formQuestions) {
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
    }
    return true;
  }

  function handleCloseSettingsDialogue(ed) {
    setOpen(false);
  }

  function linkQuizQuestions() {
    currentQuiz.questions = formQuestions;
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
    currentQuiz.assessmentTitle = title;
    currentQuiz.assessmentDescription = description;
    currentQuiz.assessmentMaxScore = maxScore;
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
    const questionNumber = formQuestions.length + 1;
    const question = {
      localid: "question" + questionNumber,
      questionTitle: "Question " + questionNumber,
      questionType: "shortAnswer",
      questionContent: "Type Question Body here...",
      questionMaxPoints: "",
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
    const formattedStart = dayjs(quizObject.assessmentStartDate.d).format(
      "YYYY-MM-DD"
    );
    const formattedEnd = dayjs(quizObject.assessmentEndDate.d).format(
      "YYYY-MM-DD"
    );
    quizObject.assessmentStartDate = formattedStart;
    quizObject.assessmentEndDate = formattedEnd;
    return quizObject;
  };

  //need to call update function here
  const handleSave = (e) => {
    //   e.preventDefault();
    //   const updatedQuiz = handleQuizDateConversions(currentQuiz);
    //   linkQuizQuestions();
    //   fetch("http://localhost:8080/quiz/createQuiz/" + courseId, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(updatedQuiz),
    //   }).then((res) => res.json());
    //   handleCancel();
  };

  const handleCancel = (e) => {
    //   navigate(`${assessmentsPath}`);
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
                    removeQuestionProp={removeQuestion}
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
              <Button variant="contained" onClick={handleSave}>
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
            {/* <EditQuizSettingsComponent
              quizProp={currentQuiz}
              editSettingsProp={editQuizSettings}
            ></EditQuizSettingsComponent> */}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
