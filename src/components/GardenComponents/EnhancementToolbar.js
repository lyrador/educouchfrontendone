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
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

function EnhancementToolbar({ selectedItem, selectedEnhancement, sendSelectedItem }) {

    const navigate = useNavigate();
    const auth = useAuth();
    const user = auth.user;

    // hide dialog box
    const [enhanceDialogBox, setEnhanceDialogBox] = useState(false);
    const openEnhanceDialogBox = () => {
        setEnhanceDialogBox(true);
    }
    const closeEnhanceDialogBox = () => {
        setEnhanceDialogBox(false);
    }
    const [purchaseLoading, setPurchaseLoading] = useState(false);

    const handleBackToGarden = () => {
        navigate('/learnerHome');
    }



    const enhanceItem = (e) => {
        e.preventDefault();

        if (selectedItem === "" || selectedEnhancement === "") {
            alert('You have to select an item and an enhancement!');
            return;
        }

        var requestUrl = "http://localhost:8080/treePoints/enhanceItem?learnerId=" + user.userId + "&itemOwnedId=" + selectedItem.itemOwnedId + "&enhancementId=" + selectedEnhancement.enhancementItemId;
        fetch(requestUrl)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson ? await response.json() : null;
                console.log(JSON.stringify(data));
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    console.log('Error is ' + error);
                    return Promise.reject(error);
                } else {
                    
                    sendSelectedItem(selectedItem);
                    closeEnhanceDialogBox();
                    toast.success("Successful enhancement!");
                }

            }).catch((error) => {
                // console.log(error);
                // toast.error(error.message);
                toast.error(error);

                closeEnhanceDialogBox();


            })
    }
    return (
        <div style={{ marginLeft: "4%" }}>
            <ToastContainer position="top-center"></ToastContainer>

            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Stack direction="row" spacing={2}>

                        <Button variant="contained" startIcon={<YardIcon />} onClick={handleBackToGarden}>Back to garden</Button>
                        {selectedItem !== "" && selectedEnhancement != "" &&  <Button variant="contained" onClick={openEnhanceDialogBox} startIcon={<AutoAwesomeIcon />}>Enhance</Button>}
                    </Stack>
                </Grid>
                <Grid item xs={4} style = {{textAlign: "right"}}>
                    <TreePoint/>
                </Grid>
            </Grid>

            <Dialog
                open={enhanceDialogBox}
                onClose={closeEnhanceDialogBox}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Item Enhancement"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action will cost you {selectedEnhancement.pricePerUse} 🌲. Are you sure you would like to proceed?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeEnhanceDialogBox}>No</Button>
                    {!purchaseLoading &&
                        <Button onClick={enhanceItem} autoFocus>
                            Yes
                        </Button>
                    }
                    <ClimbingBoxLoader loading={purchaseLoading} />
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EnhancementToolbar;