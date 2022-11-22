import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import LearnerCoursesDrawer from "../LearnerCourseDrawer";
// import QuizAttemptDisplay from "../QuizAttemptDisplay";
import QuizAttemptDisplay from "./QuizAttemptComponents/QuizAttemptDisplay";
import { useAuth } from "../context/AuthProvider";
import InteractiveQuizAttemptDisplay from "./InteractiveQuizAttemptDisplay";

export default function InteractiveQuizAttempt(props) {
  const navigate = useNavigate();
  var location = useLocation(props);
  var courseId = props.courseIdProp;
  //var learnerStatus = location.state.learnerStatusProp;
  var quizId = props.quizIdProp;
  console.log(quizId);
  var pageId = props.pageIdProp
  var bookId = props.bookIdProp;
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
  const [isSubmitted, setIsSubmitted] = useState(false);

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
  }, [quizId]);

  const didSubmit = (data) => {
    setIsSubmitted(data);
}

  console.log(quizAttempt.assessmentAttemptStatusEnum)
  props.submittedProp(quizAttempt.assessmentAttemptStatusEnum)

  // function handleViewQuiz() {

  //   <InteractiveQuizAttemptDisplay
  //     isPreviewProp={false}
  //     assessmentsPathProp=""
  //     courseIdProp={courseId}
  //     // learnerStatusProp={learnerStatus}
  //     bookIdProp={bookId}
  //     currentQuizProp={currentQuiz}
  //     currentQuizAttemptProp={quizAttempt}
  //     quizIdProp={quizId}
  //     questionsProp={quizQuestions}
  //     hasTimeLimitProp={hasTimeLimit}
  //     timeLimitProp={timeLimit}
  //     quizStatusEnumProp={quizStatusEnum}
  //     questionAttemptsProp={questionAttempts}
  //   />

  // }

  function handleResumeQuiz() {
    setStartQuiz("true");
    console.log("questionAttempts fetched: ", questionAttempts);
  }

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

  function handleViewGradedQuizAttempt() {
    navigate(`/viewGradedQuizAttempt`, {
      state: {
        courseIdProp: courseId,
        // learnerStatusProp: learnerStatus,
        quizIdProp: quizId,
        learnerIdProp: learnerId,
        quizAttemptProp: quizAttempt,
        questionAttemptsProp: questionAttempts,
      },
    });
  }

  return (
    <Grid container direction={"column"}>
      {/* <h1>Page {pageId} Quiz</h1> */}
      {startQuiz == "false" ? (
        <Grid
          container
          direction={"column"}
          alignContent={"center"}
          marginTop={"20px"}
        >
          {/* <Grid item>Quiz Description: {description}</Grid>
          <Grid item>Quiz Max Score: {maxScore}</Grid>
          <Grid item>Quiz Start Date: {startDate}</Grid>
          <Grid item>Quiz Deadline: {endDate}</Grid>
          {hasTimeLimit == "true" ? (
            <Grid item>Time Limit: {timeLimit}</Grid>
          ) : (
            <Grid item>No Time Limit</Grid>
          )} */}

          {hasPreviousAttempt ? (
            <>
              {quizAttempt.assessmentAttemptStatusEnum === "INCOMPLETE" ? (
                <Button variant="contained" onClick={handleResumeQuiz}>
                  Resume Quiz
                </Button>
              ) : (
                <Grid
                  marginTop={"20px"}
                  style={{
                    backgroundColor: "#1975D2",
                    padding: "7px",
                    borderRadius: "6px",
                  }}
                >
                  <Button variant="contained" onClick={handleResumeQuiz}>
                    View Quiz Attempt
                  </Button>
                </Grid>
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
          <InteractiveQuizAttemptDisplay
            isPreviewProp={false}
            assessmentsPathProp=""
            courseIdProp={courseId}
            pageIdProp={pageId}
            bookIdProp={bookId}
            currentQuizProp={currentQuiz}
            currentQuizAttemptProp={quizAttempt}
            quizIdProp={quizId}
            questionsProp={quizQuestions}
            hasTimeLimitProp={hasTimeLimit}
            timeLimitProp={timeLimit}
            quizStatusEnumProp={quizStatusEnum}
            assessmentAttemptStatusEnumProp={quizAttempt.assessmentAttemptStatusEnum}
            questionAttemptsProp={questionAttempts}
            submittedProp={didSubmit}
          />
        </Grid>
      )}
    </Grid>
  );
}