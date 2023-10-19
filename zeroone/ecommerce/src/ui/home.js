import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Axios from 'axios';
import { Grid, Select, MenuItem, Button, Typography, Card, CardContent, Stack } from '@mui/material';

function Homepage() {
  const [category, setCategory] = useState('');
  const [searchStatus, setSearchStatus] = useState(true);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const uri = "http://localhost:7000/api/item";

  useEffect(() => {
    Axios.get(uri)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const fetchSellerData = async () => {
    try {
      if (!category || category === '') {
        console.log('category is empty. Cannot fetch data.');
        return;
      }

      console.log('Fetching data for category:', category);
      const response = await Axios.post('http://localhost:7000/api/item/item/:category', { category: category });
      setData2(response.data);
    } catch (error) {
      setData2([]);
      console.error('Error fetching data: ', error);
    }
  };

  const handleData = () => {
    setSearchStatus(true);
    fetchSellerData();
  };

  const handleSearchChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      
      <Navbar />
     <Stack sx={{m:10}}>
        <h1 align="center">Welcome to our Electronics Store</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Select
            variant="outlined"
            value={category}
            onChange={handleSearchChange}
            fullWidth
            size="large"
            displayEmpty
            inputProps={{ 'aria-label': 'Select search term' }}
            sx={{ backgroundColor: 'white' }}
          >
            <MenuItem value="" disabled>
              Select category
            </MenuItem>
            <MenuItem value="Televisions">Televisions</MenuItem>
            <MenuItem value="Air Conditioners">Air Conditioners</MenuItem>
            <MenuItem value="Mobile">Mobile</MenuItem>
            <MenuItem value="Printer">Printer</MenuItem>
            <MenuItem value="Fan">Fan</MenuItem>
            <MenuItem value="Rice Cooker">Rice Cooker</MenuItem>
          </Select>
          <Button variant="contained" color="primary" onClick={handleData}>
            Search
          </Button>
        </div>
        <p>Explore our wide range of electronic products at the best prices!</p>

        {/* Render the retrieved data using Grid and Card components for data1 */}
        {searchStatus && data.length > 0 && (
          <Grid container spacing={3}>
            {data.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {item.ProductName}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Price: {item.Price} | Stock Quantity: {item.StockQuantity}
                    </Typography>
                    <Typography variant="body2">
                      Brand: {item.Brand}<br />
                      Specifications: {item.Specifications}<br />
                      Category: {item.category}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Render the retrieved data using Grid and Card components for data2 */}
        {searchStatus && data2.length > 0 && (
          <Grid container spacing={3}>
            {data2.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <Card sx={{ minWidth: 275 ,  backgroundColor: '#f0f0f0'}}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {item.ProductName}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Price: {item.Price} | Stock Quantity: {item.StockQuantity}
                    </Typography>
                    <Typography variant="body2">
                      Brand: {item.Brand}<br />
                      Specifications: {item.Specifications}<br />
                      Category: {item.category}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </div>
  );
}

export default Homepage;
