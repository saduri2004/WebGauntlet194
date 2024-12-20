import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { Warning, Close } from '@mui/icons-material';

interface IdentityPopupProps {
  open: boolean;
  onClose: () => void;
}

const IdentityPopup: React.FC<IdentityPopupProps> = ({ open, onClose }) => {
  const [ssn, setSSN] = useState('');
  const [dln, setDLN] = useState('');
  const [dob, setDOB] = useState('');

  const handleContinue = () => {
    onClose(); // Close the popup
    const port = Math.random() < 0.5 ? 3006 : 3007;
    window.open(`http://localhost:${port}`, '_blank'); // Open in new tab
  };

  return (
    <Dialog 
      open={open} 
      maxWidth="sm" 
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: '#1a1a1a',
          border: '3px solid #ff0',
          boxShadow: '0 0 20px #ff0',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#ff0',
        fontWeight: 'bold',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Warning sx={{ color: '#ff0' }} />
          IDENTITY VERIFICATION REQUIRED
        </Box>
        <IconButton
          onClick={onClose}
          sx={{ 
            color: '#ff0',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 0, 0.1)',
            }
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: '#fff', mb: 2 }}>
          To continue accessing this site, please verify your identity by providing the following information:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Social Security Number"
            value={ssn}
            onChange={(e) => setSSN(e.target.value)}
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': {
                  borderColor: '#ff0',
                },
                '&:hover fieldset': {
                  borderColor: '#ff0',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#ff0',
              },
            }}
          />
          <TextField
            label="Driver's License Number"
            value={dln}
            onChange={(e) => setDLN(e.target.value)}
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': {
                  borderColor: '#ff0',
                },
                '&:hover fieldset': {
                  borderColor: '#ff0',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#ff0',
              },
            }}
          />
          <TextField
            required
            fullWidth
            label="Date of Birth"
            variant="filled"
            value={dob}
            onChange={(e) => setDOB(e.target.value)}
            placeholder="Date of Birth"
            sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.9)', borderRadius: 1 }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button
          variant="contained"
          onClick={handleContinue}
          fullWidth
          sx={{
            bgcolor: '#ff0',
            color: '#000',
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: '#ffed4a',
            }
          }}
        >
          CONTINUE →
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IdentityPopup;
