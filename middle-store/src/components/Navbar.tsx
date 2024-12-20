import React from 'react';
import { AppBar, Toolbar, Typography, Button, Badge, IconButton, Box, Container } from '@mui/material';
import { ShoppingCart, Favorite } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import CategoryHeader from './CategoryHeader';

const Navbar = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="fixed" sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: '100%',
        backgroundColor: 'white',
        color: 'black',
      }}>
        <Container maxWidth={false}>
          <Toolbar sx={{ width: '100%', justifyContent: 'space-between' }}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                gap: 2 
              }}
              onClick={() => navigate('/')}
            >
              <img 
                src="/vite.svg" 
                alt="WebGauntlet Logo" 
                style={{ 
                  height: '32px',
                  width: 'auto'
                }} 
              />
              <Typography 
                variant="h6" 
                component="div" 
              >
                Web Shop
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                href="http://localhost:3000"
                target="_blank"
                sx={{
                  bgcolor: '#5D3FD3',
                  '&:hover': { bgcolor: '#4930A3' }
                }}
              >
                Search Engine
              </Button>
              <Button
                variant="contained"
                color="primary"
                href="http://localhost:3001"
                target="_blank"
                sx={{
                  bgcolor: '#5D3FD3',
                  '&:hover': { bgcolor: '#4930A3' }
                }}
              >
                WebGauntlet
              </Button>
              <Button
                variant="contained"
                color="primary"
                href="http://localhost:3002"
                target="_blank"
                sx={{
                  bgcolor: '#5D3FD3',
                  '&:hover': { bgcolor: '#4930A3' }
                }}
              >
                Web Premium
              </Button>
              <Button
                variant="contained"
                color="primary"
                href="http://localhost:3003"
                target="_blank"
                sx={{
                  bgcolor: '#5D3FD3',
                  '&:hover': { bgcolor: '#4930A3' }
                }}
              >
                Web Shop
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton 
                color="inherit"
                onClick={() => navigate('/wishlist')}
              >
                <Badge badgeContent={wishlistItems.length} color="error">
                  <Favorite />
                </Badge>
              </IconButton>
              
              <IconButton 
                color="inherit"
                onClick={() => navigate('/cart')}
              >
                <Badge badgeContent={cartItems.length} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
