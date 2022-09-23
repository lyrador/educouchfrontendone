import { Button, Paper, Modal  } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { Link, useLocation, useParams} from "react-router-dom";
import SettingsDrawer from "../components/SettingsDrawer";
import CreateInstructorForm from "../components/CreateInstructorForm";
import DeleteInstructor from "../components/DeleteInstructor";

export default function ViewInstructor() {
  const [instructor, setInstructor] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  function handleClose(ed) {
    setOpen(false);
  }

  const params = useParams();
  const instructorUsername = params.instructorUsername;

  const paperStyle = {
    padding: "10px 10px",
    width: 1500,
    margin: "20px auto",
  };

  React.useEffect(() => {
    fetch(
      "http://localhost:8080/educator/findInstructor/?instructorUsername=" + instructorUsername
    )
      .then((res) => res.json())
      .then((result) => {
        setInstructor(result);
        console.log(result);
      });
  }, []);

  return (
    <div>
      <SettingsDrawer></SettingsDrawer>
      <h1>View Instructor Profile</h1>

      <Paper elevation={3} style={paperStyle}>
        <Paper
          elevation={6}
          style={{ margin: "10px", padding: "15px", textAlign: "left" }}
        >
          <Link to={"/viewAllEducators"}>
            <Button>back</Button>
          </Link>
        </Paper>
        <Paper
          elevation={6}
          style={{ margin: "10px", padding: "15px", textAlign: "left" }}
          key={instructor.instructorId}
        >
          Profile Picture:
          <img
            className="preview my20"
            src={instructor.profilePictureURL}
            alt=""
            style={{ height: "10%", width: "10%" }}
          />
          <br/>
          InstructorId: {instructor.instructorId}
          <br />
          Name: {instructor.name}
          <br />
          Acces Right: {instructor.instructorAccessRight}
          <br />
          Email: {instructor.email}
          <br />
          Username: {instructor.username}
          <br />
        </Paper>
        <Paper
          elevation={6}
          style={{ margin: "10px", padding: "15px", textAlign: "left" }}
        >
          <Button
            onClick={handleOpen}>Delete Instructor</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DeleteInstructor
              closeModalFunc={handleClose}
              instructorProps={instructor}
            ></DeleteInstructor>
          </Modal>
          <br/>
          <Button>Edit Instructor Access Right</Button>
        </Paper>
      </Paper>
    </div>
  );
}
