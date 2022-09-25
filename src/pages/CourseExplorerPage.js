import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import TeachingCoursesDrawer from "../components/TeachingCoursesDrawer";
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

import { DataGrid } from '@mui/x-data-grid';

function CourseExplorerPage(props) {

    const auth = useAuth();
    const user = auth.user;

    //paths
    const location = useLocation();
    const forumsPath = location.pathname.split("/").slice(0, 4).join("/");

    const courseId = location.pathname.split("/")[2];

    const [courses, setCourses] = useState([]);

    const [refreshPage, setRefreshPage] = useState("");

    const navigate = useNavigate();

    const handleOnClick = (e, course) => {
        e.preventDefault();
        console.log(course)
        navigate(`/myTeachingCourse/${course.id}`)
    };

    const columns = [
        { field: 'courseCode', headerName: 'Course Code', width: 150 },
        { field: 'courseTitle', headerName: 'Course Title', width: 300 },
        { field: 'courseDescription', headerName: 'Course Description', width: 300 },
        // { field: 'courseTimeline', headerName: 'Course Timeline', width: 200 },
        { field: 'ageGroup', headerName: 'Course Age Group', width: 200 },
        { field: 'categoryTags', headerName: 'Category Tags', width: 200 },
        {
            headerName: '',
            width: 200,
            renderCell: (params) => {
                return (
                    <Button
                        size="small"
                        tabIndex={params.hasFocus ? 0 : -1}
                        onClick={(event) => {
                            handleOnClick(event, params);
                        }}
                    >
                        Go
                    </Button>
                );
            },
        },
    ];

    React.useEffect(() => {
        var courseApprovalStatus = "LIVE"
        // const courseCriterias = {courseApprovalStatus}
        setRefreshPage(false);
        fetch("http://localhost:8080/course/coursesByCourseDTOValues/" + courseApprovalStatus)
            .then((res) => res.json())
            .then((result) => {
                setCourses(result);
                console.log(result);
            });
    }, [refreshPage]);

    const renderEmptyRowMessage = () => {
        if (courses.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={4} style={{ textAlign: "center" }}>
                        There are currently no courses available!
                    </TableCell>
                </TableRow>
            );
        }
    };

    return (
        <div>
            <div style={{ justifyContent: "center" }}>
                <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
                    List of Published Courses
                </h1>
                {/* <Button
                    className="btn-upload"
                    color="primary"
                    variant="contained"
                    component="span"
                    onClick={handleClickOpen}
                    style={{ float: "right", marginLeft: "auto" }}
                >
                    Create New Forum
                </Button> */}
            </div>
            {/* <div style={{ padding: "5%" }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Course Code</TableCell>
                                <TableCell>Course Title</TableCell>
                                <TableCell>Course Description</TableCell>
                                <TableCell>Created Timeline</TableCell>
                                <TableCell>Age Group</TableCell>
                                <TableCell>Category Tags</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderEmptyRowMessage()}
                            {courses.map((course) => (
                                <TableRow
                                    key={course.courseId}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Link
                                            to={`/myTeachingCourse/${course.courseId}`}
                                            style={{ textDecoration: "none" }}
                                        >
                                            {course.courseCode}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{course.courseTitle}</TableCell>
                                    <TableCell>{course.courseDescription}</TableCell>
                                    <TableCell>{course.courseTimeline}</TableCell>
                                    <TableCell>{course.ageGroup}</TableCell>
                                    <TableCell>{course.courseCategoryTags}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div> */}
            <div style={{ height: 400, width: '100%', padding: '5% 5%' }}>
                <DataGrid getRowId={(row) => row.courseId}
                    rows={courses}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </div>
    );
}

export default CourseExplorerPage;
