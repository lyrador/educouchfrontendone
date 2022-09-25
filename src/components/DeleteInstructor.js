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

export default function DeleteInstructor(props) {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [instructor, setInstructor] = React.useState("");

  React.useEffect(() => {
    setInstructor(props.instructorProps);
    console.log(props.instructorProps);
  }, []);

  const handleClick = (e) => {
    const idInstructorToDelete = instructor.instructorId;
    fetch(
      "http://localhost:8080/educator/deleteInstructor?instructorId=" +
        idInstructorToDelete,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(idInstructorToDelete),
      }
    )
      .then((res) => res.json())
      .then(props.closeModalFunc());
    console.log("Instructor deleted");
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
            <u>Delete Instructor</u>
          </h1>
          <br />
          <p>Are you sure? This action is cannot be undone</p>
          {/* 
          <Stack direction={"row"}>
            <Box justifyContent={"center"} alignContent={"center"}>
              <h3>Access Right</h3>
            </Box>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="INSTRUCTOR"
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
          </Stack> */}
          <br />
          <br />
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "space-around",
              justifyContent: "space-between",
            }}
          >
            <Button variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
            <Link to="/viewAllEducators">
              <Button variant="contained" onClick={handleClick}>
                Confirm
              </Button>
            </Link>
          </div>
        </Paper>
      </Container>
    </Box>
  );
}
