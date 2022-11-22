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
import Stack from '@mui/material/Stack';
import { GirlRounded } from '@mui/icons-material';
import MiniMyItemList from '../components/GardenComponents/MiniMyItemList';
import MiniEnhancementItemList from '../components/GardenComponents/MiniEnhancementItemList';
import EnhancementToolbar from '../components/GardenComponents/EnhancementToolbar';

export default function RewardsEnhancementPage() {
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedEnhancement, setSelectedEnhancement] = useState("");
    // const [destinationGrid, setDestinationGrid] = useState(undefined);

    const sendSelectedItem = (x) => {
        setSelectedItem(x);
    }

    const sendSelectedEnhancement = (x) => {
        setSelectedEnhancement(x);
    }


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={5.8}>
                    <ToastContainer position = "top-center"></ToastContainer>
                    <EnhancementToolbar selectedItem = {selectedItem} selectedEnhancement = {selectedEnhancement}/>
                    <br />
                    <HomepageGarden selectedItem = {selectedItem}/>
                </Grid>
                <Grid item xs={5.8}>
                    <Stack direction = "row">
                        <MiniMyItemList sendSelectedItem = {sendSelectedItem}/>
                        <MiniEnhancementItemList sendSelectedEnhancement = {sendSelectedEnhancement}/>

                    </Stack>
                    
                </Grid>
            </Grid>
        </>
    );
}
