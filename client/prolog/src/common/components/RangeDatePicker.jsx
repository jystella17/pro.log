import { useState } from "react";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Components.scss'


export default function RangeDatePick({name}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="yyyy.MM.dd"
        selectsStart
        startDate={startDate}
        endDate={endDate}
        className={name}
        dayClassName={(d) => (d.getDate() === startDate.getDate() ? 'selectedDay' : 'unselectedDay')}
      /> -
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        dateFormat="yyyy.MM.dd"
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        className={name}
        dayClassName={(d) => (d.getDate() === endDate.getDate() ? 'selectedDay' : 'unselectedDay')}
      />
    </>
  );
};