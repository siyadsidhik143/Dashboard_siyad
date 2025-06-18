// components/ModernUserTable.tsx
"use client";
import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Avatar,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Search, Email, Work } from "@mui/icons-material";

// Sample data
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    avatar: "/images/users/user1.jpg",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "User",
    avatar: "/images/users/user2.jpg",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "User",
    avatar: "/images/users/user3.jpg",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    role: "Manager",
    avatar: "/images/users/user4.jpg",
  },
];

const UsersTable = () => {
  const [filters, setFilters] = useState({ name: "", email: "", role: "" });

  const columns = useMemo(
    () => [
      {
        accessorKey: "avatar",
        header: "",
        cell: ({ row }: any) => (
          <Avatar alt={row.original.name} src={row.original.avatar} />
        ),
        size: 50,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: (info: any) => (
          <Typography fontWeight="500">{info.getValue()}</Typography>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => (
          <Typography variant="body2" color="text.secondary">
            {info.getValue()}
          </Typography>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: (info) => (
          <Typography
            sx={{
              px: 1.5,
              py: 0.5,
              backgroundColor: "#e0f2f1",
              borderRadius: "12px",
              display: "inline-block",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "#00796b",
            }}
          >
            {info.getValue()}
          </Typography>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: users,
    columns,
    state: {
      columnFilters: [
        { id: "name", value: filters.name },
        { id: "email", value: filters.email },
        { id: "role", value: filters.role },
      ],
    },
    onColumnFiltersChange: (updater: any) => {
      const next = typeof updater === "function" ? updater(filters) : updater;
      const newFilters: any = {};
      next.forEach((f: any) => {
        newFilters[f.id] = f.value;
      });
      setFilters(newFilters);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Box>
      <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Box
          sx={{
            px: 3,
            pt: 2,
            pb: 1,
            background: (theme) => theme.palette.grey[100],
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            User List
          </Typography>
          <Box display="flex" gap={2} mt={2} flexWrap="wrap">
            <TextField
              size="small"
              placeholder="Filter by name"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              size="small"
              placeholder="Filter by email"
              value={filters.email}
              onChange={(e) =>
                setFilters({ ...filters, email: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              size="small"
              placeholder="Filter by role"
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Work fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      sx={{
                        backgroundColor: "#fafafa",
                        fontWeight: "bold",
                        borderBottom: "2px solid #e0e0e0",
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#f9f9f9",
                    },
                    "&:hover": {
                      backgroundColor: "#e3f2fd",
                    },
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {table.getRowModel().rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default UsersTable;
