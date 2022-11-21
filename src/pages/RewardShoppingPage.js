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

export default function RewardShoppingPage() {

    const [imaginaryItem, setImaginaryItem] = useState("");

    const sendImaginaryItem = (selectedItem, potentialX, potentialY) => {
        var imaginary_i = {};
        imaginary_i.item = selectedItem;
        imaginary_i.positionX = potentialX;
        imaginary_i.positionY = potentialY;
        imaginary_i.imageUrl = selectedItem.imageUrl;
        setImaginaryItem(imaginary_i);
    }

    const handleMove = (xIncrement, yIncrement) => {
        var newPositionX = imaginaryItem.positionX + xIncrement;
        var newPositionY = imaginaryItem.positionY + yIncrement;
        if (newPositionX >= 0 && newPositionX < 5 && newPositionY >= 0 && newPositionY < 5) {
            sendImaginaryItem(imaginaryItem.item, newPositionX, newPositionY);
        } else {
            toast.warn("Item has to be placed somewhere inside your garden area.");
        }



    }



    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <ToastContainer position = "top-center"></ToastContainer>
                    <ShoppingToolbox imaginaryItem={imaginaryItem} handleMove={handleMove} />
                    <br />
                    <HomepageGarden imaginaryItem={imaginaryItem} />
                </Grid>
                <Grid item xs={5.8}>
                    <ItemsCatalogue sendImaginaryItem={sendImaginaryItem} />

                </Grid>
            </Grid>
        </>
    );
}
