import {Box, Card, Typography} from '@mui/material';
import React from 'react';
import {Vacancy} from '../constants/types';

const ShiftItem: React.FC<{vacancy: Vacancy}> = ({vacancy}) => {
  const {title, description, shifts} = vacancy;

  return (
    <Card sx={{mt: 5, p: 5, mb: 2, textAlign: 'left'}}>
      <Typography sx={{mb: 2}} variant='h6'>
        {title}
      </Typography>
      <Typography variant='body1'>{description}</Typography>
      <Card
        sx={{
          mt: 2,
          bgcolor: 'grey.900',
          color: 'white',
          p: 2,
        }}
      >
        {shifts.map((shift) => (
          <Box
            key={shift.id}
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <Typography>{shift.date}</Typography>
            <Typography>{`${shift.startTime} - ${shift.endTime}`}</Typography>
            <Typography>{shift.type}</Typography>
            <Typography>${shift.price}</Typography>
          </Box>
        ))}
      </Card>
    </Card>
  );
};

export default ShiftItem;
