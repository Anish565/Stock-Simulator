import React, { useEffect, useState } from 'react';
import { Card, Typography, Divider, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fetchSessionInfo } from '../../utils/apiService';
import { useParams } from 'react-router-dom';





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

interface StockInfo {
  totalStockValue: number;
  currentWorth: number;
  walletBalance: number;
}

interface SessionInfo {
  startAmount: number;
  sessionId: string;
  sortKey: string;
  targetAmount: number;
  userId: string;
  inProgress: boolean;
  duration: string;
  name: string;
}

const SessionInfo: React.FC = () => {
  const [stockInfo, setStockInfo] = useState<StockInfo | null>(null);
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id: sessionId } = useParams<{ id: string }>();

  useEffect(() => {
    const loadSessionInfo = async () => {
      if (!sessionId) {
        setError('No session ID provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchSessionInfo(sessionId);
        console.log("Response:", response);
        setStockInfo(response.stockInfo);
        setSessionInfo(response.sessionInfo);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while loading session info');
      } finally {
        setIsLoading(false);
      }
    };

    loadSessionInfo();
  }, [sessionId]);

  if (isLoading) {
    return (
      <StyledCard elevation={0} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </StyledCard>
    );
  }

  if (error || !stockInfo || !sessionInfo) {
    return (
      <StyledCard elevation={0}>
        <Typography color="error" align="center">
          {error || 'Unable to load session information'}
        </Typography>
      </StyledCard>
    );
  }

  const profitLoss = stockInfo.currentWorth - stockInfo.totalStockValue;
  const profitLossPercentage = ((profitLoss) / stockInfo.totalStockValue * 100).toFixed(2);

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
        {sessionInfo.name}
      </Typography>
      <Divider sx={{ my: 3 }} />
      
      <InfoRow>
        <Label>Session ID</Label>
        <Value>{sessionId}</Value>
      </InfoRow>
      
      <InfoRow>
        <Label>Starting Amount</Label>
        <Value>${sessionInfo.startAmount.toLocaleString()}</Value>
      </InfoRow>
      
      <InfoRow>
        <Label>Wallet Balance</Label>
        <Value>${stockInfo.walletBalance.toLocaleString()}</Value>
      </InfoRow>
      
      <InfoRow>
        <Label>Stock Value</Label>
        <Value>${stockInfo.totalStockValue.toLocaleString()}</Value>
      </InfoRow>
      
      <InfoRow>
        <Label>Target Amount</Label>
            <Value>${sessionInfo.targetAmount.toLocaleString()}</Value>
      </InfoRow>
      
      <InfoRow>
        <Label>Duration</Label>
        <Value>{sessionInfo.duration}</Value>
      </InfoRow>
      
      <Divider sx={{ my: 3 }} />
      
      <InfoRow>
        <Label>Current Value</Label>
          <Value sx={{ fontSize: '1.1rem' }}>${stockInfo.currentWorth.toLocaleString()}</Value>
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
