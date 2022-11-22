import React from 'react';
import '../../App.css';
import '../../css/garden.css';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Button, Typography, TableRow, TableCell, Dialog, DialogContent, Divider, DialogActions, IconButton } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useAuth } from "../../context/AuthProvider";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ForestIcon from '@mui/icons-material/Forest';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Stack from '@mui/material/Stack';

function MiniEnhancementItemList({ sendSelectedEnhancement}) {

    const navigate = useNavigate();
    const auth = useAuth();
    const user = auth.user;

    const handleBackToGarden = () => {
        navigate('/learnerHome');
    }

    const [listOfEnhancementItem, setListOfEnhancementItem] = useState([]);
    // const [listOfAlteredItems, setListOfAlteredItems] = useState([]);

    useEffect(() => {
        var retrievalUrl = "http://localhost:8080/treePoints/getAllEnhancementItems";
        fetch(retrievalUrl)
            .then((res) => res.json())
            .then((result) => {
                setListOfEnhancementItem(result);
            }
            );
    }, []);

    const columns = [
        {
            field: 'imageUrl', headerName: 'Image', width: 150,
            renderCell: (params) => <img src={params.value} style={{ width: "75px" }} />
        },
        { field: 'enhancementItemName', headerName: 'Enhancement Name', width: 150 },
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
                        Select
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

        sendSelectedEnhancement(selectedItem);
        closeItemDialogBox();

    }

    return (
        <>
            <div style={{ height: '75vh', width: '100%', marginTop: "6vh", marginLeft: "20px" }}>
                <DataGrid getRowId={(row) => row.enhancementItemId}
                    rows={listOfEnhancementItem}
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
                    <Typography variant="h4">{'🪄' + selectedItem.enhancementItemName}</Typography>
                    <Divider></Divider>
                    <br />
                    <center>
                        <img src={selectedItem.imageUrl} style={{ width: '50%' }} />
                    </center>

                    <br />
                    <Typography>{selectedItem.enhancementItemDescription}</Typography>
                    <br />
                    <br />
                    <Stack direction="row" spacing={2}>
                        {selectedItem.itemType === "PLANT" && <IconButton><ForestIcon/></IconButton>}
                        {selectedItem.itemType === "BUILDING" && <IconButton><AccountBalanceIcon/></IconButton>}
                        <Button variant="contained" endIcon={<ForestIcon />}>{selectedItem.pricePerUse + " tree points"}</Button>
                        <Button variant="contained" endIcon={<AutoFixHighIcon />}>{selectedItem.itemPointIncrement}</Button>
                        
                    </Stack>

                </DialogContent>
                <DialogActions>
                    <Button onClick={viewDemo}>Confirm Selection</Button>
                    <Button onClick={closeItemDialogBox}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default MiniEnhancementItemList;