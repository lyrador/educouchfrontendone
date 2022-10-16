import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import QuizAttemptDisplay from "./QuizAttemptDisplay";
import QuizInformation from "./QuizInformation";

export default function QuizAttempt() {
  const [currentQuiz, setCurrentQuiz] = useState();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [startQuiz, setStartQuiz] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();
  const [maxScore, setMaxScore] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [hasTimeLimit, setHasTimeLimit] = useState("true");
  const [timeLimit, setTimeLimit] = useState();
  const [hasMaxAttempts, setHasMaxAttempts] = useState();
  const [maxAttempts, setMaxAttempts] = useState(0);

  React.useEffect(() => {
    fetch("http://localhost:8080/quiz/getQuizById/1")
      .then((res) => res.json())
      .then((result) => {
        setStartQuiz("false");
        setCurrentQuiz(result);
        setQuizQuestions(result.questions)
        setTitle(result.assessmentTitle);
        setDescription(result.assessmentDescription);
        setMaxScore(result.assessmentMaxScore);
        setStartDate(result.assessmentStartDate);
        setEndDate(result.assessmentEndDate);
        setHasTimeLimit(result.hasTimeLimit);
        setTimeLimit(result.timeLimit);
        setHasMaxAttempts(result.hasMaxAttempts);
        setMaxAttempts(result.maxAttempts);
      });
  }, []);

  function loadQuiz() {
    setTitle(currentQuiz.assessmentTitle);
  }

  function handleStartQuiz() {
    setStartQuiz("true");
  }

  return (
    //have an intermediate page for between quizInfo & quizAttemptWindow
    //button to "start quiz" changes state to render out quizAttemptWindow
    //timer starts
    <Grid container direction={"column"}>
      <h1>{title}</h1>
      {startQuiz == "false" ? (
        <Grid container direction={"column"} alignContent={"center"}>
          <Grid item>Quiz Description: {description}</Grid>
          <Grid item>Quiz Max Score: {maxScore}</Grid>
          <Grid item>Quiz Start Date: {startDate}</Grid>
          <Grid item>Quiz Deadline: {endDate}</Grid>
          {hasTimeLimit == "true" ? (
            <Grid item>Time Limit: {timeLimit}</Grid>
          ) : (
            <Grid item>No Time Limit</Grid>
          )}
          {hasMaxAttempts == "true" ? (
            <Grid item>Maximum Attempts: {maxAttempts}</Grid>
          ) : (
            <Grid item>Maximum Attempts: Unlimited Attempts </Grid>
          )}
          <Button onClick={handleStartQuiz}>Start Quiz</Button>
        </Grid>
      ) : (
        <Grid>
            <h1>this is quiz attempt</h1>
            <QuizAttemptDisplay
              currentQuizProp={currentQuiz}
              questionsProp={ quizQuestions}
            />
        </Grid>
      )}
    </Grid>
  );
}
