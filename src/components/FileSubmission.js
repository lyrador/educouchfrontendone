import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";
import { useState } from "react";

import TeachingCoursesDrawer from "../components/TeachingCoursesDrawer";

import { Link, useLocation, useParams } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import LinkMaterial from "@mui/material/Link";

import { Button } from "@mui/material";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuth } from "../context/AuthProvider";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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

  const courseId = location.pathname.split("/")[2];
  const assessmentId = location.pathname.split("/")[4];
  const assessmentTitle = location.state.assessmentTitle;

  const [fileSubmission, setFileSubmission] = useState("");

  const [refreshPage, setRefreshPage] = useState("");

  React.useEffect(() => {
    setRefreshPage(false);
    fetch(
      "http://localhost:8080/assessment/getFileSubmissionById/" + assessmentId
    )
      .then((res) => res.json())
      .then((result) => {
        setFileSubmission(result);
        console.log(result);
      });
  }, [refreshPage]);

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
                      <b>Deadline</b> {fileSubmission.assessmentEndDate}
                    </TableCell>
                    <TableCell>
                      <b>Submitting</b>
                    </TableCell>
                    <TableCell>
                      <b>Allowed Attempts</b>
                    </TableCell>
                    <TableCell>
                      <b>Attempts</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <TableBody>
                <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
                  {fileSubmission.assessmentDescription}
                </h1>
              </TableBody>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New File Submission Assessment</DialogTitle>
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
    </div>
  );
}

export default FileSubmission;
