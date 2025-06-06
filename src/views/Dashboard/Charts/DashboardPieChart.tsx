import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Box } from "@mui/material";

type Props = {
  sourceData: any;
  COLORS: any;
};

const DashboardPieChart = ({ sourceData, COLORS }: Props) => {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "40%" },
        height: 220,
        minWidth: 200,
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={sourceData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {sourceData.map((entry: any, index: any) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name, props) => [
              value,
              `${props.payload.name} (${(props.payload.percent * 100).toFixed(
                1
              )}%)`,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default DashboardPieChart;
