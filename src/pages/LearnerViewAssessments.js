import { ConstructionOutlined } from "@mui/icons-material";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import LearnerCoursesDrawer from "../components/LearnerCourseDrawer";
import QuizTitleComponent from "../components/QuizComponents/QuizTitleComponent";
import { useAuth } from "../context/AuthProvider";

export default function LearnerViewAssessments(props) {
  var auth = useAuth();
  var user = auth.user;
  var learnerId = user.userId;
  const navigate = useNavigate();

  var location = useLocation(props);
  var courseId = location.state.courseIdProp;
  var learnerStatus = location.state.learnerStatusProp;

  const [assessments, setAssessments] = useState([]);
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
  const [quizAttempt, setQuizAttempt] = useState();
  const [hasPreviousAttempt, setHasPreviousAttempt] = useState(false);
  const [quizExpired, setQuizExpired] = useState("false");

  const renderEmptyRowMessage = () => {
    if (assessments.length === 0) {
      return (
        <TableRow>
          <TableCell style={{ textAlign: "left" }}>
            There are currently no assessments in this course!
          </TableCell>
        </TableRow>
      );
    }
  };

  React.useEffect(() => {
    fetch(
      "http://localhost:8080/assessment/getAllReleasedAssessments/" + courseId
    )
      .then((res) => res.json())
      .then((result) => {
        setAssessments(result);
      });
  }, []);


  function handleViewAssessment(assessmentId, assignmentType) {
    if (assignmentType === "FileSubmission") {
      navigate(`/fileSubmissionAttempt`, {
        state: {
          fileSubmissionIdProp: assessmentId,
          courseIdProp: courseId,
          learnerStatusProp: learnerStatus,
        },
      });
    } else {
      navigate(`/quizAttempt`, {
        state: {
          quizIdProp: assessmentId,
          courseIdProp: courseId,
          learnerStatusProp: learnerStatus,
          currentQuizProp: currentQuiz,
          // quizAttemptProp: quizAttempt,
          quizStatusEnumProp: quizStatusEnum,
          questionAttemptsProp: questionAttempts,
          hasPreviousAttemptProp: hasPreviousAttempt,
          quizExpiredProp: quizExpired,
          numberQuizAttemptsProp: numberQuizAttempts,
        },
      })
    }
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={2}>
        <LearnerCoursesDrawer
          courseId={courseId}
          learnerStatus={learnerStatus}
        />
      </Grid>
      <Grid item xs={10} paddingLeft={10} paddingRight={10}>
        <h1>Assessments</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow sx={{ bgcolor: "#1975d2" }}>
                <TableCell style={{ color: "white" }}>
                  <b>Assessment Title</b>
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <b>Assessment Type</b>
                </TableCell>
                <TableCell style={{ color: "white" }} align="right">
                  <b>Opening Date</b>
                </TableCell>
                <TableCell style={{ color: "white" }} align="right">
                  <b>Expiry Date</b>
                </TableCell>
                <TableCell style={{ color: "white" }} align="right">
                  <b>Status</b>
                </TableCell>
                <TableCell style={{ color: "white" }} align="right">
                  <b>Action</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderEmptyRowMessage()}
              {assessments.map((assessment) => (
                <TableRow
                  key={assessment.assessmentId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{assessment.title}</TableCell>
                  <TableCell>
                    {assessment.assessmentType === "FileSubmission"
                      ? "File Submission"
                      : "Quiz"}
                  </TableCell>
                  <TableCell align="right">{assessment.startDate}</TableCell>
                  <TableCell align="right">{assessment.endDate}</TableCell>
                  <TableCell align="right">
                    {assessment.isExpired === "true" ? (
                      <p style={{ color: "red" }}>Expired</p>
                    ) : (
                      <>
                        {assessment.open === "true" && "Open"}
                        {assessment.open === "false" && "Close"}
                      </>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {assessment.isExpired === "false" && (
                      <Button
                        className="btn-choose"
                        variant="outlined"
                        type="submit"
                        onClick={() =>
                          handleViewAssessment(
                            assessment.assessmentId,
                            assessment.assessmentType
                          )
                        }
                      >
                        View Details
                      </Button>)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
