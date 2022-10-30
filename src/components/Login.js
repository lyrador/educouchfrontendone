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
import { Link } from 'react-router-dom';
import { MenuItem } from "@mui/material";
import { useState } from "react";

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

export default function Login() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")

  const [usernameError, setUsernameError] = useState({ value: false, errorMessage: '' })
  const [passwordError, setPasswordError] = useState({ value: false, errorMessage: '' })

  auth.logout()
  const handleSubmit = async (event) => {
    event.preventDefault();

    setPasswordError({ value: false, errorMessage: '' })
    setUsernameError({ value: false, errorMessage: '' })

    if (password == '') {
      setPasswordError({ value: true, errorMessage: 'You must enter a password' })
    }
    if (username == '') {
      setUsernameError({ value: true, errorMessage: 'You must enter a username' })
    }

    if (password && username) {
      try {
        const response = await axios({
          method: 'post',
          url: `http://localhost:8080/login`,
          headers: {},
          data: {
            username: username,
            password: password,
          }
        });
        // axios.post(
        //     `http://localhost:8080/lmsadmin/login?username=${username}&password=${password}`
        //   );

        // set the state of the user
        // store the user in localStorage

        const user = response.data
        if (user.isActive === "false") {
          setPasswordError({ value: true, errorMessage: 'User is disabled!' })
          setUsernameError({ value: true, errorMessage: 'User is disabled!' })
        } else {
          auth.login(response.data)
          console.log(response.data)
          navigate('/home')
        }
      } catch (error) {
        console.log(error.message)
        setPasswordError({ value: true, errorMessage: 'User does not exist or password does not match' })
        setUsernameError({ value: true, errorMessage: 'User does not exist or password does not match' })
      }
    }


  };

  return (
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
              marginTop: 15,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5" color={"black"}>
              EduCouch Portal
            </Typography> */}
            <img src="https://educouchbucket.s3.ap-southeast-1.amazonaws.com/educouchlogo.png" style={{ height: 200, width: 300, borderRadius: 30 }} />
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Username"
                label="Username"
                name="username"
                //   autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                error={usernameError.value}
                helperText={usernameError.errorMessage}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                //   autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError.value}
                helperText={passwordError.errorMessage}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <div style={{ justifyContent: 'center', display: 'flex' }}>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Button
                    sx={{ mt: 3, mb: 2 }}
                  >
                    No Account? Register Here
                  </Button>
                </Link>
              </div>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </Box>
  );
}