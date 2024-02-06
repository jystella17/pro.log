import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import { format, addMonths, subMonths } from 'date-fns';

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
export default function MainHeader({Month, setMonth}) {
    
    // 달 앞뒤로 옮겨가기
    function prevMonth() {
        setMonth(subMonths(Month, 1))
    }
   
    const nextMonth = () => {
        setMonth(addMonths(Month, 1))
    }
    
    return (
        <CalendarHeader
        Month={Month}
        prevMonth={prevMonth}
        nextMonth={nextMonth} />
        )
    }
