import React, { useState } from "react";

import MainPageHeader from './CalendarHeader.jsx';
import CalendarFilter from './CalendarFilter.jsx'
import AddProcess from './AddProcess.jsx'
import './Calendar.scss'

import { format } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';

import { CiSquarePlus } from "react-icons/ci";

// 전체 요일 component
function Weeks() {
    const weeks = []
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    // 각 요일 component
    for (let i = 0; i < 7; i++) {
        weeks.push(
            <div className="week" key={i}>
                {week[i]}
            </div>
        )
    }

    return (
        <div className="weeks">
            {weeks}
        </div>
    )
}


// 달력 body component
function CalendarBody({ Month, selectedDate,openModalHandler }) {
    // 달의 시작일과 마지막일
    const monthStart = startOfMonth(Month)
    const monthEnd = endOfMonth(monthStart)
    
    // 전체 달력의 시작일과 마지막일
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const allDays = []          // 달력의 모든 날짜
    let oneWeek = []            // 한 주
    let day = startDate         // 페이지의 시작일
    let formattedDate = ''      // 각 날짜

    
    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {

            formattedDate = format(day, 'd')
            
            oneWeek.push(
                <div
                    // 이번달 날짜가 아니면 disabled
                    // 이번달 날짜이면 valid
                    // 오늘 날짜는 selected
                    className={`dayBox ${!isSameMonth(day, monthStart) ? 'disabled' :
                        isSameDay(day, selectedDate) ? 'selected' :
                        format(Month, 'M') !== format(day, 'M') ? 'not-valid' : 'valid'}`}
                    key={day}
                >
                    <div className="plusHover"
                        >
                        <div className={
                            format(Month, 'M') !== format(day, 'M') ? 'text not-valid' : 'text'}>
                            {formattedDate}    
                        </div>
                        <CiSquarePlus className="plusButton" onClick={openModalHandler} />    
                    </div>
                </div>
            )
            day = addDays(day, 1) 
        }
        allDays.push(
            <div className="oneWeek" key={day}>
                {oneWeek}
            </div>
        )
        oneWeek = []
    }

    return (
        <div className="allDays">{allDays}</div>
    )
}

export default function Calendar() {
    const [Month, setMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())

    const [isOpen, setIsOpen] = useState(false)

    function openModalHandler() {
        setIsOpen(!isOpen)
    }



    return (
        <div className="calendar">
            {isOpen ?
                <AddProcess openModalHandler={openModalHandler} /> :
                <div>
                    <CalendarFilter />
                    <MainPageHeader Month={Month} setMonth={setMonth} />
                    <div className="calendarBody">
                        <Weeks />
                        <CalendarBody
                            Month={Month}
                            selectedDate={selectedDate}
                            openModalHandler={openModalHandler} />
                    </div>
                </div> }    

        </div>
    )
}
