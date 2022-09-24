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

function TeachingAssessment(props) {
  React.useEffect(() => {
    fetch("http://localhost:8080/forum/courses/" + courseId + "/forums")
      .then((res) => res.json())
      .then((result) => {
        setForums(result);
      });
  }, []);

  const paperStyle = {
    padding: "50px 20px",
    width: 600,
    margin: "20px auto",
    justifyContent: "center",
    alignItems: "center",
    flex: "1",
  };

  //paths
  const location = useLocation();
  const forumsPath = location.pathname.split("/").slice(0, 4).join("/");

  const courseId = location.pathname.split("/")[2];
  console.log(courseId);

  const [open, setOpen] = React.useState(false);
  const [forums, setForums] = useState([]);
  const [forumTitle, setForumTitle] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              Add New Assessment
            </Button>
          </div>
          <div style={{ padding: "5%" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Assessment ID</TableCell>
                    <TableCell>Assessment Title</TableCell>
                    <TableCell>Assessment Description</TableCell>
                    <TableCell>Assessment Max Score</TableCell>
                    <TableCell>Assessment Start Date</TableCell>
                    <TableCell>Assessment End Date</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default TeachingAssessment;
