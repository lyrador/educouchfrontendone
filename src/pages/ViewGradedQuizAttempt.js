import * as React from "react";
import dayjs from "dayjs";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import LinkMaterial from "@mui/material/Link";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Breadcrumbs,
  Grid,
  Modal,
  Paper,
  Button,
  TextField,
  Stack,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import TeachingCoursesDrawer from "../components/TeachingCoursesDrawer";
import QuizQuestionComponent from "../components/QuizComponents/QuizQuestionComponent";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import QuizSettingsComponents from "../components/QuizComponents/QuizSettingsComponent";
import EditSettingsComponent from "../components/QuizComponents/EditQuizSettingsComponent";
import EditQuizSettingsComponent from "../components/QuizComponents/EditQuizSettingsComponent";
import { CatchingPokemonSharp } from "@mui/icons-material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import LearnerCoursesDrawer from "../components/LearnerCourseDrawer";
import QuizQuestionAttemptComponent from "../components/QuizAttemptComponents/QuizQuestionAttemptComponent";
import GradedQuizQuestionComponent from "../components/GradedQuizComponents/GradedQuizQuestionComponent";

export default function ViewGradedQuizAttempt(props) {
  var location = useLocation(props);
  var courseId = location.state.courseIdProp;
  var learnerStatus = location.state.learnerStatusProp;

  const [quizId, setQuizId] = useState("");
  const [learnerId, setLearnerId] = useState("");

  const [quizAttempt, setQuizAttempt] = useState();
  const [questionAttempts, setQuestionAttempts] = useState([]);
  const [obtainedScore, setObtainedScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  React.useEffect(() => {
    console.log("quizattempt prop: ", location.state.quizAttemptProp);
    // console.log("questionAttempts prop: ", location.state.questionAttemptsProp)
    setQuizId(location.state.quizIdProp);
    setLearnerId(location.state.learnerIdProp);
    setQuizAttempt(location.state.quizAttemptProp);
    setQuestionAttempts(location.state.questionAttemptsProp);
    setObtainedScore(location.state.quizAttemptProp.obtainedScore);
    setMaxScore(
      location.state.quizAttemptProp.attemptedQuiz.assessmentMaxScore
    );
  }, []);
  return (
    <Grid container spacing={0}>
      <Grid item xs={2}>
        <LearnerCoursesDrawer
          courseId={courseId}
          learnerStatus={learnerStatus}
        />
      </Grid>
      <Grid item xs={10} paddingLeft={10} paddingRight={10}>
        <h1>Quiz Graded Attempt</h1>
        <h2 style={{ backgroundColor: "#CCCCFF",padding: "8px", width: "25%", borderRadius:"5px"}}>
          Total Score: {obtainedScore}/{maxScore}
        </h2>
      </Grid>
      <Grid container spacing={0} direction={"column"} alignContent={"center"}>
        <Grid container width={"60%"} flexDirection={"column"}>
          {questionAttempts.map((questionAttempt, index) => {
            return (
              <Grid width={"auto"}>
                <Paper elevation={3} style={{ padding: 30, marginTop: 50 }}>
                  <GradedQuizQuestionComponent
                    indexProp={index + 1}
                    questionAttemptProp={questionAttempts[index]}
                    // questionAttemptsProp={questionAttempts}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
