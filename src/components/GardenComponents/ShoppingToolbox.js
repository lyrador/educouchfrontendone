import React from 'react';
import '../../App.css';
import '../../css/garden.css';
import { Typography, Grid, Box, Stack, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import forest from '../../assets/forest.png';
import ClimbingBoxLoader from "react-spinners/PacmanLoader";

function ShoppingToolbox({ imaginaryItem, handleMove }) {

    const navigate = useNavigate();
    const auth = useAuth();
    const user = auth.user;

    // dialog box
    const [itemDialogBox, setItemDialogBox] = useState(false);
    const openItemDialogBox = () => {
        setItemDialogBox(true);
    }
    const closeItemDialogBox = () => {
        setItemDialogBox(false);
    }
    const [purchaseLoading, setPurchaseLoading] = useState(false);

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

    const purchaseItem = (e) => {
        e.preventDefault();
        var transferObject = {}
        transferObject.learnerId = user.userId;
        transferObject.itemId = imaginaryItem.item.itemId;
        transferObject.positionX = imaginaryItem.positionX;
        transferObject.positionY = imaginaryItem.positionY;

        fetch("http://localhost:8080/treePoints/purchaseItem", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transferObject)
        }).then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson ? await response.json() : null;



            if (!response.ok) {
                const error = (data && data.message) || response.status;
                console.log('Error is ' + error);
                return Promise.reject(error);
            } else {
                setPurchaseLoading(true);
                navigate('/learnerHome');
                setPurchaseLoading(false);
            }

        }).catch((error) => {
            toast.error(error);

            closeItemDialogBox();


        })
    }



    return (
        <div style={{ marginLeft: "4%" }}>
            <ToastContainer position="top-center"></ToastContainer>

            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Stack direction="row" spacing={2}>

                        <Button variant="contained" startIcon={<YardIcon />} onClick={handleBackToGarden}>Back to garden</Button>
                        {imaginaryItem !== "" && <Button variant="contained" onClick={openItemDialogBox} startIcon={<ShoppingBasketIcon />}>Purchase</Button>}
                        {imaginaryItem !== "" &&
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button onClick={goUp} startIcon={<ArrowUpwardIcon />}></Button>
                                <Button onClick={goDown} startIcon={<ArrowDownwardIcon />}></Button>
                                <Button onClick={goLeft} startIcon={<ArrowBackIcon />}></Button>
                                <Button onClick={goRight} startIcon={<ArrowForwardIcon />}></Button>
                            </ButtonGroup>
                        }
                    </Stack>
                </Grid>
                <Grid item xs={4} style={{ textAlign: "right" }}>
                    <TreePoint />
                </Grid>
            </Grid>

            <Dialog
                open={itemDialogBox}
                onClose={closeItemDialogBox}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm purchase"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <center>
                            {imaginaryItem.item && <img src={imaginaryItem.item.imageUrl} style={{ width: "60%" }} />}
                        </center>
                        <br />
                        Are you sure that you would like to purchase {imaginaryItem.item && imaginaryItem.item.itemName}? This item costs {imaginaryItem.item && imaginaryItem.item.price} tree points🌲.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeItemDialogBox}>Disagree</Button>
                    {!purchaseLoading &&
                        <Button onClick={purchaseItem} autoFocus>
                            Agree
                        </Button>
                    }
                    <ClimbingBoxLoader loading={purchaseLoading} />
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ShoppingToolbox;