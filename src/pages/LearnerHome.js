import * as React from 'react';
import { Typography, Grid, Stack } from '@mui/material';
import { useAuth } from '../context/AuthProvider';
import { AuthProvider } from '../context/AuthProvider';
import WebPet from "web-pet";
import HomepageGarden from '../components/GardenComponents/HomepageGarden';
import GardenToolbox from '../components/GardenComponents/GardenToolbox';
import TreePoint from '../components/GardenComponents/TreePoint';

export default function LearnerHome() {

    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <GardenToolbox />
                    <br />
                    <HomepageGarden />
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        </>
    );
}
