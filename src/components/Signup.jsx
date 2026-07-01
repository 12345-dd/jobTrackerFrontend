import React from "react";
import {
  Box,
  Button,
  Divider,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "./Navbar";
import { showError, showSuccess } from "../utils/toast";

const Signup = () => {
  const {register, handleSubmit, formState: { errors }} = useForm({mode: "onBlur"});

  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      await axios.post("https://jobtrackerbackend-production-7e62.up.railway.app/signup",data);

      showSuccess("Registration Successful");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      showError(err.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#F8FAFC",
      }}
    >
      <Navbar />

      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: {
            xs: 2,
            md: 4,
          },
          py: 2,
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
              p: 4,
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
                  mb: 3,
                }}
              >
                <WorkOutlineRoundedIcon sx={{ fontSize: 34 }} />
              </Box>

              <Typography variant="h3" fontWeight={700} mb={2}>
                Join Job Tracker
              </Typography>

              <Typography
                sx={{
                  opacity: 0.9,
                  lineHeight: 1.8,
                  fontSize: 16,
                  mb: 3,
                }}
              >
                Create your free account and start managing your job search with confidence.
              </Typography>

              {[
                "Unlimited Applications",
                "Resume Insights",
                "Application Timeline",
                "Track Interview Progress",
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
              One place for your entire job search.
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
                <PersonAddAlt1RoundedIcon />
              </Box>

              <Typography
                variant="h4"
                fontWeight={700}
                color="#0F172A"
              >
                Create Account
              </Typography>

              <Typography
                sx={{
                  color: "#64748B",
                  mt: 1,
                  mb: 4,
                }}
              >
                Create your account to start tracking your job applications.
              </Typography>

              <form onSubmit={handleSubmit(submitHandler)}>
                <TextField
                  fullWidth
                  label="Full Name"
                  sx={{ mb: 3 }}
                  {...register("name", {
                    required: "Name is required",
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />

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
                  Create Account
                </Button>
              </form>

              <Divider sx={{ my: 2 }} />

              <Typography align="center" color="#64748B">
                Already have an account?{" "}
                <Link
                  component="button"
                  underline="hover"
                  onClick={() => navigate("/login")}
                  sx={{
                    color: "#2563EB",
                    fontWeight: 600,
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Signup;