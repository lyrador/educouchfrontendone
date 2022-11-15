import { Button, Grid, ListItemButton, ListItemText, Paper } from "@mui/material";
import React, { useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import QuizQuestionAttemptComponent from "./QuizQuestionAttemptComponent";

export default function QuizAttemptDisplay(props) {
  const [currentQuiz, setCurrentQuiz] = useState();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [questionAttempts, setQuestionAttempts] = useState(
    props.questionAttemptsProp
  );
  const [quizAttempt, setQuizAttempt] = useState(props.currentQuizAttemptProp);
  const [quizStatusEnum, setQuizStatusEnum] = useState();
  const [quizTimeoutSoon, setQuizTimeoutSoon] = useState("false");
  var isPreview = props.isPreviewProp;
  var assessmentsPath = props.assessmentsPathProp;
  var quizAttemptLoaded = true;

  const [timer, setTimer] = useState("00:00:00");
  const [panic, setPanic] = useState(false);
  const Ref = useRef(null);

  const navigate = useNavigate();
  var location = useLocation(props);
  var courseId = location.state.courseIdProp;
  var learnerStatus = location.state.learnerStatusProp;

  React.useEffect(() => {
    console.log("quizAttemptDisplay useEffect called");
    clearTimer(getDeadTime());
    setCurrentQuiz(props.currentQuizProp);
    setQuizAttempt(props.currentQuizAttemptProp);
    setQuizQuestions(props.questionsProp);
    setQuizStatusEnum(props.assessmentStatusEnum);
    setQuestionAttempts(props.questionAttemptsProp);
  }, []);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
      if (
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds) ===
        "00:00:10"
      ) {
        setPanic(true);
      }
      if (
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds) ===
        "00:00:00"
      ) {
        handleSubmitQuizAttempt();
      }
    }
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("00:00:00");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  function stopTimer() {
    var hours = timer.slice(0, 2);
    var minutes = timer.slice(3, 5);
    var timeLimitRemaining = parseFloat(hours * 60) + parseFloat(minutes);
    console.log("timeLimit Remaining: ", timeLimitRemaining);
    clearTimer();
    return timeLimitRemaining;
  }

  const getDeadTime = () => {
    let deadline = new Date();
    // This is where you need to adjust if
    // you entend to add more time
    if (props.timeLimitProp != quizAttempt.timeLimitRemaining) {
      var timeLimit = quizAttempt.timeLimitRemaining * 60;
    } else {
      var timeLimit = props.timeLimitProp * 60;
    }
    deadline.setSeconds(deadline.getSeconds() + timeLimit);
    return deadline;
  };

  function handleExit() {
    navigate(`/learnerCourseDetails/` + courseId + `/assessments`, {
      state: {
        courseIdProp: courseId,
        learnerStatusProp: learnerStatus,
      },
    });
  }

  function handleExitPreview() {}
  function handleSubmitQuizAttempt() {
    console.log("clicked handleSubmitQuiz");
    var timeLimitRemaining = stopTimer();
    quizAttempt.timeLimitRemaining = timeLimitRemaining;
    //call submitQuizAttempt api (api calls update quizAttempt, then update state to submitted)
    fetch(
      "http://localhost:8080/quizAttempt/submitQuizAttempt/" +
        quizAttempt.quizAttemptId,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizAttempt),
      }
    )
      .then((res) => res.json())
      .then(console.log("submitted: ", quizAttempt))
      .then(handleExit());
  }

  function handleSaveQuizAttempt() {
    console.log("clicked handleSaveQuiz");
    var timeLimitRemaining = stopTimer();
    quizAttempt.timeLimitRemaining = timeLimitRemaining;
    //call saveQuizAttempt api (api calls update quizAttempt)
    quizAttempt.questionAttempts = questionAttempts;
    // quizAttempt.timeLimitRemaining =
    console.log("current quiz attempt: ", quizAttempt);
    fetch(
      "http://localhost:8080/quizAttempt/updateQuizAttemptById/" +
        quizAttempt.quizAttemptId,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizAttempt),
      }
    )
      .then((res) => res.json())
      .then(console.log("saved: ", quizAttempt))
      .then(handleExit());
  }

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
      console.log(
        tempQuestionAttempts[questionAttemptIndex].shortAnswerResponse
      );
    }
  }

  function selectOption(questionIdProp, mcqOption) {
    console.log("reached selectOption, selected: ", mcqOption);
    const tempQuestionAttempts = [...questionAttempts];
    const questionAttemptIndex = tempQuestionAttempts.findIndex(
      //need to find index of question attempt with same question id prop as question id
      (f) => f.questionAttemptedQuestionId == questionIdProp
    );
    console.log("found index: ", questionAttemptIndex);
    if (questionAttemptIndex > -1) {
      //write selectedOption into that questionAttempt
      tempQuestionAttempts[questionAttemptIndex].optionSelected = mcqOption;
      setQuestionAttempts(tempQuestionAttempts);
      console.log(tempQuestionAttempts[questionAttemptIndex].optionSelected);
    }
  }

  return (
    <Grid container spacing={0} direction={"column"} alignContent={"center"}>
      {props.hasTimeLimitProp == "true" && (
        <Paper
          style={{
            height: 110,
            width: 250,
            position: "fixed",
            marginTop: 50,
            marginLeft: 50,
            backgroundColor: "#6495ED",
          }}
        >
          <Grid container justifyContent={"center"} paddingTop={3}>
            {panic ? (
              <p style={{ fontSize: "40px", color: "red" }}>{timer}</p>
            ) : (
              <p style={{ fontSize: "40px", color: "white" }}>{timer}</p>
            )}
          </Grid>
        </Paper>
      )}

      {isPreview && (
        <Link
          to={`${assessmentsPath}`}
          style={{ textDecoration: "none", color: "white", backgroundColor: "#e27602" }}
        >
          <ListItemButton>
            <ListItemText primary ="Exit Preview Quiz" />
          </ListItemButton>
        </Link>
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
                  inputShortAnswerResponseProp={inputShortAnswerResponse}
                  selectOptionProp={selectOption}
                  questionAttemptProp={questionAttempts[index]}
                  questionAttemptsProp={questionAttempts}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {!isPreview && (
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
      )}
    </Grid>
  );
}
