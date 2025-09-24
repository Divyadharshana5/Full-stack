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
import ClearIcon from '@mui/icons-material/Clear';
import { InputAdornment } from '@mui/material';
import dayjs from 'dayjs';
import { countriesData } from './countriesData';
import { citiesData } from './citiesData';

const initialData = [];

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
    manualCity: '',
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
        newData.manualCity = '';
      }

      // Reset city when state changes
      if (field === 'state') {
        newData.city = '';
        newData.manualCity = '';
      }

      return newData;
    });
  };

  const handleSubmit = () => {
    if (formData.firstName && formData.lastName && formData.emailId) {
      const newEntry = {
        ...formData,
        id: data.length + 1,
        dateOfBirth: formData.dateOfBirth ? dayjs(formData.dateOfBirth).format('DD-MM-YYYY') : '',
        city: formData.city === 'manual' ? formData.manualCity : formData.city
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
      manualCity: '',
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
                  <FormControlLabel
                    value="Transgender"
                    control={<Radio size="small" sx={{ color: '#f9c74f', '&.Mui-checked': { color: '#f9c74f' } }} />}
                    label="Transgender"
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
                  <MenuItem value="manual">
                    <em>Enter city manually</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {formData.city === 'manual' && (
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  fullWidth
                  label="Enter City Name"
                  variant="outlined"
                  size="small"
                  value={formData.manualCity || ''}
                  onChange={(e) => handleInputChange('manualCity', e.target.value)}
                  placeholder="Type city name"
                />
              </Grid>
            )}
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


      </Container>
    </LocalizationProvider>
  );
}

export default App;