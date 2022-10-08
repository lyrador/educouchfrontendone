import * as React from 'react';
import { useState } from 'react';
import {
    Grid, Typography, Button
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import LearnerCourseDrawer from './LearnerCourseDrawer';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import refundOnTheWay from '../assets/refundOnTheWay.jpg';
import '../css/congratulationPicture.css';


const steps = ['Select class run schedule', 'Enrollment guidelines', 'Payment', 'Completed'];

const publicKey = "pk_test_51LnPrnBx7BYbBg97eaxGtJNPIBG88wK36CGBCzldo5RmE5w3F9G7JKI7sOLafQB6yBdgfVsz6VHUpx5ja4LeVhp700UuLU3SOn";
const stripePromise = loadStripe(publicKey);



export default function RefundOnTheWay({ courseId }) {
    // user
    const auth = useAuth();
    const user = auth.user;

    // navigate to course details page
    const navigate = useNavigate();

    const navigateCourseDetails = () => {
        navigate(`/learnerCourseDetails/${courseId}`);

    };



    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <LearnerCourseDrawer courseId={courseId}></LearnerCourseDrawer>
                </Grid>
                <Grid item xs={8}>
                    <div id="congratulation-picture-container">
                        <br />
                        <br />
                        <img id="study-picture" src={refundOnTheWay} />
                        <Typography variant="h6"> Your refund is one the way!</Typography>
                        <br />
                        <Button variant="outlined" onClick={navigateCourseDetails}>Go back to course main page.</Button>
                    </div>
                </Grid>
            </Grid>

        </>

    );
}