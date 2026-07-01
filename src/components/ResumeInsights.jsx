import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./Navbar";
import { authHeader } from "../utils/auth";
import { showError, showSuccess } from "../utils/toast";

import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";

const ResumeInsights = () => {
  const [insights, setInsights] = useState([]);

  const fetchInsights = async () => {
    try {
      const res = await axios.get("https://jobtrackerbackend-production-7e62.up.railway.app/resume/insights",
        {
          headers: authHeader(),
        }
      );

      setInsights(res.data.data);
    } catch {
      showError("Failed to fetch insights");
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const upload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const form = new FormData();
    form.append("resume", file);

    try {
      await axios.post("https://jobtrackerbackend-production-7e62.up.railway.app/resume/upload",
        form,
        {
          headers: {
            ...authHeader(),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      showSuccess("Resume uploaded successfully");

      fetchInsights();
    } catch {
      showError("Upload failed");
    }
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Average";
    return "Needs Improvement";
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

          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: 4,
              border: "1px solid #E2E8F0",
              boxShadow: "0 8px 24px rgba(15,23,42,.06)",
              background:
                "linear-gradient(135deg,#2563EB,#1D4ED8)",
              color: "#fff",
              textAlign: "center",
              mb: 4,
            }}
          >
            <CloudUploadRoundedIcon
              sx={{
                fontSize: 60,
                mb: 2,
              }}
            />

            <Typography
              variant="h5"
              fontWeight={700}
            >
              Upload Resume
            </Typography>

            <Typography
              sx={{
                opacity: .9,
                mt: 1,
                mb: 4,
              }}
            >
              Upload your PDF resume to analyze keyword coverage, calculate a resume score, and receive actionable improvement suggestions.
            </Typography>

            <Button
              variant="contained"
              component="label"
              sx={{
                bgcolor: "#fff",
                color: "#2563EB",
                px: 4,
                py: 1.4,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,

                "&:hover": {
                  bgcolor: "#F8FAFC",
                },
              }}
            >
              Choose PDF

              <input
                hidden
                accept="application/pdf"
                type="file"
                onChange={upload}
              />
            </Button>
          </Paper>

          <Typography
            variant="h5"
            fontWeight={700}
            mb={3}
          >
            Analysis Results
          </Typography>

          <Grid
            container
            spacing={3}
          >
            {insights.length === 0 ? (
              <Grid size={12}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 6,
                    borderRadius: 4,
                    border: "1px solid #E2E8F0",
                    textAlign: "center",
                    boxShadow: "0 8px 24px rgba(15,23,42,.06)",
                  }}
                >
                  <DescriptionRoundedIcon
                    sx={{
                      fontSize: 60,
                      color: "#94A3B8",
                      mb: 2,
                    }}
                  />

                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    No Resume Insights Yet
                  </Typography>

                  <Typography
                    color="text.secondary"
                    mt={1}
                  >
                    Upload your resume to receive feedback.
                  </Typography>
                </Paper>
              </Grid>
            ) : (
              insights.map((ins) => (
                <Grid
                  key={ins._id}
                  size={{ xs: 12, lg: 6 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      border: "1px solid #E2E8F0",
                      boxShadow: "0 8px 24px rgba(15,23,42,.06)",
                      transition: ".25s",

                      "&:hover": {
                        transform: "translateY(-5px)",
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
                      <Typography
                        variant="h6"
                        fontWeight={700}
                      >
                        Resume Score
                      </Typography>

                      <Chip
                        label={`${ins.resumeScore || 0}%`}
                        color={
                          ins.resumeScore >= 80
                            ? "success"
                            : ins.resumeScore >= 60
                            ? "primary"
                            : ins.resumeScore >= 40
                            ? "warning"
                            : "error"
                        }
                      />
                    </Box>

                    <Tooltip
                      title={getScoreLabel(ins.resumeScore || 0)}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={ins.resumeScore || 0}
                        sx={{
                          height: 12,
                          borderRadius: 10,
                          mb: 2,
                          backgroundColor: "#E2E8F0",

                          "& .MuiLinearProgress-bar": {
                            borderRadius: 10,
                            backgroundColor:
                              ins.resumeScore >= 80
                                ? "#10B981"
                                : ins.resumeScore >= 60
                                ? "#2563EB"
                                : ins.resumeScore >= 40
                                ? "#F59E0B"
                                : "#EF4444",
                          },
                        }}
                      />
                    </Tooltip>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Uploaded on{" "}
                      {new Date(
                        ins.createdAt
                      ).toLocaleString()}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Box mb={3}>
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        mb={2}
                      >
                        <CheckCircleRoundedIcon
                          color="success"
                        />

                        <Typography
                          fontWeight={700}
                        >
                          Keywords Found
                        </Typography>
                      </Box>

                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                      >
                        {ins.keywordsFound.length ? (
                          ins.keywordsFound.map((item, index) => (
                            <Chip
                              key={index}
                              label={item}
                              color="success"
                              sx={{ mb: 1 }}
                            />
                          ))
                        ) : (
                          <Typography
                            color="text.secondary"
                          >
                            None
                          </Typography>
                        )}
                      </Stack>
                    </Box>

                    <Box mb={3}>
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        mb={2}
                      >
                        <ErrorOutlineRoundedIcon
                          color="warning"
                        />

                        <Typography
                          fontWeight={700}
                        >
                          Missing Keywords
                        </Typography>
                      </Box>

                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                      >
                        {ins.missingKeywords.length ? (
                          ins.missingKeywords
                            .slice(0, 8)
                            .map((item, index) => (
                              <Chip
                                key={index}
                                label={item}
                                color="warning"
                                sx={{ mb: 1 }}
                              />
                            ))
                        ) : (
                          <Typography
                            color="text.secondary"
                          >
                            None
                          </Typography>
                        )}
                      </Stack>
                    </Box>

                    <Box
                      sx={{
                        bgcolor: "#EFF6FF",
                        borderRadius: 3,
                        p: 3,
                      }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        mb={1}
                      >
                        <TipsAndUpdatesRoundedIcon
                          color="primary"
                        />

                        <Typography
                          fontWeight={700}
                        >
                          Suggestions
                        </Typography>
                      </Box>

                      <Typography
                        color="#334155"
                      >
                        {ins.suggestions ||
                          "No suggestions available."}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ResumeInsights;



