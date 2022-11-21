import React from 'react';
import '../../App.css';
import '../../css/garden.css';
import { Typography, Grid, Box, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import PacmanLoader from "react-spinners/PacmanLoader";
import grass from "../../assets/Grass.png";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlipToBackIcon from '@mui/icons-material/FlipToBack';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import TreePoint from './TreePoint';

function GardenToolbox() {
    const navigate = useNavigate();

    const navigateToShoppingPage = () => {
        navigate('/rewardShoppingPage');
    }

    const navigateToArrangementPage = () => {
        navigate('/rewardArrangementPage');
    }



    return (
        <div style={{ marginLeft: "4%" }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" startIcon={<ShoppingCartIcon />} onClick={navigateToShoppingPage}>Shop</Button>
                        <Button variant="contained" startIcon={<FlipToBackIcon />} onClick = {navigateToArrangementPage}>Rearrange</Button>
                        <Button variant="contained" startIcon={<AutoFixHighIcon />}>Enhance</Button>
                    </Stack>
                </Grid>
                <Grid item xs={4} style = {{textAlign: "right"}}>
                    <TreePoint />
                </Grid>
            </Grid>

        </div>
    )
}

export default GardenToolbox;