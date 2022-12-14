// import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import LearnerCoursesDrawer from "../LearnerCourseDrawer";
import Paper from "@mui/material/Paper";
import Moment from "moment";

import SettingsIcon from "@mui/icons-material/Settings";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UploadService from "../../services/UploadFilesService";
import AttachmentFileSubmissionComponent from "../AttachmentFileSubmissionComponent";
import {
  Button,
  Dialog,
  Grid,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  createTheme,
  Box,
  ThemeProvider,
  LinearProgress,
  Typography,
  Snackbar,
  Alert,
  Divider,
  TextField,
} from "@mui/material";

export default function FileSubmissionAttempt(props) {
  const navigate = useNavigate();
  var location = useLocation(props);
  var courseId = location.state.courseIdProp;
  var learnerStatus = location.state.learnerStatusProp;
  var fileSubmissionId = location.state.fileSubmissionIdProp;
  var auth = useAuth();
  var user = auth.user;
  var learnerId = user.userId;

  const [viewSubmission, setViewSubmission] = useState(false);
  const [currentFileSubmission, setCurrentFileSubmission] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();
  const [maxScore, setMaxScore] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [fileSubmissionStatusEnum, setFileSubmissionStatusEnum] = useState();
  const [fileSubmissionExpired, setFileSubmissionExpired] = useState(false);
  const [hasPreviousAttempt, setHasPreviousAttempt] = useState(false);
  const [fileSubmissionAttempt, setFileSubmissionAttempt] = useState({});
  const [attachmentList, setAttachmentList] = useState([]);
  const [uploadedAttachment, setUploadedAttachment] = useState();
  const [uploadDialogBox, setUploadDialogBox] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState();
  const [openUploadFileSnackbar, setOpenUploadFileSnackbar] =
    React.useState(false);

  React.useEffect(() => {
    console.log("useEffect called");
    fetch(
      "http://localhost:8080/assessment/getFileSubmissionById/" +
      fileSubmissionId
    )
      .then((res) => res.json())
      .then((result) => {
        setViewSubmission(false);
        setCurrentFileSubmission(result);
        setTitle(result.title);
        setDescription(result.description);
        setMaxScore(result.maxScore);
        setStartDate(result.startDate);
        setEndDate(result.endDate);
        setFileSubmissionStatusEnum(result.assessmentStatus);
        setFileSubmissionExpired(result.isExpired);
        setAttachmentList(result.attachments);
        const today = new Date();
        if (today > result.getEndDate) {
          setFileSubmissionExpired(true);
        } else {
          setFileSubmissionExpired(false);
        }
        console.log("retrieved fileSubmission:", result);
      })
      .then(
        fetch(
          "http://localhost:8080/fileSubmissionAttempt/getFileSubmissionAttemptByAssessmentId/" +
          fileSubmissionId +
          "/" +
          learnerId
        )
          .then((res) => res.json())
          .then((result) => {
            console.log("most recent attempt: ", result);
            if (result.fileSubmissionAttemptId == null) {
              console.log("actually dont have recent attempts");
              setHasPreviousAttempt(false);
            } else {
              console.log("there exist recent attempts");
              setHasPreviousAttempt(true);
              setFileSubmissionAttempt(result);
            }
          })
          .catch((err) => {
            console.log(err.message);
          })
      );
  }, []);

  const handleClickEditSnackbar = () => {
    setOpenUploadFileSnackbar(true);
  };

  const handleCloseEditSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenUploadFileSnackbar(false);
  };

  const openUploadDialogBox = () => {
    setUploadDialogBox(true);
  };

  const closeUploadDialogBox = () => {
    setUploadDialogBox(false);
  };

  const refresh = () => {
    console.log("refresh page called");
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
      .then(
        fetch(
          "http://localhost:8080/fileSubmissionAttempt/getFileSubmissionAttemptByAssessmentId/" +
          fileSubmissionId +
          "/" +
          learnerId
        )
          .then((res) => res.json())
          .then((result) => {
            console.log("most recent attempt: ", result);
            if (result.fileSubmissionAttemptId == null) {
              setHasPreviousAttempt(false);
            } else {
              setHasPreviousAttempt(true);
              setFileSubmissionAttempt(result);
            }
          })
      )
      .catch((err) => {
        console.log(err.message);
      });

    //also fetch filesubmissionattempt
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

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setProgress(0);
  };

  const uploadAttachment = () => {
    setProgress(0);
    console.log(
      "calling upload attachment to fileSubAttempt service for file: ",
      currentFile
    );
    UploadService.uploadAttachmentToFileSubmissionAttempt(
      fileSubmissionAttempt.fileSubmissionAttemptId,
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

  const handleRefreshDelete = () => {
    refresh();
  };

  const handleRefreshUpdate = () => {
    refresh();
  };

  function proceedFileSubmission() {
    if (!hasPreviousAttempt) {
      console.log("proceed file sub, no previous attempt found");
      fetch(
        "http://localhost:8080/fileSubmissionAttempt/createFileSubmissionAttempt/" +
        fileSubmissionId +
        "/" +
        learnerId,
        {
          method: "POST",
        }
      )
        .then((res) => res.json())
        .then((result) => {
          console.log("instantiated new file sub attempt: ", result);
          setFileSubmissionAttempt(result);
        })
        .then(() => {
          setViewSubmission(true);
          var incrementUrl = "http://localhost:8080/treePoints/incrementTreePoints?learnerId=" + user.userId + "&increment=1";
          fetch(incrementUrl)
            .then(() => {
              console.log("Successful in adding one tree poitns!");
            })
            .catch((err)=> {
              console.log(err);
            })
        })

    } else {
      //already has file submission attempt set
      setViewSubmission(true);
    }
  }

  return (
    <div>
      <Grid container direction={"column"}>
        <ToastContainer/>
        <h1>{title}</h1>
        <Grid item xs={2}>
          <LearnerCoursesDrawer
            courseId={courseId}
            learnerStatus={learnerStatus}
          />
          <Snackbar
            open={openUploadFileSnackbar}
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
        </Grid>
        {!viewSubmission ? (
          <Grid container direction={"column"} alignContent={"center"}>
            <Grid item>File Submission Description: {description}</Grid>
            <Grid item>File Submission Max Score: {maxScore}</Grid>
            <Grid item>File Submission Start Date: {startDate}</Grid>
            <Grid item>File Submission Deadline: {endDate}</Grid>

            {fileSubmissionAttempt.assessmentAttemptStatusEnum == "GRADED" ? (
              <Button variant="contained" onClick={proceedFileSubmission}>
                View Graded File Submission Attempt
              </Button>
            ) : (
              <>
                {!fileSubmissionExpired ? (
                  <Button onClick={proceedFileSubmission} variant="contained">
                    Proceed to File Submission
                  </Button>
                ) : (
                  <p style={{ marginTop: "20px" }}>File Submission Expired</p>
                )}
              </>
            )}
          </Grid>
        ) : (
          <Grid item xs={2}>
            <Grid style={{ marginLeft: "400px" }}>
              <div style={{ padding: "2%" }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow style={{ backgroundColor: "#B0C4DE" }}>
                        <TableCell>
                          <b>Deadline: </b>
                          {Moment(endDate).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell>
                          <b>File Submission Max Score: </b>
                          {maxScore}
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableRow>
                      <TableCell colSpan={2} style={{ textAlign: "justify" }}>
                        <b>Assessment Description: </b> <br /> <br />
                        {description}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell colSpan={2}>
                        {attachmentList &&
                          attachmentList.length > 0 &&
                          attachmentList.map((attachment) => (
                            <div>
                              <p>Attachments available for Download:</p>
                              <AttachmentFileSubmissionComponent
                                attachment={attachment}
                                courseId={fileSubmissionId}
                                handleRefreshDeleteFileSubmission={
                                  handleRefreshDelete
                                }
                                handleRefreshUpdateFileSubmission={
                                  handleRefreshUpdate
                                }
                              />
                            </div>
                          ))}
                        {(!attachmentList || attachmentList.length <= 0) && (
                          <p>
                            This Assessment does not have attachments available
                            for download
                          </p>
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell colSpan={2}>
                        {!hasPreviousAttempt ? (
                          <div>
                            <p>You do not have any File Uploads</p>
                          </div>
                        ) : (
                          <>
                            {!(fileSubmissionAttempt.attachment == null) && (
                              <div>
                                <p>You have uploaded:</p>
                                <br />
                                {
                                  fileSubmissionAttempt.attachment
                                    .fileOriginalName
                                }
                              </div>
                            )}
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  </Table>
                </TableContainer>

                <Grid container justifyContent={"center"} marginTop="50px">
                  {!fileSubmissionAttempt.assessmentAttemptStatusEnum ==
                    "GRADED" ? (
                    <Button
                      color="primary"
                      variant="contained"
                      component="span"
                      onClick={openUploadDialogBox}
                      style={{ float: "right" }}
                    >
                      <FileUploadIcon style={{ marginRight: 10 }} />
                      Upload File
                    </Button>
                  ) : (
                    <Paper
                      style={{
                        paddingTop: 10,
                        paddingBottom: 30,
                        paddingLeft: 10,
                        paddingRight: 10,
                        marginTop: 10,
                        backgroundColor: "#CCCCFF",
                      }}
                    >
                      <p>
                        <b>Instructor Feedback:</b>
                      </p>
                      <br />
                      <TextField
                        multiline
                        value={fileSubmissionAttempt.feedback}
                      ></TextField>
                    </Paper>
                  )}
                </Grid>
              </div>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Dialog
        open={uploadDialogBox}
        onClose={closeUploadDialogBox}
        fullWidth="lg"
      >
        <DialogContent>
          <Grid
            container
            direction={"column"}
            justifyItems={"center"}
            alignItems={"center"}
          >
            <DialogContentText marginTop={"20px"}>
              Select File to upload
            </DialogContentText>
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
              <Button
                className="btn-choose"
                variant="outlined"
                component="span"
              >
                Select File
              </Button>
            </label>
          </Grid>
          <Divider></Divider>
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
            Submit File Submission
          </Button>
          <Button onClick={closeUploadDialogBox}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
