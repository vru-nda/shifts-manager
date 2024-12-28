import {Typography} from '@mui/material';
import {useState} from 'react';
import './App.css';
import Title from './common/Title';
import PriceRangeSlider from './components/PriceRangeSlider';
import ShiftDrawer from './components/ShiftDrawer';
import ShiftList from './components/ShiftList';

function App() {
  const [showDrawer, setShowDrawer] = useState(false);

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div className='d-flex align-items-center'>
        <Title title='Filter' />
      </div>
      <div className='mt-2 d-flex align-items-center'>
        <Typography>Filter on price </Typography>
        <PriceRangeSlider />
      </div>
      <div className='d-flex flex-row justify-content-between align-items-center '>
        <Title title='Shift' />
        <button
          type='button'
          className='btn btn-dark px-5 py-2'
          onClick={() => setShowDrawer(true)}
        >
          ADD SHIFT
        </button>
      </div>
      <ShiftList />
      {showDrawer && (
        <ShiftDrawer
          open={showDrawer}
          onClose={() => setShowDrawer(false)}
          onSubmit={handleSubmit}
          initialData={{
            title: '',
            description: '',
            shifts: [
              {
                date: '',
                type: 'Consultation',
                startTime: '',
                endTime: '',
                price: 0,
              },
            ],
          }}
        />
      )}
    </>
  );
}

export default App;
