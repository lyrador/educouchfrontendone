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

export default function RewardShoppingPage() {
    
    const [imaginaryItem, setImaginaryItem] = useState("");

    const sendImaginaryItem = (selectedItem, potentialX, potentialY) => {
        var imaginary_i = {};
        imaginary_i.item = selectedItem;
        imaginary_i.positionX = potentialX;
        imaginary_i.positionY = potentialY;
        setImaginaryItem(imaginary_i);
    }

    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <ShoppingToolbox />
                    <br />
                    <HomepageGarden imaginaryItem = {imaginaryItem} />
                </Grid>
                <Grid item xs={5.8}>
                    <ItemsCatalogue sendImaginaryItem={ sendImaginaryItem }/>

                </Grid>
            </Grid>
        </>
    );
}
