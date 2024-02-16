import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import MainPageHeader from './CalendarHeader.jsx';
import CalendarFilter from './CalendarFilter.jsx'
import Week from './Week.jsx'
import Recruit from './Recruit.jsx'
import JobDescription from "../../jobdescription/JobDescription.jsx";
import Tag from '../../../common/components/Tag'

import { AddProcess } from './AddProcess.jsx'
import { api, fetchJD } from '../../../api/api.jsx' 

import './Calendar.scss'

import { format } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parseISO, parse } from 'date-fns';

import { CiSquarePlus } from "react-icons/ci";


// 달력 body component
function CalendarBody({
    JDData,
    Month,
    my, all,
    selectedDate,
    mapCompanyData,
    openAddProcessHandler,
    navigateToProcess,
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
                            <li className="my-plan" key={index} onClick={() => navigateToProcess(data.id)}>{data.company}</li>
                        ))}
                    </ul>)}
                    {all && (<Recruit
                        day={day}
                        searchTerm={searchTerm}
                        dateType={dateType}
                        mapCompanyData={mapCompanyData} />)}
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
    const navigate = useNavigate()
    
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

    function navigateToProcess(pid) {
        // console.log(pid,"pid")
        navigate(`/process/${pid}`)
    }

    // 채용 공고 받아오기
    const [JDData, setJDData] = useState();
    const [mapCompanyData, setMapCompanyData] = useState()

    useEffect(() => {
        fetchJD({ year: format(Month, 'yyyy'), month: format(Month, 'MM') })
          .then(res => {
            console.log(res.data)
            setJDData(res.data)
          })
          .catch(err => console.log(err))
    }, [])

    // 데이터 변환 ( 회사 번호별 map )
    useEffect(() => {
        if (JDData) {
            let companyIds = [...new Set(JDData.jd.map(data => data.company.companyId))];
            let mapData = companyIds.map(id => {
                let filteredJobs = JDData.jd.filter(item => item.company.companyId === id);
                let jobGroups = filteredJobs.reduce((acc, item) => {
                    let dateKey = { openingDate: item.openingDate, expirationDate: item.expirationDate }
                    let dateKeyStr = JSON.stringify(dateKey)
                    if (!acc[dateKeyStr]) {
                        acc[dateKeyStr] = [];
                    }
                    acc[dateKeyStr].push({
                        jdId: item.jdId,
                        title: item.jobTitle,
                        link: item.link
                    }, {});
                    return acc;
                }, []);
                return {
                    companyId: id,
                    companyName: filteredJobs[0].company.companyName,
                    closeTypeCode : filteredJobs[0].closeTypeCode,
                    jobGroups: Object.entries(jobGroups).map(([dateKeyStr, jobs]) => ({ dateKey: JSON.parse(dateKeyStr), jobs }))
                };
            });
            setMapCompanyData(mapData)
        }
    }, [JDData])
    
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
                    {JDData && mapCompanyData && <CalendarBody
                        my={my} all={all}
                        JDData={JDData}
                        mapCompanyData={mapCompanyData}
                        Month={Month}
                        selectedDate={selectedDate}
                        openAddProcessHandler={openAddProcessHandler}
                        navigateToProcess={navigateToProcess}
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
            
            {mapCompanyData && JDData && <JobDescription
                JDData={JDData}
                mapCompanyData={mapCompanyData} />}
        </div>
    )
}
