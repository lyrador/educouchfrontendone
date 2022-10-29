import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Link, useLocation, useParams } from "react-router-dom";
import { Grid } from "@mui/material";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import LinkMaterial from "@mui/material/Link";

import { Button } from "@mui/material";

import { useState } from "react";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

import { useAuth } from "../context/AuthProvider";
import { render } from "@testing-library/react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Divider from '@mui/material/Divider';

import "../css/TeachingInteractiveBook.css";
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CloseIcon from '@mui/icons-material/Close';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LearnerInteractiveChaptersBar(props) {

    //snackbar
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleClickSnackbar = () => { setOpenSnackbar(true) };
    const handleCloseSnackbar = (event, reason) => { if (reason === "clickaway") { return } setOpenSnackbar(false) };

    const [openDeleteSnackbar, setOpenDeleteSnackbar] = React.useState(false);
    const handleClickDeleteSnackbar = () => { setOpenDeleteSnackbar(true) };
    const handleCloseDeleteSnackbar = (event, reason) => { if (reason === "clickaway") { return } setOpenDeleteSnackbar(false) };

    const [openEditSnackbar, setOpenEditSnackbar] = React.useState(false);
    const handleClickEditSnackbar = () => { setOpenEditSnackbar(true) };
    const handleCloseEditSnackbar = (event, reason) => { if (reason === "clickaway") { return } setOpenEditSnackbar(false) };

    const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);
    const handleClickErrorSnackbar = () => { setOpenErrorSnackbar(true) };
    const handleCloseErrorSnackbar = (event, reason) => { if (reason === "clickaway") { return } setOpenErrorSnackbar(false) };

    //auth
    const auth = useAuth();
    const user = auth.user;

    //paths
    const location = useLocation();
    const booksPath = location.pathname.split("/").slice(0, 4).join("/");
    const courseId = location.pathname.split("/")[2];
    const interactiveBookId = location.pathname.split("/")[4];

    const [refreshPage, setRefreshPage] = useState("");

    const [deleteMode, setDeleteMode] = useState(false);

    //retrieve all chapters of the book
    const [chapters, setChapters] = useState([]);

    React.useEffect(() => {
        setRefreshPage(false);
        fetch("http://localhost:8080/interactiveChapter/interactiveBook/" + interactiveBookId + "/interactiveChapters")
            .then((res) => res.json())
            .then((result) => {
                setChapters(result);
                props.setRefreshPage(true)
            });
    }, [refreshPage]);

    const handleChapterChange = (event, chapterId, chapterIndex) => {
        props.setChapterIdToBrowse(chapterId)
        props.setChapterIndexToBrowse(chapterIndex)
    };

    const renderEmptyRowMessage = () => {
        if (chapters.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={4} style={{ textAlign: "center" }}>
                        There are currently no interactive chapters in this book!
                    </TableCell>
                </TableRow>
            );
        }
    };

    return (
        <div>
            <div id="sidenavbar" className="sidebar">
                <div style={{ float: 'left' }}>
                    <Link to={`${booksPath}`} style={{ textDecoration: 'none' }}>
                        <Button variant="text" style={{ fontSize: '10px' }}>
                            <ArrowBackIcon />
                        </Button>
                    </Link>
                </div>
                <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ width: "85%" }}>
                        <h2>Interactive Chapters</h2>
                    </div>
                    <div style={{ width: "5%" }} >
                    </div>
                </div>
                <Divider />
                {renderEmptyRowMessage}
                {deleteMode == false &&
                    <div style={{ height: "75%", maxHeight: "75%", overflow: "auto" }}>
                        {chapters.map((chapter) => (
                            <div>
                                <Button onClick={(event) => handleChapterChange(event, chapter.interactiveChapterId, chapter.chapterIndex)} fullWidth style={{ justifyContent: "flex-start", textTransform: 'none' }}>
                                    <div className="chapterLine">Chapter {chapter.chapterIndex} - {chapter.chapterTitle}</div>
                                </Button>
                                <Divider />
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}

export default LearnerInteractiveChaptersBar;
