import { Component, useEffect, useState } from "react";

import styled from 'styled-components'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ProcessHeader.scss'

const Dday = styled.div`
    background-color: rgb(249, 148, 23);
    color: rgb(245, 245, 245);
    border-radius: 10px;
    padding: 2px 6px;
    margin: 0px 0px 4px 5px;
    font-size: 12px;
` 

function CompanyName() {
    return (
        <div className="company">삼성전자</div>
    )
}

function InputTag() {
    return (
        <div className="tag">태그를 넣어라</div>
    )
}

function DeadLine() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [daysDiff, setDaysDiff] = useState(0)
    
    useEffect(() => {
        const currentDate = new Date()
        const timeDiff = selectedDate - currentDate
        const calcDaysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
        setDaysDiff(calcDaysDiff);
    }, [selectedDate])

	return (
        <div className="datepicker">
            <div style={{ display: "flex", flexDirection: "row" }}>
                <span style={{ fontSize: '13.5px' }}>마감일</span>
                <Dday>D-{daysDiff}</Dday>
            </div>
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



function SaveButton() {
    return (
        <div className="save">저장하기</div>
    )
}


export default function ProcessHeader() {
    return (
        <div className='totalBox'>
            <div className='box1'>
                <CompanyName />
                <InputTag />
            </div>
            <div className="box2">
                <div className="deadline">
                    <DeadLine />
                </div>
                <SaveButton />
            </div>

        </div>
    )
}