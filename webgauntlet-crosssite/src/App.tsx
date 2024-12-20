import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { fetchProducts, setFilters } from './store/slices/productsSlice';
import theme from './theme';
import { StyledEngineProvider } from '@mui/material/styles';
import { NotificationManager } from './components/notifications/NotificationManager';
import { Provider } from 'react-redux';
import { store } from './store/store';
import IdentityPopup from './components/IdentityPopup';
import { AppBar, Toolbar, Button } from '@mui/material';

// Components
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './components/Wishlist';
import Checkout from './components/Checkout';

// Wrapper component to handle route-based category management
const RouteWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const categoryId = pathname.startsWith('/category/') ? pathname.split('/')[2] : '';

  React.useEffect(() => {
    if (categoryId) {
      dispatch(setFilters({ category: categoryId }));
    } else if (pathname === '/') {
      dispatch(setFilters({ category: '' }));
    }
  }, [categoryId, pathname, dispatch]);

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Router>
        <div>
          <AppBar position="static" sx={{ mb: 3, bgcolor: '#1a1a1a' }}>
            <Toolbar>
              <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center' }}>
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
            </Toolbar>
          </AppBar>

          <NotificationManager />
          <Navbar />
          <Routes>
            <Route 
              path="/" 
              element={
                <RouteWrapper>
                  <Container maxWidth={false} sx={{ flex: 1, mt: 2, px: { xs: 2, sm: 3, md: 4 } }}>
                    <ProductList />
                  </Container>
                </RouteWrapper>
              } 
            />
            <Route 
              path="/category/:categoryId" 
              element={
                <RouteWrapper>
                  <Container maxWidth={false} sx={{ flex: 1, mt: 2, px: { xs: 2, sm: 3, md: 4 } }}>
                    <ProductList />
                  </Container>
                </RouteWrapper>
              } 
            />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </Router>
    </Box>
  );
};

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <AppContent />
          <IdentityPopup open={isPopupOpen} onClose={handleClose} />
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
