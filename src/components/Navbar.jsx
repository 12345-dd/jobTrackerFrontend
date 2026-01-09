import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../utils/auth';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const navigate = useNavigate();
  const logged = !!getToken();
  const [open, setOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    removeToken();
    navigate('/login');
    setOpen(false);
  };

  const menuItems = logged
    ? [
        { label: 'Dashboard', path: '/' },
        { label: 'Applications', path: '/applications' },
        { label: 'Resume', path: '/resume' },
      ]
    : [
        { label: 'Login', path: '/login' },
        { label: 'Signup', path: '/signup' },
      ];

  return (
    <>
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: 0.5,
            }}
            onClick={() => navigate('/')}
          >
            Job Tracker
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            ))}
            {logged && (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Box>

          <IconButton
            color="inherit"
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }}>
          <Typography
            variant="h6"
            sx={{ p: 2, fontWeight: 700, textAlign: 'center' }}
          >
            Job Tracker
          </Typography>

          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.label}
                onClick={() => handleNavigate(item.path)}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}

            {logged && (
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
