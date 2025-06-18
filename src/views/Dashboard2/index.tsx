"use client";

import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  alpha,
  Stack,
  Button,
  LinearProgress,
} from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import LanIcon from "@mui/icons-material/Lan";

import {
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
  Domain as DomainIcon,
  Settings as SettingsIcon,
  Shield as ShieldIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  Star as BonusIcon,
} from "@mui/icons-material";
import DashboardPieChart from "../Dashboard/Charts/DashboardPieChart";

const COLORS = [
  "#0088FE", // blue
  "#00C49F", // teal
  "#FFBB28", // yellow
  "#FF8042", // orange
  "#8884D8", // purple
  "#FF6B6B", // red
  "#4CAF50", // green
  "#9C27B0", // violet
];

const issueData = [
  { name: "Simple", value: 50 },
  { name: "Medium", value: 25 },
  { name: "Complex", value: 10 },
];

const DashboardCard = ({
  icon,
  title,
  value,
  subtitle,
  color,
  backgroundColor,
  fontColor,
}: any) => (
  <Card
    sx={{
      display: "flex",
      flex: 1,
      borderRadius: 2,
      boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
      },
      backgroundColor: backgroundColor || "none",
      color: fontColor ? fontColor : "",
    }}
  >
    <CardContent sx={{ width: "100%" }}>
      <Stack direction="column" alignItems="flex-start">
        <Stack direction="row" spacing={1.5} alignItems="center" width="100%">
          <Avatar
            sx={{
              bgcolor: fontColor ? alpha(fontColor, 0.2) : alpha(color, 0.2),
              color: fontColor ? fontColor : color,
              width: 40,
              height: 40,
              fontSize: "1.2rem",
            }}
          >
            {icon}
          </Avatar>
          <Typography
            variant="h6"
            fontSize={16}
            fontWeight="bold"
            color={fontColor}
            sx={{ flexGrow: 1 }}
          >
            {value}
          </Typography>
        </Stack>
        <Typography
          variant="body2"
          color={fontColor ? fontColor : "text.secondary"}
          sx={{ pt: 1, pl: 1 }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary" sx={{ pl: 1 }}>
            {subtitle}
          </Typography>
        )}
      </Stack>
    </CardContent>
  </Card>
);

const ClientDashboard = () => {
  const theme = useTheme();
  return (
    <Box sx={{}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          mb: 3,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            IP Conflicts Report
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <DashboardCard
              icon={<ShieldIcon />}
              title="Private IP"
              value="Acceptability Division"
              color="#9c27b0"
            />
            <DashboardCard
              icon={<ShieldIcon />}
              title="Public IP"
              value="By private provider"
              color="#ff9800"
            />
            <DashboardCard
              icon={<ShieldIcon />}
              title="Public IP"
              value="By private provider"
              color="#ff9800" // orange color
              backgroundColor="#fff3e0" // light orange background
              fontColor="#5d4037" // dark brown text
            />

            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0px 2px 12px rgba(0,0,0,0.08)",
                background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                position: "relative",
                overflow: "hidden",
                minWidth: 240,
              }}
            >
              <CardContent sx={{ p: 3, position: "relative", zIndex: 1 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar
                    sx={{
                      bgcolor: alpha("#1976d2", 0.2),
                      color: "#0d47a1",
                      width: 48,
                      height: 48,
                    }}
                  >
                    <CloudIcon /> {/* Or any other relevant icon */}
                  </Avatar>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      color="#0d47a1"
                      gutterBottom
                    >
                      Cloud Storage
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="medium"
                      color="#1565c0"
                    >
                      85% Utilized
                    </Typography>
                  </Box>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={85}
                  sx={{
                    mt: 2,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: alpha("#1976d2", 0.2),
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#1976d2",
                      borderRadius: 3,
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  color="#1565c0"
                  sx={{ mt: 1, display: "block" }}
                >
                  42.5GB of 50GB used
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Card
            sx={{
              backgroundColor: "#cdecff",
              borderRadius: 2,
              mb: 3,
              p: 2,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  bgcolor: alpha("#2600ff", 0.2),
                  color: "#00ff11",
                  width: 40,
                  height: 40,
                }}
              >
                <BonusIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Bonus of the month
                </Typography>
                <Typography variant="body2">
                  You have Bonus $100
                  <br />
                  10 Free Spins
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  ml: "auto",
                  backgroundColor: "#d000ff",
                  "&:hover": { backgroundColor: "#f57c00" },
                }}
              >
                Claim Bonus
              </Button>
            </Stack>
          </Card>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Protection Status */}

        {/* Network Health Card (50% width alternative) */}
        {/* <Card
          sx={{
            borderRadius: 2,
            height: "100%",
            background: "linear-gradient(195deg, #f8f9fa 0%, #e9ecef 100%)",
            position: "relative",
            width: "25%",
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar
                sx={{
                  bgcolor: alpha("#6c757d", 0.2),
                  color: "#495057",
                  mr: 2,
                }}
              >
                <LanIcon />
              </Avatar>
              <Typography variant="subtitle1" fontWeight="bold" color="#495057">
                Network Health
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
                position: "relative",
              }}
            >
              <Typography
                variant="h3"
                fontWeight="medium"
                sx={{ mr: 2, color: "#2b8a3e" }}
              >
                98%
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Uptime this month
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={98}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    mt: 0.5,
                    backgroundColor: alpha("#2b8a3e", 0.2),
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#2b8a3e",
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                textAlign: "center",
              }}
            >
              <Box>
                <Typography variant="body1" fontWeight="medium">
                  24ms
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Avg Latency
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" fontWeight="medium">
                  0.2%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Packet Loss
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" fontWeight="medium">
                  1.2Gbps
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Throughput
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card> */}
        {/* Overview */}
        <Card sx={{ mb: 2, borderRadius: 2, width: "60%" }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Overview
            </Typography>
            <Typography variant="body1" mb={2}>
              26 issues total
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <DashboardPieChart sourceData={issueData} COLORS={COLORS} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Stack spacing={2}>
                  {issueData.map((issue, index) => (
                    <Box key={index}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={0.5}
                      >
                        <Typography
                          variant="body2"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Box
                            component="span"
                            sx={{
                              display: "inline-block",
                              width: 10,
                              height: 10,
                              backgroundColor: COLORS[index % COLORS.length],
                              mr: 1,
                              borderRadius: "2px",
                            }}
                          />
                          {issue.name}
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {issue.value}%
                        </Typography>
                      </Stack>
                      <Box
                        sx={{
                          height: 6,
                          backgroundColor: alpha(
                            COLORS[index % COLORS.length],
                            0.2
                          ),
                          borderRadius: 3,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            height: "100%",
                            backgroundColor: COLORS[index % COLORS.length],
                            width: `${issue.value}%`,
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3, borderRadius: 2, width: "40%" }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Protection Status
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="h4" sx={{ mr: 2 }}>
                80%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={80}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  flexGrow: 1,
                  backgroundColor: alpha("#4caf50", 0.2),
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#4caf50",
                    borderRadius: 5,
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Box>
                <Typography variant="body2">9.5k</Typography>
                <Typography variant="caption" color="text.secondary">
                  Total Files
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2">8k</Typography>
                <Typography variant="caption" color="text.secondary">
                  Scanned Files
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2">Nov, 2023</Typography>
                <Typography variant="caption" color="text.secondary">
                  Average Protection
                </Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Check what you can do to be fully protected. Check what you can do
              to be fully protected. Check what you can do to be fully
              protected. Check what you can do to be fully protected.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Timeline - Simplified version */}
      <Box sx={{ height: 100, mt: 3 }}>
        <Typography variant="caption" color="text.secondary">
          Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec Jan
        </Typography>
      </Box>
    </Box>
  );
};

export default ClientDashboard;
