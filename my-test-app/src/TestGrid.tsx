import React from 'react';
import { Grid, Paper } from '@mui/material';

const TestGrid: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item sx={{ xs: 12, md: 8 }}>
        <Paper>
          <div>Test</div>
        </Paper>
      </Grid>
      <Grid item sx={{ xs: 12, md: 4 }}>
        <Paper>
          <div>Test</div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TestGrid;
