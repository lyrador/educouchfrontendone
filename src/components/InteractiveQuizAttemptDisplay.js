import { Alert, AlertTitle, Button, Grid, ListItemButton, ListItemText, Paper } from "@mui/material";
import React, { useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import QuizQuestionAttemptComponent from "./QuizAttemptComponents/QuizQuestionAttemptComponent";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../context/AuthProvider";

export default function InteractiveQuizAttemptDisplay(props) {
  const auth = useAuth();
  const user = auth.user;

  const [currentQuiz, setCurrentQuiz] = useState();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [questionAttempts, setQuestionAttempts] = useState(
    props.questionAttemptsProp
  );
  const [quizAttempt, setQuizAttempt] = useState(props.currentQuizAttemptProp);
  const [quizStatusEnum, setQuizStatusEnum] = useState();
  const [answerTrigger, setAnswerTrigger] = useState(false);
  const [wrongAnswerTrigger, setWrongAnswerTrigger] = useState(false);


  var isPreview = props.isPreviewProp;
  var assessmentsPath = props.assessmentsPathProp;
  var quizAttemptLoaded = true;

  const [timer, setTimer] = useState("00:00:00");
  const [panic, setPanic] = useState(false);
  const Ref = useRef(null);

  const navigate = useNavigate();
  var location = useLocation(props);
  var courseId = props.courseIdProp;
  var bookId = props.bookIdProp;
  var pageId = props.pageIdProp;
  
  //   var learnerStatus = location.state.learnerStatusProp;

  React.useEffect(() => {
    console.log("quizAttemptDisplay useEffect called");
    // clearTimer(getDeadTime());
    setCurrentQuiz(props.currentQuizProp);
    setAssessmentAttemptStatusEnum(props.assessmentAttemptStatusEnumProp);
    setQuizAttempt(props.currentQuizAttemptProp);
    setQuizQuestions(props.questionsProp);
    setQuizStatusEnum(props.assessmentStatusEnum);
    setQuestionAttempts(props.questionAttemptsProp);
  }, [pageId]);



  function handleExit() {
    navigate(`/learnerCourseDetails/` + bookId + `/learnerInteractiveBook`, {
      state: {
        courseIdProp: courseId,
        bookIdProp: bookId
      },
    });
  }

  function handleExitPreview() { }
  function handleSubmitQuizAttempt() {
    console.log("clicked handleSubmitQuiz");
    if (quizAttempt.questionAttempts[0]) {

      var chosenAnswer = quizAttempt.questionAttempts[0].optionSelected;
      console.log(chosenAnswer)
      console.log(quizQuestions[0].correctOption);
      if (chosenAnswer.toString() == quizQuestions[0].correctOption) {
        console.log("Congrats! you've submitted the right answer!");
        setAnswerTrigger(true);
        setWrongAnswerTrigger(false);
        setAssessmentAttemptStatusEnum("SUBMITTED"); 
        fetch(
          "http://localhost:8080/quizAttempt/submitQuizAttempt/" +
          quizAttempt.quizAttemptId,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(quizAttempt),
          }
        ).then(handleExit());
        
        
      } else {
        console.log("You've submitted the wrong answer, please try again");
        setAnswerTrigger(false);
        setWrongAnswerTrigger(true);
      }

    } else if (quizAttempt.questionAttempts[0].optionSelected == "") {
      console.log("please select an option before submitting");
      setAnswerTrigger(false);
      setWrongAnswerTrigger(false);
    }


  }

  function handleSaveQuizAttempt() {
    console.log("clicked handleSaveQuiz");
    // var timeLimitRemaining = stopTimer();
    // quizAttempt.timeLimitRemaining = timeLimitRemaining;
    //call saveQuizAttempt api (api calls update quizAttempt)
    quizAttempt.questionAttempts = questionAttempts;
    // quizAttempt.timeLimitRemaining =
    console.log("current quiz attempt: ", quizAttempt);
    fetch(
      "http://localhost:8080/quizAttempt/updateQuizAttemptById/" +
      quizAttempt.quizAttemptId,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizAttempt),
      }
    )
      .then((res) => res.json())
      .then(console.log("saved: ", quizAttempt))
      .then(handleExit());
  }

  function inputShortAnswerResponse(questionIdProp, shortAnswerResponse) {
    const tempQuestionAttempts = [...questionAttempts];
    const questionAttemptIndex = tempQuestionAttempts.findIndex(
      //need to find index of question attempt with same question id prop as question id
      (f) => f.questionAttemptedQuestionId == questionIdProp
    );
    if (questionAttemptIndex > -1) {
      //write short answer response into that questionAttempt
      tempQuestionAttempts[questionAttemptIndex].shortAnswerResponse =
        shortAnswerResponse;
      setQuestionAttempts(tempQuestionAttempts);
      console.log(
        tempQuestionAttempts[questionAttemptIndex].shortAnswerResponse
      );
    }
  }

  function selectOption(questionIdProp, mcqOption) {
    console.log("reached selectOption, selected: ", mcqOption);
    const tempQuestionAttempts = [...questionAttempts];
    const questionAttemptIndex = tempQuestionAttempts.findIndex(
      //need to find index of question attempt with same question id prop as question id
      (f) => f.questionAttemptedQuestionId == questionIdProp
    );
    console.log("found index: ", questionAttemptIndex);
    if (questionAttemptIndex > -1) {
      //write selectedOption into that questionAttempt
      tempQuestionAttempts[questionAttemptIndex].optionSelected = mcqOption;
      setQuestionAttempts(tempQuestionAttempts);
      console.log(tempQuestionAttempts[questionAttemptIndex].optionSelected);
    }
  }

  console.log(assessmentAttemptStatusEnum);

  return (
    <Grid container spacing={0} direction={"column"} alignContent={"center"}>
      <ToastContainer/>
      {/* {props.hasTimeLimitProp == "true" && (
        <Paper
          style={{
            height: 110,
            width: 250,
            position: "fixed",
            marginTop: 50,
            marginLeft: 50,
            backgroundColor: "#6495ED",
          }}
        >

        </Paper>
      )} */}

      {isPreview && (
        <Link
          to={`${assessmentsPath}`}
          style={{ textDecoration: "none", color: "white", backgroundColor: "#e27602" }}
        >
          <ListItemButton>
            <ListItemText primary="Exit Preview Quiz" />
          </ListItemButton>
        </Link>
      )}

      <Grid container width={"60%"} flexDirection={"column"}>
        {quizQuestions.map((question, index) => {
          return (
            <Grid width={"auto"}>
              <Paper elevation={3} style={{ padding: 30, marginTop: 50 }}>
                <QuizQuestionAttemptComponent
                  questionProp={question}
                  quizStatusEnumProp={quizStatusEnum}
                  indexProp={index + 1}
                  inputShortAnswerResponseProp={inputShortAnswerResponse}
                  selectOptionProp={selectOption}
                  questionAttemptProp={questionAttempts[index]}
                  questionAttemptsProp={questionAttempts}
                />
                {!isPreview && assessmentAttemptStatusEnum == "INCOMPLETE" && (
                  <Grid
                    style={{
                      // marginTop: "10px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Grid container justifyContent={"space-between"}>
                      <Button
                        onClick={handleSaveQuizAttempt}
                        variant="contained"
                        style={{ backgroundColor: "#e27602" }}
                      >
                        Save Quiz
                      </Button>
                      <Button
                        onClick={handleSubmitQuizAttempt}
                        variant="contained"
                        style={{ backgroundColor: "#9D26B0" }}
                      >
                        Submit Quiz
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>


      <div>
        {(answerTrigger || assessmentAttemptStatusEnum == "SUBMITTED") &&
          (<Alert
          // action={
          //   <Button color="inherit" size="small">
          //     UNDO
          //   </Button>
          // }
          >
            You've answered this question correct!
          </Alert>
          )}

        {wrongAnswerTrigger &&
          (<Alert severity="error"
          // action={
          //   <Button color="inherit" size="small">
          //     UNDO
          //   </Button>
          // }
          >
            You've answered this question wrongly, please try again!
          </Alert>
          )}
      </div>
    </Grid>

  );
}
