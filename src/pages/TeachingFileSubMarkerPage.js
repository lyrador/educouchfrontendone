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
import FileSubmissionDisplayComponent from "../components/QuizComponents/FileSubmissionDisplayComponent"
import MarkingFileSubSidebar from "../components/MarkingFileSubSidebar";
import axios from "axios";


function TeachingFileSubMarkerPage() {
  // fileSubmissionAttemptDto 
  const [fileSubmission, setFileSubmission] = useState();
  const [attachment, setAttachment] = useState({});
  const [obtainedScore, setObtainedScore] = useState(0);

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
  const learnerScore = location.state.learnerScore;
  const identifier = location.state.identifier;
  const isOpen = location.state.isOpen;


  const [refresh, setRefresh] = useState(false);

  const refreshPage = () => {
    setRefresh(!refresh);
  };

  const handleOnChange = (val) => {
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
      assessmentTotal;
    if (valInt > questionMax) {
      const newObj = {...fileSubmission}
      newObj[
        "errorMessage"
      ] = `Please enter a value that is at most ${questionMax}`;
      setFileSubmission(newObj);
      return;
    }

    const newObj = {...fileSubmission};
    newObj["obtainedScore"] = valInt;
    newObj["errorMessage"] = "";
    setFileSubmission(newObj);

  };

  const handleOnChangeFeedback = (val) => {
    const newObj = {...fileSubmission};
    newObj["feedback"] = val;
    console.log(newObj)
    setFileSubmission(newObj);
  };

  const handleOnCompleteGrading = async () => {
    console.log(fileSubmission)
    try {
      const response = await axios.post(
        "http://localhost:8080/gradeBookEntry/updateFileSubmission",
        fileSubmission
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
    // TODO: Use axios instead
    fetch(
      "http://localhost:8080/fileSubmissionAttempt/getFileSubmissionAttemptByAssessmentId/" +
        assessmentId +
        "/" +
        learnerId
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setFileSubmission(result)
        setAttachment(result.attachment)
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

              <Paper
                elevation={3}
                style={{ padding: 30, marginTop: 20 }}
                // key={fileSubmission.fileSubmissionAttemptId}
              >
            {fileSubmission && <FileSubmissionDisplayComponent
              isGraded={isGraded}
              assessmentTotal={assessmentTotal}
              fileSubmissionProp={fileSubmission}
              attachmentProp={attachment}
              handleOnCompleteGrading={handleOnCompleteGrading}
              handleOnChangeFeedback={handleOnChangeFeedback}
              handleOnChange={handleOnChange}

            />}
              </Paper>
          
        </Grid>

      </Grid>
    </div>
  );
}

export default TeachingFileSubMarkerPage;
