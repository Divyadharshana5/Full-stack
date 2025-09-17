import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Pagination,
  Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import dayjs from 'dayjs';
import { countriesData } from './countriesData';
import { citiesData } from './citiesData';

const initialData = [
  {
    id: 1,
    firstName: 'Nikunj',
    lastName: 'Satasiya',
    dateOfBirth: '04-08-1996',
    emailId: 'info.codingvila@gmail.com',
    gender: 'Male',
    country: 'India',
    state: 'Gujarat',
    city: 'Surat',
    address: 'Surat City',
    pincode: '395030'
  },
  {
    id: 2,
    firstName: 'Hiren',
    lastName: 'Dobariya',
    dateOfBirth: '02-06-1996',
    emailId: 'hirendobariya@gmail.com',
    gender: 'Male',
    country: 'India',
    state: 'Gujarat',
    city: 'Rajkot',
    address: 'Rajkot City',
    pincode: '562366'
  },
  {
    id: 3,
    firstName: 'Shreya',
    lastName: 'Patel',
    dateOfBirth: '03-03-1995',
    emailId: 'shreya.patel@gmail.com',
    gender: 'Female',
    country: 'United States',
    state: 'Texas',
    city: 'Alton',
    address: 'Alton City',
    pincode: '145203'
  }
];

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    emailId: '',
    gender: '',
    country: '',
    state: '',
    city: '',
    address: '',
    pincode: ''
  });
  
  const [data, setData] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filter, setFilter] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: value
      };
      
      // Reset state and city when country changes
      if (field === 'country') {
        newData.state = '';
        newData.city = '';
      }
      
      // Reset city when state changes
      if (field === 'state') {
        newData.city = '';
      }
      
      return newData;
    });
  };

  const handleSubmit = () => {
    if (formData.firstName && formData.lastName && formData.emailId) {
      const newEntry = {
        ...formData,
        id: data.length + 1,
        dateOfBirth: formData.dateOfBirth ? dayjs(formData.dateOfBirth).format('DD-MM-YYYY') : ''
      };
      setData([...data, newEntry]);
      handleReset();
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      emailId: '',
      gender: '',
      country: '',
      state: '',
      city: '',
      address: '',
      pincode: ''
    });
  };

  const handleRowSelect = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(data.map(row => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleEdit = (id) => {
    const item = data.find(d => d.id === id);
    if (item) {
      setFormData({
        ...item,
        dateOfBirth: item.dateOfBirth ? dayjs(item.dateOfBirth, 'DD-MM-YYYY') : null
      });
    }
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Header */}
        <Box sx={{ 
          backgroundColor: '#f9c74f', 
          p: 2, 
          borderRadius: 1, 
          mb: 3,
          boxShadow: 1
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
            Angular 12 CRUD Example with Web API
          </Typography>
        </Box>

        {/* Form */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="FirstName"
                variant="outlined"
                size="small"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="LastName"
                variant="outlined"
                size="small"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Date of Birth"
                value={formData.dateOfBirth}
                onChange={(newValue) => handleInputChange('dateOfBirth', newValue)}
                renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                slotProps={{ textField: { fullWidth: true, size: 'small' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Email ID"
                variant="outlined"
                size="small"
                value={formData.emailId}
                onChange={(e) => handleInputChange('emailId', e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
                <RadioGroup
                  row
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                >
                  <FormControlLabel 
                    value="Male" 
                    control={<Radio size="small" sx={{ color: '#f9c74f', '&.Mui-checked': { color: '#f9c74f' } }} />} 
                    label="Male" 
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                  <FormControlLabel 
                    value="Female" 
                    control={<Radio size="small" sx={{ color: '#f9c74f', '&.Mui-checked': { color: '#f9c74f' } }} />} 
                    label="Female" 
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Country</InputLabel>
                <Select
                  value={formData.country}
                  label="Country"
                  onChange={(e) => handleInputChange('country', e.target.value)}
                >
                  {Object.keys(countriesData).sort().map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>State</InputLabel>
                <Select
                  value={formData.state}
                  label="State"
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  disabled={!formData.country}
                >
                  {formData.country && countriesData[formData.country] ? 
                    countriesData[formData.country].map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    )) : []
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>City</InputLabel>
                <Select
                  value={formData.city}
                  label="City"
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  disabled={!formData.state}
                >
                  {formData.country && formData.state && citiesData[formData.country] && citiesData[formData.country][formData.state] ? 
                    citiesData[formData.country][formData.state].map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    )) : []
                  }
                  {/* Fallback option for manual entry if no cities available */}
                  {formData.state && (!citiesData[formData.country] || !citiesData[formData.country][formData.state]) && (
                    <MenuItem value="" disabled>
                      <em>No cities available - you can type manually in address</em>
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                size="small"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Pincode"
                variant="outlined"
                size="small"
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              onClick={handleSubmit}
              sx={{ 
                backgroundColor: '#6c757d', 
                '&:hover': { backgroundColor: '#5a6268' },
                textTransform: 'none'
              }}
            >
              Submit
            </Button>
            <Button 
              variant="contained" 
              onClick={handleReset}
              sx={{ 
                backgroundColor: '#f9c74f', 
                color: '#333',
                '&:hover': { backgroundColor: '#f8b500' },
                textTransform: 'none'
              }}
            >
              Reset
            </Button>
          </Box>
        </Paper>

        {/* Filter Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="body2">Filter</Typography>
          <TextField
            size="small"
            variant="outlined"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ minWidth: 200 }}
          />
          <IconButton 
            sx={{ 
              backgroundColor: '#f9c74f', 
              '&:hover': { backgroundColor: '#f8b500' },
              color: '#333'
            }}
          >
            <FilterListIcon />
          </IconButton>
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                    checked={data.length > 0 && selectedRows.length === data.length}
                    onChange={handleSelectAll}
                    size="small"
                  />
                </TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Date Of Birth</TableCell>
                <TableCell>Email Id</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>State</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Pincode</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleRowSelect(row.id)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.dateOfBirth}</TableCell>
                  <TableCell>{row.emailId}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.state}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.pincode}</TableCell>
                  <TableCell>
                    <IconButton 
                      size="small" 
                      onClick={() => handleEdit(row.id)}
                      sx={{ 
                        backgroundColor: '#f9c74f', 
                        '&:hover': { backgroundColor: '#f8b500' },
                        color: '#333'
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDelete(row.id)}
                      sx={{ 
                        backgroundColor: '#f9c74f', 
                        '&:hover': { backgroundColor: '#f8b500' },
                        color: '#333'
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Items per page: 5
          </Typography>
          <Typography variant="body2" color="text.secondary">
            1 - 3 of 3
          </Typography>
          <Pagination count={1} page={1} size="small" />
        </Box>
      </Container>
    </LocalizationProvider>
  );
}

export default App;