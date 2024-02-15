import { useState } from "react";

import DatePicker from 'react-datepicker';
import { format } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css';
import './Components.scss'



export default function DatePick({onChange, selectedDate, setSelectedDate}) {

  const handleDateChange = (date) => {
    const formattedDate = format(date, 'yyyy.MM.dd')
    setSelectedDate(formattedDate)
    onChange(formattedDate)
  }

return (
      <div className="datepicker">
        <DatePicker
            selected={selectedDate}
            onChange={onChange}
            dateFormat="yyyy.MM.dd"
            shouldCloseOnSelect
            className='inputDate'
            dayClassName={(d) => (d.getDate === selectedDate.getDate() ? 'selectedDay' : 'unselectedDay')}
        />
      </div>
  )
}