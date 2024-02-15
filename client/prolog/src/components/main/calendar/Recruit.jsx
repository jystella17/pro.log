import { isSameDay, parse } from 'date-fns';
import { useState } from "react";
import JobDescription from "../../jobdescription/JobDescription";
import Tag from '../../../common/components/Tag'
import "./Calendar.scss";

// 공고 넣기
export default function Recruit({ day, searchTerm, dateType, mapCompanyData, openJDModalHandler }) {
    const [selectedJd, setSelectedJd] = useState(null)
    const [JDOpen, setJDOpen] = useState(false)

    function openJDModalHandler(data) {
        setSelectedJd(data)
        setJDOpen(true)
    }

    function closeModalHandler() {
        setJDOpen(false)
    }
    
    let filteredRecruits = mapCompanyData.filter(data => {
        if (searchTerm && !data.companyName.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        if (dateType.value === '1') {
            return data.closeTypeCode === '1'
        }  else if (dateType.value === '2') {
            return data.closeTypeCode === '2'
        } else if (dateType.value === '3') {
            return data.closeTypeCode === '3'
        } else if (dateType.value === '4') {
            return data.closeTypeCode === '4'  
        } else {
            return true;
        }
    });

    return (
        <>
            {filteredRecruits.map((data, dataIndex) => {
                return data.jobGroups.map((jobGroup, jobIndex) => {
                    const isStart = isSameDay(
                        parse(jobGroup.dateKey.openingDate, "yyyy-MM-dd HH:mm:ss", new Date()), day);
                    const isExpiration = isSameDay(
                        parse(jobGroup.dateKey.expirationDate, "yyyy-MM-dd HH:mm:ss", new Date()), day);
                    if (isStart || isExpiration) {
                        return (
                            <div key={`${dataIndex}-${jobIndex}`} className="recruit-tag" >
                                <Tag backgroundcolor={isStart ? 'rgb(54, 48, 98)' : 'rgb(249, 148, 23)'} fontsize={'10px'}>
                                    <div style={{ width: '20px' }}>{isStart ? '시작' : '마감'}</div>
                                </Tag>
                                <div onClick={() => openJDModalHandler(data)}>
                                    {data.companyName}
                                </div>
                            </div>
                        )
                    
                    }
                    return null; // 시작일이나 마감일이 아닌 경우 공고를 출력하지 않음
                })
            })}
            {selectedJd && <JobDescription
                day={day}
                selectedJd={selectedJd}
                openJDModalHandler={openJDModalHandler}
                closeModalHandler={closeModalHandler}
                JDOpen={JDOpen} setJDOpen={setJDOpen} />}
        </>
    )
}
     