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
    MenuItem,
    FormControl, FormControlLabel, FormLabel, Checkbox
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
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import UploadFilesService from "../services/UploadFilesService"

import axios from "axios"

export default function RegisterOrganisationAdminPage() {

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

    const [checkboxValue, setCheckboxValue] = useState(false);

    const toggleCheckboxValue = (event) => {
        console.log(checkboxValue)
        if (checkboxValue === true) {
            setCheckboxValue(false)
        } else {
            setCheckboxValue(true)
        }
    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [organisationName, setOrganisationName] = useState("")
    const [organisationDescription, setOrganisationDescription] = useState("")
    const [paymentAccount, setPaymentAccount] = useState("")

    const [nameError, setNameError] = useState({ value: false, errorMessage: '' })
    const [emailError, setEmailError] = useState({ value: false, errorMessage: '' })
    const [phoneError, setPhoneError] = useState({ value: false, errorMessage: '' })
    const [usernameError, setUsernameError] = useState({ value: false, errorMessage: '' })
    const [passwordError, setPasswordError] = useState({ value: false, errorMessage: '' })
    const [confirmPasswordError, setConfirmPasswordError] = useState({ value: false, errorMessage: '' })
    const [organisationNameError, setOrganisationNameError] = useState({ value: false, errorMessage: '' })
    const [organisationDescriptionError, setOrganisationDescriptionError] = useState({ value: false, errorMessage: '' })
    const [paymentAccountError, setPaymentAccountError] = useState({ value: false, errorMessage: '' })

    const [fileStorageName, setFileStorageName] = useState("")

    const selectFile = (event) => {
        setCurrentFile(event.target.files[0]);
        setProgress(0);
        setMessage("");
    };

    const uploadZipFile = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        setNameError({ value: false, errorMessage: '' })
        setEmailError({ value: false, errorMessage: '' })
        setPhoneError({ value: false, errorMessage: '' })
        setUsernameError({ value: false, errorMessage: '' })
        setPasswordError({ value: false, errorMessage: '' })
        setConfirmPasswordError({ value: false, errorMessage: '' })
        setOrganisationNameError({ value: false, errorMessage: '' })
        setOrganisationDescriptionError({ value: false, errorMessage: '' })
        setPaymentAccountError({ value: false, errorMessage: '' })

        if (name === '') {
            setNameError({ value: true, errorMessage: 'You must enter a name' })
        }
        if (email === '') {
            setEmailError({ value: true, errorMessage: 'You must enter a email' })
        }
        if(!email.includes("@") || !email.includes(".com")) {
            setEmailError({ value: true, errorMessage: 'Invalid Email Address format' })
          }
        if (phone === '') {
            setPhoneError({ value: true, errorMessage: 'You must enter a phone number' })
        }
        if (username === '') {
            setUsernameError({ value: true, errorMessage: 'You must enter a username' })
        }
        if (password === '') {
            setPasswordError({ value: true, errorMessage: 'You must enter a password' })
        }
        if (confirmPassword === '') {
            setConfirmPasswordError({ value: true, errorMessage: 'You must confirm your password' })
        }
        if (organisationName === '') {
            setOrganisationNameError({ value: true, errorMessage: 'You must enter a organisation name' })
        }
        if (organisationDescription === '') {
            setOrganisationDescriptionError({ value: true, errorMessage: 'You must enter a organisation description' })
        }
        if (paymentAccount === '') {
            setPaymentAccountError({ value: true, errorMessage: 'You must enter a payment account number' })
        }
        if (confirmPassword !== password) {
            setPasswordError({ value: true, errorMessage: 'Password does not match confirm password' })
            setConfirmPasswordError({ value: true, errorMessage: 'Password does not match confirm password' })
        }
        else if (name && email && password && username && confirmPassword && phone && organisationDescription && organisationName && paymentAccount && fileStorageName
            && email.includes("@") && email.includes(".com")) {
            var adminName = name
            var adminEmail = email
            var adminNumber = phone
            var orgName = organisationName
            var orgDescription = organisationDescription
            var paymentAcc = paymentAccount
            const orgAdminApprovalReq = { adminName, adminEmail, adminNumber, username, password, orgName, orgDescription, paymentAcc, fileStorageName };

            try {
                const response = await axios.post(
                    "http://localhost:8080/orgAdminApprovalReq/addOrgAdminApprovalReq", orgAdminApprovalReq
                );
                // set the state of the user
                // store the user in localStorage
                const user = response.data
                handleClickOpen()

            } catch (error) {
                // Handle error here
                console.log(error.message)
            }
        }
    };

    const renderFileName = () => {
        if (fileStorageName) {
            return <div style={{ padding: 20 }}>
                You have uploaded file : {fileStorageName}
            </div>
                ;
        }
        else {
            return <div style={{ padding: 20, color: 'red' }}>
                You have not uploaded any file!
            </div>
                ;
        }
    }

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
                        <div style={{ paddingBottom: '20px', textAlign: 'center' }}>
                            <LocalLibraryIcon style={{ fontSize: '50px' }} />
                            <h2 style={headerStyle}>Sign Up</h2>
                            <Typography variant='caption' gutterBottom>
                                Please fill this form to create an Organisation Admin account !
                            </Typography>
                        </div>
                        {/* <form className={classes.root} noValidate autoComplete="off"> */}
                        {/* <FormControl component="fieldset" style={marginTop}> */}
                        <div style={{ padding: '20px 0', textDecoration: 'underline' }}>
                            <FormLabel component="legend">Organisation Admin Information</FormLabel>
                        </div>
                        <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={nameError.value}
                            helperText={nameError.errorMessage}
                            style={{ paddingBottom: "10px" }}
                        />
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={emailError.value}
                            helperText={emailError.errorMessage}
                            style={{ paddingBottom: "10px" }}
                        />
                        <TextField id="outlined-basic" label="Phone Number" variant="outlined" fullWidth
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            error={phoneError.value}
                            helperText={phoneError.errorMessage}
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
                        <div style={{ padding: '20px 0', textDecoration: 'underline' }}>
                            <FormLabel component="legend">Organisation Information</FormLabel>
                        </div>
                        <TextField id="outlined-basic" label="Organisation Name" variant="outlined" fullWidth
                            required
                            value={organisationName}
                            onChange={(e) => setOrganisationName(e.target.value)}
                            error={organisationNameError.value}
                            helperText={organisationNameError.errorMessage}
                            style={{ paddingBottom: "10px" }}
                        />
                        <TextField id="outlined-basic" label="Organisation Description" variant="outlined" fullWidth
                            required
                            value={organisationDescription}
                            onChange={(e) => setOrganisationDescription(e.target.value)}
                            error={organisationDescriptionError.value}
                            helperText={organisationDescriptionError.errorMessage}
                            style={{ paddingBottom: "10px" }}
                        />
                        <TextField id="outlined-basic" label="Payment Account Number" variant="outlined" fullWidth
                            required
                            value={paymentAccount}
                            onChange={(e) => setPaymentAccount(e.target.value)}
                            error={paymentAccountError.value}
                            helperText={paymentAccountError.errorMessage}
                            style={{ paddingBottom: "10px" }}
                        />

                        {/* </form> */}
                        {/* <div style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 50 }}>

                        </div> */}
                        {/* </FormControl> */}
                        <div style={{ padding: '20px 0', textDecoration: 'underline' }}>
                            <FormLabel component="legend">Organisation Documents</FormLabel>
                        </div>
                        <div style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 50 }}>
                            {renderFileName()}
                            {message && (
                                <Typography
                                    variant="subtitle2"
                                    className={`upload-message ${isError ? "error" : ""}`}
                                >
                                    {message}
                                </Typography>
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
                            <br />
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
                            &nbsp;
                            <Button
                                className="btn-upload"
                                color="primary"
                                variant="contained"
                                component="span"
                                disabled={!currentFile}
                                onClick={uploadZipFile}
                            >
                                Upload
                            </Button>
                            <br />
                            <br />
                            <br />
                            <FormControlLabel
                                control={<Checkbox name="checkedA" />}
                                label="I accept the terms and conditions."
                                onChange={() => (toggleCheckboxValue())}
                            />
                            <Button type='submit' variant='contained' color='primary' onClick={handleSubmit} disabled={!checkboxValue}>Sign up</Button>
                        </div>
                        <div style={{ float: 'left' }}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Button variant="contained">
                                    <ArrowBackIcon />
                                    Back
                                </Button>
                            </Link>
                        </div>
                    </Paper>
                </Container>
            </Box>
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Successfully Sent!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Your Organisation Admin Account Creation Request has been sent successfully!
                            Please wait 1-3 days for us to process the request, and you will receive any updates by email.
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
