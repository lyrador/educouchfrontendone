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
import { useAuth } from "../context/AuthProvider";

export default function LearnerViewAssessments(props) {
  var auth = useAuth();
  var user = auth.user;
  const navigate = useNavigate();

  var location = useLocation(props);
  var courseId = location.state.courseIdProp;
  var learnerStatus = location.state.learnerStatusProp;

  const [assessments, setAssessments] = useState([]);
  const renderEmptyRowMessage = () => {
    if (assessments.length === 0) {
      console.log("assessment list is empty");
      return (
        <TableRow>
          <TableCell style={{ textAlign: "center" }}>
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
        console.log("released assessments under this course: ", result);
      });
  }, []);

  function handleViewAssessment(quizId) {
    navigate(`/quizAttempt`, {
      state: {
        quizIdProp: quizId,
        courseIdProp: courseId,
        learnerStatusProp: learnerStatus,
      },
    });
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
                  <TableCell align="right">{assessment.startDate}</TableCell>
                  <TableCell align="right">{assessment.endDate}</TableCell>
                  <TableCell align="right">
                    {assessment.isExpired === "true" ? <p style={{color:"red"}}>Expired</p> :
                    <>
                    {assessment.open === "true" && "Open"}
                    {assessment.open === "false" && "Close"}</>}

                  </TableCell>
                  <TableCell align="right">
                    <Button
                      className="btn-choose"
                      variant="outlined"
                      type="submit"
                      onClick={() =>
                        handleViewAssessment(assessment.assessmentId)
                      }
                    >
                      View Assessment
                    </Button>
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
