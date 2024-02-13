import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

function CompanyName({ selectedJD }) {
    return (
        <div className="company">{selectedJD.company.companyName}</div>
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
    const params = useParams()
    const selectedJdId = params.selectedJdId
 
    const JD = {
        "jd": [{
            "jdId": 1,
            "link": "http://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx=47487289&utm_source=job-search-api&utm_medium=api&utm_campaign=saramin-job-search-api",
            "keyword": "게임",
            "openingDate": "2024-01-31 00:00:00",
            "expirationDate": "2024-02-15 23:59:59",
            "company": {
                "companyId": 1,
                "companyName": "넷마블몬스터(주)"
            },
            "jobTitle": "넷마블몬스터(주) 마블 퓨처파이트 배경 원화 모집",
            "industry": "게임",
            "workingArea": "서울 &gt; 구로구",
            "jobType": "정규직",
            "jobMidCode": "IT개발·데이터,디자인",
            "experience": "경력무관",
            "education": "학력무관"
        },{
            "jdId": 2,
            "link": "http://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx=47487202&utm_source=job-search-api&utm_medium=api&utm_campaign=saramin-job-search-api",
            "keyword": null,
            "openingDate": "2024-01-31 00:00:00",
            "expirationDate": "2024-02-15 23:59:59",
            "company": {
                "companyId": 2,
                "companyName": "넷마블엔투(주)"
            },
            "jobTitle": "넷마블엔투(주) 신의탑 애니메이션(영상연출) 모집_신입가능",
            "industry": "게임",
            "workingArea": "서울 &gt; 구로구",
            "jobType": "정규직",
            "jobMidCode": "IT개발·데이터,미디어·문화·스포츠,디자인",
            "experience": "경력무관",
            "education": "학력무관"
        },]
    }

    const selectedJD = JD.jd.find(jd => jd.jdId === Number(selectedJdId))
    
    return (
        <div className='totalBox'>
            <div className='box1'>
                <CompanyName selectedJD={selectedJD} />
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