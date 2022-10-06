import React from 'react';
import successEnrolment from '../assets/successEnrolment.png';
import { Typography, Box } from '@mui/material';
import '../css/congratulationPicture.css';

export default function SuccessEnrolment({ courseName }) {


    return (
        
        <div id="congratulation-picture-container">
            <br/>
            <br/>
            <img id = "study-picture" src={successEnrolment} />
            <Typography variant="h6"> Congratulation! 🎉 You have successfully enrolled in the course!</Typography>
        </div>
    );
}