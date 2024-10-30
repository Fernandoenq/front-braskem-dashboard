import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './LoginNavbar.css'

function LoginNavbar() {
  return (
    <AppBar position="static">
      <Toolbar className="navbar-toolbar">
        <Typography variant="h6" className="navbar-title">
          <span className="navbar-brand">BRASKEM</span> | ROCK IN RIO 2024
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default LoginNavbar;
