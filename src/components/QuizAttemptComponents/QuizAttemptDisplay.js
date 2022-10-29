import { Button, Grid, Paper } from "@mui/material";
import React, { useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import QuizAttemptTimer from "./QuizAttemptTimer";
import QuizQuestionAttemptComponent from "./QuizQuestionAttemptComponent";

export default function QuizAttemptDisplay(props) {
  const [currentQuiz, setCurrentQuiz] = useState();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [questionAttempts, setQuestionAttempts] = useState(
    props.questionAttemptsProp
  );
  const navigate = useNavigate();
  var location = useLocation(props);
  var courseId = location.state.courseIdProp;
  var learnerStatus = location.state.learnerStatusProp;
  const [quizAttempt, setQuizAttempt] = useState(props.currentQuizAttemptProp);
  const [quizStatusEnum, setQuizStatusEnum] = useState();
  var quizAttemptLoaded = true;

  React.useEffect(() => {
    console.log("quizAttemptDisplay useEffect called")
    setCurrentQuiz(props.currentQuizProp);
    setQuizAttempt(props.currentQuizAttemptProp);
    setQuizQuestions(props.questionsProp);
    setQuizStatusEnum(props.assessmentStatusEnum);
    setQuestionAttempts(props.questionAttemptsProp);
  }, [quizAttemptLoaded]);

  function selectOption() {}

  function handleExit() {
    navigate(`/learnerCourseDetails/` + courseId + `/assessments`, {
      state: {
        courseIdProp: courseId,
        learnerStatusProp: learnerStatus,
      },
    }); 
  }

  function handleSubmitQuizAttempt() {
    //questionAttemptedCheck (if not all attempted have an alert to confirm submit)
    //call submitQuizAttempt api (api calls update quizAttempt, then update state to submitted)
  }

  function handleSaveQuizAttempt() {
    //call saveQuizAttempt api (api calls update quizAttempt)
    quizAttempt.questionAttempts = questionAttempts;
    console.log("current quiz attempt: ", quizAttempt);
    fetch(
      "http://localhost:8080/quizAttempt/updateQuizAttemptById/1",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizAttempt),
      }
    )
      .then((res) => res.json())
      .then(console.log("saved: ", quizAttempt))
      .then(handleExit());
  };

  function inputShortAnswerResponse(questionIdProp, shortAnswerResponse) {
    console.log("shortAnswerResponse received: ", shortAnswerResponse)
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
      console.log("set short answer", tempQuestionAttempts[questionAttemptIndex].shortAnswerResponse)
    }
  }

  return (
    <Grid container spacing={0} direction={"column"} alignContent={"center"}>
      {props.hasTimeLimitProp == "true" && (
        <QuizAttemptTimer timeLimitProp={props.timeLimitProp} />
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
                  // selectOptionProp={}
                  inputShortAnswerResponseProp={inputShortAnswerResponse}
                  questionAttemptProp={questionAttempts[index]}
                  questionAttemptsProp={questionAttempts}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Grid
        style={{
          marginTop: "40px",
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
    </Grid>
  );
}
