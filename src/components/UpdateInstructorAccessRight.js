import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Stack,
} from "@mui/material";
import { Paper, Button, createTheme } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UpdateInstructorAccessRight(props) {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [instructor, setInstructor] = React.useState("");
  const [instructorAccessRight, setinstructorAccessRight] = React.useState("");

  React.useEffect(() => {
    setInstructor(props.instructorProps);
    setinstructorAccessRight(props.instructorAccessRightProps);
    console.log(
      "instructor: " +
        props.instructorProps +
        "\n" +
        "access right: " +
        props.instructorAccessRightProps
    );
  }, []);

  const handleClick = (e) => {
    const idInstructorToUpdate = instructor.instructorId;
    console.log("handleClick | idInstructorUpdate: " + idInstructorToUpdate);
    fetch(
      "http://localhost:8080/educator/updateInstructorAccessRight?instructorId=" +
        idInstructorToUpdate,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: instructorAccessRight,
      }
    )
      .then((res) => res.json())
      .then(props.closeModalFunc());
    console.log("Instructor AccessRight Updated");
  };

  const handleCancel = () => {
    props.closeModalFunc();
    console.log("child cancel called");
  };

  return (
    <Box component="form">
      <Container>
        <Paper elevation={3} style={paperStyle}>
          <h1>
            <u>Update Instructor Access Right</u>
          </h1>
          <br />

          <Paper elevation={3} style={{padding:20}}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "space-around",
                justifyContent: "space-between",
              }}
            >
              <Box justifyContent={"center"} alignContent={"center"}>
                <h3>Access Right</h3>
              </Box>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={instructorAccessRight}
                  name="radio-buttons-group"
                  value={instructorAccessRight}
                  onChange={(e) => setinstructorAccessRight(e.target.value)}
                >
                  <FormControlLabel
                    value="INSTRUCTOR"
                    control={<Radio />}
                    label="Instructor"
                  />
                  <FormControlLabel
                    value="HEADINSTRUCTOR"
                    control={<Radio />}
                    label="Head Instructor"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            </Paper>
          <br />
          <br />
          <br />

          <Paper
            elevation={3}
            style={{ margin: "10px", padding: "15px", textAlign: "left" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "space-around",
                justifyContent: "space-between",
              }}
            >
              <Link to="/viewAllEducators">
                <Button variant="contained" onClick={handleClick}>
                  Confirm
                </Button>
              </Link>
              <Button variant="contained" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Paper>
        </Paper>
      </Container>
    </Box>
  );
}
