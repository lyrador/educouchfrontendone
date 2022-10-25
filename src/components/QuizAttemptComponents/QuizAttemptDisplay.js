import { Grid, Paper } from "@mui/material";
import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import QuizAttemptTimer from "./QuizAttemptTimer";
import QuizQuestionAttemptComponent from "./QuizQuestionAttemptComponent";

export default function QuizAttemptDisplay(props) {

  const [currentQuiz, setCurrentQuiz] = useState();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [questionAttempts, setQuestionAttempts] = useState(props.questionAttemptsProp);
  const [quizStatusEnum, setQuizStatusEnum] = useState();

  React.useEffect(() => {
    setCurrentQuiz(props.currentQuizProp);
    setQuizQuestions(props.questionsProp);
    setQuizStatusEnum(props.assessmentStatusEnum);
    setQuestionAttempts(props.questionAttemptsProp);
  }, []);

  function selectOption() {

  }

  function inputShortAnswerResponse(questionIdProp, shortAnswerResponse) {
    // console.log(questionIdProp)
    console.log("here are attempts:", questionAttempts)
    const tempQuestionAttempts = [...questionAttempts];
    const questionAttemptIndex = tempQuestionAttempts.findIndex(
    //need to find index of question attempt with same question id prop as question id
      (f) => f.questionAttemptedQuestionId == questionIdProp
    );
    console.log("found index", questionAttemptIndex);
    if (questionAttemptIndex > -1) {
      //write short answer response into that questionAttempt
      tempQuestionAttempts[questionAttemptIndex].shortAnswerResponse = shortAnswerResponse;
      setQuestionAttempts(tempQuestionAttempts);
      console.log("input short answer:", shortAnswerResponse)
    }
  }

  return (
    <Grid container spacing={0} direction={"column"} alignContent={"center"}>
      {props.hasTimeLimitProp == "true" && (
        <QuizAttemptTimer timeLimitProp={props.timeLimitProp} />
      )}
      <Grid width={"60%"}>
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
    </Grid>
  );
}
