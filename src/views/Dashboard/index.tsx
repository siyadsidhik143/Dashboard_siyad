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
} from "@mui/material";

import {
  People as PeopleIcon,
  Receipt as ReceiptIcon,
  AttachMoney as RevenueIcon,
  CheckCircle as CompletedIcon,
  Schedule as PendingIcon,
} from "@mui/icons-material";
import DashboardPieChart from "./Charts/DashboardPieChart";

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

const sourceData = [
  { name: "LinkedIn", value: 2 },
  { name: "Referral", value: 1 },
  { name: "Website", value: 1 },
  { name: "Social Media", value: 1 },
  { name: "Email", value: 1 },
  { name: "Advertisement", value: 1 },
  { name: "Networking", value: 1 },
  { name: "Phone", value: 1 },
];

const DashboardCard = ({
  icon,
  title,
  value,
  color,
  backgroundColor,
  fontColor,
}: any) => (
  <Card
    sx={{
      display: "flex",
      flex: 1,
      borderRadius: 2, // Increased corner radius
      boxShadow: "0px 2px 8px rgba(0,0,0,0.1)", // Subtle shadow
      transition: "all 0.3s ease", // Smooth hover effect
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
          sx={{
            pt: 1,
            pl: 1,
          }}
        >
          {title}
        </Typography>
      </Stack>
    </CardContent>
  </Card>
);

const ClientDashboard = () => {
  const theme = useTheme();
  return (
    <Box sx={{}}>
      <Typography variant="h6" fontWeight="bold" mb={3} fontSize={20}>
        Client Overview
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
          "& > *": {
            flex: "1 1 auto",
          },
        }}
      >
        <DashboardCard
          icon={<PeopleIcon />}
          title="Active Clients"
          value="24"
          color="#4caf50"
          backgroundColor="#4861f3"
          fontColor="#ffffff"
        />
        <DashboardCard
          icon={<ReceiptIcon />}
          title="Unpaid Invoices"
          value="5"
          color="#f44336"
        />
        <DashboardCard
          icon={<RevenueIcon />}
          title="Monthly Revenue"
          value="$12,450"
          color="#2196f3"
        />
        <DashboardCard
          icon={<CompletedIcon />}
          title="Completed Projects"
          value="18"
          color="#00bcd4"
        />
        <DashboardCard
          icon={<PendingIcon />}
          title="Pending Tasks"
          value="7"
          color="#ff9800"
        />
      </Box>

      {/* Client Sources */}
      <Card sx={{ mb: 2, borderRadius: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Client Acquisition Sources
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <DashboardPieChart sourceData={sourceData} COLORS={COLORS} />
            {/* Breakdown Section */}
            <Box
              sx={{
                width: { xs: "100%", sm: "60%" },
                height: 220,
                overflow: "auto",
                pr: 1,
              }}
              className="custom-scrollbar"
            >
              <Typography variant="body2" fontWeight="medium" mb={1}>
                Source Breakdown
              </Typography>
              <Stack spacing={1.5}>
                {sourceData.map((source, index) => (
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
                        {source.name}
                      </Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {source.value}
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
                          width: `${
                            (source.value /
                              Math.max(...sourceData.map((s) => s.value))) *
                            100
                          }%`,
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
    </Box>
  );
};

export default ClientDashboard;
