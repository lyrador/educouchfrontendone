import * as React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { useAuth } from '../context/AuthProvider';
import { AuthProvider } from '../context/AuthProvider';
import WebPet from "web-pet";
import { useState, useEffect } from 'react';
import HomepageGarden from '../components/GardenComponents/HomepageGarden';
import GardenToolbox from '../components/GardenComponents/GardenToolbox';
import ShoppingToolbox from '../components/GardenComponents/ShoppingToolbox';
import ItemsCatalogue from '../components/GardenComponents/ItemsCatalogue';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrangeToolbox from '../components/GardenComponents/ArrangeToolbox';
import MyItemList from '../components/GardenComponents/MyItemList';
import { GirlRounded } from '@mui/icons-material';

export default function RewardsArrangementPage() {
    const [selectedItem, setSelectedItem] = useState("");
    const [destinationGrid, setDestinationGrid] = useState(undefined);

    const sendSelectedItem = (x) => {
        setSelectedItem(x);
    }

    const sendDestinationGrid = (x) => {
        console.log('Destination grid: ' + JSON.stringify(x));
        setDestinationGrid(x);
    }

    const handleMove = (xIncrement, yIncrement) => {
        var newPositionX = destinationGrid.positionX + xIncrement;
        var newPositionY = destinationGrid.positionY + yIncrement;
        if (newPositionX >= 0 && newPositionX < 5 && newPositionY >= 0 && newPositionY < 5) {
            var grid = {}
            grid.positionX = newPositionX;
            grid.positionY = newPositionY;
            sendDestinationGrid(grid);
        } else {
            toast.warn("Item has to be placed somewhere inside your garden area.");
        }



    }



    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={5.8}>
                    <ToastContainer position = "top-center"></ToastContainer>
                    <ArrangeToolbox selectedItem={selectedItem} handleMove = {handleMove} destinationGrid = {destinationGrid}/>
                    <br />
                    <HomepageGarden selectedItem = {selectedItem} destinationGrid = {destinationGrid}/>
                </Grid>
                <Grid item xs={5.8}>
                    <MyItemList sendSelectedItem = {sendSelectedItem} sendDestinationGrid = {sendDestinationGrid}/>
                </Grid>
            </Grid>
        </>
    );
}
