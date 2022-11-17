import React from 'react';
import '../../App.css';
import '../../css/garden.css';
import { Typography, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import PacmanLoader from "react-spinners/PacmanLoader";
import grass from "../../assets/Grass.png";

function HomepageGarden() {

    const auth = useAuth();
    const user = auth.user;

    const [loadingGarden, setLoadingGarden] = useState(false);

    const [linkOneOne, setLinkOneOne] = useState("");
    const [linkOneTwo, setLinkOneTwo] = useState("");
    const [linkOneThree, setLinkOneThree] = useState("");
    const [linkOneFour, setLinkOneFour] = useState("");
    const [linkOneFive, setLinkOneFive] = useState("");

    const [linkTwoOne, setLinkTwoOne] = useState("");
    const [linkTwoTwo, setLinkTwoTwo] = useState("");
    const [linkTwoThree, setLinkTwoThree] = useState("");
    const [linkTwoFour, setLinkTwoFour] = useState("");
    const [linkTwoFive, setLinkTwoFive] = useState("");

    const [linkThreeOne, setLinkThreeOne] = useState("");
    const [linkThreeTwo, setLinkThreeTwo] = useState("");
    const [linkThreeThree, setLinkThreeThree] = useState("");
    const [linkThreeFour, setLinkThreeFour] = useState("");
    const [linkThreeFive, setLinkThreeFive] = useState("");

    const [linkFourOne, setLinkFourOne] = useState("");
    const [linkFourTwo, setLinkFourTwo] = useState("");
    const [linkFourThree, setLinkFourThree] = useState("");
    const [linkFourFour, setLinkFourFour] = useState("");
    const [linkFourFive, setLinkFourFive] = useState("");

    const [linkFiveOne, setLinkFiveOne] = useState("");
    const [linkFiveTwo, setLinkFiveTwo] = useState("");
    const [linkFiveThree, setLinkFiveThree] = useState("");
    const [linkFiveFour, setLinkFiveFour] = useState("");
    const [linkFiveFive, setLinkFiveFive] = useState("");

    useEffect(() => {
        setLoadingGarden(true);
        var retrievalUrl = "http://localhost:8080/treePoints/retrieveItemOwnedByLearnerId?learnerId=" + user.userId;
        fetch(retrievalUrl)
            .then((res) => res.json())
            .then((result) => {
                result.map((x) => processItem(x));
            }
            );
        setLoadingGarden(false);
    }, [])

    function processItem(x) {
        var coorX = x.positionX;
        var coorY = x.positionY;
        var itemUrl = x.item.imageUrl;

        if (coorX == 1) {
            switch (coorY) {
                case 1:
                    setLinkOneOne(itemUrl);
                    break;
                case 2:
                    setLinkOneTwo(itemUrl);
                    break;
                case 3:
                    setLinkOneThree(itemUrl);
                    break;
                case 4:
                    setLinkOneFour(itemUrl);
                    break;
                case 5:
                    setLinkOneFive(itemUrl);
                    break;
            }
        } else if (coorX == 2) {
            switch (coorY) {
                case 1:
                    setLinkTwoOne(itemUrl);
                    break;
                case 2:
                    setLinkTwoTwo(itemUrl);
                    break;
                case 3:
                    setLinkTwoThree(itemUrl);
                    break;
                case 4:
                    setLinkTwoFour(itemUrl);
                    break;
                case 5:
                    setLinkTwoFive(itemUrl);
                    break;
            }
        } else if (coorX == 3) {
            switch (coorY) {
                case 1:
                    setLinkThreeOne(itemUrl);
                    break;
                case 2:
                    setLinkThreeTwo(itemUrl);
                    break;
                case 3:
                    setLinkThreeThree(itemUrl);
                    break;
                case 4:
                    setLinkThreeFour(itemUrl);
                    break;
                case 5:
                    setLinkThreeFive(itemUrl);
                    break;
            }
        } else if (coorX == 4) {
            switch (coorY) {
                case 1:
                    setLinkFourOne(itemUrl);
                    break;
                case 2:
                    setLinkFourTwo(itemUrl);
                    break;
                case 3:
                    setLinkFourThree(itemUrl);
                    break;
                case 4:
                    setLinkFourFour(itemUrl);
                    break;
                case 5:
                    setLinkFourFive(itemUrl);
                    break;
            }
        } else if (coorX == 5) {
            switch (coorY) {
                case 1:
                    setLinkFiveOne(itemUrl);
                    break;
                case 2:
                    setLinkFiveTwo(itemUrl);
                    break;
                case 3:
                    setLinkFiveThree(itemUrl);
                    break;
                case 4:
                    setLinkFiveFour(itemUrl);
                    break;
                case 5:
                    setLinkFiveFive(itemUrl);
                    break;
            }
        }
    }



    return (
        <Box style={{ marginLeft: "4%"}}>
            <PacmanLoader loading={loadingGarden} />
            {!loadingGarden&&
                <Grid container spacing={1} className = "garden-grid" style = {{padding: "1em", backgroundImage: "linear-gradient(180deg, #234f1E, #98BF64)"}}>
                    <Grid item xs={2.4}>
                        {linkOneOne != "" && <img src={linkOneOne} />}
                        {linkOneOne == "" && <div className = "placeholder"></div>}
                    </Grid>
                    <Grid item xs={2.4}>
                        {linkOneTwo != "" && <img src={linkOneTwo} />}
                    </Grid>
                    <Grid item xs={2.4}>
                        {linkOneThree != "" && <img src={linkOneThree} />}
                    </Grid>
                    <Grid item xs={2.4}>
                        {linkOneFour != "" && <img src={linkOneFour} />}
                    </Grid>
                    <Grid item xs={2.4}>
                        {linkOneFive != "" && <img src={linkOneFive} />}
                    </Grid>

                    <Grid item xs={2.4}>
                        {linkTwoOne != "" && <img src={linkTwoOne} />}
                        {linkTwoOne == "" && <div className = "placeholder"></div>}
                    </Grid>
                    <Grid item xs={2.4}>
                        {linkTwoTwo != "" && <img src={linkTwoTwo} />}
                    </Grid>
                    <Grid item xs={2.4}>
                        {linkTwoThree != "" && <img src={linkTwoThree} />}
                    </Grid>
                    <Grid item xs={2.4}>
                        {linkTwoFour != "" && <img src={linkTwoFour} />}
                    </Grid>
                    <Grid item xs={2.4}>
                        {linkTwoFive != "" && <img src={linkTwoFive} />}
                    </Grid>

                    <Grid item xs={2.4}>
                        {linkThreeOne != "" && <img src={linkThreeOne} />}
                        {linkThreeOne == "" && <div className = "placeholder"></div>}
                    </Grid>
                    <Grid item xs={2.4}>
                        {linkThreeTwo != "" && <img src={linkThreeTwo} />}
                    </Grid>
                    <Grid item xs={2.4}>
                        {linkThreeThree != "" && <img src={linkThreeThree} />}
                    </Grid>
                    <Grid item xs={2.4}>
                        {linkThreeFour != "" && <img src={linkThreeFour} />}
                    </Grid>
                    <Grid item xs={2.4}>
                        {linkThreeFive != "" && <img src={linkThreeFive} />}
                    </Grid>

                    <Grid item xs={2.4}>
                        {linkFourOne != "" && <img src={linkFourOne} />}
                        {linkFourOne == "" && <div className = "placeholder"></div>}
                    </Grid>
                    <Grid item xs={2.4}>
                        {linkFourTwo != "" && <img src={linkFourTwo} />}
                    </Grid>
                    <Grid item xs={2.4}>
                        {linkFourThree != "" && <img src={linkFourThree} />}
                    </Grid>
                    <Grid item xs={2.4}>
                        {linkFourFour != "" && <img src={linkFourFour} />}
                    </Grid>
                    <Grid item xs={2.4}>
                        {linkFourFive != "" && <img src={linkFourFive} />}
                    </Grid>

                    <Grid item xs={2.4}>
                        {linkFiveOne != "" && <img src={linkFiveOne} />}
                        {linkFiveOne == "" && <div className = "placeholder"></div>}
                    </Grid>
                    <Grid item xs={2.4}>
                        {linkFiveTwo != "" && <img src={linkFiveTwo} />}
                    </Grid>
                    <Grid item xs={2.4}>
                        {linkFiveThree != "" && <img src={linkFiveThree} />}
                    </Grid>
                    <Grid item xs={2.4}>
                        {linkFiveFour != "" && <img src={linkFiveFour} />}
                    </Grid>
                    <Grid item xs={2.4}>
                        {linkFiveFive != "" && <img src={linkFiveFive} />}
                    </Grid>
                </Grid>
            }



        </Box>
    )
}

export default HomepageGarden;