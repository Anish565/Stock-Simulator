import React from 'react';
import { Card, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

interface SessionInfoProps {
  sessionId: string;
  sessionName: string;
  startAmount: number;
  investedAmount: number;
  targetAmount: number;
  duration: string; // e.g. "30 days" or "2024-01-01 to 2024-12-31"
  currentValue: number;
}

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
  borderRadius: theme.spacing(2),
}));

const InfoRow = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  transition: 'background-color 0.2s ease',
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
}));

const Label = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
  fontSize: '0.875rem',
  letterSpacing: '0.1px',
}));

const Value = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
}));

const SessionInfo: React.FC<SessionInfoProps> = ({
  sessionId,
  sessionName,
  startAmount,
  investedAmount,
  targetAmount,
  duration,
  currentValue,
}) => {
  const profitLoss = currentValue - startAmount;
  const profitLossPercentage = ((profitLoss / startAmount) * 100).toFixed(2);
  
  return (
    <StyledCard elevation={0}>
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          fontWeight: 600,
          letterSpacing: '-0.5px',
          mb: 3 
        }}
      >
        {sessionName}
      </Typography>
      <Divider sx={{ my: 3 }} />
      
      <InfoRow>
        <Label>Session ID</Label>
        <Value>{sessionId}</Value>
      </InfoRow>
      
      <InfoRow>
        <Label>Starting Amount</Label>
        <Value>${startAmount.toLocaleString()}</Value>
      </InfoRow>
      
      <InfoRow>
        <Label>Amount Invested</Label>
        <Value>${investedAmount.toLocaleString()}</Value>
      </InfoRow>
      
      <InfoRow>
        <Label>Target Amount</Label>
        <Value>${targetAmount.toLocaleString()}</Value>
      </InfoRow>
      
      <InfoRow>
        <Label>Duration</Label>
        <Value>{duration}</Value>
      </InfoRow>
      
      <Divider sx={{ my: 3 }} />
      
      <InfoRow>
        <Label>Current Value</Label>
        <Value sx={{ fontSize: '1.1rem' }}>${currentValue.toLocaleString()}</Value>
      </InfoRow>
      
      <InfoRow>
        <Label>Profit/Loss</Label>
        <Value 
          sx={{ 
            color: profitLoss >= 0 ? 'success.main' : 'error.main',
            fontSize: '1.1rem'
          }}
        >
          ${Math.abs(profitLoss).toLocaleString()} ({profitLoss >= 0 ? '+' : '-'}{profitLossPercentage}%)
        </Value>
      </InfoRow>
    </StyledCard>
  );
};

export default SessionInfo;
