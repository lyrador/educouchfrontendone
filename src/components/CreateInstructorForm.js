import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import {
  Paper,
  Button,
  Typography,
  LinearProgress,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import UploadService from "../services/UploadFilesService";

export default function CreateInstructorForm() {
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

  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [accessRightEnum, setAccessRightEnum] = useState("");


  const handleClick = (e) => {
    e.preventDefault();
    const educator = { name, email, password, username, accessRightEnum };
    console.log(educator);
    fetch("http://localhost:8080/educator/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(educator),
    });
    console.log("New educator added");
  };

  // React.useEffect(()=>{
  //     fetch("http://localhost:8080/educator/getAll")
  //     .then(res=>res.json())
  //     .then((result)=>{
  //         seteducators(result);
  //     }
  // )
  // },[])

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
          {/* <form className={classes.root} noValidate autoComplete="off"> */}
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
          <TextField
            id="outlined-basic"
            label="educator Accessright Enum"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={accessRightEnum}
            onChange={(e) => setAccessRightEnum(e.target.value)}
          />
          {/* </form> */}
          <br />
          {name}
          <br />
          {email}
          <br />
          {password}
          <br />
          {username}
          <br />
          {accessRightEnum}
          <br />
          <Button variant="contained" onClick={handleClick}>Submit</Button>

        </Paper>

        {/* <Paper elevation={3} style={paperStyle}>
        {educators.map(educator=>(
            <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}} key={educator.educatorId}>
                educatorId: {educator.educatorId}
                <br/>
                Name: {educator.name}
                <br/>
                Address: {educator.address}
                <br/>
                Email: {educator.email}
                <br/>
                Password: {educator.password}
                <br/>
                Username: {educator.username}
                <br/>
                Profile Picture: 
                <img className="preview my20" src={educator.profilePictureURL} alt="" style={{ height: '10%', width: '10%' }}/>
            </Paper>
        ))
        }
      </Paper> */}
      </Container>
    </Box>
  );
}
