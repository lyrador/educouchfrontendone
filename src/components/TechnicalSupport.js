import * as React from "react";

import {
  Typography,
  Grid,
  Paper,
  TextField,
  createTheme,
  Button,
} from "@mui/material";
import UploadService from "../services/UploadFilesService";
import TechnicalSupportRequestDrawer from "./TechnicalSupportRequestDrawer";

function TechnicalSupport(props) {
  const theme = createTheme({
    components: {
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            height: 15,
            borderRadius: 5,
          },
          colorPrimary: {
            backgroundColor: "#EEEEEE",
          },
          bar: {
            borderRadius: 5,
            backgroundColor: "#1a90ff",
          },
        },
      },
    },
  });

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <TechnicalSupportRequestDrawer></TechnicalSupportRequestDrawer>
        </Grid>
        <Grid item xs={10}>
          <div style={{ justifyContent: "center" }}>
            <center>
              <Typography variant="h4">
                <b>How to File a Technical Support Request</b>

                <br />
                <br />
              </Typography>
            </center>
            <Typography variant="h5">
              <p>
                To increase your chances of resolving your issue quickly, please
                consider including the following in your issue:
              </p>

              <br />
              <ul>
                <li>
                  A detailed <b>request description</b> of the issue found
                </li>
                <li>
                  Screenshots of the issue if any. This is optional but will be
                  useful for us to determine the exact problem. After uploading
                  a screenshot, please check and confirm if the screenshot is
                  correct by clicking on it
                </li>
              </ul>
              <br />
            </Typography>

            <Typography variant="h5">
              <p>
                To <b>report an issue</b>, please navigate using the sidebar at
                the left of the screen
              </p>
              <br />
              <center>
                <img
                  src="https://cdn.pixabay.com/photo/2018/04/09/08/01/problem-3303396_960_720.png"
                  alt="Issue"
                  width="700"
                  height="600"
                ></img>
              </center>
            </Typography>
            <center>
              <Typography variant="h6">
                <p>
                  Please use this function responsibly! Thank you for assisting
                  us in improving EduCouch
                </p>
              </Typography>
            </center>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default TechnicalSupport;
