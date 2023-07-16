import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Typography,
} from "@mui/material";

const BASE_URL = "http://localhost:3001";

function App() {
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState({
    financialYear: "",
    invoiceNumber: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = () => {
    axios
      .get(`${BASE_URL}/invoices/filter`, { params: filter })
      .then((response) => setInvoices(response.data))
      .catch((error) => console.log(error));
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleSearch = () => {
    fetchInvoices();
  };

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            name="financialYear"
            label="Financial Year"
            variant="outlined"
            fullWidth
            value={filter.financialYear}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            name="invoiceNumber"
            label="Invoice Number"
            variant="outlined"
            fullWidth
            value={filter.invoiceNumber}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            name="startDate"
            label="Start Date"
            variant="outlined"
            fullWidth
            type="date"
            value={filter.startDate}
            onChange={handleFilterChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            name="endDate"
            label="End Date"
            variant="outlined"
            fullWidth
            type="date"
            value={filter.endDate}
            onChange={handleFilterChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice Date</TableCell>
                  <TableCell>Invoice Number</TableCell>
                  <TableCell>Invoice Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.invoiceDate}</TableCell>
                    <TableCell>{invoice.invoiceNumber}</TableCell>
                    <TableCell>{invoice.invoiceAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
