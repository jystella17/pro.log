import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
// import { JDState } from '../../../state/atoms.jsx'
// import { getJD } from '../../../state/selectors.jsx'

import MainPageHeader from './CalendarHeader.jsx';
import CalendarFilter from './CalendarFilter.jsx'
import Week from './Week.jsx'
import Recruit from './Recruit.jsx'
import JD from '../../jobdescription/JobDescription.jsx'
import AddProcess from './AddProcess.jsx'

import Tag from '../../../common/components/Tag.jsx'
import './Calendar.scss'

import { format } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';

import { CiSquarePlus } from "react-icons/ci";


// 달력 body component
function CalendarBody({
    Month,
    selectedDate,
    openModalHandler,
    openJDModalHandler,
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
                    <Recruit day={day} searchTerm={searchTerm} dateType={dateType} onClick={openJDModalHandler} />
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
    // const [jdData, setjdData] = useRecoilState(JDState)
    // const JD = useRecoilValue(getJD)

    // 달력 상태 관리
    const [Month, setMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())
    
    // 모달 상태 관리
    const [modalOpen, setModalOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    // 공고 검색 상태 관리
    const [searchTerm, setSearchTerm] = useState('')
    const [dateType, setDateType] = useState('')


    function openJDModalHandler(jdId) {
        setModalOpen(!modalOpen)
    }
    function openModalHandler() {
        setIsOpen(!isOpen)
    }

    return (
        <div className="calendar">
            {isOpen ?
                <AddProcess openModalHandler={openModalHandler} /> :
                <div>
                    <CalendarFilter setSearchTerm={setSearchTerm} setDateType={setDateType} />
                    <MainPageHeader Month={Month} setMonth={setMonth} />
                    <div className="calendarBody">
                        <Week />
                        <CalendarBody
                            Month={Month}
                            selectedDate={selectedDate}
                            openModalHandler={openModalHandler}
                            openJDModalHandler={openJDModalHandler}
                            searchTerm={searchTerm}
                            dateType={dateType}
                        />
                    </div>
                </div>} 
            <button onClick={openJDModalHandler}>JD열기</button>
            {/* <JD modalOpen={modalOpen} setModalOpen={setModalOpen} /> */}

        </div>
    )
}
