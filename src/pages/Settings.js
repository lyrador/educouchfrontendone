import * as React from "react";
import SettingsDrawer from "../components/SettingsDrawer";
import {
  Button,
  Grid,
  List,
  ListItem,
  Divider,
  ListItemText,
} from "@mui/material";
import { color } from "@mui/system";

export default function Settings() {
  return (
    <div>
      <h1 style={{ textAlign: "left", padding: "0 4rem" }}>User Settings</h1>
      <List component="nav" aria-label="setting list">
        <ListItem button>
          <ListItemText primary="Setting 1" />
        </ListItem>
        <Divider />
        <ListItem button divider>
          <ListItemText primary="Setting 2" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Setting 2" />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText primary="Delete My Account"/>
        </ListItem>
      </List>
    </div>
  );
}
