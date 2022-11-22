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
import Item from './Item';
import Square from './Square';
import ImaginaryItem from './ImaginaryItem';
import GardenSquare from './GardenSquare';
import { set } from 'date-fns';

const SQUARE_SIZE = 5;
function renderSquare(i, [itemX, itemY], link, isImaginary, isSelected, isHidden, asDestination) {
    const x = i % SQUARE_SIZE;
    const y = Math.floor(i / SQUARE_SIZE);
    if (isSelected === true) {
        return (
            <div key={i} style={{ width: '20%', height: '20%', backgroundColor: "yellowgreen" }}>
                <GardenSquare x={x} y={y}>
                    <center>
                        {renderPiece(x, y, [itemX, itemY], link, isImaginary, isHidden)}
                    </center>

                </GardenSquare>
            </div>
        );
    } else if(asDestination && asDestination === true) {
        console.log('This should be green');
        return (
            <div key={i} style={{ width: '20%', height: '20%', backgroundColor: "yellowgreen" }}>
                <GardenSquare x={x} y={y}>
                    <center>
                        {renderPiece(x, y, [itemX, itemY], link, isImaginary, isHidden)}
                    </center>

                </GardenSquare>
            </div>
        );
    } else {
        return (
            <div key={i} style={{ width: '20%', height: '20%' }}>
                <GardenSquare x={x} y={y}>
                    <center>
                        {renderPiece(x, y, [itemX, itemY], link, isImaginary, isHidden)}
                    </center>

                </GardenSquare>
            </div>
        );
    };


}

function renderPiece(x, y, [itemX, itemY], link, isImaginary, isHidden) {
    if (x === itemX && y === itemY && !isHidden) {
        if (isImaginary == true) {
            
            return <ImaginaryItem link={link} />
        } else if (isImaginary == false && !isHidden) {
            return <Item link={link} />
        } else {
            return <Item />
        }
    } else {
        return <Item/>
    }
}

function HomepageGarden({ imaginaryItem, selectedItem, destinationGrid }) {

    const auth = useAuth();
    const user = auth.user;

    const [loadingGarden, setLoadingGarden] = useState(false);
    const [itemList, setItemList] = useState([]);
    const [squares, setSquares] = useState([]);


    useEffect(() => {
        setLoadingGarden(true);
        var retrievalUrl = "http://localhost:8080/treePoints/retrieveItemOwnedByLearnerId?learnerId=" + user.userId;
        fetch(retrievalUrl)
            .then((res) => res.json())
            .then((result) => {
                setItemList(result);
            }
            );
        setLoadingGarden(false);
    }, []);

    // useEffect(() => {
    //     var squares_copy = []
    //     for (let i = 0; i < SQUARE_SIZE * SQUARE_SIZE; i++) {

    //         var itemX = undefined;
    //         var itemY = undefined;
    //         var itemUrl = undefined;
    //         for (let j = 0; j < itemList.length; j++) {
    //             var xCoor = itemList[j].positionX;
    //             var yCoor = itemList[j].positionY;
    //             var itemLink = itemList[j].item.imageUrl;

    //             if (i % SQUARE_SIZE === xCoor && Math.floor(i / SQUARE_SIZE) === yCoor) {
    //                 itemX = xCoor;
    //                 itemY = yCoor;
    //                 itemUrl = itemLink;
    //                 break;

    //             }
    //         }
    //         squares_copy.push(renderSquare(i, [itemX, itemY], itemUrl));


    //     }
    //     setSquares(squares_copy);
    // }, [itemList]);

    const [guardTrue, setGuardTrue] = useState("");


    useEffect(() => {
        var squares_copy = []
        var item_list_copy = [...itemList]
        // handle the imaginary item first
        if (imaginaryItem && imaginaryItem != "") {
            item_list_copy.push(imaginaryItem);
        }
        for (let i = 0; i < SQUARE_SIZE * SQUARE_SIZE; i++) {
            var itemX = undefined;
            var itemY = undefined;
            var itemUrl = undefined;
            for (let j = 0; j < item_list_copy.length; j++) {
                var xCoor = item_list_copy[j].positionX;
                var yCoor = item_list_copy[j].positionY;
                var itemLink = item_list_copy[j].imageUrl;
                var itemOwnedId = item_list_copy[j].itemOwnedId;
                var isHidden = item_list_copy[j].hidden;

                var isSelected = undefined;
                var isImaginary = undefined;
                if (i % SQUARE_SIZE === xCoor && Math.floor(i / SQUARE_SIZE) === yCoor) {

                    itemX = xCoor;
                    itemY = yCoor;
                    itemUrl = itemLink;

                    if (j == item_list_copy.length - 1) {
                        isImaginary = true;
                    } else {
                        isImaginary = false;
                    }


                    if (selectedItem && selectedItem != "" && selectedItem.itemOwnedId === itemOwnedId) {
                        isSelected = true;
                    } else {
                        isSelected = false;
                    }

                    break;

                }

            }

            if(destinationGrid) {
                var compare_i = (destinationGrid.positionX) + (destinationGrid.positionY * 5);
                if(guardTrue !== compare_i) {
                    setGuardTrue("");
                }
            }

            var asDestination = undefined;
            if(guardTrue != "") {
                if(i == guardTrue) {
                    asDestination = true;
                } else {
                    asDestination = false;
                }

            } else {
                if (destinationGrid) {
                
                    var compare_i = (destinationGrid.positionX) + (destinationGrid.positionY * 5);
                    if (compare_i === i) {
                        asDestination = true;
                        setGuardTrue(i);
                    } else {
                        asDestination = false;
                    }
                 
                    
                }
            }

            squares_copy.push(renderSquare(i, [itemX, itemY], itemUrl, isImaginary, isSelected, isHidden, asDestination));


        }
        setSquares(squares_copy);
    }, [itemList, imaginaryItem, selectedItem, destinationGrid]);

    





    return (
        <Box style={{ minHeight: "75vh", marginLeft: "4%", padding: "2em", display: "flex", flexWrap: "wrap", backgroundImage: "linear-gradient(180deg, #234f1E, #98BF64)" }}>
            <PacmanLoader loading={loadingGarden} />
            {squares}
        </Box>
    )
}

export default HomepageGarden;