import React from 'react';
import '../../App.css';
import '../../css/garden.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import ForestIcon from '@mui/icons-material/Forest';

function TreePoint() {
    
    const auth = useAuth();
    const user = auth.user;

    const [treePoint, setTreePoint] = useState("0");

    useEffect(() => {
        var retrievalUrl = "http://localhost:8080/treePoints/retrieveTreePointByLearnerId?learnerId=" + user.userId;
        fetch(retrievalUrl)
            .then((res) => res.json())
            .then((result) => {
                setTreePoint(result);
            }
            );
    }, []);


    return (
        <Button variant = "contained" endIcon = {<ForestIcon/>}>{treePoint + " tree points"}</Button>
    )
}

export default TreePoint;