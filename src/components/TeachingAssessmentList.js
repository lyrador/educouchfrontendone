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
import { Grid, Modal } from "@mui/material";

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

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

import { useAuth } from "../context/AuthProvider";
import { render } from "@testing-library/react";

import { MenuItem } from "@mui/material";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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

  const courseId = location.pathname.split("/")[2];

  const [assessments, setAssessments] = useState([]);
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [assessmentDescription, setAssessmentDescription] = useState("");
  const [assessmentMaxScore, setAssessmentMaxScore] = useState("");
  const [assessmentStartDate, setAssessmentStartDate] = useState(dayjs());
  const [assessmentEndDate, setAssessmentEndDate] = useState(dayjs());
  const [assessmentFileSubmissionEnum, setAssessmentFileSubmissionEnum] =
    useState("");
  const [assessmentIsOpen, setAssessmentIsOpen] = useState("");
  const [assessmentStatusEnum, setAssessmentStatusEnum] = useState("");
  const [assessmentIdToDelete, setAssessmentIdToDelete] = useState("");

  const handleStartDateChange = (newAssessmentStartDate) => {
    setAssessmentStartDate(newAssessmentStartDate);
  };

  const handleEndDateChange = (newAssessmentEndDate) => {
    setAssessmentEndDate(newAssessmentEndDate);
  };

  const [assessmentTitleError, setAssessmentTitleError] = useState({
    value: false,
    errorMessage: "",
  });
  const [assessmentDescriptionError, setAssessmentDescriptionError] = useState({
    value: false,
    errorMessage: "",
  });
  const [assessmentMaxScoreError, setAssessmentMaxScoreError] = useState({
    value: false,
    errorMessage: "",
  });
  const [assessmentStartDateError, setAssessmentStartDateError] = useState({
    value: false,
    errorMessage: "",
  });
  const [assessmentEndDateError, setAssessmentEndDateError] = useState({
    value: false,
    errorMessage: "",
  });
  const [
    assessmentFileSubmissionEnumError,
    setAssessmentFileSubmissionEnumError,
  ] = useState({ value: false, errorMessage: "" });
  const [assessmentIsOpenError, setAssessmentIsOpenError] = useState({
    value: false,
    errorMessage: "",
  });
  const [assessmentStatusEnumError, setAssessmentStatusEnumError] = useState({
    value: false,
    errorMessage: "",
  });
  const [assessmentIdToDeleteError, setAssessmentIdToDeleteError] = useState({
    value: false,
    errorMessage: "",
  });

  const [refreshPage, setRefreshPage] = useState(false);
  const refreshFunction = () => {
    setRefreshPage(!refreshPage);
  };

  const enumGroup = [{ value: "INDIVIDUAL" }, { value: "GROUP" }];

  // get all assessments here
  React.useEffect(() => {
    setRefreshPage(false);
    fetch(
      "http://localhost:8080/assessment/getAllAssessmentsByCourseId?courseId=" +
        courseId
    )
      .then((res) => res.json())
      .then((result) => {
        setAssessments(result);
        console.log(
          "list of assessments: " + assessments + " course id: " + courseId
        );
      });
  }, [refreshPage]);

  const [open, setOpen] = React.useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  const [editAssessmentTitle, setEditAssessmentTitle] = useState("");
  const [editAssessmentDescription, setEditAssessmentDescription] =
    useState("");
  const [editAssessmentMaxScore, setEditAssessmentMaxScore] = useState("");
  const [editAssessmentStartDate, setEditAssessmentStartDate] = useState(
    dayjs()
  );
  const [editAssessmentEndDate, setEditAssessmentEndDate] = useState(dayjs());
  const [
    editAssessmentFileSubmissionEnum,
    setEditAssessmentFileSubmissionEnum,
  ] = useState("");
  const [assessmentIdToEdit, setAssessmentIdToEdit] = useState("");

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

  const handleClickEditDialogOpen = (
    event,
    assessmentId,
    assessmentTitle,
    assessmentDescription,
    assessmentMaxScore,
    assessmentStartDate,
    assessmentEndDate,
    assessmentFileSubmissionEnum
    //   // isOpen,
    //   // statusEnum
  ) => {
    setEditAssessmentTitle(assessmentTitle);
    setEditAssessmentDescription(assessmentDescription);
    setEditAssessmentMaxScore(assessmentMaxScore);
    setEditAssessmentStartDate(assessmentStartDate);
    setEditAssessmentEndDate(assessmentEndDate);
    setEditAssessmentFileSubmissionEnum(assessmentFileSubmissionEnum);
    setAssessmentIdToEdit(assessmentId);
    //   // setAssessmentIsOpen(isOpen);
    //   // setAssessmentStatusEnum(statusEnum);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditStartDateChange = (newAssessmentStartDate) => {
    setEditAssessmentStartDate(newAssessmentStartDate);
  };

  const handleEditEndDateChange = (newAssessmentEndDate) => {
    setEditAssessmentEndDate(newAssessmentEndDate);
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

  const editFileSubmission = () => {
    setAssessmentStartDateError({ value: false, errorMessage: "" });
    setAssessmentEndDateError({ value: false, errorMessage: "" });

    const editStartDate = editAssessmentStartDate;
    const editEndDate = editAssessmentEndDate;

    const editDateComparisonBoolean = editEndDate < editStartDate;

    if (editDateComparisonBoolean) {
      setAssessmentEndDateError({
        value: true,
        errorMessage: "Assessment End Date cannot be earlier than Start Date!",
      });
      setAssessmentStartDateError({
        value: true,
        errorMessage: "Assessment End Date cannot be earlier than Start Date!",
      });
    }
    if (!editDateComparisonBoolean) {
      var assessmentTitle = editAssessmentTitle;
      var assessmentDescription = editAssessmentDescription;
      var assessmentMaxScore = editAssessmentMaxScore;
      var assessmentStartDate = editAssessmentStartDate;
      var assessmentEndDate = editAssessmentEndDate;
      var assessmentIsOpen = "false";
      var assessmentStatusEnum = "PENDING";
      var assessmentFileSubmissionEnum = editAssessmentFileSubmissionEnum;
      const newEditedAssessment = {
        assessmentTitle,
        assessmentDescription,
        assessmentMaxScore,
        assessmentStartDate,
        assessmentEndDate,
        assessmentFileSubmissionEnum,
        assessmentIsOpen,
        assessmentStatusEnum,
      };
      fetch(
        "http://localhost:8080/assessment/updateFileSubmission/" +
          assessmentIdToEdit,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEditedAssessment),
        }
      ).then(() => {
        console.log("Assessment Edited Successfully!");
        setRefreshPage(true);
        handleEditDialogClose();
        handleClickEditSnackbar();
      });
    }
  };
  const handleEditAssessment = (e) => {
    e.preventDefault();
    
  };


  const navigate = useNavigate();

  function continueAsPartialAssessment() {
    navigate(`${assessmentsPath}/createAssessment`, {
      state: {
        assessmentPathProp: assessmentsPath,
      },
    });
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
              href={`${assessmentsPath}`}
            >
              Assessments
            </LinkMaterial>
          </Breadcrumbs>

          <div style={{ justifyContent: "center" }}>
            <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
              List of Assessments
            </h1>
            <Grid
              style={{
                display: "flex",
                flexDirection: "row",
                justifyItems: "flex-end",
              }}
            >
              <Button
                variant="contained"
                type="submit"
                onClick={continueAsPartialAssessment}
                style={{ float: "right", marginLeft: "auto" }}
              >
                Create New Assessment
              </Button>
            </Grid>
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
                    {/* <TableCell>Assessment Status</TableCell> */}
                    <TableCell>Assessment Type</TableCell>
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
                        <Link
                          to={`${assessmentsPath}/${assessment.assessmentId}`}
                          state={{
                            assessmentTitle: assessment.title,
                          }}
                          style={{ textDecoration: "none" }}
                        >
                          {assessment.title}
                        </Link>
                      </TableCell>
                      <TableCell>{assessment.maxScore}</TableCell>
                      <TableCell>{assessment.startDate}</TableCell>
                      <TableCell>{assessment.endDate}</TableCell>
                      <TableCell>{assessment.assessmentType}</TableCell>
                      {/* <TableCell>{assessment.assessmentIsOpen}</TableCell> */}
                      <TableCell>
                        <div>
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
                          <IconButton
                            aria-label="settings"
                            onClick={(event) =>
                              handleClickEditDialogOpen(
                                event,
                                assessment.assessmentId,
                                assessment.assessmentTitle,
                                assessment.assessmentDescription,
                                assessment.assessmentMaxScore,
                                assessment.assessmentStartDate,
                                assessment.assessmentEndDate,
                                assessment.assessmentFileSubmissionEnum
                                // assessment.assessmentIsOpen,
                                // assessment.assessmentStatusEnum
                              )
                            }
                          >
                            <EditIcon />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
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
          open={editDialogOpen}
          onClose={handleEditDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"You are editing this assessment"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Enter the new assessment details
            </DialogContentText>
            <TextField
              id="outlined-basic"
              label="New Assessment Title"
              variant="outlined"
              fullWidth
              style={{ margin: "6px 0" }}
              value={editAssessmentTitle}
              onChange={(e) => setEditAssessmentTitle(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="New Assessment Description"
              variant="outlined"
              fullWidth
              style={{ margin: "6px 0" }}
              value={editAssessmentDescription}
              onChange={(e) => setEditAssessmentDescription(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="New Assessment Max Score"
              variant="outlined"
              fullWidth
              style={{ margin: "6px 0" }}
              value={editAssessmentMaxScore}
              onChange={(e) => setEditAssessmentMaxScore(e.target.value)}
            />
            <Stack spacing={1}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="New Assessment Start Date"
                  inputFormat="MM/DD/YYYY"
                  value={editAssessmentStartDate}
                  onChange={handleEditStartDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ width: "100%" }}
                      error={assessmentStartDateError.value}
                      helperText={assessmentStartDateError.errorMessage}
                    />
                  )}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="New Assessment End Date"
                  inputFormat="MM/DD/YYYY"
                  value={editAssessmentEndDate}
                  onChange={handleEditEndDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ width: "100%" }}
                      error={assessmentEndDateError.value}
                      helperText={assessmentEndDateError.errorMessage}
                    />
                  )}
                />
              </LocalizationProvider>
            </Stack>
            <TextField
              id="outlined-basic"
              label="New Assessment File Submission Type"
              variant="outlined"
              fullWidth
              select
              style={{ margin: "6px 0" }}
              value={editAssessmentFileSubmissionEnum}
              onChange={(e) =>
                setEditAssessmentFileSubmissionEnum(e.target.value)
              }
            >
              {enumGroup.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose}>Cancel</Button>
            <Button onClick={editFileSubmission} autoFocus>
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default TeachingAssessmentList;
