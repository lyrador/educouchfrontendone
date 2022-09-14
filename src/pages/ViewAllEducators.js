import * as React from "react";
import CreateInstructorForm from "../components/CreateInstructorForm";
import SettingsDrawer from "../components/SettingsDrawer";
import { Paper, Button } from "@mui/material";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { margin } from "@mui/system";

export default function EducatorCreation() {

  const [educators, setEducators] = useState([]);

  React.useEffect(() => {
    fetch("http://localhost:8080/educator/getAll")
      .then((res) => res.json())
      .then((result) => {
        setEducators(result);
      });
  }, []);

  const handleClick=(e)=> {
    
    console.log("click on create educator")
}
  

  return (
    <>
      <SettingsDrawer></SettingsDrawer>
      Educator
      <h1>
        <u>View All Educators</u>
      </h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right"></TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Access Right</TableCell>
              <TableCell align="right">Assigned Course</TableCell>
              <TableCell align="right">View Profile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {educators.map((educator) => (
              <TableRow
                key={educator.educatorId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="educator">
                  {educator.educatorId}
                </TableCell>
                <TableCell align="right">{educator.educatorId}</TableCell>
                <TableCell align="right">{educator.name}</TableCell>
                <TableCell align="right">{educator.accessRightEnum}</TableCell>
                <TableCell align="right">NULL</TableCell>
                <TableCell align="right">toBeImplemented</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" onClick={handleClick}>Create Educator</Button>

    </>
  );
}
