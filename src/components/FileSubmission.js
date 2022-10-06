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
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box,
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

import Moment from "moment";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function FileSubmission(props) {
  const auth = useAuth();
  const user = auth.user;

  //paths
  const location = useLocation();
  const assessmentsPath = location.pathname.split("/").slice(0, 4).join("/");
  const fileSubmissionPath = location.pathname;

  const fileSubmissionId = location.pathname.split("/")[4];
  const assessmentTitle = location.state.assessmentTitle;

  const [fileSubmission, setFileSubmission] = useState("");
  const [attachmentList, setAttachmentList] = useState([]);

  const [uploadDialogBox, setUploadDialogBox] = useState(false);

  const openUploadDialogBox = () => {
    setUploadDialogBox(true);
  };

  const closeUploadDialogBox = () => {
    setUploadDialogBox(false);
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
    fetch(
      "http://localhost:8080/assessment/getFileSubmissionById/" +
        fileSubmissionId
    )
      .then((res) => res.json())
      .then((result) => {
        var fol = result;
        console.log(JSON.stringify(fol));
        setAttachmentList(fol.attachments);
        console.log("Length of attachment is " + attachmentList.length);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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

  const editFileSubmissionDetails = (e) => {
    e.preventDefault();
    handleClickSnackbar();
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

  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  const [editAssessmentDescription, setEditAssessmentDescription] =
    useState("");
  const [assessmentIdToEdit, setAssessmentIdToEdit] = useState("");
  const [assessmentDescription, setAssessmentDescription] = useState("");
  const [assessmentMaxScore, setAssessmentMaxScore] = useState("");
  const [assessmentFileSubmissionEnum, setAssessmentFileSubmissionEnum] =
    useState("");

  const handleClickEditDialogOpen = (
    event,
    assessmentId,
    assessmentDescription
    //   // isOpen,
    //   // statusEnum
  ) => {
    setEditAssessmentDescription(assessmentDescription);
    setAssessmentIdToEdit(assessmentId);
    //   // setAssessmentIsOpen(isOpen);
    //   // setAssessmentStatusEnum(statusEnum);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const editAssessment = (e) => {
    e.preventDefault();
    var assessmentDescription = editAssessmentDescription;
    const newEditedAssessment = {
      assessmentTitle,
      assessmentDescription,
      assessmentMaxScore,
      assessmentFileSubmissionEnum,
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
      handleClickSnackbar();
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
              to={`${fileSubmissionPath}`}
              state={{ assessmentTitle: assessmentTitle }}
              style={{ textDecoration: "none", color: "grey" }}
            >
              <LinkMaterial underline="hover" color="inherit">
                {assessmentTitle}
              </LinkMaterial>
            </Link>
          </Breadcrumbs>
          <div style={{ padding: "5%", justifyContent: "center" }}>
            <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
              {assessmentTitle}
            </h1>
            <Button
              className="btn-upload"
              color="primary"
              variant="contained"
              component="span"
              onClick={(event) =>
                handleClickEditDialogOpen(
                  event,
                  fileSubmission.assessmentDescription
                  // assessment.assessmentIsOpen,
                  // assessment.assessmentStatusEnum
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
                      {Moment(fileSubmission.endDate).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell>
                      <b>Submitting: </b>
                    </TableCell>
                    <TableCell>
                      <b>Allowed Attempts: </b>
                    </TableCell>
                    <TableCell>
                      <b>Attempts: </b>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <TableRow>
                <TableCell style={{ textAlign: "justify" }}>
                  <b>Assessment Description: </b> <br /> <br />
                  {fileSubmission.description}
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
            id="outlined-multiline-flexible"
            label="Detailed Description"
            multiline
            maxRows={4}
            fullWidth
            style={{ margin: "6px 0" }}
            value={editAssessmentDescription}
            onChange={(e) => setEditAssessmentDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={editAssessment} autoFocus>
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
    </div>
  );
}

export default FileSubmission;
