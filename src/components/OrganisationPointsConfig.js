import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Grid from '@mui/material/Grid';
import { useState } from 'react';

import TeachingCoursesDrawer from '../components/TeachingCoursesDrawer';
import TeachingForumList from '../components/TeachingForumList';
import TeachingDiscussion from './TeachingDiscussion';

import { Link, useLocation, useParams } from 'react-router-dom';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMaterial from '@mui/material/Link';

import { Button } from '@mui/material';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../context/AuthProvider';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { padding } from '@mui/system';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function OrganisationPointsConfig(props) {

    const [openEditSnackbar, setOpenEditSnackbar] = React.useState(false);

    const handleClickEditSnackbar = () => { setOpenEditSnackbar(true) };

    const handleCloseEditSnackbar = (event, reason) => {
        if (reason === 'clickaway') { return } setOpenEditSnackbar(false);
    };

    const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);

    const handleClickErrorSnackbar = () => { setOpenErrorSnackbar(true) };

    const handleCloseErrorSnackbar = (event, reason) => {
        if (reason === "clickaway") { return }
        setOpenErrorSnackbar(false);
    };

    const auth = useAuth()
    const user = auth.user

    //paths
    const [organisation, setOrganisation] = useState([])

    const [refreshPage, setRefreshPage] = useState('')

    React.useEffect(() => {
        setRefreshPage(false)
        fetch("http://localhost:8080/organisation/get/" + user.organisationId)
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                setOrganisation(result)
                setEditRewardPointsConversionNumber(result.rewardPointsConversionNumber)
                setEditCurrencyConversionNumber(result.currencyConversionNumber)
                setEditMaxAssignmentPoints(result.maxAssignmentPoints)
            }
            )
    }, [refreshPage])

    const [editDialogOpen, setEditDialogOpen] = React.useState(false);

    const [editRewardPointsConversionNumber, setEditRewardPointsConversionNumber] = useState(organisation.rewardPointsConversionNumber)
    const [editCurrencyConversionNumber, setEditCurrencyConversionNumber] = useState(organisation.currencyConversionNumber)
    const [editMaxAssignmentPoints, setEditMaxAssignmentPoints] = useState(organisation.maxAssignmentPoints)

    const [editRewardPointsConversionNumberError, setEditRewardPointsConversionNumberError] = useState({ value: false, errorMessage: '' })
    const [editCurrencyConversionNumberError, setEditCurrencyConversionNumberError] = useState({ value: false, errorMessage: '' })
    const [editMaxAssignmentPointsError, setEditMaxAssignmentPointsError] = useState({ value: false, errorMessage: '' })


    const handleClickEditDialogOpen = () => {
        setEditDialogOpen(true)
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const editOrganisationPointsConfig = async (e) => {
        e.preventDefault()
        setEditRewardPointsConversionNumberError({ value: false, errorMessage: '' })
        setEditCurrencyConversionNumberError({ value: false, errorMessage: '' })
        setEditMaxAssignmentPointsError({ value: false, errorMessage: '' })
        if (editRewardPointsConversionNumber == '' && editRewardPointsConversionNumber != 0) {
            console.log(editRewardPointsConversionNumber)
            setEditRewardPointsConversionNumberError({ value: true, errorMessage: 'Reward points to be converted from cannot be empty!' })
        }
        if (editCurrencyConversionNumber == '' && editCurrencyConversionNumber != 0) {
            console.log(editCurrencyConversionNumber)
            setEditCurrencyConversionNumberError({ value: true, errorMessage: 'Currency to be converted to cannot be empty!' })
        }
        if (editRewardPointsConversionNumber <= 0) {
            setEditRewardPointsConversionNumberError({ value: true, errorMessage: 'Reward points to be converted from cannot be zero or a negative number!' })
        }
        if (editCurrencyConversionNumber <= 0) {
            setEditCurrencyConversionNumberError({ value: true, errorMessage: 'Currency to be converted to cannot be zero or a negative number!' })
        }
        if (editMaxAssignmentPoints <= 0) {
            setEditMaxAssignmentPointsError({ value: true, errorMessage: 'Max Discount Points Per Assessment cannot be zero or a negative number!' })
        }
        if (editRewardPointsConversionNumber && editCurrencyConversionNumber && editMaxAssignmentPoints && editRewardPointsConversionNumber > 0 && editCurrencyConversionNumber > 0) {
            var rewardPointsConversionNumber = editRewardPointsConversionNumber;
            var currencyConversionNumber = editCurrencyConversionNumber;
            var maxAssignmentPoints = editMaxAssignmentPoints;
            const newEditedOrganisationRequest = { rewardPointsConversionNumber, currencyConversionNumber,maxAssignmentPoints }
            try {
                const response = await fetch("http://localhost:8080/organisation/put/" + user.organisationId, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newEditedOrganisationRequest)
                });
                console.log(response);
                if (response.ok == false) {
                    console.log("Error");
                    handleClickErrorSnackbar()
                } else {
                    console.log("Organisation Points Config Edited Successfully!")
                    handleClickEditSnackbar();
                }
            } catch (err) {
                console.log(err);
                handleClickErrorSnackbar()
            }
            setRefreshPage(true)
            handleEditDialogClose()
        }
    }

    return (
        <div>
            <Snackbar open={openEditSnackbar} autoHideDuration={5000} onClose={handleCloseEditSnackbar}>
                <Alert onClose={handleCloseEditSnackbar} severity="success" sx={{ width: '100%' }}>
                    Organisation Details Updated Succesfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorSnackbar} autoHideDuration={5000} onClose={handleCloseErrorSnackbar}>
                <Alert onClose={handleCloseErrorSnackbar} severity="error" sx={{ width: "100%" }}>
                    Error!
                </Alert>
            </Snackbar>
            <div style={{ justifyContent: 'center' }}>
                <h1 style={{ justifySelf: 'center', marginLeft: 'auto' }}>Points Configuration</h1>
                <Button
                    className="btn-upload"
                    color="primary"
                    variant="contained"
                    component="span"
                    onClick={handleClickEditDialogOpen}
                    style={{ float: 'right', marginLeft: 'auto' }}
                >
                    Edit Points Configuration
                </Button>
            </div>
            <div style={{ padding: '5%' }}>
                <div style={{ padding: '0 25%' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Reward Points To Be Converted From</TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center">Currency Amount to Be Converted To</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableCell align="right" style={{ font: '20px' }}>{organisation.rewardPointsConversionNumber} Points</TableCell>
                                <TableCell align="right">:</TableCell>
                                <TableCell align="right">{organisation.currencyConversionNumber} SGD</TableCell>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            <br></br>
            <br></br>
            <br></br>

                <div >
                <div style={{ padding: '0 25%' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Max Assessment Discount Point :</TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center">{organisation.maxAssignmentPoints}</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            </div>

            <div>
                <Dialog
                    open={editDialogOpen}
                    onClose={handleEditDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"You are Editing Your Organisation's Points Configuration"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Enter the new points configuration details
                        </DialogContentText>
                        <TextField id="outlined-basic" label="Reward Points To Be Converted" variant="outlined" fullWidth
                            style={{ margin: '6px 0' }}
                            value={editRewardPointsConversionNumber}
                            onChange={(e) => setEditRewardPointsConversionNumber(e.target.value)}
                            error={editRewardPointsConversionNumberError.value}
                            helperText={editRewardPointsConversionNumberError.errorMessage}
                            required
                        />
                        <TextField
                            id="filled-multiline-static" label="Amount of Currency to Be Converted To (SGD)" variant="outlined" fullWidth
                            style={{ margin: '6px 0' }}
                            value={editCurrencyConversionNumber}
                            onChange={(e) => setEditCurrencyConversionNumber(e.target.value)}
                            error={editCurrencyConversionNumberError.value}
                            helperText={editCurrencyConversionNumberError.errorMessage}

                            required
                        />
<br></br>
<br></br>

                            <TextField
                            id="filled-multiline-static" label="Maximum Point Allocation Per Assesssment" variant="outlined" fullWidth
                            style={{ margin: '6px 0'}}
                            value={editMaxAssignmentPoints}
                            onChange={(e) => setEditMaxAssignmentPoints(e.target.value)}
                            error={editMaxAssignmentPointsError.value}
                            helperText={editMaxAssignmentPointsError.errorMessage}
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditDialogClose}>Cancel</Button>
                        <Button onClick={editOrganisationPointsConfig} autoFocus>
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default OrganisationPointsConfig;