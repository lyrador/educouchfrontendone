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
  const [numberQuizAttempts, setNumberQuizAttempts] = useState(0);
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
  const [quizAttempt, setQuizAttempt] = useState({});
  const [hasPreviousAttempt, setHasPreviousAttempt] = useState(false);
  const [quizExpired, setQuizExpired] = useState("false");
  const [buttonRendered, setButtonRendered] = useState("");
  React.useEffect(() => {
    // console.log("Received hasPreviousAttemptprop: ", location.state.hasPreviousAttemptProp)
    // console.log("Received numAttempts: ", location.state.numberQuizAttemptsProp)

    // setStartQuiz("false");
    // setCurrentQuiz(location.state.currentQuizProp);
    // setTitle(location.state.titleProp);
    // setDescription(location.state.descriptionProp);
    // setMaxScore(location.state.maxScoreProp);
    // setStartDate(location.state.startDateProp);
    // setEndDate(location.state.endDateProp);
    // setHasTimeLimit(location.state.hasTimeLimitProp);
    // setTimeLimit(location.state.timeLimitProp);
    // setHasMaxAttempts(location.state.hasMaxAttempts);
    // setMaxAttempts(location.state.maxAttempts);
    // setQuizStatusEnum(location.state.quizStatusEnum);
    // setQuizExpired(location.state.quizExpired);
    // setHasPreviousAttempt(location.state.hasPreviousAttemptProp)

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
        console.log("retrieved quiz:", result);
      })
      .then(
        fetch(
          "http://localhost:8080/quizAttempt/getMostRecentQuizAttemptByLearnerId/" +
            quizId +
            "/" +
            learnerId
        )
          .then((res) => res.json())
          .then((result) => {
            console.log("most recent attempt: ", result);
            if (result.quizAttemptId == null) {
              setHasPreviousAttempt(false);
            } else {
              setHasPreviousAttempt(true);
              setQuizAttempt(result);
              setQuestionAttempts(result.questionAttempts);
            }
          })
      );
    //   .then(
    //     fetch(
    //       "http://localhost:8080/quizAttempt/getNumberQuizAttemptsByLearnerId/" +
    //         quizId +
    //         "/" +
    //         learnerId
    //     )
    //       .then((res) => res.json())
    //       .then((result) => {
    //         console.log("no. attempts: ", result);
    //         setNumberQuizAttempts(result);
    //       })
    //   )
    //   .then(renderButton);
  }, []);

  function handleResumeQuiz() {
    setStartQuiz("true");
    console.log("questionAttempts fetched: ", questionAttempts);
  }

  // function renderButton() {
  //   console.log("renderButtonCalled");
  //   if (currentQuiz.isExpired == "true") {
  //     console.log("quizExpired");
  //     setButtonRendered("quizExpired");
  //   } else {
  //     //quiz not expired
  //     console.log("quizNotExpired");
  //     if (hasMaxAttempts == "true") {
  //       //has max attempts
  //       console.log("hasMaxAttempts");
  //       if (numberQuizAttempts > maxAttempts) {
  //         console.log("noAttemptsLeft");
  //         setButtonRendered("noAttemptsLeft");
  //       } else {
  //         console.log("hasAttemptsLeft");
  //         //numberQuizAttempts <= maxAttempts, still has attempts left
  //         if (!hasPreviousAttempt) {
  //           //no existing attempts
  //           console.log("startQuiz");
  //           setButtonRendered("startQuiz");
  //         } else {
  //           //has existing attempts
  //           if (quizAttempt.assessmentAttemptStatusEnum == "SUBMITTED") {
  //             console.log("startQuiz");
  //             setButtonRendered("startQuiz");
  //           } else if (
  //             quizAttempt.assessmentAttemptStatusEnum == "INCOMPLETE"
  //           ) {
  //             console.log("resumeQuiz");
  //             setButtonRendered("resumeQuiz");
  //           }
  //         }
  //       }
  //     } else {
  //       //no max attempts
  //       if (quizAttempt.assessmentAttemptStatusEnum == "SUBMITTED") {
  //         console.log("startQuiz");
  //         setButtonRendered("startQuiz");
  //       } else if (quizAttempt.assessmentAttemptStatusEnum == "INCOMPLETE") {
  //         console.log("resumeQuiz");
  //         setButtonRendered("resumeQuiz");
  //       }
  //     }
  //   }
  // }

  function handleStartQuiz() {
    console.log("clicked handleStartQuiz");
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
        setQuizAttempt(result);
        setStartQuiz("true");
        // console.log("questionAttempts fetched: ", result.questionAttempts);
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
          {/* {hasMaxAttempts == "true" ? (
            <Grid>
              <Grid item>Maximum Attempts: {maxAttempts}</Grid>
              {numberQuizAttempts <= maxAttempts ? (
                <Grid item>Current Attempt Number: {numberQuizAttempts}</Grid>
              ) : (
                <Grid item>Max Attempts Reached</Grid>
              )}
            </Grid>
          ) : (
            <Grid item>Maximum Attempts: Unlimited Attempts </Grid>
          )} */}

          {hasPreviousAttempt ? (
            <>
              {quizAttempt.assessmentAttemptStatusEnum === "INCOMPLETE" ? (
                <Button variant="contained" onClick={handleResumeQuiz}>
                  Resume Quiz
                </Button>
              ) : (
                <p>you have submitted alr sry</p>
              )}
            </>
          ) : (
            <Button onClick={handleStartQuiz} variant="contained">
              Start Quiz
            </Button>
          )}
        </Grid>
      ) : (
        <Grid>
          <QuizAttemptDisplay
            courseIdProp={courseId}
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
