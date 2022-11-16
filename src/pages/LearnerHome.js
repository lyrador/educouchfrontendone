import * as React from 'react';
import { Typography, Grid } from '@mui/material';
import { useAuth } from '../context/AuthProvider';
import { AuthProvider } from '../context/AuthProvider';
import WebPet from "web-pet";
import HomepageGarden from '../components/GardenComponents/HomepageGarden';

export default function LearnerHome() {

    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={7}>
                    <HomepageGarden/>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        </>
    );
}
