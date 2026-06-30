import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getToken, removeToken } from "../utils/auth";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Avatar,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logged = !!getToken();

  const [open, setOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    removeToken();
    navigate("/login");
    setOpen(false);
  };

  const menuItems = logged
    ? [
        { label: "Dashboard", path: "/" },
        { label: "Applications", path: "/applications" },
        { label: "Resume", path: "/resume" },
      ]
    : [
        { label: "Login", path: "/login" },
        { label: "Signup", path: "/signup" },
      ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#fff",
          color: "#0F172A",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Box
            display="flex"
            alignItems="center"
            gap={1.5}
            sx={{ cursor: "pointer", flexGrow: 1 }}
            onClick={() => navigate("/")}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 3,
                background: "linear-gradient(135deg, #2563EB, #4F46E5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              JT
            </Box>

            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "1.1rem",
                }}
              >
                Job Tracker
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color: "#64748B",
                }}
              >
                Track your career journey
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              gap: 1,
              alignItems: "center",
            }}
          >
            {menuItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <Button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  sx={{
                    px: 2.5,
                    py: 1,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 600,
                    color: active ? "#2563EB" : "#334155",
                    bgcolor: active ? "#EFF6FF" : "transparent",

                    "&:hover": {
                      bgcolor: "#EFF6FF",
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}

            {logged && (
              <Button
                variant="contained"
                color="error"
                startIcon={<LogoutRoundedIcon />}
                onClick={handleLogout}
                sx={{
                  ml: 1,
                  borderRadius: "10px",
                  textTransform: "none",
                  boxShadow: "none",

                  "&:hover": {
                    boxShadow: "none",
                  },
                }}
              >
                Logout
              </Button>
            )}
          </Box>

          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={{
            width: 280,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 3,
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 3,
                background: "linear-gradient(135deg, #2563EB, #4F46E5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              JT
            </Box>

            <Box>
              <Typography fontWeight={700}>
                Job Tracker
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Career Dashboard
              </Typography>
            </Box>
          </Box>

          <Divider />

          <List sx={{ mt: 1 }}>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.label}
                selected={location.pathname === item.path}
                onClick={() => handleNavigate(item.path)}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  mb: 0.5,
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}

            {logged && (
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  mx: 1,
                  mt: 1,
                  borderRadius: 2,
                  color: "error.main",
                }}
              >
                <ListItemText primary="Logout" />
              </ListItemButton>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;