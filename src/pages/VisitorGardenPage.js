import * as React from 'react';
import { Typography, Divider, Grid, Box, Badge, Avatar, Stack } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import EnhancementToolbar from '../components/GardenComponents/EnhancementToolbar';
import VisitorGarden from '../components/GardenComponents/VisitorGarden';
import PartyHostToolbox from '../components/GardenComponents/PartyHostToolbox';
import LearnerList from '../components/GardenComponents/LearnerList';
import VideoCall from '../components/GardenComponents/VideoCall';
import { useAuth } from '../context/AuthProvider';
import { AuthProvider } from '../context/AuthProvider';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));


export default function VisitorGardenPage() {

    const auth = useAuth();
    const user = auth.user;


    // this can be changed later on
    const [currUser, setCurrUser] = useState(user);

    const sendOtherUser = (user) => {
        console.log('Received another user: ' + JSON.stringify(user));
        setCurrUser(user);
    }

    useEffect(() => {
        
    },[currUser])


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={5.8}>
                    <ToastContainer position="top-center"></ToastContainer>
                    <div style={{ marginLeft: "5%" }}>
                        <Stack direction="row" spacing={2}>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar alt={user.username} src= {user.profilePictureURL}/>
                            </StyledBadge>

                            <Typography variant="h5" style = {{ paddingTop: "1px"}}>{"You are currently in " + currUser.username + "'s garden"}</Typography>
                        </Stack>
                    </div>

                    <br />
                    {currUser.learnerId && <VisitorGarden userId={currUser.learnerId} />}
                    {currUser.userId && <VisitorGarden userId={currUser.userId} />}
                </Grid>
                <Grid item xs={5.8}>
                    {user && <VideoCall user = {user} sendOtherUser = {sendOtherUser}/>}
                </Grid>
            </Grid>
        </>
    );
}
