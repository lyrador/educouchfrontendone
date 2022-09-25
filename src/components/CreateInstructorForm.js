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

export default function CreateInstructorForm(props) {
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

  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [instructorAccessRight, setinstructorAccessRight] = useState("");

  const handleClick = (e) => {
    const educator = { name, email, username, password, instructorAccessRight };
    //organisation (org admin) is hard coded for now until org admin sign up is done
    fetch("http://localhost:8080/educator/addInstructor?organisationId=1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(educator),
    })
      .then((res) => res.json())
      .then(props.closeModalFunc())
      .then(props.refreshProp());
    console.log("New educator added");
  };

  const handleCancel = () => {
    props.closeModalFunc();
    console.log("child cancel called");
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          //m: 1,
          // width: '25ch'
        },
      }}
      noValidate
      autoComplete="off"
    >
      <Container>
        <Paper elevation={3} style={paperStyle}>
          <h1>
            <u>Add Instructor</u>
          </h1>
          <br></br>
          <TextField
            id="outlined-basic"
            label="Instructor Name"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Instructor Email"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Instructor Password"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Instructor Username"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

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
          </Stack>
          <br />
          <br />
          <br />
          <Button variant="contained" onClick={handleClick}>
            Submit
          </Button>
          <Button variant="contained" onClick={handleCancel}>
            Cancel
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
