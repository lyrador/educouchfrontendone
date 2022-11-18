import React from 'react';
import '../../App.css';
import '../../css/garden.css';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Button, Typography, TableRow, TableCell, Dialog, DialogContent, Divider, DialogActions } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useAuth } from "../../context/AuthProvider";

function MyItemList({sendSelectedItem}) {

    const navigate = useNavigate();
    const auth = useAuth();
    const user = auth.user;

    const handleBackToGarden = () => {
        navigate('/learnerHome');
    }

    const [listOfOwnedItems, setListOfOwnedItems] = useState([]);
    const [listOfAlteredItems, setListOfAlteredItems] = useState([]);

    useEffect(() => {
        var retrievalUrl = "http://localhost:8080/treePoints/retrieveItemOwnedByLearnerId?learnerId=" + user.userId;
        fetch(retrievalUrl)
            .then((res) => res.json())
            .then((result) => {
                setListOfOwnedItems(result);
            }
            );
    }, []);

    useEffect(() => {
        var item_list = []
        listOfOwnedItems.map((x) => {
            var indiv_item = {}
            indiv_item.itemOwnedId = x.itemOwnedId;
            indiv_item.imageUrl = x.item.imageUrl;
            indiv_item.itemName = x.item.itemName;
            indiv_item.positionX = x.positionX;
            indiv_item.positionY = x.positionY;
            indiv_item.itemDescription = x.item.itemDescription;
            indiv_item.visibility = x.hidden ? "Not Visible" : "Visible";
            indiv_item.size = x.size;
            item_list.push(indiv_item);
        });
        setListOfAlteredItems(item_list);
    }, [listOfOwnedItems]);

    const columns = [
        {
            field: 'imageUrl', headerName: 'Image', width: 300,
            renderCell: (params) => <img src={params.value} style={{ width: "75px" }} />
        },
        { field: 'itemName', headerName: 'Item Name', width: 150 },
        { field: 'visibility', headerName: 'Visibility', width: 150 },
        { field: 'size', headerName: 'Size', width: 150 },
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
        
        sendSelectedItem(selectedItem);
        closeItemDialogBox();

    }

    return (
        <>
            <div style={{ height: '80vh', width: '100%', marginLeft: "2em", paddingRight: "2em" }}>
                <DataGrid getRowId={(row) => row.itemOwnedId}
                    rows={listOfAlteredItems}
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={viewDemo}>Confirm Selection</Button>
                    <Button onClick={closeItemDialogBox}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default MyItemList;