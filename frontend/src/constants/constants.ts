import {ShiftType, Vacancy} from './types';

export const vacancyList: Vacancy[] = [
  {
    id: 1,
    title: 'Title',
    description: 'Description goes here',
    shifts: [
      {
        id: 1,
        date: 'Dec 12, 2020',
        startTime: '09:00',
        endTime: '17:00',
        type: 'Consultation',
        price: 30,
      },
    ],
  },
  {
    id: 2,
    title: 'Title2',
    description: 'Description goes here22',
    shifts: [
      {
        id: 1,
        date: 'Dec 13, 2020',
        startTime: '09:00',
        endTime: '17:00',
        type: 'Consultation',
        price: 30,
      },
      {
        id: 2,
        date: 'Dec 14, 2020',
        startTime: '09:00',
        endTime: '17:00',
        type: 'Ambulance',
        price: 100,
      },
    ],
  },
];

export const ShiftTypesOptions: ShiftType[] = [
  'Consultation',
  'Telephone',
  'Ambulance',
];
