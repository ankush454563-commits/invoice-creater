import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import InvoiceList from './InvoiceList';
import InvoiceForm from './InvoiceForm';
import ClientList from './ClientList';
import ClientForm from './ClientForm';

const Dashboard: React.FC = () => {
  const [refreshKey, setRefreshKey] = React.useState(0);

  const handleInvoiceAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleClientAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Invoice Dashboard
      </Typography>
      <Box display="flex" flexDirection="column" gap={3}>
        <Box display="flex" gap={3} flexWrap="wrap">
          <Box flex={1} minWidth="300px">
            <Paper>
              <ClientList key={`client-${refreshKey}`} />
            </Paper>
          </Box>
          <Box flex={1} minWidth="300px">
            <Paper>
              <ClientForm onClientAdded={handleClientAdded} />
            </Paper>
          </Box>
        </Box>
        <Box display="flex" gap={3} flexWrap="wrap">
          <Box flex={2} minWidth="400px">
            <Paper>
              <InvoiceList key={`invoice-${refreshKey}`} />
            </Paper>
          </Box>
          <Box flex={1} minWidth="300px">
            <Paper>
              <InvoiceForm onInvoiceAdded={handleInvoiceAdded} />
            </Paper>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
