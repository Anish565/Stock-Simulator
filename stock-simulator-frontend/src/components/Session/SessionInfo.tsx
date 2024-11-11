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
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const InfoRow = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1),
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
    <StyledCard>
      <Typography variant="h5" gutterBottom>
        {sessionName}
      </Typography>
      <Divider sx={{ my: 2 }} />
      
      <InfoRow>
        <Typography color="textSecondary">Session ID:</Typography>
        <Typography>{sessionId}</Typography>
      </InfoRow>
      
      <InfoRow>
        <Typography color="textSecondary">Starting Amount:</Typography>
        <Typography>${startAmount.toLocaleString()}</Typography>
      </InfoRow>
      
      <InfoRow>
        <Typography color="textSecondary">Amount Invested:</Typography>
        <Typography>${investedAmount.toLocaleString()}</Typography>
      </InfoRow>
      
      <InfoRow>
        <Typography color="textSecondary">Target Amount:</Typography>
        <Typography>${targetAmount.toLocaleString()}</Typography>
      </InfoRow>
      
      <InfoRow>
        <Typography color="textSecondary">Duration:</Typography>
        <Typography>{duration}</Typography>
      </InfoRow>
      
      <Divider sx={{ my: 2 }} />
      
      <InfoRow>
        <Typography color="textSecondary">Current Value:</Typography>
        <Typography>${currentValue.toLocaleString()}</Typography>
      </InfoRow>
      
      <InfoRow>
        <Typography color="textSecondary">Profit/Loss:</Typography>
        <Typography color={profitLoss >= 0 ? 'success.main' : 'error.main'}>
          ${Math.abs(profitLoss).toLocaleString()} ({profitLoss >= 0 ? '+' : '-'}{profitLossPercentage}%)
        </Typography>
      </InfoRow>
    </StyledCard>
  );
};

export default SessionInfo;
