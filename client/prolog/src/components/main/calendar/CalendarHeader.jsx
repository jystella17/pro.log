import { format, addMonths, subMonths } from 'date-fns';

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import './CalendarHeader.css'

function CalendarHeader ({ Month, prevMonth, nextMonth }) {
    return (
        <div className="calendarHeader">
            <SlArrowLeft onClick={prevMonth} />
            <div className="yyyymm">
                <div className="mm">
                    {format(Month, 'MMMM')} 
                </div>
                <div className="yy">
                    {format(Month, 'yyyy')}
                </div>
            </div>
            <SlArrowRight onClick={nextMonth} /> 
   
        </div>
    )
}


// 달력과 칸반의 윗부분
export default function MainHeader({ Month, setMonth }) {
    
    
    // 달 앞뒤로 옮겨가기
    function prevMonth() {
        const newMonth = subMonths(Month, 1)
        setMonth(newMonth)
    }
    
    const nextMonth = () => {
        const newMonth = addMonths(Month, 1)
        setMonth(newMonth)
    }
    
    return (
        <CalendarHeader
        Month={Month}
        prevMonth={prevMonth}
        nextMonth={nextMonth} />
        )
    }
