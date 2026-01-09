import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Chip,
  Stack,
  Divider,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import { authHeader } from '../utils/auth';
import { showError, showSuccess } from '../utils/toast';
import axios from 'axios';

const ResumeInsights = () => {
  const [insights, setInsights] = useState([]);

  async function fetch() {
    try {
      const res = await axios.get('https://jobtrackerbackend-6gxo.onrender.com/resume/insights', {
        headers: authHeader(),
      });
      setInsights(res.data.data);
    } catch (err) {
      showError('Failed to fetch insights');
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  async function upload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append('resume', file);

    try {
      await axios.post('https://jobtrackerbackend-6gxo.onrender.com/resume/upload', form, {
        headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' },
      });
      fetch();
      showSuccess('Resume uploaded and processed successfully');
    } catch (err) {
      showError('Upload failed. Please try again.');
    }
  }

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    return 'Needs Improvement';
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4, mb: 6 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f9f9f9',
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Upload Your Resume
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            PDF format only. We'll analyze and provide insights.
          </Typography>
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 3 }}
            color="primary"
          >
            Choose File
            <input type="file" accept="application/pdf" hidden onChange={upload} />
          </Button>
        </Paper>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" sx={{ mb: 2 }} fontWeight="medium">
            Resume Insights
          </Typography>

          {insights.length === 0 ? (
            <Typography color="text.secondary">
              No insights available. Upload a resume to get started.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {insights.map((ins) => (
                <Grid item xs={12} md={6} key={ins._id}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      backgroundColor: '#ffffff',
                      position: 'relative',
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" fontWeight="medium">
                        Resume Score: {ins.resumeScore || 0}%
                      </Typography>
                      <Tooltip title={getScoreLabel(ins.resumeScore || 0)}>
                        <LinearProgress
                          variant="determinate"
                          value={ins.resumeScore || 0}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            mt: 1,
                            backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor:
                                ins.resumeScore > 80
                                  ? '#4caf50'
                                  : ins.resumeScore > 60
                                  ? '#ffb74d'
                                  : ins.resumeScore > 40
                                  ? '#ff9800'
                                  : '#f44336',
                            },
                          }}
                        />
                      </Tooltip>
                    </Box>

                    <Typography variant="subtitle2" color="text.secondary">
                      Uploaded: {new Date(ins.createdAt).toLocaleString()}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    <Box sx={{ mt: 1, mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight="medium">
                        Keywords Found:
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        sx={{ mt: 0.5 }}
                      >
                        {ins.keywordsFound.length > 0 ? (
                          ins.keywordsFound.map((kw, index) => (
                            <Chip
                              key={index}
                              label={kw}
                              color="success"
                              size="small"
                            />
                          ))
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            None
                          </Typography>
                        )}
                      </Stack>
                    </Box>

                    <Box sx={{ mt: 1, mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight="medium">
                        Missing Keywords:
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        sx={{ mt: 0.5 }}
                      >
                        {ins.missingKeywords.length > 0 ? (
                          ins.missingKeywords.slice(0, 6).map((kw, index) => (
                            <Chip
                              key={index}
                              label={kw}
                              color="warning"
                              size="small"
                            />
                          ))
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            None
                          </Typography>
                        )}
                      </Stack>
                    </Box>

                    <Box sx={{ mt: 1 }}>
                      <Typography variant="subtitle2" fontWeight="medium">
                        Suggestions:
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{ mt: 0.5 }}
                      >
                        {ins.suggestions || 'No suggestions provided.'}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
};

export default ResumeInsights;



