import {Typography} from '@mui/material';

const Title = ({title}: {title: string}) => {
  return (
    <Typography
      variant='h4'
      sx={{
        width: 'fit-content',
        '&::after': {
          content: '""',
          display: 'block',
          width: '80%',
          borderBottom: '3px solid #ff69b4',
        },
      }}
    >
      {title}
    </Typography>
  );
};

export default Title;
