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
import HideImageIcon from '@mui/icons-material/HideImage';
import forest from '../../assets/forest.png';
import ClimbingBoxLoader from "react-spinners/PacmanLoader";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

function ArrangeToolbox({ selectedItem }) {

    const navigate = useNavigate();
    const auth = useAuth();
    const user = auth.user;

    // hide dialog box
    const [hideDialogBox, setHideDialogBox] = useState(false);
    const openHideDialogBox = () => {
        setHideDialogBox(true);
    }
    const closeHideDialogBox = () => {
        setHideDialogBox(false);
    }
    const [purchaseLoading, setPurchaseLoading] = useState(false);

    const handleBackToGarden = () => {
        navigate('/learnerHome');
    }

    // unhide dialog box
    const [unhideDialogBox, setUnhideDialogBox] = useState(false);
    const openUnhideDialogBox = () => {
        setUnhideDialogBox(true);
    }
    const closeUnhideDialogBox = () => {
        setUnhideDialogBox(false);
    }


    // const goUp = () => {
    //     // x stays, y decreases, 
    //     handleMove(0, -1);
    // }
    // const goDown = () => {
    //     // x stays, y increases
    //     handleMove(0, +1);
    // }

    // const goLeft = () => {
    //     // x decrease, y stays
    //     handleMove(-1, 0);
    // }

    // const goRight = () => {
    //     // x increases, y stays
    //     handleMove(+1, 0);
    // }

    const hideItem = (e) => {
        e.preventDefault();
        console.log("Relocated function called.");

        if (selectedItem === "") {
            alert('You have to select an item!');
            return;
        }

        // var transferObject = {}
        // transferObject.learnerId = user.userId;
        // transferObject.itemId = imaginaryItem.item.itemId;
        // transferObject.positionX = imaginaryItem.positionX;
        // transferObject.positionY = imaginaryItem.positionY;
        var requestUrl = "http://localhost:8080/treePoints/hideItems?learnerId=" + user.userId + "&itemOwnedId=" + selectedItem.itemOwnedId;
        fetch(requestUrl)
            .then(async response => {
                if (!response.ok) {
                    const error = response.status;
                    return Promise.reject(error);
                }
                navigate('/learnerHome');
            }).catch((error) => {
                // console.log(error);
                // toast.error(error.message);
                alert("Unable to hide item: location occupied or learner not found!");

                closeHideDialogBox();


            })
    }

    const unhideItem = (e) => {
        e.preventDefault();
        console.log("Relocated function called.");

        if (selectedItem === "") {
            alert('You have to select an item!');
            return;
        }

        // var transferObject = {}
        // transferObject.learnerId = user.userId;
        // transferObject.itemId = imaginaryItem.item.itemId;
        // transferObject.positionX = imaginaryItem.positionX;
        // transferObject.positionY = imaginaryItem.positionY;
        var requestUrl = "http://localhost:8080/treePoints/unhideItems?learnerId=" + user.userId + "&itemOwnedId=" + selectedItem.itemOwnedId;
        fetch(requestUrl)
            .then(async response => {
                if (!response.ok) {
                    const error = response.status;
                    return Promise.reject(error);
                }
                navigate('/learnerHome');
            }).catch((error) => {
                // console.log(error);
                // toast.error(error.message);
                alert("Unable to show item: location occupied or learner not found!");

                closeUnhideDialogBox();


            })
    }



    return (
        <div style={{ marginLeft: "4%" }}>
            <ToastContainer position="top-center"></ToastContainer>

            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Stack direction="row" spacing={2}>

                        <Button variant="contained" startIcon={<YardIcon />} onClick={handleBackToGarden}>Back to garden</Button>
                        {selectedItem !== "" &&  <Button variant="contained" onClick={openHideDialogBox} startIcon={<VisibilityOffIcon />}>Hide</Button>}
                        {selectedItem !== "" && <Button variant="contained" onClick={openUnhideDialogBox} startIcon={<VisibilityIcon />}>Show</Button>}
                        {/* {imaginaryItem !== "" &&
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button onClick={goUp} startIcon={<ArrowUpwardIcon />}></Button>
                                <Button onClick={goDown} startIcon={<ArrowDownwardIcon />}></Button>
                                <Button onClick={goLeft} startIcon={<ArrowBackIcon />}></Button>
                                <Button onClick={goRight} startIcon={<ArrowForwardIcon />}></Button>
                            </ButtonGroup>
                        } */}
                    </Stack>
                </Grid>
                <Grid item xs={4} style={{ textAlign: "right" }}>
                    <TreePoint />
                </Grid>
            </Grid>

            <Dialog
                open={hideDialogBox}
                onClose={closeHideDialogBox}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Item Hiding"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure that you would like to hide this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeHideDialogBox}>No</Button>
                    {!purchaseLoading &&
                        <Button onClick={hideItem} autoFocus>
                            Yes
                        </Button>
                    }
                    <ClimbingBoxLoader loading={purchaseLoading} />
                </DialogActions>
            </Dialog>

            <Dialog
                open={unhideDialogBox}
                onClose={closeUnhideDialogBox}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Item Showing"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure that you would like to show this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeUnhideDialogBox}>No</Button>
                    {!purchaseLoading &&
                        <Button onClick={unhideItem} autoFocus>
                            Yes
                        </Button>
                    }
                    <ClimbingBoxLoader loading={purchaseLoading} />
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ArrangeToolbox;