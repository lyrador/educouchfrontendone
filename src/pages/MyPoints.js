import * as React from "react";
import "../App.css";
import "../css/TeachingFileList.css";

import {
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { DataGrid } from "@mui/x-data-grid";
import DashboardDrawer from "../components/DashboardDrawer";
import { Height } from "@mui/icons-material";


function MyPoints() {
  // list of gradebook entries
  const [discountPoint, setDiscountPoint] = useState([]);

  const auth = useAuth();
  const user = auth.user;
  console.log(user)
  const learnerId = user.userId;

  const [refresh, setRefresh] = useState(false);

  const refreshPage = () => {
    setRefresh(!refresh);
  };
  const columns = [
    { field: 'orgName', headerName: 'Organisation Name', width: 300},
    { field: 'discountPoints', headerName: 'Discount Points', width: 300},
  
  ];

  React.useEffect(() => {
    fetch(
      "http://localhost:8080/pointsWallet/getPointsWalletByLearner?learnerId=" +
        learnerId
    )
      .then((res) => res.json())
      .then((result) => {
        setDiscountPoint(result)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [learnerId]);

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
            <DashboardDrawer></DashboardDrawer>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5">My Discount Points</Typography>
          <divider></divider>
          <br />


              {/* insert table */}
              <div style={{ height: 400, width: '100%' }}>
            <DataGrid getRowId={(row)=>row.pointsWalletId}
              rows={discountPoint}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
      
            
            />
          </div>
        </Grid>
        <Grid item xs={2} style={{ padding: "10px" }}>
        </Grid>
      </Grid>
    </div>                
  );
}

export default MyPoints;
