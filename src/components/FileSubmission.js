import * as React from "react";

import AttachmentFileSubmissionComponent from "./AttachmentFileSubmissionComponent";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  Grid,
  LinearProgress,
  ThemeProvider,
  createTheme,
  Typography,
  Button,
  TextField,
  MenuItem,
  Stack,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState } from "react";

import TeachingCoursesDrawer from "../components/TeachingCoursesDrawer";

import { Link, useLocation, useParams } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import LinkMaterial from "@mui/material/Link";

import { useAuth } from "../context/AuthProvider";

import UploadService from "../services/UploadFilesService";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function FileSubmission(props) {
  const auth = useAuth();

  //paths
  const location = useLocation();
  const createFileSubmissionPath = location.pathname;

  const courseId = location.pathname.split("/")[2];

  const currentFileSubmission = location.state.newFileSubProp;
  const assessmentsPath = location.state.assessmentsPathProp;
  const createAssessmentPath = location.state.createAssessmentPathProp;
  const fileSubmissionId = location.pathname.split("/")[4];

  console.log(currentFileSubmission);
  const [attachmentList, setAttachmentList] = useState([]);
  const [uploadDialogBox, setUploadDialogBox] = useState(false);
  const [createDialogBox, setCreateDialogBox] = useState(false);

  const openUploadDialogBox = () => {
    setUploadDialogBox(true);
  };

  const closeUploadDialogBox = () => {
    setUploadDialogBox(false);
  };

  const openCreateDialogBox = () => {
    setCreateDialogBox(true);
  };

  const closeCreateDialogBox = () => {
    setCreateDialogBox(false);
  };

  const [refreshPage, setRefreshPage] = useState("");

  // React.useEffect(() => {
  //   setRefreshPage(false);
  //   fetch(
  //     "http://localhost:8080/assessment/getFileSubmissionById/" + assessmentId
  //   )
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setFileSubmission(result);
  //       console.log(result);
  //     });
  // }, [refreshPage]);

  const refresh = () => {
    setEditAssessmentSubmission(currentFileSubmission.assessmentSubmission);
  };

  //   const createNewFileSubmission = (e) => {
  //     e.preventDefault();
  //     const newAssessment = {
  //         assessmentTitle: assessmentTitle,
  //         assessmentDescription: assessmentDescription,
  //         assessmentMaxScore: assessmentMaxScore,
  //         assessmentStartDate: assessmentStartDate,
  //         assessmentEndDate: assessmentEndDate,
  //         assessmentIsOpen: "false",
  //         assessmentStatusEnum: "PENDING",
  //         assessmentFileSubmissionEnum: assessmentFileSubmissionEnum,
  //       };
  //       console.log(newAssessment);
  //       fetch(
  //         "http://localhost:8080/assessment/addNewFileSubmission/" + courseId,
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(newAssessment),
  //         }
  //       )
  //         .then((response) => {
  //           console.log("New File Submission Assessment Created Successfully!");
  //           setRefreshPage(true);
  //           setAssessmentTitle("");
  //           handleClose();
  //           handleClickSnackbar();
  //         })
  //         .catch((err) => {
  //           handleClickErrorSnackbar();
  //         });
  //     }
  //   };

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

  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setProgress(0);
  };

  const handleRefreshDelete = () => {
    refresh();
  };

  const handleRefreshUpdate = () => {
    refresh();
  };

  const uploadAttachment = () => {
    setProgress(0);
    UploadService.uploadAttachmentToFileSubmission(
      fileSubmissionId,
      currentFile,
      (event) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
      }
    )
      .then((response) => {
        console.log(response);
        closeUploadDialogBox();
        refresh();
      })
      .catch((err) => {
        setProgress(0);
        setCurrentFile(undefined);
      });
  };

  // progress bar
  const theme = createTheme({
    components: {
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            height: 15,
            borderRadius: 5,
          },
          colorPrimary: {
            backgroundColor: "#EEEEEE",
          },
          bar: {
            borderRadius: 5,
            backgroundColor: "#1a90ff",
          },
        },
      },
    },
  });

  const [assessmentAllowedAttempts, setAssessmentAllowedAttempts] = useState(0);
  const incrementAllowedAttempts = () => {
    setAssessmentAllowedAttempts(assessmentAllowedAttempts + 1);
  };

  const decrementAllowedAttempts = () => {
    setAssessmentAllowedAttempts(assessmentAllowedAttempts - 1);
  };

  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [assessmentDescription, setAssessmentDescription] = useState("");
  const [assessmentMaxScore, setAssessmentMaxScore] = useState("");
  const [assessmentStartDate, setAssessmentStartDate] = useState("");
  const [assessmentEndDate, setAssessmentEndDate] = useState("");
  const [assessmentFileSubmissionEnum, setAssessmentFileSubmissionEnum] =
    useState("");
  const [assessmentIsOpen, setAssessmentIsOpen] = useState("");
  const [assessmentStatusEnum, setAssessmentStatusEnum] = useState("");
  const enumGroup = [{ value: "INDIVIDUAL" }, { value: "GROUP" }];

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
  const [editAssessmentSubmission, setEditAssessmentSubmission] = useState("");
  const [assessmentIdToEdit, setAssessmentIdToEdit] = useState("");

  const [assessmentStartDateError, setAssessmentStartDateError] = useState({
    value: false,
    errorMessage: "",
  });
  const [assessmentEndDateError, setAssessmentEndDateError] = useState({
    value: false,
    errorMessage: "",
  });

  const handleClickEditDialogOpen = (
    event,
    assessmentTitle,
    assessmentDescription,
    assessmentMaxScore,
    assessmentStartDate,
    assessmentEndDate,
    assessmentFileSubmissionEnum,
    assessmentSubmission
  ) => {
    setEditAssessmentTitle(assessmentTitle);
    setEditAssessmentDescription(assessmentDescription);
    setEditAssessmentMaxScore(assessmentMaxScore);
    setEditAssessmentStartDate(assessmentStartDate);
    setEditAssessmentEndDate(assessmentEndDate);
    setEditAssessmentFileSubmissionEnum(assessmentFileSubmissionEnum);
    setEditAssessmentSubmission(assessmentSubmission);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  function editFileSubSettings(
    title,
    description,
    maxScore,
    startDate,
    endDate,
    fileSub,
    fileSubEnum
  ) {
    currentFileSubmission.assessmentTitle = title;
    currentFileSubmission.assessmentDescription = description;
    currentFileSubmission.assessmentMaxScore = maxScore;
    currentFileSubmission.assessmentStartDate = startDate;
    currentFileSubmission.assessmentEndDate = endDate;
    currentFileSubmission.assessmentSubmission = fileSub;
    currentFileSubmission.assessmentFileSubmissionEnum = fileSubEnum;
  }

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

  const createNewAssessment = (e) => {
    e.preventDefault();
    const newAssessment = {
      assessmentTitle: assessmentTitle,
      assessmentDescription: assessmentDescription,
      assessmentMaxScore: assessmentMaxScore,
      assessmentStartDate: assessmentStartDate,
      assessmentEndDate: assessmentEndDate,
      assessmentIsOpen: "false",
      assessmentStatusEnum: "PENDING",
      assessmentFileSubmissionEnum: assessmentFileSubmissionEnum,
    };
    fetch("http://localhost:8080/assessment/addNewFileSubmission/" + courseId, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAssessment),
    })
      .then((response) => {
        console.log("New File Submission Assessment Created Successfully!");
        setRefreshPage(true);
        handleClickSnackbar();
      })
      .catch((err) => {
        handleClickErrorSnackbar();
      });
  };

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <TeachingCoursesDrawer></TeachingCoursesDrawer>
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
              File Submission Details Updated Succesfully!
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
            <Link
              to={`${assessmentsPath}`}
              style={{ textDecoration: "none", color: "grey" }}
            >
              <LinkMaterial underline="hover" color="inherit">
                Assessments
              </LinkMaterial>
            </Link>
            <Link
              to={`${createAssessmentPath}`}
              style={{ textDecoration: "none", color: "grey" }}
              state={{
                createAssessmentPathProp: { createAssessmentPath },
                assessmentsPathProp: { assessmentsPath },
              }}
            >
              <LinkMaterial underline="hover" color="inherit">
                Create Assessment
              </LinkMaterial>
            </Link>
            <Link
              to={`${createFileSubmissionPath}`}
              style={{ textDecoration: "none", color: "grey" }}
            >
              <LinkMaterial underline="hover" color="inherit">
                {currentFileSubmission.assessmentTitle}
              </LinkMaterial>
            </Link>
          </Breadcrumbs>
          <div style={{ padding: "5%", justifyContent: "center" }}>
            <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
              {currentFileSubmission.assessmentTitle}
            </h1>
            <Button
              className="btn-upload"
              color="primary"
              variant="contained"
              component="span"
              onClick={(event) =>
                handleClickEditDialogOpen(
                  event,
                  currentFileSubmission.assessmentTitle,
                  currentFileSubmission.assessmentDescription,
                  currentFileSubmission.assessmentMaxScore,
                  currentFileSubmission.assessmentStartDate,
                  currentFileSubmission.assessmentEndDate,
                  currentFileSubmission.assessmentFileSubmissionEnum,
                  currentFileSubmission.assessmentSubmission
                )
              }
              style={{ float: "right", marginLeft: "auto" }}
            >
              Edit Details
            </Button>
          </div>
          <div style={{ padding: "5%" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Deadline: </b>{" "}
                    </TableCell>
                    <TableCell>
                      <b>File Submission Type: </b>
                      {currentFileSubmission.assessmentFileSubmissionEnum}
                    </TableCell>
                    <TableCell>
                      <b>Submitting: </b>{" "}
                      {currentFileSubmission.assessmentSubmission}
                    </TableCell>
                    <TableCell>
                      <b>Allowed Attempts: </b>
                      <Button onClick={decrementAllowedAttempts}>-</Button>
                      {assessmentAllowedAttempts}

                      <Button onClick={incrementAllowedAttempts}>+</Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <TableRow>
                <TableCell style={{ textAlign: "justify" }}>
                  <b>Assessment Description: </b> <br /> <br />
                  {currentFileSubmission.assessmentDescription}
                </TableCell>
              </TableRow>
            </TableContainer>
          </div>
          <div style={{ padding: "5%" }}>
            {attachmentList &&
              attachmentList.length > 0 &&
              attachmentList.map((attachment) => (
                <AttachmentFileSubmissionComponent
                  attachment={attachment}
                  courseId={fileSubmissionId}
                  handleRefreshDeleteFileSubmission={handleRefreshDelete}
                  handleRefreshUpdateFileSubmission={handleRefreshUpdate}
                ></AttachmentFileSubmissionComponent>
              ))}
            {(!attachmentList || attachmentList.length <= 0) && (
              <p>
                This file submission assessment doesn't have any attachments
                currently.
              </p>
            )}
            <Button
              color="primary"
              variant="contained"
              component="span"
              onClick={openUploadDialogBox}
              style={{ float: "right", marginLeft: "auto" }}
            >
              Upload Attachment
            </Button>
          </div>
          <div style={{ padding: "5%" }}>
            <Button
              color="primary"
              variant="contained"
              component="span"
              onClick={openCreateDialogBox}
              style={{ float: "right", marginLeft: "auto" }}
            >
              Create Assessment
            </Button>
          </div>
        </Grid>
      </Grid>
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle id="alert-dialog-title">
          {"You are editing this assessment"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Edit File Submission details
          </DialogContentText>
          <TextField
            id="outlined-basic"
            label="Assessment Title"
            variant="outlined"
            fullWidth
            style={{ margin: "6px 0" }}
            value={editAssessmentTitle}
            onChange={(e) => setEditAssessmentTitle(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Assessment Description (Add detailed description)"
            variant="outlined"
            multiline
            maxRows={4}
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
          <TextField
            id="outlined-basic"
            label="Assessment Submission Files"
            variant="outlined"
            fullWidth
            style={{ margin: "6px 0" }}
            value={editAssessmentSubmission}
            onChange={(e) => setEditAssessmentSubmission(e.target.value)}
          />
          <Stack spacing={1}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="New Assessment Start Date"
                inputFormat="MM/DD/YYYY"
                value={editAssessmentStartDate}
                onChange={(date) => setEditAssessmentStartDate(date)}
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
                onChange={(date) => setEditAssessmentEndDate(date)}
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
          <Button onClick={editFileSubSettings} autoFocus>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={uploadDialogBox}
        onClose={closeUploadDialogBox}
        fullWidth="lg"
      >
        <DialogContent>
          <DialogContentText>Upload file</DialogContentText>

          <br />
          <label htmlFor="btn-upload">
            <input
              id="btn-upload"
              name="btn-upload"
              style={{ display: "none" }}
              type="file"
              accept=".doc,.docx,.pdf, .mp4"
              onChange={selectFile}
            />
            <Button className="btn-choose" variant="outlined" component="span">
              Choose File
            </Button>
          </label>
          <divider></divider>
          {currentFile && (
            <Box className="my20" display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <ThemeProvider theme={theme}>
                  <LinearProgress variant="determinate" value={progress} />
                </ThemeProvider>
              </Box>
              <Box minWidth={35}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >{`${progress}%`}</Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button disabled={!currentFile} onClick={uploadAttachment}>
            Upload
          </Button>
          <Button onClick={closeUploadDialogBox}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={createDialogBox}
        onClose={closeCreateDialogBox}
        fullWidth="lg"
      >
        <DialogContent>
          <DialogContentText>Confirm File Submission Details</DialogContentText>
          <TextField
            required
            id="outlined-basic"
            label="Assessment Title"
            variant="outlined"
            fullWidth
            style={{ margin: "6px 0" }}
            value={currentFileSubmission.assessmentTitle}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={createNewAssessment}>Confirm and Create</Button>
          <Button onClick={closeCreateDialogBox}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FileSubmission;
