import React from 'react'
import '../../App.css'
import { Typography, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom'
import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function HomepageGarden() {

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
    const [linkFivewo, setLinkFiveTwo] = useState("");
    const [linkFiveThree, setLinkFiveThree] = useState("");
    const [linkFiveFour, setLinkFiveFour] = useState("");
    const [linkFiveFive, setLinkFiveFive] = useState("");


    return (
        <Box style = {{marginLeft: "2%"}}>
            <Typography>Welcoem to your garden!</Typography>
        </Box>
    )
}

export default HomepageGarden;