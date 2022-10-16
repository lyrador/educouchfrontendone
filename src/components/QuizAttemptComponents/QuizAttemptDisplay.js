import { Grid, Paper } from "@mui/material";
import React, { useRef, useState } from "react";
import QuizAttemptTimer from "./QuizAttemptTimer";
import QuizQuestionAttemptComponent from "./QuizQuestionAttemptComponent";

export default function QuizAttemptDisplay(props) {
  const [currentQuiz, setCurrentQuiz] = useState();
  const [quizQuestions, setQuizQuestions] = useState([]);

  React.useEffect(() => {
    setCurrentQuiz(props.currentQuizProp);
    setQuizQuestions(props.questionsProp);
  }, []);

  
  return (
    <Grid container spacing={0} direction={"column"} alignContent={"center"}>
          {props.hasTimeLimitProp == "true" && <QuizAttemptTimer timeLimitProp={props.timeLimitProp} />}
      <Grid item xs={10}>
        {quizQuestions.map((question, index) => {
          return (
            <Grid item>
              <Paper elevation={3} style={{ padding: 30, marginTop: 50 }}>
                <QuizQuestionAttemptComponent questionProp={question} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
