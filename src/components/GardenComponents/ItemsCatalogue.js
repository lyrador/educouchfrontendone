import React from 'react';
import '../../App.css';
import '../../css/garden.css';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Button, Typography, TableRow, TableCell, Dialog, DialogContent, Divider, DialogActions } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ForestIcon from '@mui/icons-material/Forest';
import { useAuth } from "../../context/AuthProvider";

function ItemsCatalogue({sendImaginaryItem}) {

    const navigate = useNavigate();
    const auth = useAuth();
    const user = auth.user;

    const handleBackToGarden = () => {
        navigate('/learnerHome');
    }

    const [listOfItems, setListOfItems] = useState([]);
    const [listOfOwnedItems, setListOfOwnedItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/treePoints/getAllItems")
            .then((res) => res.json())
            .then((result) => {
                setListOfItems(result);
            })
    }, []);

    useEffect(() => {
        var retrievalUrl = "http://localhost:8080/treePoints/retrieveItemOwnedByLearnerId?learnerId=" + user.userId;
        fetch(retrievalUrl)
            .then((res) => res.json())
            .then((result) => {
                setListOfOwnedItems(result);
            }
            );
    }, []);

    const columns = [
        {
            field: 'imageUrl', headerName: 'Image', width: 300,
            renderCell: (params) => <img src={params.value} style={{ width: "75px" }} />
        },
        { field: 'itemName', headerName: 'Item Name', width: 150 },
        { field: 'price', headerName: 'Item Price', width: 150 },
        {
            headerName: '',
            width: 100,
            renderCell: (params) => {
                return (
                    <Button
                        size="small"
                        tabIndex={params.hasFocus ? 0 : -1}
                        onClick={(event) => {
                            handleSelectItem(event, params);
                        }}
                    >
                        View
                    </Button>
                );
            },

        }
    ];

    // view item dialog box
    const [itemDialogBox, setItemDialogBox] = useState(false);
    const openItemDialogBox = () => {
        setItemDialogBox(true);
    }
    const closeItemDialogBox = () => {
        setItemDialogBox(false);
    }
    const [selectedItem, setSelectedItem] = useState(false);

    const handleSelectItem = (e, item) => {
        e.preventDefault();
        setSelectedItem(item.row);
        openItemDialogBox();
    }

    const viewDemo = () => {
        var occupied;
        for (let potentialX = 0; potentialX < 5; potentialX++) {
            for (let potentialY = 0; potentialY < 5; potentialY++) {
                occupied = false;
                for (let j = 0; j < listOfOwnedItems.length; j++) {
                    var xCoor = listOfOwnedItems[j].positionX;
                    var yCoor = listOfOwnedItems[j].positionY;
                    if(xCoor == potentialX && yCoor == potentialY) {
                        occupied = true;
                    }
                }

                if(!false) {
                    sendImaginaryItem(selectedItem, potentialX, potentialY);
                    break;
                }



            }
        }

    }

    return (
        <>
            <div style={{ height: '80vh', width: '100%', marginLeft: "2em", paddingRight: "2em" }}>
                <DataGrid getRowId={(row) => row.itemId}
                    rows={listOfItems}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    components={{ Toolbar: GridToolbar }}
                    componentsProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        },
                    }}
                    rowHeight={100}

                />
            </div>

            <Dialog open={itemDialogBox} onClose={closeItemDialogBox} fullWidth="lg">
                <DialogContent>
                    <Typography variant="h4">{'🎁' + selectedItem.itemName}</Typography>
                    <Divider></Divider>
                    <br />
                    <center>
                        <img src={selectedItem.imageUrl} style={{ width: '50%' }} />
                    </center>

                    <br />
                    <Typography>{selectedItem.itemDescription}</Typography>
                    <br />
                    <Button variant="contained" endIcon={<ForestIcon />} disabledElevation>{selectedItem.price + " tree points"}</Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={viewDemo}>Place</Button>
                    <Button onClick={closeItemDialogBox}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ItemsCatalogue;