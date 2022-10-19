import { Grid, Paper } from "@mui/material";
import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import QuizAttemptTimer from "./QuizAttemptTimer";
import QuizQuestionAttemptComponent from "./QuizQuestionAttemptComponent";

export default function QuizAttemptDisplay(props) {

  const [currentQuiz, setCurrentQuiz] = useState();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [questionAttempts, setQuestionAttempts] = useState([]);
  const [quizStatusEnum, setQuizStatusEnum] = useState();

  React.useEffect(() => {
    setCurrentQuiz(props.currentQuizProp);
    setQuizQuestions(props.questionsProp);
    setQuizStatusEnum(props.assessmentStatusEnum);
    setQuestionAttempts(props.questionAttemptsProp);
  }, []);

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
                  // shortAnswerResponseProp={}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
