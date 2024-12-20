import React, { useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { useSearchParams } from 'react-router-dom';
import ProductListSearch from './ProductListSearch';
import { setSearchQuery } from '../store/slices/productsSlice';
import { Product } from '../types/Product';
import { Grid } from '@mui/material';
import ProductFilters from './ProductFilters';
import { ArrowBack, IconButton, Search } from '@mui/icons-material';
import { TextField } from '@mui/material';

const SearchResults: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  // Get filtered products directly from Redux store
  const filteredProducts = useSelector((state: RootState) => 
    state.products.items.filter(product => 
      product.name.toLowerCase().includes(state.products.filters.searchQuery.toLowerCase())
    )
  );

  // Update search query in Redux when URL changes
  useEffect(() => {
    dispatch(setSearchQuery(searchQuery));
  }, [searchQuery, dispatch]);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={handleBack} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" component="h1">
            Search Results
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Filters Section */}
          <Grid item xs={12} md={2} lg={2}>
            <ProductFilters />
          </Grid>
          
          {/* Products Grid */}
          <Grid item xs={12} md={10} lg={10}>
            <Box>
              {/* Search Bar */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  size="medium"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(event) => {
                    const query = event.target.value;
                    dispatch(setSearchQuery(query));
                    searchParams.set('q', query);
                  }}
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <Search />
                    ),
                    sx: {
                      backgroundColor: 'white',
                      '&:hover': {
                        backgroundColor: 'white',
                      },
                      borderRadius: 1,
                    }
                  }}
                />
              </Box>

              {filteredProducts.length === 0 ? (
                <Typography variant="body1">
                  No products found matching "{searchQuery}"
                </Typography>
              ) : (
                <>
                  <Typography variant="body1" gutterBottom>
                    Found {filteredProducts.length} products
                  </Typography>
                  <ProductListSearch 
                    products={filteredProducts} 
                    searchQuery={searchQuery} 
                  />
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SearchResults;
