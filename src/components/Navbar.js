import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useMediaQuery, useTheme } from '@mui/material';
import './NavBar.css';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const updateUserName = () => {
      const storedName = localStorage.getItem('OrganizerName');
      if (storedName) {
        setUserName(storedName);
      } else {
        setUserName('');
      }
    };

    updateUserName();

    window.addEventListener('storage', updateUserName);

    return () => {
      window.removeEventListener('storage', updateUserName);
    };
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('OrganizerName');
    localStorage.removeItem('OrganizerId');
    setUserName('');
    navigate('/login');
  };

  return (
    <div>
      <AppBar position="static" className='container'>
      <Toolbar className="navbar-toolbar" >
        <Typography variant="h6" className="navbar-title" >
          <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }} className='title'>
            <span className="navbar-brand">BRASKEM |
            ROCK IN RIO 2024</span>
          </Link>
        </Typography>

        <Box className="navbar-actions" sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
          <Button
            color="inherit"
            onClick={handleMenu}
            endIcon={<ArrowDropDownIcon />}
          
          >
            <div className='buttonUser'>
            {userName || 'Usuário'}
            </div>
           
          </Button>
          
          
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
             className='logout'
          >
            <MenuItem
              onClick={handleLogout}
             
            >
              <div  className='logout'>
              Logout
                </div>
            </MenuItem>
          </Menu>
        </Box>
        
      </Toolbar>
      
    </AppBar>

    </div>
  );
}

export default Navbar;
