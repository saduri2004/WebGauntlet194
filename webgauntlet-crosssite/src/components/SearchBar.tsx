import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/slices/productsSlice';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
    dispatch(setSearchQuery(query));
    
    // Navigate to search results page if we have a query
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search products..."
      value={searchTerm}
      onChange={handleSearchChange}
      sx={{
        maxWidth: '500px',
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'white',
          borderRadius: '25px',
          '&:hover fieldset': {
            borderColor: '#FF6B6B',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#FF6B6B',
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
