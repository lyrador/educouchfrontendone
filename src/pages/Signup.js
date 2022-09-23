import { Avatar, Button, Checkbox, createTheme, FormControl, FormControlLabel, FormLabel, Grid, LinearProgress, Paper, Radio, RadioGroup, TextField, ThemeProvider, Typography } from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
import { useState } from "react"
import UploadFilesService from "../services/UploadFilesService"



const Signup = ()=> {
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: 'red' }
    const marginTop = { marginTop: 5 }
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
    

    const [adminName, setAdminName] = useState("");
    const [adminEmail, setAdminEmail] = useState("")
    const [adminNumber, setAdminNumber] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [orgName, setOrgName] = useState("")
    const [orgDescription, setOrgDescription] = useState("")
    const [paymentAcc, setPaymentAcc] = useState("")
    const [fileStorageName, setFileStorageName] = useState("")
    
    //states for file upload
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const orgAdminApprovalReq = { adminName, adminEmail, adminNumber, username, password, orgName, orgDescription,paymentAcc,fileStorageName};
        try {
          const response = await axios.post(
              "http://localhost:8080/orgAdminApprovalReq/addOrgAdminApprovalReq", orgAdminApprovalReq
            );
            // set the state of the user
            // store the user in localStorage
            const user = response.data

            
            
      } catch (error) {
          // Handle error here
          console.log(error.message)
      }
    }

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setProgress(0);
    setMessage("");
  };

    const uploadImage = () => {
        setProgress(0);
        UploadFilesService.upload(currentFile, (event) => {
          setProgress(Math.round((100 * event.loaded) / event.total));
        })
          .then((response) => {
            setMessage("Succesfully Uploaded!");
            setFileStorageName(response.data.fileStorageName);
            setIsError(false);
            setIsUploaded(true);
            console.log(response);
          })
          .catch((err) => {
            setMessage("Could not upload the image!");
            setIsError(true);
            setProgress(0);
            setCurrentFile(undefined);
          });
      };

    return (
        <Grid>
        <Paper elevation={20} style={paperStyle}>
            <Grid align='center'>
                <Avatar style={avatarStyle}>
\                </Avatar>
                <h2 style={headerStyle}>Sign Up</h2>
                <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
            </Grid>
            <form>

            <FormControl component="fieldset" style={marginTop}>
            <FormLabel component="legend">Organisation Admin Information</FormLabel>

                <TextField fullWidth label='Full Name' placeholder="Enter your full name" onChange={(e) => setAdminName(e.target.value)}/>
                <TextField fullWidth label='Email' placeholder="Enter your email" onChange={(e) => setAdminEmail(e.target.value)}/>

                <TextField fullWidth label='Phone Number' placeholder="Enter your phone number" onChange={(e) => setAdminNumber(e.target.value)}/>
                <TextField fullWidth label='Username' placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)}/>

                <TextField fullWidth label='Password' placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
                <TextField fullWidth label='Confirm Password' placeholder="Confirm your password"/>
                </FormControl>

                <FormControl component="fieldset" style={marginTop}>
                    <FormLabel component="legend">Organisation Information</FormLabel>
                    <TextField fullWidth label='Organisation Name' placeholder="Enter your Organisation name" onChange={(e) => setOrgName(e.target.value)}/>
                    <TextField
          id="outlined-multiline-flexible"
          label="Organisation Description"
          multiline
          maxRows={4}
          onChange={(e) => setOrgDescription(e.target.value)}
        />
                            <TextField fullWidth label='Payment Account Number' placeholder="Enter your Organisation bank details"  onChange={(e) => setPaymentAcc(e.target.value)}/>

                </FormControl>
                {currentFile && (
            <Box className="my20" display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <ThemeProvider theme={theme}>
                  <LinearProgress variant="determinate" value={progress} />
                </ThemeProvider>
              </Box>
              <Box minWidth={35}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >{`${progress}%`}</Typography>
              </Box>
            </Box>
          )}
          {message && (
            <Typography
              variant="subtitle2"
              className={`upload-message ${isError ? "error" : ""}`}
            >
              {message}
            </Typography>
          )}
          <label htmlFor="btn-upload">
            <input
              id="btn-upload"
              name="btn-upload"
              style={{ display: "none" }}
              type="file"
              accept=".zip"
              onChange={selectFile}
            />
            <Button className="btn-choose" variant="outlined" component="span">
              Choose Zip File to upload
            </Button>
          </label>
          <Button
            className="btn-upload"
            color="primary"
            variant="contained"
            component="span"
            disabled={!currentFile}
            onClick={uploadImage}
          >
            Upload
          </Button>
          <br />
          {fileStorageName}
          <br />
                <FormControlLabel
                    control={<Checkbox name="checkedA" />}
                    label="I accept the terms and conditions."
                />
                <Button type='submit' variant='contained' color='primary' onClick={handleSubmit}>Sign up</Button>
            </form>
        </Paper>
    </Grid>
    )
}

export default Signup;