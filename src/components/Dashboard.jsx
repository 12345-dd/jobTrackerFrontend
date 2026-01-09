import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { authHeader } from '../utils/auth';
import Navbar from './Navbar';
import { Container, Paper, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
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
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A'];
const STATUSES = ["Applied", "HR", "Technical", "Rejected", "Offer"];

const Dashboard = () => {
  const [apps, setApps] = useState([]);

  const fetchApp = async () => {
    try {
      const res = await axios.get("https://jobtrackerbackend-6gxo.onrender.com/applications", { headers: authHeader() });
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

  const pieData = STATUSES.map(status => ({ name: status, value: statusCounts[status] || 0 }));
  const barData = STATUSES.map(status => ({ status, count: statusCounts[status] || 0 }));

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4, mb: 4, minHeight: 'calc(100vh - 80px)' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' },
            gap: 2,
            mb: 4
          }}
        >
          {STATUSES.map((status, index) => (
            <Paper
              key={status}
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 4,
                background: COLORS[index % COLORS.length],
                color: '#fff',
                textAlign: 'center',
                transition: '0.3s',
                '&:hover': { boxShadow: 6, transform: 'translateY(-3px)' }
              }}
            >
              <Typography variant='subtitle2'>{status}</Typography>
              <Typography variant='h5' sx={{ fontWeight: 600 }}>
                {statusCounts[status] || 0}
              </Typography>
            </Paper>
          ))}
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
            gap: 2
          }}
        >
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: 4,
              transition: '0.3s',
              '&:hover': { boxShadow: 6, transform: 'translateY(-3px)' },
            }}
          >
            <Typography variant='subtitle1' sx={{ mb: 2, fontWeight: 500, color: '#555' }}>
              Application Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: 4,
              transition: '0.3s',
              '&:hover': { boxShadow: 6, transform: 'translateY(-3px)' },
            }}
          >
            <Typography variant='subtitle1' sx={{ mb: 2, fontWeight: 500, color: '#555' }}>
              Status Count Bar Chart
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <XAxis dataKey="status" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;











