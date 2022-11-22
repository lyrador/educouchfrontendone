import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import TeachingCoursesDrawer from "./TeachingCoursesDrawer";
import { Grid, Modal, Typography } from "@mui/material";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import LinkMaterial from "@mui/material/Link";

import {
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import { useState } from "react";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PublishIcon from "@mui/icons-material/Publish";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useAuth } from "../context/AuthProvider";
import { render } from "@testing-library/react";

import { MenuItem } from "@mui/material";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Quiz } from "@mui/icons-material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TeachingAssessmentList(props) {
  const auth = useAuth();
  const user = auth.user;

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const [openDeleteSnackbar, setOpenDeleteSnackbar] = React.useState(false);

  const handleClickDeleteSnackbar = () => {
    setOpenDeleteSnackbar(true);
  };

  const handleCloseDeleteSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDeleteSnackbar(false);
  };

  const [openReleaseSnackbar, setOpenReleaseSnackbar] = React.useState(false);

  const handleClickReleaseSnackbar = () => {
    setOpenReleaseSnackbar(true);
  };

  const handleCloseReleaseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenReleaseSnackbar(false);
  };

  const [openEditSnackbar, setOpenEditSnackbar] = React.useState(false);

  const handleClickEditSnackbar = () => {
    setOpenEditSnackbar(true);
  };

  const handleCloseEditSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenEditSnackbar(false);
  };

  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);

  const handleClickErrorSnackbar = () => {
    setOpenErrorSnackbar(true);
  };

  const handleCloseErrorSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorSnackbar(false);
  };

  // paths
  const location = useLocation();
  const assessmentsPath = location.pathname.split("/").slice(0, 4).join("/");
  const createAssessmentPath = location.pathname;

  const courseId = location.pathname.split("/")[2];

  const [assessments, setAssessments] = useState([]);
  const [maxAssessmentDiscountPoints, setMaxAssessmentDiscountPoints] =
    useState();
  const [assessmentIdToDelete, setAssessmentIdToDelete] = useState("");

  const [refreshPage, setRefreshPage] = useState(false);
  const refreshFunction = () => {
    setRefreshPage(!refreshPage);
    console.log("refreshed teaching assessmentlist page");
  };

  const enumGroup = [{ value: "INDIVIDUAL" }, { value: "GROUP" }];

  const [open, setOpen] = React.useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [releaseDialogueOpen, setReleaseDialogueOpen] = React.useState(false);
  const [assessmentIdToRelease, setAssessmentIdToRelease] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickDeleteDialogOpen = (event, assessmentId) => {
    setAssessmentIdToDelete(assessmentId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleReleaseDialogueOpen = (event, assessmenetId) => {
    setReleaseDialogueOpen(true);
  };

  const handleReleaseDialogueClose = () => {
    setReleaseDialogueOpen(false);
  };

  const deleteAssessment = (e) => {
    e.preventDefault();
    fetch(
      "http://localhost:8080/assessment/deleteAssessmentByIdFromCourseId/" +
        assessmentIdToDelete +
        "/" +
        courseId,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        // body:JSON.stringify(newComment)
      }
    ).then(() => {
      console.log("Assessment Deleted Successfully!");
      setRefreshPage(true);
      handleDeleteDialogClose();
      handleClickDeleteSnackbar();
    });
  };

  function handleEditAssessment(e, assessment) {
    if (assessment.assessmentType == "Quiz") {
      handleEditQuiz(assessment);
    } else {
      handleClickEdit(e, assessment);
    }
  }

  function handleEditQuiz(assessment) {
    const assessmentId = assessment.assessmentId;
    navigate(`${assessmentsPath}/editQuiz/${assessmentId}`, {
      state: {
        assessmentPathProp: assessmentsPath,
        maxAssessmentDiscountPointsProp: maxAssessmentDiscountPoints,
        assessmentIdProp: assessmentId,
      },
    });
  }

  function handlePreviewQuiz(event, quizId) {
    navigate(`/previewQuiz`, {
      state: {
        courseIdProp: courseId,
        quizIdProp: quizId,
        assessmentsPathProp: assessmentsPath,
      },
    });
  }

  function handleReleaseAssessment(assessmentId) {
    // call some API to release assessment
    fetch(
      "http://localhost:8080/assessment/releaseAssessment/" + assessmentId,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => res.json());
    // then close dialogue
    handleReleaseDialogueClose();
    // then open snackbar for successful release
    handleClickReleaseSnackbar();
    refreshFunction();
  }

  function handleClickReleaseAssessment(event, assassessmentessmentId) {
    setAssessmentIdToRelease(assassessmentessmentId);
    setReleaseDialogueOpen(true);
  }

  const navigate = useNavigate();

  function continueAsPartialAssessment() {
    navigate(`${assessmentsPath}/createAssessment`, {
      state: {
        maxAssessmentDiscountPointsProp: maxAssessmentDiscountPoints,
        assessmentsPathProp: assessmentsPath,
        // refreshFunctionProp: { refreshFunction },
      },
    });
  }

  function handleClickEdit(event, currAssessment) {
    if (currAssessment.assessmentType == "FileSubmission") {
      navigate(`${assessmentsPath}/${currAssessment.assessmentId}`, {
        state: {
          assessmentsPathProp: assessmentsPath,
          maxAssessmentDiscountPointsProp: maxAssessmentDiscountPoints,
          createAssessmentPathProp: createAssessmentPath,
          newFileSubProp: currAssessment,
        },
      });
    } else {
      console.log("this is quiz");
    }
  }

  const renderEmptyRowMessage = () => {
    if (assessments.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} style={{ textAlign: "center" }}>
            There are currently no assessments in this course!
          </TableCell>
        </TableRow>
      );
    }
  };

  // get all assessments here
  React.useEffect(() => {
    fetch(
      "http://localhost:8080/assessment/getAllAssessmentsByCourseIdWithDiscountPoint?courseId=" +
        courseId
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("list of assessments: ", result);
        setAssessments(result.listOfAssessments);
        setMaxAssessmentDiscountPoints(result.maxAssignmentPoints);
      });
  }, [courseId, refreshPage]);

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
        </Grid>
        <Grid item xs={10}>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={5000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{ width: "100%" }}
            >
              Assessment Created Successfully!
            </Alert>
          </Snackbar>
          <Snackbar
            open={openDeleteSnackbar}
            autoHideDuration={5000}
            onClose={handleCloseDeleteSnackbar}
          >
            <Alert
              onClose={handleCloseDeleteSnackbar}
              severity="success"
              sx={{ width: "100%" }}
            >
              Assessment Deleted Succesfully!
            </Alert>
          </Snackbar>
          <Snackbar
            open={openReleaseSnackbar}
            autoHideDuration={5000}
            onClose={handleCloseReleaseSnackbar}
          >
            <Alert
              onClose={handleCloseReleaseSnackbar}
              severity="success"
              sx={{ width: "100%" }}
            >
              Assessment Released Succesfully!
            </Alert>
          </Snackbar>

          <Snackbar
            open={openEditSnackbar}
            autoHideDuration={5000}
            onClose={handleCloseEditSnackbar}
          >
            <Alert
              onClose={handleCloseEditSnackbar}
              severity="success"
              sx={{ width: "100%" }}
            >
              Assessment Updated Succesfully!
            </Alert>
          </Snackbar>
          <Snackbar
            open={openErrorSnackbar}
            autoHideDuration={5000}
            onClose={handleCloseErrorSnackbar}
          >
            <Alert
              onClose={handleCloseErrorSnackbar}
              severity="warning"
              sx={{ width: "100%" }}
            >
              Error! Invalid Details!
            </Alert>
          </Snackbar>
          <Breadcrumbs aria-label="breadcrumb">
            <LinkMaterial
              underline="hover"
              color="inherit"
              to={`${assessmentsPath}`}
            >
              Assessments
            </LinkMaterial>
          </Breadcrumbs>

          <div style={{ justifyContent: "center" }}>
            <center>
              <Typography variant="h4">List of Assessments</Typography>
            </center>
            <Grid
              style={{
                display: "flex",
                flexDirection: "row",
                justifyItems: "flex-end",
              }}
            ></Grid>
          </div>

          {/* table is here */}
          <div style={{ padding: "5%" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Max Score</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Assessment Type</TableCell>
                    <TableCell>Assessment Release</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {renderEmptyRowMessage()}
                  {assessments.map((assessment) => (
                    <TableRow
                      key={assessment.assessmentId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {assessment.title}
                      </TableCell>
                      <TableCell>{assessment.maxScore}</TableCell>
                      <TableCell>{assessment.startDate}</TableCell>
                      <TableCell>{assessment.endDate}</TableCell>
                      <TableCell>{assessment.assessmentType}</TableCell>
                      <TableCell>{assessment.open}</TableCell>
                      <TableCell>
                        <div>
                          {!assessment.assessmentType == "FileSubmission" && (
                            <IconButton
                              aria-label="settings"
                              onClick={(event) => {
                                handlePreviewQuiz(
                                  event,
                                  assessment.assessmentId
                                );
                              }}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          )}
                          {assessment.open !== "true" && (
                            <IconButton
                              aria-label="settings"
                              onClick={(event) =>
                                handleEditAssessment(event, assessment)
                              }
                            >
                              <EditIcon />
                            </IconButton>
                          )}
                          <IconButton
                            aria-label="settings"
                            onClick={(event) =>
                              handleClickDeleteDialogOpen(
                                event,
                                assessment.assessmentId
                              )
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                          {assessment.open !== "true" && (
                            <IconButton
                              aria-label="publish"
                              onClick={(event) =>
                                handleClickReleaseAssessment(
                                  event,
                                  assessment.assessmentId
                                )
                              }
                            >
                              <PublishIcon />
                            </IconButton>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Grid container direction="row" justifyContent={"center"} align>
            <Button
              variant="contained"
              type="submit"
              onClick={continueAsPartialAssessment}
            >
              Create New Assessment
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <div>
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete this assessment?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              These will delete the assessment and cannot be reversed. Are you
              sure you want to delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose}>Cancel</Button>
            <Button onClick={deleteAssessment} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={releaseDialogueOpen}
          onClose={handleReleaseDialogueClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Release this assessment?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to release? <br></br>
              You will not be able to Edit Assessment once Published.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleReleaseDialogueClose}>Cancel</Button>
            <Button
              onClick={() => handleReleaseAssessment(assessmentIdToRelease)}
              autoFocus
            >
              Release
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div></div>
    </div>
  );
}

export default TeachingAssessmentList;
