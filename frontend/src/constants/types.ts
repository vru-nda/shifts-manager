export type ShiftType = 'Consultation' | 'Telephone' | 'Ambulance';

export type Vacancy = {
  id: number;
  title: string;
  description: string;
  shifts: Shift[];
};

export type Shift = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  type: ShiftType;
  price: number;
};
