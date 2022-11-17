import React from 'react';
import '../../App.css';
import '../../css/garden.css';
import { Typography, Grid, Box, Stack, Button, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import PacmanLoader from "react-spinners/PacmanLoader";
import grass from "../../assets/Grass.png";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import YardIcon from '@mui/icons-material/Yard';
import TreePoint from './TreePoint';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function ShoppingToolbox({ imaginaryItem, handleMove }) {

    const navigate = useNavigate();

    const handleBackToGarden = () => {
        navigate('/learnerHome');
    }

    const goUp = () => {
        // x stays, y decreases, 
        handleMove(0, -1);
    }
    const goDown = () => {
        // x stays, y increases
        handleMove(0, +1);
    }

    const goLeft = () => {
        // x decrease, y stays
        handleMove(-1, 0);
    }

    const goRight = () => {
        // x increases, y stays
        handleMove(+1, 0);
    }



    return (
        <div style={{ marginLeft: "4%" }}>

            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Stack direction="row" spacing={2}>

                        <Button variant="contained" startIcon={<YardIcon />} onClick={handleBackToGarden}>Back to garden</Button>
                        {imaginaryItem !== "" && <Button variant="contained" startIcon={<ShoppingBasketIcon />}>Purchase</Button>}
                        {imaginaryItem !== "" &&
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button onClick = {goUp} startIcon = {<ArrowUpwardIcon/>}></Button>
                                <Button onClick = {goDown} startIcon = {<ArrowDownwardIcon/>}></Button>
                                <Button onClick = {goLeft} startIcon = {<ArrowBackIcon/>}></Button>
                                <Button onClick = {goRight} startIcon = {<ArrowForwardIcon/>}></Button>
                            </ButtonGroup>
                        }
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