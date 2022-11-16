import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LearnerCoursesDrawer from "../LearnerCourseDrawer";
import QuizAttemptDisplay from "../QuizAttemptComponents/QuizAttemptDisplay";
import { useAuth } from "../../context/AuthProvider";

export default function PreviewQuiz(props) {
  const navigate = useNavigate();
  var location = useLocation(props);
  //need to pass these things from previous page (assessments list)
  var courseId = location.state.courseIdProp;
  var quizId = location.state.quizIdProp;
  var assessmentsPath = location.state.assessmentsPathProp;
  var learnerStatus = "ENROLLED";
  var auth = useAuth();
  var user = auth.user;
  const [numberQuizAttempts, setNumberQuizAttempts] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);
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
  const [quizAttempt, setQuizAttempt] = useState({});
  const [quizExpired, setQuizExpired] = useState("false");

  React.useEffect(() => {
    setStartQuiz(false);
    fetch("http://localhost:8080/quiz/getQuizById/" + quizId)
      .then((res) => res.json())
      .then((result) => {
        setStartQuiz(false);
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
        console.log("retrieved quiz:", result);
      })
      .then(
        fetch("http://localhost:8080/quizAttempt/createQuizPreview/" + quizId)
          .then((res) => res.json())
          .then((result) => {
            setQuestionAttempts(result.questionAttempts);
            setQuizAttempt(result);
            console.log("retrieved quizPreview:", result);
          })
      );
  }, []);

  function handlePreviewQuiz() {
    console.log("clicked handlePreviewQuiz");
    setStartQuiz(true);
  }

  return (
    <Grid container direction={"column"}>
      <h1>{title}</h1>
      {!startQuiz ? (
        <Grid
          container
          direction={"column"}
          alignContent={"center"}
          marginTop={"20px"}
        >
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

          <Button onClick={handlePreviewQuiz} variant="contained">
            Start Quiz
          </Button>
        </Grid>
      ) : (
        <Grid>
          <QuizAttemptDisplay
            isPreviewProp={true}
            courseIdProp={courseId}
            assessmentsPathProp={assessmentsPath}
            learnerStatusProp={learnerStatus}
            currentQuizProp={currentQuiz}
            currentQuizAttemptProp={quizAttempt}
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
