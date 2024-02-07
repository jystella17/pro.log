import { Component, useEffect, useState } from "react";

import styled from 'styled-components'
import DatePick from "../../../common/components/DatePicker";
import InputTag from "../../../common/components/InputTag"
import Button from "../../../common/components/Button";
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


function DeadLine() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [daysDiff, setDaysDiff] = useState(0)
    
    useEffect(() => {
        const currentDate = new Date()
        const timeDiff = selectedDate - currentDate
        const calcDaysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
        setDaysDiff(calcDaysDiff);
    }, [selectedDate])

    function handleChange(date) {
        setSelectedDate(date)
    }

	return (
        <div className="datepicker">
            <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', padding: '0px 5px'}}>
                <span style={{ fontSize: '13.5px' }}>마감일</span>
                <Dday>D-{daysDiff}</Dday>
            </div>
            <DatePick onChange={handleChange} />
        </div>
    )
}



function SaveButton() {
    return (
        <Button
            className={"navy saveButton"}
        >{'저장하기'}</Button>
    )
}


export default function ProcessHeader() {
    return (
        <div className='totalBox'>
            <div className='box1'>
                <CompanyName />
                <InputTag backgroundcolor={'white'}/>
            </div>
            <div className="box2">
                <div className="deadline">
                    <DeadLine />
                </div>
                <SaveButton className="save"/>
            </div>

        </div>
    )
}