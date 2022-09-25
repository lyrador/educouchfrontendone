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
  FormHelperText
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

  const [instructorNameError, setInstructorNameError] = useState({
    value: false,
    errorMessage: "",
  });
  const [emailError, setEmailError] = useState({
    value: false,
    errorMessage: "",
  });
  const [passwordError, setPasswordError] = useState({
    value: false,
    errorMessage: "",
  });
  const [usernameError, setUsernameError] = useState({
    value: false,
    errorMessage: "",
  });
  const [instructorAccessRightError, setInstructorAccessRightError] = useState({
    value: false,
    errorMessage: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    const educator = { name, email, username, password, instructorAccessRight };
    setInstructorNameError({ value: false, errorMessage: "" });
    setEmailError({ value: false, errorMessage: "" });
    setPasswordError({ value: false, errorMessage: "" });
    setUsernameError({ value: false, errorMessage: "" });
    setInstructorAccessRightError({ value: false, errorMessage: "" });

    if (name == "") {
      setInstructorNameError({
        value: true,
        errorMessage: "You must enter a name!",
      });
    }
    if (email == "") {
      setEmailError({ value: true, errorMessage: "You must enter an email" });
    }
    if (password == "") {
      setPasswordError({
        value: true,
        errorMessage: "You must enter a password!",
      });
    }
    if (username == "") {
      setUsernameError({
        value: true,
        errorMessage: "You must enter a username!",
      });
    }
    if (instructorAccessRight == "") {
      setInstructorAccessRightError({
        value: true,
        errorMessage: "You must select an instructorAccessRight!",
      });
    }

    //organisation (org admin) is hard coded for now until org admin sign up is done
    if (name && email && username && password && instructorAccessRight) {
      fetch("http://localhost:8080/educator/addInstructor?organisationId=1", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(educator),
      })
        .then((res) => res.json())
        .then(props.closeModalFunc())
        .then(props.refreshProp());
      console.log("New educator added");
    }
  };

  const handleCancel = () => {
    props.closeModalFunc();
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
            required
            error={instructorNameError.value}
            helperText={instructorNameError.errorMessage}
            id="outlined-basic"
            label="Instructor Name"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            error={emailError.value}
            helperText={emailError.errorMessage}
            id="outlined-basic"
            label="Instructor Email"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            error={passwordError.value}
            helperText={passwordError.errorMessage}
            id="outlined-basic"
            label="Instructor Password"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            required
            error={usernameError.value}
            helperText={usernameError.errorMessage}
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
            <FormControl
              required
              error={instructorAccessRightError.value}
            >
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
              <FormHelperText>{instructorAccessRightError.value}</FormHelperText>
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
