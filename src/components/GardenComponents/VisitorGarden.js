import React from 'react';
import '../../App.css';
import '../../css/garden.css';
import { Typography, Grid, Box } from '@mui/material';
import { Link,useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import PacmanLoader from "react-spinners/PacmanLoader";
import grass from "../../assets/Grass.png";
import Item from './Item';
import Square from './Square';
import GardenSquare from './GardenSquare';
import { set } from 'date-fns';
import ItemWithoutBox from './ItemWithoutBox';

const SQUARE_SIZE = 5;
function renderSquare(i, [itemX, itemY], link, isHidden) {
    const x = i % SQUARE_SIZE;
    const y = Math.floor(i / SQUARE_SIZE);
    return (
        <div key={i} style={{ width: '20%', height: '20%' }}>
            <GardenSquare x={x} y={y}>
                <center>
                    {renderPiece(x, y, [itemX, itemY], link, isHidden)}
                </center>

            </GardenSquare>
        </div>
    );


}

function renderPiece(x, y, [itemX, itemY], link, isHidden) {
    if (x === itemX && y === itemY && !isHidden) {
        return <ItemWithoutBox link={link} />
    } else {
        return <ItemWithoutBox/>
    }
}

function VisitorGarden({ userId }) {



    const [loadingGarden, setLoadingGarden] = useState(false);
    const [itemList, setItemList] = useState([]);
    const [squares, setSquares] = useState([]);


    useEffect(() => {
        setLoadingGarden(true);
        var retrievalUrl = "http://localhost:8080/treePoints/retrieveItemOwnedByLearnerId?learnerId=" + userId;
        fetch(retrievalUrl)
            .then((res) => res.json())
            .then((result) => {
                setItemList(result);
            }
            );
        setLoadingGarden(false);
    }, []);


    useEffect(() => {
        var squares_copy = []
        var item_list_copy = [...itemList]
        // handle the imaginary item first
        for (let i = 0; i < SQUARE_SIZE * SQUARE_SIZE; i++) {
            var itemX = undefined;
            var itemY = undefined;
            var itemUrl = undefined;
            for (let j = 0; j < item_list_copy.length; j++) {
                var xCoor = item_list_copy[j].positionX;
                var yCoor = item_list_copy[j].positionY;
                var itemLink = item_list_copy[j].imageUrl;
                var isHidden = item_list_copy[j].hidden;
                if (i % SQUARE_SIZE === xCoor && Math.floor(i / SQUARE_SIZE) === yCoor) {

                    itemX = xCoor;
                    itemY = yCoor;
                    itemUrl = itemLink;
                    break;

                }

            }

            squares_copy.push(renderSquare(i, [itemX, itemY], itemUrl, isHidden));


        }
        setSquares(squares_copy);
    }, [itemList]);

    





    return (
        <Box style={{ minHeight: "75vh", marginLeft: "4%", padding: "2em", display: "flex", flexWrap: "wrap", backgroundImage: "linear-gradient(180deg, #234f1E, #98BF64)" }}>
            <PacmanLoader loading={loadingGarden} />
            {squares}
        </Box>
    )
}

export default VisitorGarden;