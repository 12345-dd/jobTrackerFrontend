import axios from "axios";
import React, { useEffect, useState } from "react";
import { authHeader } from "../utils/auth";
import Navbar from "./Navbar";

import {
  Container,
  Paper,
  Typography,
  Box,
} from "@mui/material";

import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#2563EB",
  "#06B6D4",
  "#F59E0B",
  "#EF4444",
  "#10B981",
];

const STATUSES = [
  "Applied",
  "HR",
  "Technical",
  "Rejected",
  "Offer",
];

const ICONS = {
  Applied: <DescriptionRoundedIcon />,
  HR: <GroupsRoundedIcon />,
  Technical: <CodeRoundedIcon />,
  Rejected: <CancelRoundedIcon />,
  Offer: <EmojiEventsRoundedIcon />,
};

const Dashboard = () => {
  const [apps, setApps] = useState([]);

  const fetchApp = async () => {
    try {
      const res = await axios.get(
        "https://jobtrackerbackend-production-7e62.up.railway.app/applications",
        {
          headers: authHeader(),
        }
      );

      setApps(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApp();
  }, []);

  const statusCounts = apps.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = STATUSES.map((status) => ({
    name: status,
    value: statusCounts[status] || 0,
  }));

  const barData = STATUSES.map((status) => ({
    status,
    count: statusCounts[status] || 0,
  }));

  return (
    <>
      <Navbar />

      <Box
        sx={{
          bgcolor: "#F8FAFC",
          minHeight: "calc(100vh - 66px)",
          py: 3
        }}
      >
        <Container maxWidth="xl">

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2,1fr)",
                lg: "repeat(5,1fr)",
              },
              gap: 3,
              mb: 4,
            }}
          >
            {STATUSES.map((status, index) => (
              <Paper
                key={status}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  border: "1px solid #E2E8F0",
                  boxShadow:"0 8px 24px rgba(15,23,42,.06)",
                  transition: ".25s",

                  "&:hover": {
                    transform: "translateY(-6px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 3,
                      bgcolor: COLORS[index],
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {ICONS[status]}
                  </Box>

                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="#0F172A"
                  >
                    {statusCounts[status] || 0}
                  </Typography>
                </Box>

                <Typography
                  fontWeight={600}
                  color="#334155"
                >
                  {status}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={1}
                >
                  Applications currently in this stage.
                </Typography>
              </Paper>
            ))}
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "1fr 1fr",
              },
              gap: 3,
              overflowX: "auto"
            }}
          >

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
                fontWeight={600}
                mb={3}
                color="#0F172A"
              >
                Applications by Status
              </Typography>

              <ResponsiveContainer
                width="100%"
                height={330}
              >
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={3}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </Paper>

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
                fontWeight={600}
                mb={3}
                color="#0F172A"
              >
                Hiring Pipeline
              </Typography>

              <Box sx={{ width: "100%", overflowX: "auto" }}>
                <Box
                  sx={{
                    minWidth: { xs: 500, sm: "100%" },
                    height: 330,
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barData}
                      margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 40,
                      }}
                    >
                      <XAxis
                        dataKey="status"
                        interval={0}
                        angle={-25}
                        textAnchor="end"
                        height={60}
                      />

                      <YAxis allowDecimals={false} />

                      <Tooltip />

                      <Bar
                        dataKey="count"
                        fill="#2563EB"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;











