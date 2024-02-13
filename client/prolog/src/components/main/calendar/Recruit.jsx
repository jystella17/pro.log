import { useState } from "react";
import { useRecoilState, useRecoilValue } from 'recoil'
import { JDState } from '../../../state/atoms.jsx'
import { getJD } from '../../../state/selectors.jsx'


import { isSameDay, parse } from 'date-fns';
import Tag from '../../../common/components/Tag'
import JobDescription from '../../jobdescription/JobDescription'
import "./Calendar.scss";

// 공고 넣기
export default function Recruit({ day, searchTerm, dateType, JDData }) {

    const [selectedJdId, setSelectedJdId] = useState(null)
    const [JDOpen, setJDOpen] = useState(false)

    function openJDModalHandler(JdId) {
        setSelectedJdId(JdId)
        setJDOpen(!JDOpen)
  }

    let filteredRecruits = JDData.jd.filter(data => {
        if (searchTerm && !data.company.companyName.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        if (dateType === '시작') {
            return isSameDay(parse(data.openingDate, "yyyy-MM-dd HH:mm:ss", new Date()), day);
        } else if (dateType === '마감') {
            return isSameDay(parse(data.expirationDate, "yyyy-MM-dd HH:mm:ss", new Date()), day);
        } else if (dateType == '수시') {
            return ''
        }
        return true;
    });

    return (
        <>
            {filteredRecruits.map(data => {
                const isStart = isSameDay(parse(data.openingDate, "yyyy-MM-dd HH:mm:ss", new Date()), day);
                const isExpiration = isSameDay(parse(data.expirationDate, "yyyy-MM-dd HH:mm:ss", new Date()), day);
                
                if (isStart || isExpiration) {
                    return (
                        <div key={data.jdId} className="recruit-tag" onClick={() => openJDModalHandler(data.jdId)}>
                            <Tag backgroundcolor={isStart ? 'rgb(54, 48, 98)' : 'rgb(249, 148, 23)'} fontsize={'10px'}>
                                <div style={{width: '20px'}}>{isStart ? '시작' : '마감'}</div>
                            </Tag>
                            <div>
                                {data.company.companyName}
                            </div>
                        </div>
                    )
                }
                return null; // 시작일이나 마감일이 아닌 경우 공고를 출력하지 않음
            })}
            <JobDescription selectedJdId={selectedJdId} openJDModalHandler={openJDModalHandler} JDOpen={JDOpen} setJDOpen={setJDOpen} />
        </>)
}
     