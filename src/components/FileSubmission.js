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

import { Link, useLocation, useNavigate } from "react-router-dom";

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
  //paths
  const location = useLocation();
  const createFileSubmissionPath = location.pathname;

  const courseId = location.pathname.split("/")[2];

  const navigate = useNavigate();

  const currentFileSubmission = location.state.newFileSubProp;
  const assessmentsPath = location.state.assessmentsPathProp;
  const createAssessmentPath = location.state.createAssessmentPathProp;
  const fileSubmissionId = location.pathname.split("/")[4];

  console.log(currentFileSubmission);

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

  const refresh = () => {};

  const handleDateConversions = (fileSubObj) => {
    const formattedStart = dayjs(fileSubObj.assessmentStartDate.d).format(
      "YYYY-MM-DD"
    );
    const formattedEnd = dayjs(fileSubObj.assessmentEndDate.d).format(
      "YYYY-MM-DD"
    );
    fileSubObj.assessmentStartDate = formattedStart;
    fileSubObj.assessmentEndDate = formattedEnd;
    return fileSubObj;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedFileSubmission = handleDateConversions(currentFileSubmission);

    fetch("http://localhost:8080/assessment/addNewFileSubmission/" + courseId, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(updatedFileSubmission),
    })
      .then((response) => {
        console.log("New File Submission Assessment Created Successfully!");
      })
      .then(handleCancel);
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
                Create File Submission
              </LinkMaterial>
            </Link>
          </Breadcrumbs>
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
              onClick={handleSave}
              style={{ float: "right", marginLeft: "auto" }}
            >
              Create File Submission
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
