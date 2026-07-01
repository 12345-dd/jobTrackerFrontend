import React from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "./Navbar";
import { showError, showSuccess } from "../utils/toast";
import { setToken } from "../utils/auth";

const Login = () => {
  const {register, handleSubmit, formState: { errors }} = useForm({mode: "onBlur"});

  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("https://jobtrackerbackend-production-7e62.up.railway.app/login",data);

      setToken(res.data.token);

      showSuccess("Login Successful");

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      showError(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#F8FAFC",
      }}
    >
      <Navbar />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: {
            xs: 2,
            md: 4,
          },
          py: 2,
          overflow: "hidden",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 1100,
            borderRadius: 5,
            overflow: "hidden",
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            border: "1px solid #E2E8F0",
            boxShadow: "0 12px 30px rgba(15,23,42,.08)",
          }}
        >

          <Box
            sx={{
              flex: 1,
              display: {
                xs: "none",
                md: "flex",
              },
              flexDirection: "column",
              justifyContent: "space-between",
              p: 5,
              color: "#fff",
              background:
                "linear-gradient(135deg,#2563EB,#1D4ED8,#1E40AF)",
            }}
          >
            <Box>
              <Box
                sx={{
                  width: 65,
                  height: 65,
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 4,
                }}
              >
                <WorkOutlineRoundedIcon sx={{ fontSize: 34 }} />
              </Box>

              <Typography variant="h3" fontWeight={700} mb={2}>
                Job Tracker
              </Typography>

              <Typography
                sx={{
                  opacity: 0.9,
                  lineHeight: 1.8,
                  fontSize: 18,
                  mb: 5,
                }}
              >
                Organize every application, interview and resume from one
                beautiful dashboard.
              </Typography>

              {[
                "Track Applications",
                "Resume Manager",
                "Analytics Dashboard",
                "Interview Timeline",
              ].map((item) => (
                <Box
                  key={item}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2.5,
                  }}
                >
                  <CheckCircleRoundedIcon sx={{ mr: 2 }} />
                  <Typography>{item}</Typography>
                </Box>
              ))}
            </Box>

            <Typography sx={{ opacity: 0.8 }}>
              Stay organized. Land your dream job.
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              p: {
                xs: 3,
                md: 5,
              },
            }}
          >
            <Box width="100%">
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 3,
                  bgcolor: "#EFF6FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#2563EB",
                  mb: 3,
                }}
              >
                <LockOutlinedIcon />
              </Box>

              <Typography
                variant="h4"
                fontWeight={700}
                color="#0F172A"
              >
                Welcome Back
              </Typography>

              <Typography
                sx={{
                  color: "#64748B",
                  mt: 1,
                  mb: 4,
                }}
              >
                Sign in to continue managing your applications.
              </Typography>

              <form onSubmit={handleSubmit(submitHandler)}>
                <TextField
                  fullWidth
                  label="Email Address"
                  sx={{ mb: 3 }}
                  {...register("email", {
                    required: "E-mail is required",
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />

                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  sx={{ mb: 2 }}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />

                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    py: 1.6,
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: 16,
                    boxShadow: "none",
                  }}
                >
                  Sign In
                </Button>
              </form>

              <Divider sx={{ my: 2 }} />

              <Typography align="center" color="#64748B">
                Don't have an account?{" "}
                <Link
                  component="button"
                  underline="hover"
                  onClick={() => navigate("/signup")}
                  sx={{
                    color: "#2563EB",
                    fontWeight: 600,
                  }}
                >
                  Create Account
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;


