import * as React from "react";
import CreateInstructorForm from "../components/CreateInstructorForm";
import SettingsDrawer from "../components/SettingsDrawer";
import { Paper, Button, Divider, Chip, Grid, Modal } from "@mui/material";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";

export default function ViewAllEducators() {
  const [instructors, setInstructors] = useState([]);
  const instructorTableStyle = {
    padding: "10px 10px",
    width: 1500,
    margin: "20px auto",
  };
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
  }, []);

  return (
    <div>
      <SettingsDrawer></SettingsDrawer>

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
                  <TableCell align="right">
                    {instructor.instructorAccessRight}
                  </TableCell>
                  <TableCell align="right">NULL</TableCell>
                  <TableCell align="right">
                    <Link to="/viewInstructor">
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
            ></CreateInstructorForm>
          </Modal>
        </Grid>
      </Paper>
    </div>
  );
}
