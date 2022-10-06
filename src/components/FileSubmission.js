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
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Box,
} from "@mui/material";
import { useState } from "react";

import TeachingCoursesDrawer from "../components/TeachingCoursesDrawer";

import { Link, useLocation, useParams } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import LinkMaterial from "@mui/material/Link";

import { useAuth } from "../context/AuthProvider";

import EditIcon from "@mui/icons-material/Edit";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import AttachFileIcon from "@mui/icons-material/AttachFile";

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

  // dial speed
  const actions = [
    {
      icon: <AttachFileIcon />,
      name: "Upload new file",
      action: openUploadDialogBox,
    },
  ];

  const [refreshPage, setRefreshPage] = useState("");

  React.useEffect(() => {
    setRefreshPage(false);
    fetch(
      "http://localhost:8080/assessment/getFileSubmissionById/" +
        fileSubmissionId
    )
      .then((res) => res.json())
      .then((result) => {
        setFileSubmission(result);
        setAttachmentList(result.attachments);
        console.log(JSON.stringify(result));
        console.log("assessment Id: " + fileSubmissionId);
        console.log("Length of attachment is " + attachmentList.length);
      });
  }, [refreshPage]);

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

  const [open, setOpen] = React.useState(false);

  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editFileSubmissionDetails = (e) => {
    e.preventDefault();
    handleClickSnackbar();
  };

  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setProgress(0);
    setMessage("");
  };

  const handleRefreshDelete = () => {
    refresh();
    //notification
    setMessage("Item is successfully deleted!");
    setError(false);
    setSuccess(true);
  };

  const handleRefreshUpdate = () => {
    refresh();
    //notification
    setMessage("Item is successfully updated!");
    setError(false);
    setSuccess(true);
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
        setMessage("Succesfully Uploaded!");
        setError(false);
        console.log(response);
        closeUploadDialogBox();
      })
      .catch((err) => {
        setMessage("Could not upload the file!");
        setError(true);
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
          <div style={{ justifyContent: "center" }}>
            <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
              {assessmentTitle}
            </h1>
            <Button
              className="btn-upload"
              color="primary"
              variant="contained"
              component="span"
              onClick={handleClickOpen}
              style={{ float: "right", marginLeft: "auto" }}
            >
              Edit File Submission Details
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
                currently. Upload attachments?
              </p>
            )}

            <SpeedDial
              ariaLabel="SpeedDial openIcon example"
              sx={{ position: "absolute", right: 16 }}
              icon={<SpeedDialIcon openIcon={<EditIcon />} />}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={action.action}
                />
              ))}
            </SpeedDial>
          </div>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit File Submission Assessment</DialogTitle>
        <DialogContent>
          {/* <TextField
              required
              id="outlined-basic"
              label="Assessment Title"
              variant="outlined"
              fullWidth
              style={{ margin: "6px 0" }}
              value={assessmentTitle}
              onChange={(e) => setAssessmentTitle(e.target.value)}
              error={assessmentTitleError.value}
              helperText={assessmentTitleError.errorMessage}
            /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={editFileSubmissionDetails}>Create</Button>
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
