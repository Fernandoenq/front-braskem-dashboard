// src/components/Sidebar.js
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div>
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/projects">
          <ListItemText primary="Projects" />
        </ListItem>
        <ListItem button component={Link} to="/analytics">
          <ListItemText primary="Analytics" />
        </ListItem>
      </List>
    </div>
  );
}

export default Sidebar;
