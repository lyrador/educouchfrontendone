import * as React from "react";

import { Link, useLocation, useParams } from "react-router-dom";

import { useState } from "react";

import { useAuth } from "../context/AuthProvider";

import Avatar from "@mui/material/Avatar";

import Box from "@mui/material/Box";
import { Container } from "@mui/system";
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
              </Typography>
            </center>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default TechnicalSupport;
