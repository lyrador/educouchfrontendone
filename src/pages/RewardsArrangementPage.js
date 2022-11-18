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

export default function RewardsArrangementPage() {

    const [imaginaryItem, setImaginaryItem] = useState("");
    const [selectedItem, setSelectedItem] = useState("");

    const sendSelectedItem = (x) => {
        console.log('ItemOwned ' + x);
        setSelectedItem(x);
    }

    // const handleMove = (xIncrement, yIncrement) => {
    //     var newPositionX = imaginaryItem.positionX + xIncrement;
    //     var newPositionY = imaginaryItem.positionY + yIncrement;
    //     if (newPositionX >= 0 && newPositionX < 5 && newPositionY >= 0 && newPositionY < 5) {
    //         sendImaginaryItem(imaginaryItem.item, newPositionX, newPositionY);
    //     } else {
    //         toast.warn("Item has to be placed somewhere inside your garden area.");
    //     }



    // }



    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={5.8}>
                    <ToastContainer position = "top-center"></ToastContainer>
                    <ArrangeToolbox selectedItem={selectedItem} />
                    <br />
                    <HomepageGarden imaginaryItem={imaginaryItem} selectedItem = {selectedItem}/>
                </Grid>
                <Grid item xs={5.8}>
                    <MyItemList sendSelectedItem = {sendSelectedItem}/>
                </Grid>
            </Grid>
        </>
    );
}
