import {vacancyList} from '../constants/constants';
import ShiftItem from './ShiftItem';

const ShiftList = () => {
  return (
    <>
      {vacancyList.map((vacancy) => (
        <ShiftItem key={vacancy.id} vacancy={vacancy} />
      ))}
    </>
  );
};

export default ShiftList;
