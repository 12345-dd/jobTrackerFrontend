import React, { useEffect, useState } from 'react';
import { authHeader } from '../utils/auth';
import Navbar from './Navbar';
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Chip
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { showError, showSuccess } from '../utils/toast';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const STATUSES = ["Applied","HR","Technical","Rejected","Offer"];

const statusColors = {
  Applied: "primary",
  HR: "info",
  Technical: "warning",
  Rejected: "error",
  Offer: "success"
};

const Applications = () => {
  const [apps, setApps] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onBlur" });

  const fetchApps = async () => {
    try {
      const res = await axios.get("https://jobtrackerbackend-6gxo.onrender.com/applications", { headers: authHeader() });
      setApps(res.data.data);
    } catch (err) {
      showError(err, "Failed to fetch applications");
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const submitHandler = async (data) => {
    try {
      await axios.post("https://jobtrackerbackend-6gxo.onrender.com/applications", data, { headers: authHeader() });
      showSuccess("Application Added Successfully");
      reset();
      fetchApps();
    } catch (err) {
      console.log("ADD APPLICATION ERROR 👉", err.response || err);
      showError(err.response?.data?.message || "Failed to add application");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`https://jobtrackerbackend-6gxo.onrender.com/applications/${id}`, { status }, { headers: authHeader() });
      showSuccess(`Status updated to ${status}`);
      fetchApps();
    } catch (err) {
      showError("Failed to update status");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await axios.delete(`https://jobtrackerbackend-6gxo.onrender.com/applications/${id}`, { headers: authHeader() });
      showSuccess("Application Deleted");
      fetchApps();
    } catch (err) {
      showError("Failed to delete Applications");
    }
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 4, backgroundColor: "#f9f9f9" }}>
              <Typography variant='h6' sx={{ mb: 2, fontWeight: 600 }}>Add Application</Typography>
              <Box component="form" onSubmit={handleSubmit(submitHandler)} noValidate>
                <TextField 
                  fullWidth
                  label="Company"
                  margin='normal'
                  {...register("company", { required: "Company is required" })}
                  error={!!errors.company}
                  helperText={errors.company?.message}
                />
                <TextField 
                  fullWidth
                  label="Role"
                  margin='normal'
                  {...register("role", { required: "Role is required" })}
                  error={!!errors.role}
                  helperText={errors.role?.message}
                />
                <TextField 
                  fullWidth
                  label="Job Link"
                  margin='normal'
                  {...register("jobLink")}
                />
                <TextField 
                  select
                  fullWidth
                  label="Status"
                  margin='normal'
                  defaultValue="Applied"
                  {...register("status")}
                >
                  {STATUSES.map((s) => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                  ))}
                </TextField>
                <TextField 
                  fullWidth
                  label="Package (LPA)"
                  margin='normal'
                  type="number"
                  {...register("package")}
                />
                <TextField 
                  fullWidth
                  label="Notes"
                  margin='normal'
                  multiline
                  rows={2}
                  {...register("notes")}
                />
                <Button 
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Add Application
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 4, mb : 2}}>
              <Typography variant='h6' sx={{ mb: 2, fontWeight: 600 }}>Applications</Typography>
              <Grid container spacing={2}>
                {apps.length === 0 && (
                  <Typography sx={{ p: 2, color: "#777" }}>
                    No applications yet
                  </Typography>
                )}
                {apps.map((app) => (
                  <Grid item xs={12} md={6} key={app._id}>
                    <Paper 
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        boxShadow: 2,
                        transition: "0.3s",
                        "&:hover": { boxShadow: 6, transform: "translateY(-2px)" }
                      }}
                    >
                      <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                        {app.company} - {app.role}
                      </Typography>
                      <Chip 
                        label={app.status} 
                        color={statusColors[app.status]} 
                        size="small"
                        sx={{ mt: 1, mb: 1 }}
                      />
                      <Typography variant='body2' sx={{ mb: 1 }}>
                        Package: {app.package} LPA
                      </Typography>

                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {STATUSES.map((s) => (
                          <Button
                            key={s}
                            size='small'
                            variant={app.status === s ? "contained" : "outlined"}
                            color={statusColors[s]}
                            onClick={() => updateStatus(app._id, s)}
                          >
                            {s}
                          </Button>
                        ))}
                        <Button 
                          color='error'
                          size="small"
                          variant="outlined"
                          onClick={() => remove(app._id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Applications;
