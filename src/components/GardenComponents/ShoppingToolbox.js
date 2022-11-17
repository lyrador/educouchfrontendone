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
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import YardIcon from '@mui/icons-material/Yard';
import TreePoint from './TreePoint';

function ShoppingToolbox() {

    const navigate = useNavigate();

    const handleBackToGarden = () => {
        navigate('/learnerHome');
    }



    return (
        <div style={{ marginLeft: "4%" }}>

            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" startIcon={<ShoppingBasketIcon />}>Purchase</Button>
                        <Button variant="contained" startIcon={<YardIcon />} onClick={handleBackToGarden}>Back to garden</Button>
                    </Stack>
                </Grid>
                <Grid item xs={4} style={{ textAlign: "right" }}>
                    <TreePoint />
                </Grid>
            </Grid>
        </div>
    )
}

export default ShoppingToolbox;