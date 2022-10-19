import { Grid, Paper } from "@mui/material";
import React, { useRef, useState } from "react";
import QuizAttemptTimer from "./QuizAttemptTimer";
import QuizQuestionAttemptComponent from "./QuizQuestionAttemptComponent";

export default function QuizAttemptDisplay(props) {
  const [currentQuiz, setCurrentQuiz] = useState();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizStatusEnum, setQuizStatusEnum] = useState();

  React.useEffect(() => {
    setCurrentQuiz(props.currentQuizProp);
    setQuizQuestions(props.questionsProp);
    setQuizStatusEnum(props.assessmentStatusEnum);
  }, []);

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
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
