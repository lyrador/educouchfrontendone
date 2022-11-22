import * as React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import EnhancementToolbar from '../components/GardenComponents/EnhancementToolbar';
import VisitorGarden from '../components/GardenComponents/VisitorGarden';
import PartyHostToolbox from '../components/GardenComponents/PartyHostToolbox';
import LearnerList from '../components/GardenComponents/LearnerList';

export default function VisitorGardenPage() {



    var userId = useParams();
    userId = userId.userId;

    const [selectedLearner, setSelectedLearner] = useState("");

    const sendSelectedLearner = (x) => {
        setSelectedLearner(x);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={5.8}>
                    <ToastContainer position="top-center"></ToastContainer>
                    <PartyHostToolbox sendSelectedLearner={sendSelectedLearner} />
                    <br />
                    <VisitorGarden userId={userId} />
                </Grid>
                <Grid item xs={5.8}>
                    <LearnerList />
                </Grid>
            </Grid>
        </>
    );
}
