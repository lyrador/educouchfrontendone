import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

import "../css/DrawerLeft.css";

function TechnicalSupportRequestDrawer() {
  const auth = useAuth();
  const user = auth.user;

  const location = "/technicalSupport";

  const drawer = (
    <div>
      <div className="drawerContainer">
        <Link
          to={{
            pathname: `${location}/myRequests`,
          }}
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItemButton>
            <ListItemText primary="View My Submitted Requests" />
          </ListItemButton>
        </Link>
        <Link
          to={{
            pathname: `${location}/createRequest`,
          }}
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItemButton>
            <ListItemText primary="Report an Issue" />
          </ListItemButton>
        </Link>
      </div>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "15%",
            top: "123px",
            minWidth: "200px",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default TechnicalSupportRequestDrawer;
