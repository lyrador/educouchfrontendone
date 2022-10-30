import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Grid } from "rsuite";
import { useAuth } from "../../context/AuthProvider";
import LearnerCoursesDrawer from "../LearnerCourseDrawer";

export default function FileSubmissionAttempt(props) {
  const navigate = useNavigate();
  var location = useLocation(props);
  var courseId = location.state.courseIdProp;
  var learnerStatus = location.state.learnerStatusProp;
  var fileSubmissionId = location.state.fileSubmissionIdProp;
  var auth = useAuth();
  var user = auth.user;
  var learnerId = user.userId;

  const [fileSubmissionAttempt, setFileSubmissionAttempt] = useState({});
  const [viewSubmission, setViewSubmission] = useState(false);

  const [currentFileSubmission, setCurrentFileSubmission] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();
  const [maxScore, setMaxScore] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [fileSubmissionStatusEnum, setFileSubmissionStatusEnum] = useState();
  const [fileSubmissionExpired, setFileSubmissionExpired] = useState(false);
  const [hasPreviousAttempt, setHasPreviousAttempt] = useState(false);

  //
  React.useEffect(() => {
    fetch(
      "http://localhost:8080/assessment/getFileSubmissionById/" +
        fileSubmissionId
    )
      .then((res) => res.json())
      .then((result) => {
        setViewSubmission(false);
        setCurrentFileSubmission(result);
        setTitle(result.title);
        setDescription(result.description);
        setMaxScore(result.maxScore);
        setStartDate(result.startDate);
        setEndDate(result.endDate);
        setFileSubmissionStatusEnum(result.assessmentStatus);
        setFileSubmissionExpired(result.isExpired);
        const today = new Date();
        if (today > result.getEndDate) {
          setFileSubmissionExpired(true);
        } else {
          setFileSubmissionExpired(false);
        }
        console.log("retrieved fileSubmission:", result);
      })
      .then(
        fetch(
          "http://localhost:8080/quizAttempt/getMostRecentQuizAttemptByLearnerId/" +
            fileSubmissionId +
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
              setFileSubmissionAttempt(result);
            }
          })
      );
  }, []);

  function proceedFileSubmission() {
    if (!hasPreviousAttempt) {
      fetch(
        "http://localhost:8080/fileSubmissionAttempt/createFileSubmissionAttempt/" +
          fileSubmissionId +
          "/" +
          learnerId
      )
        .then((res) => res.json())
        .then((result) => {
          console.log("instantiated new file sub attempt: ", result);
          setFileSubmissionAttempt(result);
        })
        .then(setViewSubmission(true));
    } else {
      //already has file submission attempt set
    }
  }

  return (
    <Grid container direction={"column"}>
      <h1>{title}</h1>
      <Grid item xs={2}>
        <LearnerCoursesDrawer
          courseId={courseId}
          learnerStatus={learnerStatus}
        />
      </Grid>
      {!viewSubmission ? (
        <Grid
          container
          direction={"column"}
          alignContent={"center"}
          style={{ marginLeft: "800px" }}
        >
          <Grid item>File Submission Description: {description}</Grid>
          <Grid item>File Submission Max Score: {maxScore}</Grid>
          <Grid item>File Submission Start Date: {startDate}</Grid>
          <Grid item>File Submission Deadline: {endDate}</Grid>
          {!fileSubmissionExpired && (
            <Button onClick={proceedFileSubmission} variant="contained">
              Proceed to File Submission
            </Button>
          )}
        </Grid>
      ) : (
        <Grid>
          <p>display file sub stuff</p>
        </Grid>
      )}
    </Grid>
  );
}
