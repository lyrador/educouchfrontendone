import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LinkMaterial from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import SchoolIcon from '@mui/icons-material/School';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

import { Link } from 'react-router-dom';

import '../css/RegisterPage.css'
import { IconButton } from '@mui/material';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <LinkMaterial color="inherit" href="https://mui.com/">
                EduCouch
            </LinkMaterial>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const handleSubmit = async (event) => {
}

export default function RegisterPage() {
    const auth = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [userType, setUserType] = React.useState("")
    auth.logout()

    return (
        <div>
            <Box position="fixed"
                top={0}
                height="100%"
                width="100%"
                bgcolor={'white'}
            >
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="lg">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 25,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <Typography component="h1" variant="h5" color={"black"} style={{ padding: '30px' }}>
                                    Select your Account Type!
                                </Typography>
                                <div style={{ justifyContent: 'center', display: 'flex' }}>
                                    <div className='register-card'>
                                        {/* <IconButton> */}
                                        <Link to='/register/learner' style={{ textDecoration: 'none' }}>
                                            <Card sx={{ width: 275, height: 200, textAlign: 'center' }}>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        User Type
                                                    </Typography>
                                                    <Typography variant="h5" component="div">
                                                        Learner
                                                    </Typography>
                                                    <SchoolIcon style={{ fontSize: '50px' }} />
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="body2">
                                                        You will be signing up as a student to enjoy educational content!
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                        {/* </IconButton> */}
                                    </div>
                                    <div className='register-card'>
                                        {/* <IconButton> */}
                                        <Link to='/register/educator' style={{ textDecoration: 'none' }}>
                                            <Card sx={{ width: 275, height: 200, textAlign: 'center' }}>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        User Type
                                                    </Typography>
                                                    <Typography variant="h5" component="div">
                                                        Educator
                                                    </Typography>
                                                    <LocalLibraryIcon style={{ fontSize: '50px' }} />
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="body2">
                                                        You will be signing up as an educator to offer educational content!
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                        {/* </IconButton> */}
                                    </div>
                                </div>
                            </Box>
                        </Box>
                        <div style={{ justifyContent: 'center', display: 'flex' }}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Button
                                    sx={{ mt: 3, mb: 2}}
                                >
                                    Return to Login Page
                                </Button>
                            </Link>
                        </div>
                        <Copyright sx={{ mt: 8, mb: 4 }} />
                    </Container>
                </ThemeProvider>
            </Box>
        </div>
    );
}