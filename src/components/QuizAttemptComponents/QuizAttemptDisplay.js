import { Button, Grid, Paper } from "@mui/material";
import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import QuizAttemptTimer from "./QuizAttemptTimer";
import QuizQuestionAttemptComponent from "./QuizQuestionAttemptComponent";

export default function QuizAttemptDisplay(props) {
  const [currentQuiz, setCurrentQuiz] = useState();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [questionAttempts, setQuestionAttempts] = useState(
    props.questionAttemptsProp
  );
  const [quizAttempt, setQuizAttempt] = useState(props.currentQuizAttemptProp);
  const [quizStatusEnum, setQuizStatusEnum] = useState();

  React.useEffect(() => {
    setCurrentQuiz(props.currentQuizProp);
    setQuizAttempt(props.currentQuizAttemptProp);
    setQuizQuestions(props.questionsProp);
    setQuizStatusEnum(props.assessmentStatusEnum);
    setQuestionAttempts(props.questionAttemptsProp);
  }, []);

  function selectOption() {}

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
      .then(console.log("saved: ", quizAttempt));
  };

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
      // console.log("input short answer:", shortAnswerResponse)
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
