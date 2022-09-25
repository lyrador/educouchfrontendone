import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

import "../css/DrawerLeft.css";

function SettingsDrawer(props) {
  const auth = useAuth();
  const user = auth.user;

  const drawer = (
    <div>
      <div className="drawerContainer">
        <List>
          {["View Educators"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to="/viewAllEducators">
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
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
            width: "12%",
            top: "123px",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default SettingsDrawer;
