import * as React from "react";
import grapesjs from "grapesjs"; 
import "grapesjs/dist/css/grapes.min.css"; 

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

import { useState, useRef } from "react";

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
import "../css/Resizable.css"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import MediaCard from "./MediaCard";
import TeachingInteractivePageBar from "../components/TeachingInteractivePageBar";

import ReactPlayer from "react-player";
import Typography from '@mui/material/Typography';

import Pagination from '@mui/material/Pagination';

import QuizQuestionComponent from "../components/QuizComponents/QuizQuestionComponent";

import PostAddIcon from '@mui/icons-material/PostAdd';
import EditInteractiveQuizPage from "./EditInteractiveQuizPage";
import parse from 'html-react-parser'; 

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TeachingInteractivePage(props) {

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
    console.log(location); 
    const booksPath = location.pathname.split("/").slice(0, 4).join("/");
    const courseId = location.pathname.split("/")[2];
    const bookId = location.pathname.split("/")[4];

    //refresh view
    const [refreshInteractivePage, setRefreshInteractivePage] = useState("");

    //retrieve current page and page navigation
    const [currentPage, setCurrentPage] = useState([]);
    const [pageNumberPointer, setPageNumberPointer] = useState(1);
    const handlePageChange = (event, value) => {
        setPageNumberPointer(value);
        setRefreshInteractivePage(true)
    };

    //const [editor, setEditor] = useState(null); 
    const [newTextBoxHeight, setNewTextBoxHeight] = useState(''); 
    const [newTextBoxWidth, setNewTextBoxWidth] = useState('');

    //retrieve all pages
    const [pages, setPages] = useState([]);
    React.useEffect(() => {
        if (props.chapterId) {
            setRefreshInteractivePage(false);
            console.log(props.chapterId)
            console.log("HELLO")
            fetch("http://localhost:8080/interactivePage/interactiveChapter/" + props.chapterId + "/interactivePages")
                .then((res) => res.json())
                .then((result) => {
                    setPages(result);
                    console.log(result);
                });
        };
    }, [refreshInteractivePage || props.chapterId]);

    React.useEffect(() => {
        if (props.chapterId && pageNumberPointer) {
            setRefreshInteractivePage(false);
            console.log("HELLO")
            var queryString = props.chapterId + "&" + pageNumberPointer
            fetch("http://localhost:8080/interactivePage/getPageByChapterIdAndPageNumber/" + queryString)
                .then((res) => res.json())
                .then((result) => {
                    setCurrentPage(result);
                    console.log(result.pageQuiz);
                    //console.log(JSON.stringify(result.pageQuiz))
                });
        };
    }, [refreshInteractivePage || props.chapterId]);

    //create
    const [newPageNumber, setNewPageNumber] = useState("");
    const [newPageDescription, setNewPageDescription] = useState("");

    const {textTrigger, setTextTrigger} = useState(false); 
    const {imageTrigger, setImageTrigger} = useState(false); 

  const ref = useRef(null);
  const refLeft = useRef(null);
  const refTop = useRef(null);
  const refRight = useRef(null);
  const refBottom = useRef(null);

  React.useEffect(() => {
    const resizeableEle = ref.current;
    const styles = window.getComputedStyle(resizeableEle);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let x = 0;
    let y = 0;

    resizeableEle.style.top = "50px";
    resizeableEle.style.left = "50px";

    // Right resize
    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width + dx;
      resizeableEle.style.width = `${width}px`;
    };

    const onMouseUpRightResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event) => {
      x = event.clientX;
      resizeableEle.style.left = styles.left;
      resizeableEle.style.right = null;
      setNewTextBoxWidth(resizeableEle.style.width); 
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    // Top resize
    const onMouseMoveTopResize = (event) => {
      const dy = event.clientY - y;
      height = height - dy;
      y = event.clientY;
      resizeableEle.style.height = `${height}px`;
    };

    const onMouseUpTopResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    };

    const onMouseDownTopResize = (event) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableEle);
      resizeableEle.style.bottom = styles.bottom;
      resizeableEle.style.top = null;
      setNewTextBoxHeight(resizeableEle.style.height);
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };

    // Bottom resize
    const onMouseMoveBottomResize = (event) => {
      const dy = event.clientY - y;
      height = height + dy;
      y = event.clientY;
      resizeableEle.style.height = `${height}px`;
    };

    const onMouseUpBottomResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
    };

    const onMouseDownBottomResize = (event) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableEle);
      resizeableEle.style.top = styles.top;
      resizeableEle.style.bottom = null;
      console.log(resizeableEle.style.height); 
      setNewTextBoxHeight(resizeableEle.style.height); 
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };

    // Left resize
    const onMouseMoveLeftResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width - dx;
      resizeableEle.style.width = `${width}px`;
    };

    const onMouseUpLeftResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };

    const onMouseDownLeftResize = (event) => {
      x = event.clientX;
      resizeableEle.style.right = styles.right;
      resizeableEle.style.left = null;
      setNewTextBoxWidth(resizeableEle.style.width); 
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };

    // Add mouse down event listener
    const resizerRight = refRight.current;
    // console.log(refRight.current.width)
    resizerRight.addEventListener("mousedown", onMouseDownRightResize);
    const resizerTop = refTop.current;
    resizerTop.addEventListener("mousedown", onMouseDownTopResize);
    const resizerBottom = refBottom.current;
    // console.log(resizerBottom)
    resizerBottom.addEventListener("mousedown", onMouseDownBottomResize);
    const resizerLeft = refLeft.current;
    resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);

    return () => {
      resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
      resizerTop.removeEventListener("mousedown", onMouseDownTopResize);
      resizerBottom.removeEventListener("mousedown", onMouseDownBottomResize);
      resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
     
    };
  }, []);

//   console.log(newTextBoxHeight); 
//   console.log(newTextBoxWidth); 

  const ref1 = useRef(null);
  const refLeft1 = useRef(null);
  const refTop1 = useRef(null);
  const refRight1 = useRef(null);
  const refBottom1 = useRef(null);

  React.useEffect(() => {
    const resizeableEle1 = ref1.current;
    console.log("the height is now ", resizeableEle1.style.height); 
    const styles = window.getComputedStyle(resizeableEle1);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let x = 0;
    let y = 0;

    resizeableEle1.style.top = "50px";
    resizeableEle1.style.right = "50px";

    // Right resize
    const onMouseMoveRightResize1 = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width + dx;
      resizeableEle1.style.width = `${width}px`;
    };

    const onMouseUpRightResize1 = (event) => {
      document.removeEventListener("mousemove", onMouseMoveRightResize1);
    };

    const onMouseDownRightResize1 = (event) => {
      x = event.clientX;
      resizeableEle1.style.left = styles.left;
      resizeableEle1.style.right = null;
      document.addEventListener("mousemove", onMouseMoveRightResize1);
      document.addEventListener("mouseup", onMouseUpRightResize1);
    };

    // Top resize
    const onMouseMoveTopResize1 = (event) => {
      const dy = event.clientY - y;
      height = height - dy;
      y = event.clientY;
      resizeableEle1.style.height = `${height}px`;
    //   console.log(resizeableEle1.style.height)
    };

    const onMouseUpTopResize1 = (event) => {
      document.removeEventListener("mousemove", onMouseMoveTopResize1);
    };

    const onMouseDownTopResize1 = (event) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableEle1);
      resizeableEle1.style.bottom = styles.bottom;
      resizeableEle1.style.top = null;
      document.addEventListener("mousemove", onMouseMoveTopResize1);
      document.addEventListener("mouseup", onMouseUpTopResize1);
    };

    // Bottom resize
    const onMouseMoveBottomResize1 = (event) => {
      const dy = event.clientY - y;
      height = height + dy;
      y = event.clientY;
      resizeableEle1.style.height = `${height}px`;
      //console.log(height); 
    };

    const onMouseUpBottomResize1 = (event) => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize1);
    };

    const onMouseDownBottomResize1 = (event) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableEle1);
      resizeableEle1.style.top = styles.top;
      resizeableEle1.style.bottom = null;
      document.addEventListener("mousemove", onMouseMoveBottomResize1);
      document.addEventListener("mouseup", onMouseUpBottomResize1);
    };

    // Left resize
    const onMouseMoveLeftResize1 = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width - dx;
      resizeableEle1.style.width = `${width}px`;
    };

    const onMouseUpLeftResize1 = (event) => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize1);
    };

    const onMouseDownLeftResize1 = (event) => {
      x = event.clientX;
      resizeableEle1.style.right = styles.right;
      resizeableEle1.style.left = null;
      document.addEventListener("mousemove", onMouseMoveLeftResize1);
      document.addEventListener("mouseup", onMouseUpLeftResize1);
    };

    // Add mouse down event listener
    const resizerRight1 = refRight1.current;
    resizerRight1.addEventListener("mousedown", onMouseDownRightResize1);
    const resizerTop1 = refTop1.current;
    resizerTop1.addEventListener("mousedown", onMouseDownTopResize1);
    const resizerBottom1 = refBottom1.current;
    resizerBottom1.addEventListener("mousedown", onMouseDownBottomResize1);
    const resizerLeft1 = refLeft1.current;
    console.log(refLeft1); 
    resizerLeft1.addEventListener("mousedown", onMouseDownLeftResize1);

    return () => {
      resizerRight1.removeEventListener("mousedown", onMouseDownRightResize1);
      //console.log(resizeableEle1.style.height)
      resizerTop1.removeEventListener("mousedown", onMouseDownTopResize1);
      resizerBottom1.removeEventListener("mousedown", onMouseDownBottomResize1);
      resizerLeft1.removeEventListener("mousedown", onMouseDownLeftResize1);
    };
  }, []);

    //adding grapesjs config
    // React.useEffect(() => {
    //     const editor = grapesjs.init({
    //          container: "#editor", 
    //     // }); 
    //     // setEditor(editor); 
    //      // ...
    //         blockManager: {
    //             appendTo: '#blocks',
    //             blocks: [
    //             {
    //                 id: 'section', // id is mandatory
    //                 label: '<b>Section</b>', // You can use HTML/SVG inside labels
    //                 attributes: { class:'gjs-block-section' },
    //                 content: `<section>
    //                 <h1>This is a simple title</h1>
    //                 <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
    //                 </section>`,
    //             }, {
    //                 id: 'text',
    //                 label: 'Text',
    //                 content: '<div data-gjs-type="text">Insert your text here</div>',
    //             }, {
    //                 id: 'image',
    //                 label: 'Image',
    //                 // Select the component once it's dropped
    //                 select: true,
    //                 // You can pass components as a JSON instead of a simple HTML string,
    //                 // in this case we also use a defined component type `image`
    //                 content: { type: 'image' },
    //                 // This triggers `active` event on dropped components and the `image`
    //                 // reacts by opening the AssetManager
    //                 activate: true,
    //             }, 
    //             ]
    //         },
    //     });
    // }, []); 


    console.log(currentPage.pageNumber)
    console.log(currentPage.textBoxHeight)

    const createNewPage = async (e) => {
        e.preventDefault();
        setPageDescriptionError({ value: false, errorMessage: "" });
        var pageNumber = pages.length + 1;
        const newPage = { pageNumber }
        console.log(newPage);
        try {
            const response = await fetch("http://localhost:8080/interactivePage/" + props.chapterId + "/interactivePages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPage),
            })
            console.log(response);
            if (response.ok == false) {
                console.log("Error");
                handleClickErrorSnackbar()
            } else {
                handleClickSnackbar()
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        setRefreshInteractivePage(true)
    }

    //edit
    const [editedPageNumber, setEditedPageNumber] = useState("");
    const [editedPageDescription, setEditedPageDescription] = useState("");
    const [pageIdToEdit, setPageIdToEdit] = useState("");
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);

    const handleClickEditDialogOpen = (event, pageId, pageTitle) => {
        setEditedPageNumber(pageTitle);
        setPageIdToEdit(pageId);
        console.log(pageId);
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const editPage = async (e) => {
        e.preventDefault();
        setPageDescriptionError({ value: false, errorMessage: "" });
        if (newPageDescription == "") {
            setPageDescriptionError({ value: true, errorMessage: "Interactive Page description cannot be empty!" });
        }
        if (newPageNumber && newPageDescription) {
            var interactivePageTitle = newPageNumber
            var interactivePageDescription = newPageDescription
            var textBoxHeight = newTextBoxHeight; 
            var textBoxWidth = newTextBoxWidth; 
            console.log(textBoxHeight); 
            const editedPage = { interactivePageTitle, interactivePageDescription, textBoxHeight, textBoxWidth }
            console.log(editedPage);
            try {
                const response = await fetch("http://localhost:8080/interactivePage/interactivePages/" + pageIdToEdit, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editedPage),
                })
                console.log(response);
                if (response.ok == false) {
                    console.log("Error");
                    handleClickErrorSnackbar()
                } else {
                    console.log("Interactive Page Edited Successfully!");
                    handleClickSnackbar()
                }
            } catch (err) {
                console.log(err);
                handleClickErrorSnackbar()
            }
            setRefreshInteractivePage(true);
            handleEditDialogClose();
            handleClickEditSnackbar();
        };
    }

    //error handling
    const [pageDescriptionError, setPageDescriptionError] = useState({ value: false, errorMessage: "" });

    const renderEmptyRowMessage = () => {
        console.log(props.chapterId)
        if (props.book.interactiveChapters) {
            if (props.book.interactiveChapters.length == 0) {
                return (
                    <div style={{ height: '100%', width: '100%', backgroundColor: 'lightgray', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ fontSize: 24, lineHeight: '200px' }}>
                            There are currently no interactive chapters in this book! Add a Chapter to Continue.
                        </div>
                    </div>
                );
            } else if (!props.chapterId) {
                return (
                    <div style={{ height: '100%', width: '100%', backgroundColor: 'lightgray', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ fontSize: 24, lineHeight: '200px' }}>
                            Please select an interactive chapter to continue.
                        </div>
                    </div>
                );
            }
            else if (props.chapterId && pages.length === 0) {
                return (
                    <div style={{ height: '100%', width: '100%', backgroundColor: 'lightgray', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ fontSize: 24, lineHeight: '200px' }}>
                            There are currently no interactive pages in this chapter! Add a Page to Continue.
                        </div>
                    </div>
                );
            }
        }
    };

    const renderVideoImageHolder = () => {
         
        var height = "100%"
        // if (currentPage.pageDescription || currentPage.pageTitle) {
        //     height = "50%"
        // }
        if (currentPage.attachment) {
            if (currentPage.attachment.fileType.includes("image")) {
                return (
                    <div style={{ height: height }}>
                        <img
                            src={currentPage.attachment.fileURL}
                            alt="Interactive Page Image"
                            width="100%"
                            height="100%"
                            objectFit="contain"
                        />
                    </div>
                );
            }
            else if (currentPage.attachment.fileType.includes("video")) {
                return (
                    <div style={{ height: height }}>
                        <ReactPlayer className='video'
                            width='100%'
                            height='100%'
                            controls
                            url={currentPage.attachment.fileURL}
                        />
                    </div>
                );
            }
        }
        //setImageTrigger(true);
    };

    const renderText = () => {
         
        var height = "100%"
        // if (currentPage.attachment || currentPage.pageQuiz) {
        //     height = "50%"
        // }
        if (currentPage.pageDescription || currentPage.pageTitle) {
            console.log(currentPage)
            return (
                <div style={{ height: height, backgroundImage: "url('https://educouchbucket.s3.ap-southeast-1.amazonaws.com/img-noise-700x400+(1).png')" }}>
                    <div style={{ padding: "2%" }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {currentPage.pageTitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {parse(currentPage.pageDescription)}
                        </Typography>
                    </div>
                </div>
            );
        }
        //setTextTrigger(true);
    }

    const renderQuiz = () => {
         
        var height = "100%"
        if (currentPage.pageDescription && !currentPage.attachment) {
            height = '50%'
        }
        if (currentPage.pageDescription && currentPage.attachment) {
            height = '33%'
        }
        if (currentPage.pageQuiz) {
            return (
                <div style={{height: height, width: '100%'}}>
                    <EditInteractiveQuizPage
                        pageId={currentPage.interactivePageId}
                        refreshInteractivePage={refreshInteractivePage}
                        setRefreshInteractivePage={setRefreshInteractivePage}
                        >
                    </EditInteractiveQuizPage>
                </div>
            ); 
        }
        //setImageTrigger(true);
    }

    // setNewTextBoxHeight(currentPage.textBoxHeight); 
    // setNewTextBoxWidth(currentPage.textBoxWidth); 
    // console.log(currentPage.textBoxHeight); 

    return (
       
        <div style={{ backgroundColor: "#F8F9FA", width: "100%", height: "75vh", paddding: 0 }}>
            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar} >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }} >
                    Interactive Page Created Succesfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openDeleteSnackbar} autoHideDuration={5000} onClose={handleCloseDeleteSnackbar} >
                <Alert onClose={handleCloseDeleteSnackbar} severity="success" sx={{ width: "100%" }} >
                    Interactive Page Deleted Succesfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openEditSnackbar} autoHideDuration={5000} onClose={handleCloseEditSnackbar} >
                <Alert onClose={handleCloseEditSnackbar} severity="success" sx={{ width: "100%" }} >
                    Interactive Page Updated Succesfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorSnackbar} autoHideDuration={5000} onClose={handleCloseErrorSnackbar} >
                <Alert onClose={handleCloseErrorSnackbar} severity="error" sx={{ width: "100%" }} >
                    Error!
                </Alert>
            </Snackbar>
            <div style={{paddingBottom: '10px', paddingLeft: '4%', paddingTop: '10px'}}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to={`${booksPath}`}
                        style={{ textDecoration: 'none', color: 'grey' }}>
                        <LinkMaterial underline="hover" color="grey">
                            Interactive Books
                        </LinkMaterial>
                    </Link>
                    {props.chapterIndex && <p>
                        Chapter {props.chapterIndex}
                    </p>
                    }
                    {currentPage.pageNumber && <p>
                        Page {currentPage.pageNumber}
                    </p>
                    }
                </Breadcrumbs>
            </div>
            {/* <div id="editor"> */}
            <div style={{justifyContent: "center", display: 'flex' }}>
            <div className="container">
            <div ref={ref} class="resizeable" style={{height:`${currentPage.textBoxHeight}px !important`, width:`${currentPage.textBoxWidth}px !important`}}>
                    <Paper elevation={3} style={{ width: "100%", height: "100%" }}>
                        {renderEmptyRowMessage()}
                        {pages.length > 0 && <div style={{ width: "100%", height: "100%" }}>
                            {renderText()}
                        </div>
                        }
                    </Paper>
                    <div ref={refLeft} className="resizer resizer-l"></div>
                    <div ref={refTop} className="resizer resizer-t"></div>
                    <div ref={refRight} className="resizer resizer-r"></div>
                    <div ref={refBottom} className="resizer resizer-b"></div>
            </div> 
            <div ref={ref1} className="resizeable1">
                    <Paper elevation={3} style={{ width: "100%", height: "100%" }}>
                        {renderEmptyRowMessage()}
                        {pages.length > 0 && <div style={{ width: "100%", height: "100%" }}>
                            {/* {renderText()} */}
                            {renderVideoImageHolder()}
                            {renderQuiz()}
                            
                        </div>
                        }
                    </Paper>
                    <div ref={refLeft1} className="resizer resizer-l"></div>
                    <div ref={refTop1} className="resizer resizer-t"></div>
                    <div ref={refRight1} className="resizer resizer-r"></div>
                    <div ref={refBottom1} className="resizer resizer-b"></div>
            </div>
            </div>
                <div style={{ width: "20%", height: "100%" }}>
                    <TeachingInteractivePageBar
                        pageId={currentPage.interactivePageId}
                        pageNumber={currentPage.pageNumber}
                        refreshInteractivePage={refreshInteractivePage}
                        setRefreshInteractivePage={setRefreshInteractivePage}
                        currentPage={currentPage}
                        chapterId={props.chapterId}
                        setPageNumberPointer={setPageNumberPointer}
                        refreshPage={props.refreshPage} 
                        setRefreshPage={props.setRefreshPage}
                        chapterEditRefreshPage={props.chapterEditRefreshPage}
                        setChapterEditRefreshPage={props.setChapterEditRefreshPage}
                        textBoxHeight={newTextBoxHeight}
                        textBoxWidth={newTextBoxWidth}
                        >
                    </TeachingInteractivePageBar>
                </div>
            </div>
            <div style={{ display: 'flex', marginTop: "5px", justifyContent: 'center', marginRight: '150px' }}>
                <div>
                    <Pagination count={pages.length} page={pageNumberPointer} onChange={handlePageChange} showFirstButton showLastButton />
                </div>
                <div>
                    <Button
                        className="btn-upload"
                        color="primary"
                        component="span"
                        variant="outlined"
                        onClick={createNewPage}
                        style={{ width: "40%", marginRight: "10px" }}
                        // startIcon={<PostAddIcon />}
                    >
                        <PostAddIcon />
                    </Button>
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
                        {"You are editing this interactive book"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Enter the new interactive book details
                        </DialogContentText>
                        <TextField
                            id="outlined-basic" label="Interactive Book Title" variant="outlined" fullWidth
                            style={{ margin: "6px 0" }}
                            value={editedPageNumber}
                            required
                            onChange={(e) => setEditedPageNumber(e.target.value)}
                            error={pageDescriptionError.value}
                            helperText={pageDescriptionError.errorMessage}
                        />
                        <TextField
                            id="outlined-basic" label="Interactive Book Max Score" variant="outlined" fullWidth
                            style={{ margin: "6px 0" }}
                            value={editedPageDescription}
                            required
                            onChange={(e) => setEditedPageDescription(e.target.value)}
                            error={pageDescriptionError.value}
                            helperText={pageDescriptionError.errorMessage}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditDialogClose}>Cancel</Button>
                        <Button onClick={editPage} autoFocus>
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        {/* <div id="blocks"></div> */}
        </div>
    );
}

export default TeachingInteractivePage;
