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
        updateJDApi(newMonth)
    }
    
    const nextMonth = () => {
        const newMonth = addMonths(Month, 1)
        setMonth(newMonth)
        updateJDApi(newMonth)
    }
    
    function updateApiUrl(newMonth) {
        // newMonth에 해당하는 년도와 월을 추출하여 API 주소를 업데이트
        const year = format(newMonth, 'yyyy');
        const month = format(newMonth, 'MM');
        const newApiUrl = `your_api_endpoint/${year}/${month}`;
        setApiUrl(newApiUrl); // 새로운 API 주소를 상태로 설정
    }
    return (
        <CalendarHeader
        Month={Month}
        prevMonth={prevMonth}
        nextMonth={nextMonth} />
        )
    }
