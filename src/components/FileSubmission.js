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
  Stack,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box,
} from "@mui/material";
import { useState } from "react";

import TeachingCoursesDrawer from "../components/TeachingCoursesDrawer";

import { Link, useLocation, useNavigate } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import LinkMaterial from "@mui/material/Link";

import SettingsIcon from "@mui/icons-material/Settings";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import UploadService from "../services/UploadFilesService";

import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import Moment from "moment";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function FileSubmission(props) {
  //paths
  const location = useLocation();
  const createFileSubmissionPath = location.pathname;

  const courseId = location.pathname.split("/")[2];

  const navigate = useNavigate();

  const assessmentsPath = location.state.assessmentsPathProp;
  const maxAssessmentDiscountPoints = location.state.maxAssessmentDiscountPointsProp;

  const createAssessmentPath = location.state.createAssessmentPathProp;
  const fileSubmissionId = location.pathname.split("/")[4];

  const [currentFileSubmission, setCurrentFileSubmission] = useState("");
  const [attachmentList, setAttachmentList] = useState([]);
  const [uploadDialogBox, setUploadDialogBox] = useState(false);

  const openUploadDialogBox = () => {
    setUploadDialogBox(true);
  };

  const closeUploadDialogBox = () => {
    setUploadDialogBox(false);
  };

  const [refreshPage, setRefreshPage] = useState("");

  React.useEffect(() => {
    setRefreshPage(false);
    fetch(
      "http://localhost:8080/assessment/getFileSubmissionById/" +
        fileSubmissionId
    )
      .then((res) => res.json())
      .then((result) => {
        var fileSub = result;
        setAttachmentList(fileSub.attachments);
        setCurrentFileSubmission(fileSub);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [refreshPage]);

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

  const refresh = () => {
    fetch(
      "http://localhost:8080/assessment/getFileSubmissionById/" +
        fileSubmissionId
    )
      .then((res) => res.json())
      .then((result) => {
        var fileSub = result;
        setAttachmentList(fileSub.attachments);
        console.log(currentFileSubmission);
      })
      .catch((err) => {
        console.log(err.message);
      });
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
  const [discountPointForAssessmentError, setDiscountPointForAssessmentError] = useState({
    value: false,
    errorMessage: "",
  });  
  const [discountPointToTopPercentError, setDiscountPointToTopPercentError] = useState({
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

  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  const [editAssessmentTitle, setEditAssessmentTitle] = useState("");
  const [editAssessmentDescription, setEditAssessmentDescription] =
    useState("");
  const [editAssessmentMaxScore, setEditAssessmentMaxScore] = useState("");
  const [editDiscountPointForAssessment, setEditDiscountPointForAssessment] = useState("")
  const [editDiscountPointToTopPercent, setEditDiscountPointToTopPercent] = useState("")
  const [editAssessmentStartDate, setEditAssessmentStartDate] = useState(
    dayjs()
  );
  const [editAssessmentEndDate, setEditAssessmentEndDate] = useState(dayjs());
  const [
    editAssessmentFileSubmissionEnum,
    setEditAssessmentFileSubmissionEnum,
  ] = useState("");
  const [assessmentIdToEdit, setAssessmentIdToEdit] = useState("");
  const enumGroup = [{ value: "INDIVIDUAL" }, { value: "GROUP" }];

  const handleEditStartDateChange = (e) => {
    var result = e.add(8, "hours");
    setEditAssessmentStartDate(result);
  };

  const handleEditEndDateChange = (e) => {
    var result = e.add(8, "hours");
    setEditAssessmentEndDate(result);
  };

  const handleClickEditDialogOpen = (
    event,
    assessmentId,
    assessmentTitle,
    assessmentDescription,
    assessmentMaxScore,
    discountPointForAssessment,
    discountPointToTopPercent,
    assessmentStartDate,
    assessmentEndDate,
    assessmentFileSubmissionEnum
  ) => {
    setEditAssessmentTitle(assessmentTitle);
    setEditAssessmentDescription(assessmentDescription);
    setEditAssessmentMaxScore(assessmentMaxScore);
    setEditDiscountPointForAssessment(discountPointForAssessment);
    setEditDiscountPointToTopPercent(discountPointToTopPercent);
    setEditAssessmentStartDate(assessmentStartDate);
    setEditAssessmentEndDate(assessmentEndDate);
    setEditAssessmentFileSubmissionEnum(assessmentFileSubmissionEnum);
    setAssessmentIdToEdit(assessmentId);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const editFileSubmission = () => {
    setAssessmentTitleError({ value: false, errorMessage: "" });
    setAssessmentDescriptionError({ value: false, errorMessage: "" });
    setAssessmentMaxScoreError({ value: false, errorMessage: "" });
    setAssessmentStartDateError({ value: false, errorMessage: "" });
    setAssessmentEndDateError({ value: false, errorMessage: "" });
    setDiscountPointForAssessmentError({ value: false, errorMessage: "" });
    setDiscountPointToTopPercentError({ value: false, errorMessage: "" })
    if (editAssessmentTitle == "") {
      setAssessmentTitleError({
        value: true,
        errorMessage: "Title field cannot be left empty!",
      });
    }
    if (editAssessmentDescription == "") {
      setAssessmentDescriptionError({
        value: true,
        errorMessage: "Description field cannot be left empty!",
      });
    }
    if (isNaN(editAssessmentMaxScore) || editAssessmentMaxScore == "") {
      setAssessmentMaxScoreError({
        value: true,
        errorMessage: "Please enter a valid score!",
      });
    }
    if(editDiscountPointForAssessment=="") {
      setDiscountPointForAssessmentError({
        value: true,
        errorMessage: "Discount Points cannot be empty!",
      });
    }
    if(editDiscountPointForAssessment > maxAssessmentDiscountPoints) {
      setDiscountPointForAssessmentError({
        value: true,
        errorMessage: "Discount Points cannot be more than " + maxAssessmentDiscountPoints,
      });
    }
    if(editDiscountPointToTopPercent === "") {
      setDiscountPointToTopPercentError({
        value: true,
        errorMessage: "Percentage of learners to give discount points cannot be empty!",
      });
    }

    if(Number(editDiscountPointToTopPercent) < 0 || Number(editDiscountPointToTopPercent) > 100) {
      setDiscountPointToTopPercentError({
        value: true,
        errorMessage: "Percentage needs to be between 0 to 100",
      });
    }
    if(String(editDiscountPointToTopPercent).includes(".")) {
      setDiscountPointToTopPercentError({
        value: true,
        errorMessage: "Percentage needs to be an integer value",
      });
    }

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
    if (
      editAssessmentTitle &&
      editAssessmentDescription &&
      !isNaN(editAssessmentMaxScore) &&
      editAssessmentMaxScore &&
      !editDateComparisonBoolean &&
      !(editDiscountPointForAssessment > maxAssessmentDiscountPoints) &&
      !(Number(editDiscountPointToTopPercent) < 0 || Number(editDiscountPointToTopPercent) > 100) &&
      !(String(editDiscountPointToTopPercent).includes("."))
    ) {
      var assessmentTitle = editAssessmentTitle;
      var assessmentDescription = editAssessmentDescription;
      var assessmentMaxScore = editAssessmentMaxScore;
      var discountPointForAssessment = editDiscountPointForAssessment;
      var discountPointToTopPercent = editDiscountPointToTopPercent;
      var assessmentStartDate = editAssessmentStartDate;
      var assessmentEndDate = editAssessmentEndDate;
      var assessmentIsOpen = "false";
      var assessmentStatusEnum = "PENDING";
      var assessmentFileSubmissionEnum = editAssessmentFileSubmissionEnum;
      const newEditedAssessment = {
        assessmentTitle,
        assessmentDescription,
        assessmentMaxScore,
        discountPointForAssessment,
        discountPointToTopPercent,
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

  const handleCancel = (e) => {
    navigate(`${assessmentsPath}`);
  };

  //adding attachments to a file submission

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

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <TeachingCoursesDrawer></TeachingCoursesDrawer>
        </Grid>
        <Grid item xs={10}>
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
              to={`${createFileSubmissionPath}`}
              style={{ textDecoration: "none", color: "grey" }}
            >
              <LinkMaterial underline="hover" color="inherit">
                Edit File Submission: <b>{currentFileSubmission.title}</b>
              </LinkMaterial>
            </Link>
          </Breadcrumbs>
          <div style={{ padding: "2%" }}>
            <Button
              aria-label="settings"
              variant="contained"
              style={{ float: "right", marginLeft: "auto" }}
              onClick={(event) =>
                handleClickEditDialogOpen(
                  event,
                  currentFileSubmission.assessmentId,
                  currentFileSubmission.title,
                  currentFileSubmission.description,
                  currentFileSubmission.maxScore,
                  currentFileSubmission.discountPointForAssessment,
                  currentFileSubmission.discountPointToTopPercent,
                  currentFileSubmission.startDate,
                  currentFileSubmission.endDate,
                  currentFileSubmission.fileSubmissionEnum
                )
              }
            >
              <SettingsIcon style={{ marginRight: 10 }} />
              Edit Settings
            </Button>
          </div>
          <div style={{ padding: "2%" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow style={{ backgroundColor: "#B0C4DE" }}>
                    <TableCell>
                      <b>Deadline: </b>
                      {Moment(currentFileSubmission.endDate).format(
                        "YYYY-MM-DD"
                      )}
                    </TableCell>
                    <TableCell>
                      <b>File Submission Max Score: </b>
                      {currentFileSubmission.maxScore}
                    </TableCell>
                    <TableCell>
                      <b>File Submission Type: </b>
                      {currentFileSubmission.fileSubmissionEnum}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableRow>
                  <TableCell colSpan={2} style={{ textAlign: "justify" }}>
                    <b>Assessment Description: </b> <br /> <br />
                    {currentFileSubmission.description}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    {attachmentList &&
                      attachmentList.length > 0 &&
                      attachmentList.map((attachment) => (
                        <AttachmentFileSubmissionComponent
                          attachment={attachment}
                          courseId={fileSubmissionId}
                          handleRefreshDeleteFileSubmission={
                            handleRefreshDelete
                          }
                          handleRefreshUpdateFileSubmission={
                            handleRefreshUpdate
                          }
                        ></AttachmentFileSubmissionComponent>
                      ))}
                    {(!attachmentList || attachmentList.length <= 0) && (
                      <p>
                        This file submission assessment doesn't have any
                        attachments currently.
                      </p>
                    )}
                    <Button
                      color="primary"
                      variant="contained"
                      component="span"
                      onClick={openUploadDialogBox}
                      style={{ float: "right", marginLeft: "auto" }}
                    >
                      <FileUploadIcon style={{ marginRight: 10 }} />
                      Upload Attachment
                    </Button>
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </div>
          <div style={{ padding: "2%" }}>
            <Button
              color="primary"
              variant="contained"
              component="span"
              onClick={handleCancel}
              style={{ float: "left", marginLeft: "auto" }}
            >
              Go back to main page
            </Button>
          </div>
        </Grid>
      </Grid>

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
            error={assessmentTitleError.value}
            helperText={assessmentTitleError.errorMessage}
          />
          <TextField
            id="outlined-basic"
            label="New Assessment Description"
            variant="outlined"
            fullWidth
            multiline
            maxRows={10}
            style={{ margin: "6px 0" }}
            value={editAssessmentDescription}
            onChange={(e) => setEditAssessmentDescription(e.target.value)}
            error={assessmentDescriptionError.value}
            helperText={assessmentDescriptionError.errorMessage}
          />
          <TextField
            id="outlined-basic"
            label="New Assessment Max Score"
            variant="outlined"
            fullWidth
            style={{ margin: "6px 0" }}
            value={editAssessmentMaxScore}
            onChange={(e) => setEditAssessmentMaxScore(e.target.value)}
            error={assessmentMaxScoreError.value}
            helperText={assessmentMaxScoreError.errorMessage}
          />
                    <TextField
            id="outlined-basic"
            label="New Discount Point Allocation"
            variant="outlined"
            fullWidth
            style={{ margin: "6px 0" }}
            value={editDiscountPointForAssessment}
            onChange={(e) => setEditDiscountPointForAssessment(e.target.value)}
            error={discountPointForAssessmentError.value}
            helperText={discountPointForAssessmentError.errorMessage}
          />
                    <TextField
            id="outlined-basic"
            label="New Percentage of Top Learners To Allocate Points"
            variant="outlined"
            fullWidth
            style={{ margin: "6px 0" }}
            value={editDiscountPointToTopPercent}
            onChange={(e) => setEditDiscountPointToTopPercent(e.target.value)}
            error={discountPointToTopPercentError.value}
            helperText={discountPointToTopPercentError.errorMessage}
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
  );
}

export default FileSubmission;
