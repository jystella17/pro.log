import React, { useEffect, useState } from "react";
import axios from 'axios'

import MainPageHeader from './CalendarHeader.jsx';
import CalendarFilter from './CalendarFilter.jsx'
import Week from './Week.jsx'
import Recruit from './Recruit.jsx'

import { AddProcess } from './AddProcess.jsx'
import { api, fetchJD } from '../../../api/api.jsx' 

import './Calendar.scss'

import { format } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parseISO } from 'date-fns';

import { CiSquarePlus } from "react-icons/ci";


// 달력 body component
function CalendarBody({
    JDData,
    Month,
    my, all,
    selectedDate,
    openAddProcessHandler,
    searchTerm,
    dateType }) {

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
            const dayPlans = JDData.process.filter(data => {
                const endDate = data.end_date ? parseISO(data.end_date) : new Date()
                return isSameDay(endDate, day)
            })
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
                    <div className="plusHover">
                        <div className={
                            format(Month, 'M') !== format(day, 'M') ? 'text not-valid' : 'text'}>
                            {formattedDate}    
                        </div>
                        <CiSquarePlus className="plusButton" onClick={openAddProcessHandler} />    
                    </div>
                   {my && (<ul className="my-plan-wrapper">
                        {dayPlans.map((data, index) => (
                            <li className="my-plan" key={index}>{data.company}</li>
                        ))}
                    </ul>)}
                    {all && (<Recruit day={day} searchTerm={searchTerm} dateType={dateType} JDData={JDData} />)}
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
    const [JDData, setJDData] = useState();

    useEffect(() => {
        if (!JDData) {fetchJD()
          .then(res => {
            console.log(res.data)
            setJDData(res.data)
          })
          .catch(err => console.log(err))}
      },[JDData])


    // 달력 상태 관리
    const [Month, setMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())
    
    // 공고 없는 프로세스 모달 상태 관리
    const [isAddProcessOpen, setIsAddProcessOpen] = useState(false)
    const openAddProcessHandler = () => {
        setIsAddProcessOpen(!isAddProcessOpen)
    }

    // 공고 검색 상태 관리
    const [searchTerm, setSearchTerm] = useState('')
    const [dateType, setDateType] = useState('')


    // 달력에 추가되는 내 일정 관리
    const [plans, setPlans] = useState([])

    // 일정 필터링 상태 관리
    const [my, setMy] = useState(false)
    const [all, setAll] = useState(true)

    return (
        <div className="calendar">
            <div>
                <CalendarFilter
                    setSearchTerm={setSearchTerm}
                    setDateType={setDateType}
                    my={my} setMy={setMy}
                    all={all} setAll={setAll}
                />
                <MainPageHeader Month={Month} setMonth={setMonth} />
                <div className="calendarBody">
                    <Week />
                    {JDData && <CalendarBody
                        my={my} all={all}
                        JDData={JDData}
                        Month={Month}
                        selectedDate={selectedDate}
                        openAddProcessHandler={openAddProcessHandler}
                        searchTerm={searchTerm}
                        dateType={dateType}
                    />}
                </div>
            </div>
            <AddProcess
                plans={plans} setPlans={setPlans}
                openAddProcessHandler={openAddProcessHandler}
                isAddProcessOpen={isAddProcessOpen}
                setIsAddProcessOpen={setIsAddProcessOpen} />
        </div>
    )
}
