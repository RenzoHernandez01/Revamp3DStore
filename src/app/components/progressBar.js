import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export function LinearProgressWithLabel({ value }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%'}}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            height: 13,
            borderRadius: 0.5,
            backgroundColor: 'transparent',
      
            border: '1px solid #000000ff',
          }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', }}>
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default LinearProgressWithLabel;