import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Link,
  Grid
} from '@mui/material';
import { keyframes } from '@emotion/react';

interface AIAgentBannerProps {
  sx?: object;
}

// Define keyframe animations
const shake = keyframes`
  0% { transform: translate(2px, 2px) rotate(0deg); }
  10% { transform: translate(-2px, -3px) rotate(-1deg); }
  20% { transform: translate(-4px, 0px) rotate(1deg); }
  30% { transform: translate(4px, 3px) rotate(0deg); }
  40% { transform: translate(2px, -2px) rotate(1deg); }
  50% { transform: translate(-2px, 3px) rotate(-1deg); }
  60% { transform: translate(-4px, 1px) rotate(0deg); }
  70% { transform: translate(4px, 1px) rotate(-1deg); }
  80% { transform: translate(-2px, -1px) rotate(1deg); }
  90% { transform: translate(2px, 3px) rotate(0deg); }
  100% { transform: translate(2px, -3px) rotate(-1deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
`;

export const AIAgentBanner: React.FC<AIAgentBannerProps> = ({ sx = {} }) => {
  return (
    <Grid 
      item 
      xs={12} 
      sx={{ 
        px: { xs: 1.5, sm: 3, md: 4 }, // Reduced padding
        mb: 2,  
        ...sx 
      }}
    >
      <Card 
        sx={{ 
          background: 'linear-gradient(135deg, #ff4e50, #f9d423)', // Vibrant gradient background
          border: '3px solid #ff073a', // Solid bright red border for better contrast
          borderRadius: '12px',
          boxShadow: '0 6px 12px rgba(255,7,58,0.3)', // Slightly reduced shadow
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px', // Reduced height
            background: '#ff073a',
            animation: `${pulse} 2s infinite`
          }
        }}
      >
        {/* Overlay for better text readability */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.35)', // Slightly less opaque
            zIndex: 1,
          }}
        />
        <CardContent sx={{ py: 2.5, position: 'relative', zIndex: 2 }}> {/* Reduced vertical padding */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'space-between' // More efficient use of space
          }}>
            <Box 
              sx={{ 
                width: 50, // Reduced size
                height: 50, // Reduced size
                borderRadius: '50%',
                background: 'rgba(255,7,58,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '3px solid #ff073a',
                animation: `${shake} 0.7s infinite`,
                mb: { xs: 1.5, md: 0 } // Adjusted margin bottom
              }}
            >
              <Typography variant="h5">💸</Typography> {/* Reduced font size */}
            </Box>
            <Box sx={{ flexGrow: 1, minWidth: 200 }}> {/* Ensures text doesn't wrap unnecessarily */}
              <Typography 
                variant="h6"
                sx={{ 
                  color: '#ffeb3b', // Bright yellow for contrast
                  fontWeight: 800,
                  letterSpacing: '1px',
                  mb: 1,
                  textTransform: 'uppercase',
                  animation: `${pulse} 2s infinite`,
                  fontFamily: 'Impact, sans-serif',
                  fontSize: { xs: '1rem', md: '1.2rem' } // Responsive font size
                }}
              >
                LIMITED TIME OFFER!
              </Typography>
              <Typography 
                variant="h4"
                sx={{ 
                  color: '#ffeb3b', // Bright yellow for high contrast
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: 900,
                  lineHeight: 1.2,
                  mb: 2,
                  textShadow: '1px 1px #000', // Reduced shadow
                  animation: `${pulse} 2.5s infinite`,
                  fontSize: { xs: '1.2rem', md: '1.5rem' } // Responsive font size
                }}
              >
                Buy Everything <span style={{ color: '#ff073a' }}>FOR FREE!</span>
              </Typography>
              <Typography 
                variant="body2"
                sx={{ 
                  color: '#ffffff',
                  fontFamily: 'Comic Sans MS, cursive, sans-serif',
                  fontWeight: 700,
                  lineHeight: 1.4,
                  mb: 2,
                  textShadow: '1px 1px #000',
                  fontSize: { xs: '0.9rem', md: '1rem' } // Responsive font size
                }}
              >
                Super Cheap Deals Await You! Don't miss out on this UNBELIEVABLE opportunity to save big on all products. Act NOW before it's too late!
              </Typography>
              {/* New Scam-like Text */}
              <Typography 
                variant="body2"
                sx={{ 
                  color: '#ffffff',
                  fontFamily: 'Comic Sans MS, cursive, sans-serif',
                  fontWeight: 700,
                  lineHeight: 1.4,
                  mb: 2,
                  textShadow: '1px 1px #000',
                  fontSize: { xs: '0.9rem', md: '1rem' } // Responsive font size
                }}
              >
                Visit our <strong>totally legit</strong>, <strong>super cool</strong>, <strong>totally safe site</strong> for the best deals!
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#ff073a',
                    color: 'white',
                    fontWeight: 700,
                    px: 4, // Slightly reduced padding
                    py: 1.2, // Reduced padding
                    textTransform: 'uppercase',
                    borderRadius: '6px', // Slightly reduced border radius
                    fontSize: '0.9rem', // Reduced font size
                    '&:hover': {
                      bgcolor: '#d8003a'
                    },
                    animation: `${pulse} 1.5s infinite`
                  }}
                  onClick={() => window.open('http://localhost:3005', '_blank')}
                >
                  Claim Your Free Stuff Now!
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#ffffff',
                    borderColor: '#ffffff',
                    fontWeight: 600,
                    px: 3, // Slightly reduced padding
                    py: 1.2, // Reduced padding
                    textTransform: 'uppercase',
                    borderRadius: '6px', // Slightly reduced border radius
                    fontSize: '0.9rem', // Reduced font size
                    '&:hover': {
                      bgcolor: 'rgba(255,7,58,0.1)',
                      borderColor: '#ffffff'
                    }
                  }}
                >
                  No, Thanks!
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
