import * as React from "react";

import Paper from "@mui/material/Paper";
import { Typography } from "@material-ui/core";
import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";

import { useAuth } from "../context/AuthProvider";
import TechnicalSupportRequestDrawer from "./TechnicalSupportRequestDrawer";

export default function CreateTechnicalSupportRequest(props) {
  React.useEffect(() => {}, []);

  const auth = useAuth();
  const user = auth.user;

  const navigate = useNavigate();
  const location = "/technicalSupport";

  const [requestTitle, setRequestTitle] = useState("");
  const [requestDescription, setRequestDescription] = useState("");

  const [requestTitleError, setRequestTitleError] = useState({
    value: false,
    errorMessage: "",
  });
  const [requestDescriptionError, setRequestDescriptionError] = useState({
    value: false,
    errorMessage: "",
  });

  function cleanupFields() {
    setRequestTitle("");
    setRequestDescription("");
  }

  function validateNewRequest() {
    setRequestTitleError({ value: false, errorMessage: "" });
    setRequestDescriptionError({ value: false, errorMessage: "" });

    if (requestTitle == "") {
      setRequestTitleError({
        value: true,
        errorMessage: "Field cannot be empty!",
      });
    }
    if (requestDescription == "") {
      setRequestDescriptionError({
        value: true,
        errorMessage: "Field cannot be empty!",
      });
    }

    if (requestTitle && requestDescription) {
      return true;
    }
  }

  function createReport() {
    if (validateNewRequest()) {
      var createdByUserId = user.userId;
      var createdByUserName = user.username;
      var createdByUserType = user.userType;
      const newRequest = {
        requestTitle: requestTitle,
        requestDescription: requestDescription,
        requestStatus: "PENDING",
        createdByUserId,
        createdByUserName,
        createdByUserType,
      };

      fetch(
        "http://localhost:8080/technicalSupportRequest/createTechnicalSupportRequest/" +
          user.userId,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRequest),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          cleanupFields();
        });

      navigate(`${location}/myRequests`);
    }
  }

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
                <b>Submit a Request</b>
              </Typography>
            </center>
          </div>
          <div style={{ padding: "2%" }}>
            <Grid
              container
              style={{
                marginLeft: 350,
                marginTop: 20,
                marginBottom: 20,
                width: "60%",
              }}
              flexDirection={"column"}
              alignItems="center"
            >
              <Paper style={{ width: "70%" }}>
                <TextField
                  required
                  error={requestTitleError.value}
                  helperText={requestTitleError.errorMessage}
                  id="outlined-basic"
                  label="Issue found"
                  variant="outlined"
                  fullWidth
                  style={{ margin: "6px 0" }}
                  value={requestTitle}
                  onChange={(e) => setRequestTitle(e.target.value)}
                />
                <TextField
                  required
                  multiline
                  maxRows={100}
                  error={requestDescriptionError.value}
                  helperText={requestDescriptionError.errorMessage}
                  id="outlined-basic"
                  label="Please provide us with more details"
                  variant="outlined"
                  fullWidth
                  style={{ margin: "6px 0" }}
                  value={requestDescription}
                  onChange={(e) => setRequestDescription(e.target.value)}
                />
              </Paper>

              <Grid
                container
                direction="row"
                justifyContent={"center"}
                alignContent={"center"}
                style={{ marginTop: 60 }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  onClick={createReport}
                >
                  Submit Report
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
