import * as React from "react";
import "../App.css";
import "../css/TeachingFileList.css";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Alert,
  Snackbar,
  DialogContentText,
  DialogTitle,
  Card,
  CardContent,
  Box,
  Breadcrumbs,
  Paper,
} from "@mui/material";
import { useState } from "react";
import LearnerCoursesDrawer from "../components/LearnerCourseDrawer";
import { useAuth } from "../context/AuthProvider";
import { DataGrid } from "@mui/x-data-grid";
import LinkMaterial from "@mui/material/Link";
import TeachingCoursesDrawer from "../components/TeachingCoursesDrawer";
import QuizQuestionDisplayComponent from "../components/QuizComponents/QuizQuestionDisplayComponent";
import MarkingSidebar from "../components/MarkingSidebar";
import axios from "axios";

function TeachingMarkerPage() {
  // list of gradebook entries
  const [questions, setQuestions] = useState([]);
  const [totalOpenEndedScore, setTotalOpenEndedScore] = useState(0);
  const [totalLearnerOpenEnded, setTotalLearnerOpenEnded] = useState(0);

  //paths
  const navigate = useNavigate();
  const location = useLocation();
  const gradebookPath = location.pathname.split("/").slice(0, 4).join("/");
  const gradingPath = location.pathname.split("/").slice(0, 5).join("/");
  const markingPath = location.pathname;

  const courseId = location.pathname.split("/")[2];
  const assessmentId = location.pathname.split("/")[4];
  const learnerId = location.pathname.split("/")[5];
  const name = location.state.name;
  const title = location.state.title;
  const assessmentTotal = location.state.assessmentTotal;
  const isGraded = location.state.isGraded;
  const mcqScore = location.state.mcqScore;
  const learnerScore = location.state.learnerScore;
  const isQuiz = location.state.isQuiz;
  const identifier = location.state.identifier;
  const isOpen = location.state.isOpen;

  const [refresh, setRefresh] = useState(false);

  const refreshPage = () => {
    setRefresh(!refresh);
  };

  const handleOnChange = (val, index) => {
    let valInt = 0;
    if (val.length > 0) {
      valInt = parseInt(val);

      // If not a valid number
      if (isNaN(valInt)) {
        return;
      }
    }

    // Send an error message to the user and dont update the score
    const questionMax =
      questions[index]["questionAttempted"]["questionMaxPoints"];
    if (valInt > questionMax) {
      const newArr = [...questions];
      newArr[index][
        "errorMessage"
      ] = `Please enter a value that is at most ${questionMax}`;
      setQuestions(newArr);
      return;
    }

    const newArr = [...questions];
    newArr[index]["questionAttemptScore"] = valInt;
    newArr[index]["errorMessage"] = "";
    setQuestions(newArr);
    const newTotal = newArr.reduce(
      (total, curr) => total + curr.questionAttemptScore,
      0
    );
    // console.log(newTotal)
    setTotalLearnerOpenEnded(newTotal);
  };

  const handleOnChangeFeedback = (val, index) => {
    const newArr = [...questions];
    newArr[index]["feedback"] = val;
    setQuestions(newArr);
  };

  const handleOnCompleteGrading = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/gradeBookEntry/updateOpenEndedQuestions?learnerId=" +
          learnerId +
          "&assessmentId=" +
          assessmentId,
        questions
      );
      // set the state of the user
      // store the user in localStorage
      console.log(response);
      refreshPage();
      navigate(gradingPath, {
        state: { name: name, title: title, identifier: identifier, isOpen :isOpen },
      });
    } catch (error) {
      // Handle error here
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    fetch(
      "http://localhost:8080/gradeBookEntry/getOpenEndedQuestions?learnerId=" +
        learnerId +
        "&assessmentId=" +
        assessmentId
    )
      .then((res) => res.json())
      .then((result) => {
        let totalOE = totalOpenEndedScore;
        let totalLearnerOE = totalLearnerOpenEnded;
        for (let i = 0; i < result.length; i++) {
          // console.log(result[i].questionAttempted.questionMaxPoints)
          const questionAttempted = result[i].questionAttempted;
          const maxPtsInt = parseInt(questionAttempted.questionMaxPoints);

          totalOE += parseInt(maxPtsInt);
          totalLearnerOE += parseInt(result[i].questionAttemptScore);
          questionAttempted.questionMaxPoints = maxPtsInt;
          result[i].errorMessage = "";
        }
        setQuestions(result);
        console.log(result);
        setTotalOpenEndedScore(totalOE);
        setTotalLearnerOpenEnded(totalLearnerOE);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [assessmentId, learnerId, refresh]);

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <TeachingCoursesDrawer></TeachingCoursesDrawer>
        </Grid>
        <Grid item xs={8}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              to={`${gradebookPath}`}
              style={{ textDecoration: "none", color: "grey" }}
            >
              <LinkMaterial underline="hover" color="inherit">
                Gradebook
              </LinkMaterial>
            </Link>
            <Link
              to={`${gradingPath}`}
              state={{ title: title, identifier: identifier }}
              style={{ textDecoration: "none", color: "grey" }}
            >
              <LinkMaterial underline="hover" color="inherit">
                {title}
              </LinkMaterial>
            </Link>
            <Link
              to={`${markingPath}`}
              state={{ name: name }}
              style={{ textDecoration: "none", color: "grey" }}
            >
              <LinkMaterial underline="hover" color="inherit">
                {name}
              </LinkMaterial>
            </Link>
          </Breadcrumbs>
          <Typography variant="h5">Marking Script</Typography>
          <divider></divider>
          <br />
          {questions.map((question, index) => {
            return (
              <Paper
                elevation={3}
                style={{ padding: 30, marginTop: 20 }}
                key={question.questionAttemptId}
              >
                <QuizQuestionDisplayComponent
                  isQuiz={isQuiz}
                  isGraded={isGraded}
                  // handleOnChangeMaxPt={handleOnChangeMaxPt}
                  handleOnChangeFeedback={handleOnChangeFeedback}
                  handleOnChange={handleOnChange}
                  questionProp={question}
                  indexProp={index}
                />
              </Paper>
            );
          })}
        </Grid>
        <Grid item xs={2} style={{ padding: "10px" }}>
          <MarkingSidebar
            isQuiz={isQuiz}
            isGraded={isGraded}
            mcqScore={mcqScore}
            handleOnCompleteGrading={handleOnCompleteGrading}
            assessmentTotal={assessmentTotal}
            learnerScore={learnerScore}
            openEndedTotalScore={totalOpenEndedScore}
            openEndedLearnerScore={totalLearnerOpenEnded}
          ></MarkingSidebar>
        </Grid>
      </Grid>
    </div>
  );
}

export default TeachingMarkerPage;
