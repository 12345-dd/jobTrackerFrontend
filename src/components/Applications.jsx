import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import Navbar from "./Navbar";
import { authHeader } from "../utils/auth";
import { showError, showSuccess } from "../utils/toast";

import {
  Box,
  Button,
  Chip,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Grid";

const STATUSES = [
  "Applied",
  "HR",
  "Technical",
  "Rejected",
  "Offer",
];

const statusColors = {
  Applied: "primary",
  HR: "info",
  Technical: "warning",
  Rejected: "error",
  Offer: "success",
};

const Applications = () => {
  const [apps, setApps] = useState([]);

  const {register, handleSubmit, reset, formState: { errors }} = useForm({mode: "onBlur"});

  const fetchApps = async () => {
    try {
      const res = await axios.get("https://jobtrackerbackend-production-7e62.up.railway.app/applications",
        {
          headers: authHeader(),
        }
      );

      setApps(res.data.data);
    } catch (err) {
      showError("Failed to fetch applications");
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const submitHandler = async (data) => {
    try {
      await axios.post("https://jobtrackerbackend-production-7e62.up.railway.app/applications",
        data,
        {
          headers: authHeader(),
        }
      );

      showSuccess("Application Added Successfully");

      reset();

      fetchApps();
    } catch (err) {
      showError(err.response?.data?.message || "Failed to add application");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`https://jobtrackerbackend-production-7e62.up.railway.app/applications/${id}`,
        { status },
        {
          headers: authHeader(),
        }
      );

      showSuccess(`Status updated to ${status}`);

      fetchApps();
    } catch {
      showError("Failed to update status");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this application?")) return;

    try {
      await axios.delete(`https://jobtrackerbackend-production-7e62.up.railway.app/applications/${id}`,
        {
          headers: authHeader(),
        }
      );

      showSuccess("Application Deleted");

      fetchApps();
    } catch {
      showError("Failed to delete application");
    }
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          bgcolor: "#F8FAFC",
          minHeight: "calc(100vh - 66px)",
          py: 4,
        }}
      >
        <Container maxWidth="xl">

          <Grid
            container
            spacing={4}
            alignItems="flex-start"
          >

            {/* LEFT */}

            <Grid size={{ xs: 12, md: 4 }}>

              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 8px 24px rgba(15,23,42,.06)",
                  position: {
                    md: "sticky",
                  },
                  top: 90,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={700}
                  mb={3}
                >
                  Add New Application
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleSubmit(submitHandler)}
                >

                  <TextField
                    fullWidth
                    label="Company"
                    margin="normal"
                    {...register("company", {
                      required: "Company is required",
                    })}
                    error={!!errors.company}
                    helperText={errors.company?.message}
                  />

                  <TextField
                    fullWidth
                    label="Role"
                    margin="normal"
                    {...register("role", {
                      required: "Role is required",
                    })}
                    error={!!errors.role}
                    helperText={errors.role?.message}
                  />

                  <TextField
                    fullWidth
                    label="Job Link"
                    margin="normal"
                    {...register("jobLink")}
                  />

                  <TextField
                    select
                    fullWidth
                    label="Status"
                    margin="normal"
                    defaultValue="Applied"
                    {...register("status")}
                  >
                    {STATUSES.map((status) => (
                      <MenuItem
                        key={status}
                        value={status}
                      >
                        {status}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    fullWidth
                    label="Package (LPA)"
                    type="number"
                    margin="normal"
                    {...register("package")}
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Notes"
                    margin="normal"
                    {...register("notes")}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{
                      mt: 3,
                      py: 1.5,
                      borderRadius: 3,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Add Application
                  </Button>

                </Box>
              </Paper>

            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>

              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 8px 24px rgba(15,23,42,.06)",
                }}
              >

                <Typography
                  variant="h6"
                  fontWeight={700}
                  mb={3}
                >
                  Your Applications
                </Typography>

                <Grid
                  container
                  spacing={3}
                >
                  {apps.length === 0 ? (
                    <Box
                      sx={{
                        width: "100%",
                        py: 8,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        color="text.secondary"
                      >
                        No applications added yet
                      </Typography>

                      <Typography
                        color="text.secondary"
                        mt={1}
                      >
                        Add your first application using the form on the left.
                      </Typography>
                    </Box>
                  ) : (
                    apps.map((app) => (
                      <Grid
                        size={{ xs: 12, lg: 6 }}
                        key={app._id}
                      >
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: 3,
                            border: "1px solid #E2E8F0",
                            transition: ".25s",

                            "&:hover": {
                              transform: "translateY(-4px)",
                              boxShadow:
                                "0 10px 28px rgba(15,23,42,.08)",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 2,
                            }}
                          >
                            <Box>
                              <Typography
                                variant="h6"
                                fontWeight={700}
                              >
                                {app.company}
                              </Typography>

                              <Typography
                                color="text.secondary"
                              >
                                {app.role}
                              </Typography>
                            </Box>

                            <Chip
                              label={app.status}
                              color={statusColors[app.status]}
                            />
                          </Box>

                          {app.package && (
                            <Typography
                              sx={{
                                mb: 1,
                              }}
                            >
                              <strong>Package:</strong> {app.package} LPA
                            </Typography>
                          )}

                          {app.jobLink && (
                            <Typography
                              sx={{
                                mb: 1,
                                wordBreak: "break-word",
                              }}
                            >
                              <strong>Job Link:</strong>{" "}
                              <a
                                href={app.jobLink}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Open
                              </a>
                            </Typography>
                          )}

                          {app.notes && (
                            <Typography
                              color="text.secondary"
                              sx={{
                                mb: 2,
                              }}
                            >
                              {app.notes}
                            </Typography>
                          )}

                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 1,
                              mt: 2,
                            }}
                          >
                            {STATUSES.map((status) => (
                              <Button
                                key={status}
                                size="small"
                                variant={
                                  app.status === status
                                    ? "contained"
                                    : "outlined"
                                }
                                color={statusColors[status]}
                                onClick={() =>
                                  updateStatus(app._id, status)
                                }
                                sx={{
                                  textTransform: "none",
                                  borderRadius: 2,
                                }}
                              >
                                {status}
                              </Button>
                            ))}
                          </Box>

                          <Button
                            fullWidth
                            variant="outlined"
                            color="error"
                            onClick={() => remove(app._id)}
                            sx={{
                              mt: 3,
                              borderRadius: 2,
                              textTransform: "none",
                            }}
                          >
                            Delete Application
                          </Button>
                        </Paper>
                      </Grid>
                    ))
                  )}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Applications;
              
