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

function TeachingForumList(props) {
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

  const createNewForum = (e) => {
    e.preventDefault();
    const newForum = { forumTitle };
    console.log(newForum);
    fetch("http://localhost:8080/forum/courses/" + courseId + "/forums", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newForum),
    }).then(() => {
      console.log("New Forum Created Successfully!");
      setForumTitle("");
      window.location.reload();
    });
  };

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
        </Grid>
        <Grid item xs={10}>
          <Breadcrumbs aria-label="breadcrumb">
            <LinkMaterial
              underline="hover"
              color="inherit"
              href={`${forumsPath}`}
            >
              Forum
            </LinkMaterial>
          </Breadcrumbs>
          <div style={{ justifyContent: "center" }}>
            <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
              List of Forums
            </h1>
            <Button
              className="btn-upload"
              color="primary"
              variant="contained"
              component="span"
              onClick={handleClickOpen}
              style={{ float: "right", marginLeft: "auto" }}
            >
              Create New Forum
            </Button>
          </div>
          <div style={{ padding: "5%" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Forum Name</TableCell>
                    <TableCell>Number of Discussions</TableCell>
                    <TableCell>Last Post</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {forums.map((forum) => (
                    <TableRow
                      key={forum.forumId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Link
                          to={`${forumsPath}/${forum.forumId}`}
                          state={{ forumTitle: forum.forumTitle }}
                          style={{ textDecoration: "none" }}
                        >
                          {forum.forumTitle}
                        </Link>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
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
          <DialogTitle>Create New Forum</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
            {/* <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Forum Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={forumTitle}
                        onChange={(e)=>setForumTitle(e.target.value)}
                    /> */}
            <TextField
              id="outlined-basic"
              label="Forum Title"
              variant="outlined"
              fullWidth
              style={{ margin: "5px 0" }}
              value={forumTitle}
              onChange={(e) => setForumTitle(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={createNewForum}>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default TeachingForumList;
