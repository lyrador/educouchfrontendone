import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Link, useLocation, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

import { useState } from "react";

import { useAuth } from "../context/AuthProvider";
import { render } from "@testing-library/react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TechnicalSupportRequestDrawer from "./TechnicalSupportRequestDrawer";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TechnicalSupportList(props) {
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

  const [openDeleteSnackbar, setOpenDeleteSnackbar] = React.useState(false);

  const handleClickDeleteSnackbar = () => {
    setOpenDeleteSnackbar(true);
  };

  const handleCloseDeleteSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDeleteSnackbar(false);
  };

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

  const auth = useAuth();
  const user = auth.user;

  //paths
  const location = useLocation();

  const [requests, setRequests] = useState([]);

  const [refreshPage, setRefreshPage] = useState("");

  React.useEffect(() => {
    setRefreshPage(false);
    if (user.userType === "INSTRUCTOR") {
      fetch(
        "http://localhost:8080/technicalSupportRequest/getAllTechnicalSupportRequestsByInstructor/" +
          user.userId
      )
        .then((res) => res.json())
        .then((result) => {
          setRequests(result);
        });
    } else if (user.userType === "LEARNER") {
      fetch(
        "http://localhost:8080/technicalSupportRequest/getAllTechnicalSupportRequestsByLearner/" +
          user.userId
      )
        .then((res) => res.json())
        .then((result) => {
          setRequests(result);
        });
    } else if (user.userType === "ORG_ADMIN") {
      fetch(
        "http://localhost:8080/technicalSupportRequest/getAllTechnicalSupportRequestsByOrgAdmin/" +
          user.userId
      )
        .then((res) => res.json())
        .then((result) => {
          setRequests(result);
        });
    }
  }, [refreshPage]);

  const renderEmptyRowMessage = () => {
    if (requests.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={4} style={{ textAlign: "center" }}>
            You have not reported any issues.
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <TechnicalSupportRequestDrawer></TechnicalSupportRequestDrawer>
        </Grid>
        <Grid item xs={10}>
          <div style={{ justifyContent: "center" }}>
            <center>
              <Typography variant="h4">
                <b>My Submitted Requests</b>
              </Typography>
            </center>
          </div>
          <div style={{ padding: "5%" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow style={{ backgroundColor: "#B0C4DE" }}>
                    <TableCell>
                      <b>Request Title</b>
                    </TableCell>
                    <TableCell>
                      <b>Created On</b>
                    </TableCell>
                    <TableCell>
                      <b>Request Status</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {renderEmptyRowMessage()}
                  {requests.map((request) => (
                    <TableRow
                      key={request.requestId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {request.requestTitle}
                      </TableCell>
                      <TableCell>{request.createdDateTime}</TableCell>
                      <TableCell>{request.requestStatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default TechnicalSupportList;
