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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Modal,
  Box,
} from "@mui/material";
import { useState } from "react";

import TeachingCoursesDrawer from "../components/TeachingCoursesDrawer";
import FileSubmissionSettings from "../components/FileSubmissionSettings";

import { Link, useLocation, useNavigate } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import LinkMaterial from "@mui/material/Link";

import SettingsIcon from "@mui/icons-material/Settings";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SaveIcon from "@mui/icons-material/Save";

import UploadService from "../services/UploadFilesService";

import MuiAlert from "@mui/material/Alert";

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
        setCurrentFileSubmission(fileSub);
        setAttachmentList(fileSub.attachments);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [refreshPage]);

  const refresh = () => {
    fetch(
      "http://localhost:8080/assessment/getFileSubmissionById/" +
        fileSubmissionId
    )
      .then((res) => res.json())
      .then((result) => {
        var fileSub = result;
        setCurrentFileSubmission(fileSub);
        setAttachmentList(fileSub.attachments);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [open, setOpen] = React.useState(false);

  function handleOpenSettingsDialogue() {
    setOpen(true);
  }

  function handleCloseSettingsDialogue(ed) {
    setOpen(false);
  }

  //   function editQuizSettings(
  //     title,
  //     description,
  //     maxScore,
  //     startDate,
  //     endDate,
  //     hasTimeLimit,
  //     timeLimit,
  //     isAutoRelease
  //   ) {
  //     currentQuiz.assessmentTitle = title;
  //     currentQuiz.assessmentDescription = description;
  //     currentQuiz.assessmentMaxScore = maxScore;
  //     currentQuiz.assessmentStartDate = startDate;
  //     currentQuiz.assessmentEndDate = endDate;
  //     currentQuiz.hasTimeLimit = hasTimeLimit;
  //     currentQuiz.timeLimit = timeLimit;
  //     currentQuiz.isAutoRelease = isAutoRelease;
  //   }

  //   const editFileSubmission = () => {
  //     setAssessmentStartDateError({ value: false, errorMessage: "" });
  //     setAssessmentEndDateError({ value: false, errorMessage: "" });

  //     const editStartDate = editAssessmentStartDate;
  //     const editEndDate = editAssessmentEndDate;

  //     const editDateComparisonBoolean = editEndDate < editStartDate;

  //     if (editDateComparisonBoolean) {
  //       setAssessmentEndDateError({
  //         value: true,
  //         errorMessage: "Assessment End Date cannot be earlier than Start Date!",
  //       });
  //       setAssessmentStartDateError({
  //         value: true,
  //         errorMessage: "Assessment End Date cannot be earlier than Start Date!",
  //       });
  //     }
  //     if (!editDateComparisonBoolean) {
  //       var assessmentTitle = editAssessmentTitle;
  //       var assessmentDescription = editAssessmentDescription;
  //       var assessmentMaxScore = editAssessmentMaxScore;
  //       var assessmentStartDate = editAssessmentStartDate;
  //       var assessmentEndDate = editAssessmentEndDate;
  //       var assessmentIsOpen = "false";
  //       var assessmentStatusEnum = "PENDING";
  //       var assessmentFileSubmissionEnum = editAssessmentFileSubmissionEnum;
  //       const newEditedAssessment = {
  //         assessmentTitle,
  //         assessmentDescription,
  //         assessmentMaxScore,
  //         assessmentStartDate,
  //         assessmentEndDate,
  //         assessmentFileSubmissionEnum,
  //         assessmentIsOpen,
  //         assessmentStatusEnum,
  //       };
  //       fetch(
  //         "http://localhost:8080/assessment/updateFileSubmission/" +
  //           assessmentIdToEdit,
  //         {
  //           method: "PUT",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(newEditedAssessment),
  //         }
  //       ).then(() => {
  //         console.log("Assessment Edited Successfully!");
  //         setRefreshPage(true);
  //         handleEditDialogClose();
  //         handleClickEditSnackbar();
  //       });
  //     }
  //   };

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
              onClick={() => handleOpenSettingsDialogue()}
            >
              <SettingsIcon style={{ marginRight: 10 }} />
              Edit Settings
            </Button>
            {/* <Modal
              open={open}
              onClose={handleCloseSettingsDialogue}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <FileSubmissionSettings
                fileSubmissionSettingsProp={currentFileSubmission}
                editQuizSettingsProp={editQuizSettings}
                closeQuizSettingsProp={handleCloseSettingsDialogue}
              ></FileSubmissionSettings>
            </Modal> */}
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
          <div style={{ padding: "2%" }}></div>
          <div style={{ padding: "2%" }}>
            <Button
              color="primary"
              variant="contained"
              component="span"
              //   onClick={editFileSubmission}
              style={{ float: "right", marginLeft: "auto" }}
            >
              <SaveIcon style={{ marginRight: 10 }} />
              Save
            </Button>
            <Button
              color="primary"
              variant="contained"
              component="span"
              onClick={handleCancel}
              style={{ float: "left", marginLeft: "auto" }}
            >
              Cancel
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
    </div>
  );
}

export default FileSubmission;
