import * as React from "react";
import Typography from "@mui/material/Typography";
import { useAuth } from "../context/AuthProvider";
import { AuthProvider } from "../context/AuthProvider";
import WebPet from "web-pet";
import { Grid } from "@mui/material";
import DashboardDrawer from "../components/DashboardDrawer";

export default function Home() {
  const auth = useAuth();
  const user = auth.user;

  return (
    <>
      <div>
        <Grid container spacing={0}>
          <Grid item xs={2}>
            {user.userType === "LEARNER" && <DashboardDrawer></DashboardDrawer>}
          </Grid>
          <Grid item xs={8}>
            <divider></divider>
            <br />

            <div style={{ justifyContent: "center", textAlign: "center" }}>
              <div style={{ width: "100%" }}>
                <img
                  src="https://educouchbucket.s3.ap-southeast-1.amazonaws.com/educouchlogo.png"
                  style={{ height: 200, width: 300, borderRadius: 30 }}
                />
              </div>
              <div style={{ padding: "50px 400px" }}>
                <Typography
                  variant="h5"
                  color="text.primary"
                  // style={{ textDecoration: 'underline' }}
                >
                  Welcome to EduCouch Portal!
                  <br></br>
                  Navigate to the other pages by clicking on the items in the
                  navigation bar above!
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={2} style={{ padding: "10px" }}></Grid>
        </Grid>
      </div>
    </>
  );
}
