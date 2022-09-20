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
import {
  Paper,
  Button,
  createTheme,
} from "@mui/material";
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
  const [accessRightEnum, setAccessRightEnum] = useState("");

  const handleClick = (e) => {

    const educator = { name, email, password, username, accessRightEnum };
    fetch("http://localhost:8080/educator/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(educator),
    }).then(res => res.json())
      .then(props.closeModalFunc());
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
            label="educator Name"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="educator Email"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="educator Password"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="educator Username"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Stack direction={"row"}>
            <Box justifyContent={"center"} alignContent={ "center"}>
              <h3>Access Right</h3>
            </Box>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="INSTRUCTOR"
                name="radio-buttons-group"
                value={accessRightEnum}
                onChange={(e) => setAccessRightEnum(e.target.value)}
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
