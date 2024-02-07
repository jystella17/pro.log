import { useState } from "react";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Components.scss'



export default function DatePick({onChange}) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date)
    onChange(date)
  }

return (
      <div className="datepicker">
        <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy.MM.dd"
            shouldCloseOnSelect
            className='inputDate'
            dayClassName={(d) => (d.getDate() === selectedDate.getDate() ? 'selectedDay' : 'unselectedDay')}
        />
      </div>
  )
}