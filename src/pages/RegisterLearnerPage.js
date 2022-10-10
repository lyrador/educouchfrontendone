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
    Avatar,
    MenuItem
} from "@mui/material";
import { useState } from "react";
import UploadService from "../services/UploadFilesService";
import SchoolIcon from '@mui/icons-material/School';
import { Link } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function RegisterLearnerPage() {

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
    const headerStyle = {
        // margin: 0 
    }
    const avatarStyle = { backgroundColor: 'red', alignSelf: 'center' }

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
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePictureURL, setProfilePictureURL] = useState("");
    const [username, setUsername] = useState("");
    const [ageGroup, setAgeGroup] = useState('')
    const [paymentAcc, setPaymentAcc] = useState("")

    const [nameError, setNameError] = useState({ value: false, errorMessage: '' })
    const [emailError, setEmailError] = useState({ value: false, errorMessage: '' })
    const [passwordError, setPasswordError] = useState({ value: false, errorMessage: '' })
    const [confirmPasswordError, setConfirmPasswordError] = useState({ value: false, errorMessage: '' })
    const [usernameError, setUsernameError] = useState({ value: false, errorMessage: '' })
    const [ageGroupError, setAgeGroupError] = useState({ value: false, errorMessage: '' })
    const [paymentAccError, setPaymentAccError] = useState({ value: false, errorMessage: '' })

    const ageGroups = [{ value: 'Adult' }, { value: 'Kid' }];

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [openError, setOpenError] = React.useState(false);

    const handleClickOpenError = () => {
        setOpenError(true);
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    const handleChangeAgeGroup = (event) => {
        setAgeGroup(event.target.value);
    };

    const handleClick = (e) => {
        e.preventDefault();

        setNameError({ value: false, errorMessage: '' })
        setEmailError({ value: false, errorMessage: '' })
        setPasswordError({ value: false, errorMessage: '' })
        setUsernameError({ value: false, errorMessage: '' })
        setAgeGroupError({ value: false, errorMessage: '' })
        setConfirmPasswordError({ value: false, errorMessage: '' })
        setPaymentAccError({ value: false, errorMessage: '' })

        if (name === '') {
            setNameError({ value: true, errorMessage: 'You must enter a name' })
        }
        if (email === '') {
            setEmailError({ value: true, errorMessage: 'You must enter a email' })
        }
        if (!email.includes("@") || !email.includes(".com")) {
            setEmailError({ value: true, errorMessage: 'Invalid Email Address format' })
        }
        if (password === '') {
            setPasswordError({ value: true, errorMessage: 'You must enter a password' })
        }
        if (username === '') {
            setUsernameError({ value: true, errorMessage: 'You must enter a username' })
        }
        if (ageGroup === '') {
            setAgeGroupError({ value: true, errorMessage: 'You must select an age group' })
        }
        if (confirmPassword === '') {
            setConfirmPasswordError({ value: true, errorMessage: 'You must confirm your password' })
        }
        if (confirmPassword !== password) {
            setPasswordError({ value: true, errorMessage: 'Password does not match confirm password' })
            setConfirmPasswordError({ value: true, errorMessage: 'Password does not match confirm password' })
        }
        if (paymentAcc === '') {
            setPaymentAccError({ value: true, errorMessage: 'You must enter a payment account' })
        }
        else if (name && email && password && username && ageGroup && confirmPassword
            && email.includes("@") && email.includes(".com") && paymentAcc) {
            var isKid = ""
            console.log(ageGroup)
            if (ageGroup === 'Kid') {
                isKid = "true"
            } else {
                isKid = "false"
            }
            console.log(isKid)

            const learner = {
                name,
                email,
                password,
                username,
                profilePictureURL,
                isKid,
                paymentAcc
            };
            console.log(learner);
            return fetch("http://localhost:8080/learner/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(learner),
            }).then((response) => {
                console.log(response);
                if (response.ok == false) {
                    handleClickOpenError();
                } else {
                    console.log("New Learner added");
                    handleClickOpen()
                }
            }).catch((err) => {
                console.log(err);
                handleClickOpenError();
            });
        }
    };

    const selectFile = (event) => {
        setCurrentFile(event.target.files[0]);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
        setProgress(0);
        setMessage("");
    };

    const uploadImage = () => {
        setProgress(0);
        UploadService.upload(currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {
                setMessage("Succesfully Uploaded!");
                setProfilePictureURL(response.data.fileURL);
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                        {/* <div style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                    <Avatar style={avatarStyle}>\</Avatar>
                </div> */}
                        <div style={{ paddingBottom: '20px', textAlign: 'center' }}>
                            <SchoolIcon style={{ fontSize: '50px' }} />
                            <h2 style={headerStyle}>Sign Up</h2>
                            <Typography variant='caption' gutterBottom>
                                Please fill this form to create a Learner account !
                            </Typography>
                        </div>
                        {/* <form className={classes.root} noValidate autoComplete="off"> */}
                        <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={nameError.value}
                            helperText={nameError.errorMessage}
                            style={{ paddingBottom: "10px" }}
                        />
                        {/* <TextField
                            id="outlined-basic"
                            label="Learner Address"
                            variant="outlined"
                            fullWidth
                            style={{ paddingBottom: "10px" }}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        /> */}
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={emailError.value}
                            helperText={emailError.errorMessage}
                            style={{ paddingBottom: "10px" }}
                        />
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={passwordError.value}
                            helperText={passwordError.errorMessage}
                            type="password"
                            style={{ paddingBottom: "10px" }}
                        />
                        <TextField id="outlined-basic" label="Confirm Password" variant="outlined" fullWidth
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={confirmPasswordError.value}
                            helperText={confirmPasswordError.errorMessage}
                            type="password"
                            style={{ paddingBottom: "10px" }}
                        />
                        <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={usernameError.value}
                            helperText={usernameError.errorMessage}
                            style={{ paddingBottom: "10px" }}
                        />
                        <TextField id="outlined-basic" label="Payment Account" variant="outlined" fullWidth
                            required
                            value={paymentAcc}
                            onChange={(e) => setPaymentAcc(e.target.value)}
                            error={paymentAccError.value}
                            helperText={paymentAccError.errorMessage}
                            style={{ paddingBottom: "10px" }}
                        />
                        <TextField id="outlined-select-age" select label="Age Group" fullWidth
                            required
                            value={ageGroup}
                            onChange={handleChangeAgeGroup}
                            error={ageGroupError.value}
                            helperText={ageGroupError.errorMessage}
                        >
                            {ageGroups.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                        {/* </form> */}
                        <div style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 50 }}>
                            {previewImage && (
                                <div>
                                    <img
                                        className="preview my20"
                                        src={previewImage}
                                        alt=""
                                        style={{ height: "40%", width: "40%" }}
                                    />
                                </div>
                            )}
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
                                    accept="image/*"
                                    onChange={selectFile}
                                />
                                <Button className="btn-choose" variant="outlined" component="span">
                                    Choose Profile Image
                                </Button>
                            </label>
                            &nbsp;
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
                        </div>
                        <div>
                            <div style={{ float: 'left' }}>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained">
                                        <ArrowBackIcon />
                                        Back
                                    </Button>
                                </Link>
                            </div>
                            <div style={{ float: 'right' }}>
                                <Button
                                    variant="contained"
                                    onClick={handleClick}
                                    disabled={!isUploaded}
                                >
                                    Create Account
                                </Button>
                            </div>
                        </div>
                    </Paper>
                </Container>
            </Box>
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Successfully Created!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Your Learner account has been created successfully! You may proceed to the home page to login.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Button>Go Back to Home Page</Button>
                        </Link>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog open={openError} onClose={handleCloseError}>
                    <DialogTitle>Error when creating account!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Username has been taken or email is already registered. Please try another username or re-enter the correct email.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseError}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}
