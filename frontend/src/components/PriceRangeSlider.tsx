import {Box, Slider, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useState} from 'react';

const CustomSlider = styled(Slider)(() => ({
  color: '#e0e0e0',
  height: 3,
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#ff69b4',
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 8px rgba(255, 105, 180, 0.16)`,
    },
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
  },
}));

const PriceRangeSlider = () => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);

  const handleChange = (e: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  return (
    <Box sx={{width: '100%', maxWidth: 300, px: 2}}>
      <CustomSlider
        value={priceRange}
        onChange={handleChange}
        valueLabelDisplay='auto'
        min={0}
        max={500}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 1,
        }}
      >
        <Typography>${priceRange[0]}</Typography>
        <Typography>${priceRange[1]}</Typography>
      </Box>
    </Box>
  );
};

export default PriceRangeSlider;
