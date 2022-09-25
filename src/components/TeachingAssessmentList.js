import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Link, useLocation, useParams } from "react-router-dom";
import TeachingCoursesDrawer from "./TeachingCoursesDrawer";
import { Grid } from "@mui/material";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import LinkMaterial from "@mui/material/Link";

import { Button } from "@mui/material";

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

function TeachingAssessmentList(props) {
  const auth = useAuth();
  const user = auth.user;

  //paths
  const location = useLocation();
  const assessmentsPath = location.pathname.split("/").slice(0, 4).join("/");

  const courseId = location.pathname.split("/")[2];

  console.log("Assessment Path is " + courseId);

  const [assessments, setAssessments] = useState([]);
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [assessmentDescription, setAssessmentDescription] = useState("");
  const [assessmentMaxScore, setAssessmentMaxScore] = useState("");
  const [assessmentStartDate, setAssessmentStartDate] = useState("");
  const [assessmentEndDate, setAssessmentEndDate] = useState("");
  const [assessmentFileSubmissionEnum, setAssessmentFileSubmissionEnum] =
    useState("");
  const [assessmentIdToDelete, setAssessmentIdToDelete] = useState("");

  const [refreshPage, setRefreshPage] = useState("");

  React.useEffect(() => {
    setRefreshPage(false);
    fetch(
      "http://localhost:8080/assessment/getAllFileSubmissionsByCourseId/" +
        courseId
    )
      .then((res) => res.json())
      .then((result) => {
        setAssessments(result);
        console.log(result);
      });
  }, [refreshPage]);

  const [open, setOpen] = React.useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  const [editAssessmentTitle, setEditAssessmentTitle] = useState("");
  const [editAssessmentDescription, setEditAssessmentDescription] =
    useState("");
  const [editAssessmentMaxScore, setEditAssessmentMaxScore] = useState("");
  const [editAssessmentStartDate, setEditAssessmentStartDate] = useState("");
  const [editAssessmentEndDate, setEditAssessmentEndDate] = useState("");
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

  const handleClickDeleteDialogOpen = (event, forumId) => {
    setAssessmentIdToDelete(forumId);
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
  ) => {
    setEditAssessmentTitle(assessmentTitle);
    setEditAssessmentDescription(assessmentDescription);
    setEditAssessmentMaxScore(assessmentMaxScore);
    setEditAssessmentStartDate(assessmentStartDate);
    setEditAssessmentEndDate(assessmentEndDate);
    setEditAssessmentFileSubmissionEnum(assessmentFileSubmissionEnum);
    setAssessmentIdToEdit(assessmentId);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const createNewAssessment = (e) => {
    e.preventDefault();
    const newAssessment = {
      assessmentTitle: assessmentTitle,
      assessmentDescription: assessmentDescription,
      assessmentMaxScore: assessmentMaxScore,
      assessmentStartDate: assessmentStartDate,
      assessmentEndDate: assessmentEndDate,
      assessmentFileSubmissionEnum: assessmentFileSubmissionEnum,
    };
    console.log(newAssessment);
    fetch("http://localhost:8080/assessment/addNewFileSubmission/" + courseId, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAssessment),
    }).then(() => {
      console.log("New File Submission Assessment Created Successfully!");
      setRefreshPage(true);
      setAssessmentTitle("");
      handleClose();
    });
  };

  const deleteAssessment = (e) => {
    e.preventDefault();
    fetch(
      "http://localhost:8080/assessment/deleteFileSubmissionById/" +
        assessmentIdToDelete,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        // body:JSON.stringify(newComment)
      }
    ).then(() => {
      console.log("Assessment Deleted Successfully!");
      setRefreshPage(true);
      handleDeleteDialogClose();
    });
  };

  const editAssessment = (e) => {
    e.preventDefault();
    var assessmentTitle = editAssessmentTitle;
    var assessmentDescription = editAssessmentDescription;
    var assessmentMaxScore = editAssessmentMaxScore;
    var assessmentStartDate = editAssessmentStartDate;
    var assessmentEndDate = editAssessmentEndDate;
    var assessmentFileSubmissionEnum = editAssessmentFileSubmissionEnum;
    const newEditedAssessment = {
      assessmentTitle,
      assessmentDescription,
      assessmentMaxScore,
      assessmentStartDate,
      assessmentEndDate,
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
    });
  };

  const renderEmptyRowMessage = () => {
    if (assessments.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={4} style={{ textAlign: "center" }}>
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
          <div style={{ justifyContent: "center" }}>
            <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
              List of Assessments
            </h1>
            <Button
              className="btn-upload"
              color="primary"
              variant="contained"
              component="span"
              onClick={handleClickOpen}
              style={{ float: "right", marginLeft: "auto" }}
            >
              Create New Assessment
            </Button>
          </div>
          <div style={{ padding: "5%" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Assessment Title</TableCell>
                    <TableCell>Assessment Description</TableCell>
                    <TableCell>Assessment Max Score</TableCell>
                    <TableCell>Assessment Start Date</TableCell>
                    <TableCell>Assessment End Date</TableCell>
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
                            assessmentTitle: assessment.assessmentTitle,
                          }}
                          style={{ textDecoration: "none" }}
                        >
                          {assessment.assessmentTitle}
                        </Link>
                      </TableCell>
                      <TableCell>{assessment.assessmentDescription}</TableCell>
                      <TableCell>{assessment.assessmentMaxScore}</TableCell>
                      <TableCell>{assessment.assessmentStartDate}</TableCell>
                      <TableCell>{assessment.assessmentEndDate}</TableCell>
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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create New Assessment</DialogTitle>
          <DialogContent>
            <TextField
              id="outlined-basic"
              label="Assessment Title"
              variant="outlined"
              fullWidth
              style={{ margin: "6px 0" }}
              value={assessmentTitle}
              onChange={(e) => setAssessmentTitle(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Assessment Description"
              variant="outlined"
              fullWidth
              style={{ margin: "6px 0" }}
              value={assessmentDescription}
              onChange={(e) => setAssessmentDescription(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Assessment Max Score"
              variant="outlined"
              fullWidth
              style={{ margin: "6px 0" }}
              value={assessmentMaxScore}
              onChange={(e) => setAssessmentMaxScore(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Assessment Start Date"
              variant="outlined"
              fullWidth
              style={{ margin: "6px 0" }}
              value={assessmentStartDate}
              onChange={(e) => setAssessmentStartDate(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Assessment End Date"
              variant="outlined"
              fullWidth
              style={{ margin: "6px 0" }}
              value={assessmentEndDate}
              onChange={(e) => setAssessmentEndDate(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Assessment File Submission Type"
              variant="outlined"
              fullWidth
              style={{ margin: "6px 0" }}
              value={assessmentFileSubmissionEnum}
              onChange={(e) => setAssessmentFileSubmissionEnum(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={createNewAssessment}>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
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
              These will delete all the questions and options for quizzes. You
              will not be able to undo this action. Are you sure you want to
              delete?
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
              value={assessmentDescription}
              onChange={(e) => setEditAssessmentDescription(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="New Assessment Max Score"
              variant="outlined"
              fullWidth
              style={{ margin: "6px 0" }}
              value={assessmentMaxScore}
              onChange={(e) => setEditAssessmentMaxScore(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="New Assessment Start Date"
              variant="outlined"
              fullWidth
              style={{ margin: "6px 0" }}
              value={assessmentStartDate}
              onChange={(e) => setEditAssessmentStartDate(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="New Assessment End Date"
              variant="outlined"
              fullWidth
              style={{ margin: "6px 0" }}
              value={assessmentEndDate}
              onChange={(e) => setEditAssessmentEndDate(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="New Assessment File Submission Type"
              variant="outlined"
              defaultValue={"Enter 'INDIVIDUAL' or 'GROUP'"}
              fullWidth
              style={{ margin: "6px 0" }}
              value={assessmentFileSubmissionEnum}
              onChange={(e) =>
                setEditAssessmentFileSubmissionEnum(e.target.value)
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose}>Cancel</Button>
            <Button onClick={editAssessment} autoFocus>
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default TeachingAssessmentList;
