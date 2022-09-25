import * as React from "react";
import CreateInstructorForm from "../components/CreateInstructorForm";
import SettingsDrawer from "../components/SettingsDrawer";
import { Paper, Button, Divider, Chip, Grid, Modal, setRef } from "@mui/material";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";

export default function ViewAllEducators() {
  const viewInstructorPath = "/viewInstructor";
  const [instructors, setInstructors] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const instructorTableStyle = {
    padding: "10px 10px",
    width: 1500,
    margin: "20px auto",
  };

  const refreshFunction = () => {
    setRefresh(!refresh);
  }

  const columns = [
    { field: "instructorId", headerName: "Instructor ID", width: 100 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "username", headerName: "Username", width: 300 },
    { field: "instructorAccessRight", headerName: "Access Right", width: 200 },
    { field: "course", headerName: "Assigned Course", width: 300 },
    { field: "viewProfile", headerName: "View Profile", width: 150 },
  ];

  const popupStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  function handleClose(ed) {
    setOpen(false);
  }

  //organisation (org admin) is hard coded for now until org admin sign up is done
  React.useEffect(() => {
    fetch("http://localhost:8080/educator/findAllInstructors/?organisationId=1")
      .then((res) => res.json())
      .then((result) => {
        setInstructors(result);
      });
  }, [refresh]);

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <SettingsDrawer></SettingsDrawer>
        </Grid>
        <Grid item xs={10}>
          <h1>View All instructors</h1>

          <Paper elevation={3} style={instructorTableStyle}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow sx={{ bgcolor: "#1975d2" }}>
                    <TableCell align="right" size="small">
                      <b>ID</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Name</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Username</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Access Right</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Assigned Course</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>View Profile</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {instructors.map((instructor) => (
                    <TableRow
                      key={instructor.instructorId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">{instructor.instructorId}</TableCell>
                      <TableCell align="right">{instructor.name}</TableCell>
                      <TableCell align="right">{instructor.username}</TableCell>
                      <TableCell align="right">
                        {instructor.instructorAccessRight}
                      </TableCell>
                      <TableCell align="right">NULL</TableCell>
                      <TableCell align="right">
                        <Link
                          to={`${viewInstructorPath}/${instructor.username}`}
                          state={{ instructorUsername: instructor.username }}
                        >
                          <Button
                            className="btn-choose"
                            variant="outlined"
                            type="submit"
                          >
                            View Profile
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* 
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row.instructorId}
              rows={instructors}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}>

              </DataGrid>
          </div> */}
            </TableContainer>

            <br></br>
            <Divider>
              <Chip label="End" />
            </Divider>
            {/* <div className="app--shell" onClick={openModal}>
          <ModalManager closeFn={closeModal} modal={modalOpen} />
        </div> */}
            <br></br>

            <Grid container justifyContent={"center"}>
              <Button
                className="btn-choose"
                variant="outlined"
                type="submit"
                onClick={handleOpen}
              >
                Create new Instructor
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <CreateInstructorForm
                  closeModalFunc={handleClose}
                  refreshProp={refreshFunction}
                ></CreateInstructorForm>
              </Modal>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div >
  );
}
