import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LearnerCoursesDrawer from "../LearnerCourseDrawer";
import QuizAttemptDisplay from "./QuizAttemptDisplay";
import QuizInformation from "./QuizInformation";
import { useAuth } from "../../context/AuthProvider";

export default function QuizAttempt(props) {
  const navigate = useNavigate();
  var location = useLocation(props);
  var courseId = location.state.courseIdProp;
  var learnerStatus = location.state.learnerStatusProp;
  var quizId = location.state.quizIdProp;
  var auth = useAuth();
  var user = auth.user;
  var learnerId = user.userId;
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
  const [quizStatusEnum, setQuizStatusEnum] = useState();
  const [questionAttempts, setQuestionAttempts] = useState([]);
  const [quizExpired, setQuizExpired] = useState("false");

  React.useEffect(() => {
    fetch("http://localhost:8080/quiz/getQuizById/" + quizId)
      .then((res) => res.json())
      .then((result) => {
        setStartQuiz("false");
        setCurrentQuiz(result);
        setQuizQuestions(result.questions);
        setTitle(result.assessmentTitle);
        setDescription(result.assessmentDescription);
        setMaxScore(result.assessmentMaxScore);
        setStartDate(result.assessmentStartDate);
        setEndDate(result.assessmentEndDate);
        setHasTimeLimit(result.hasTimeLimit);
        setTimeLimit(result.timeLimit);
        setHasMaxAttempts(result.hasMaxAttempts);
        setMaxAttempts(result.maxAttempts);
        setQuizStatusEnum(result.assessmentStatusEnum);
        setQuizExpired(result.isExpired);
        console.log("retrieved quiz:", result)
      });
  }, []);

  function loadQuiz() {
    setTitle(currentQuiz.assessmentTitle);
  }

  function handleStartQuiz() {
    fetch(
      "http://localhost:8080/quizAttempt/createQuizAttempt/" +
        quizId +
        "/" +
        learnerId,
      { method: "POST" }
    )
      .then((res) => res.json())
      .then((result) => {
        setQuestionAttempts(result.questionAttempts);
        setStartQuiz("true");
        console.log("questionAttempts fetched: ", result.questionAttempts);
      });
  }

  return (
    <Grid container direction={"column"}>
      <h1>{title}</h1>
      {startQuiz == "false" ? (
        <Grid container direction={"column"} alignContent={"center"}>
          <Grid item xs={2}>
            <LearnerCoursesDrawer
              courseId={courseId}
              learnerStatus={learnerStatus}
            />
          </Grid>
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
          {currentQuiz.isExpired == "false" &&
            <Button onClick={handleStartQuiz} variant="contained">Start Quiz</Button>
          }
        </Grid>
      ) : (
        <Grid>
          <QuizAttemptDisplay
            currentQuizProp={currentQuiz}
            quizIdProp={quizId}
            questionsProp={quizQuestions}
            hasTimeLimitProp={hasTimeLimit}
            timeLimitProp={timeLimit}
            quizStatusEnumProp={quizStatusEnum}
            questionAttemptsProp={questionAttempts}
          />
        </Grid>
      )}
    </Grid>
  );
}
