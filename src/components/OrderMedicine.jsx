import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Chip, TextField, Autocomplete, CircularProgress } from '@mui/material';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { CloseRounded } from '@mui/icons-material';

const OrderMedicine = ({ clientName, caregiverName, orderDate, selectedPlan }) => {
  const [medicineOptions, setMedicineOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [medicineOrders, setMedicineOrders] = useState([]);

  const fetchMedicineOptions = async () => {
    setLoading(true);
    try {
      const firestore = getFirestore();
      const medicinesCollection = collection(firestore, 'Medicines');
      const medicinesSnapshot = await getDocs(medicinesCollection);
      const options = medicinesSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setMedicineOptions(options);
    } catch (error) {
      console.error('Error fetching medicine options:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicineOptions();
  }, []);

  const handleMedicineSelect = (event, value) => {
    if (value) {
      setMedicineOrders((prevOrders) => [...prevOrders, { name: value.name, quantity: '' }]);
      setOpen(false);
    }
  };

  const handleQuantityChange = (index, quantity) => {
    setMedicineOrders((prevOrders) => {
      const updatedOrders = [...prevOrders];
      updatedOrders[index].quantity = quantity;
      return updatedOrders;
    });
  };

  const handleMedicineDelete = (index) => {
    setMedicineOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order Medicine
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1">Client Name: {clientName}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Caregiver Name: {caregiverName}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Order Date: {orderDate}</Typography>
        </Grid>
        
        <Grid item xs={12}>
          <Autocomplete
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            options={medicineOptions}
            loading={loading}
            getOptionLabel={(option) => option.name}
            onChange={handleMedicineSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search for Medicine"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {medicineOrders.map((order, index) => (
              <Chip
                key={index}
                label={`${order.name} - Quantity: ${order.quantity}`}
                onDelete={() => handleMedicineDelete(index)}
                deleteIcon={<CloseRounded />}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12}>
          {medicineOrders.map((order, index) => (
            <TextField
              key={index}
              label="Quantity"
              type="number"
              value={order.quantity}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
              margin="normal"
            />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderMedicine;