import React from 'react';
import eLearning from '../assets/elearning.jpg';
import { Typography, Box } from '@mui/material';
import '../css/congratulationPicture.css';

export default function SuccessReservation({ courseName }) {


    return (
        
        <div id="congratulation-picture-container">
            <br/>
            <br/>
            <img id = "study-picture" src={eLearning} />
            <Typography variant="h6"> Congratulation! 🎉 You have successfully reserved your spot !</Typography>
        </div>
    );
}