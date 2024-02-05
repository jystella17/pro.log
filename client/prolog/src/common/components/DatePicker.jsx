import { useState } from "react";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Components.scss'



export default function DatePick() {
  const [selectedDate, setSelectedDate] = useState(new Date());

return (
      <div className="datepicker">
        <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy.MM.dd"
            shouldCloseOnSelect
            className='inputDate'
            dayClassName={(d) => (d.getDate() === selectedDate.getDate() ? 'selectedDay' : 'unselectedDay')}
        />
      </div>
  )
}