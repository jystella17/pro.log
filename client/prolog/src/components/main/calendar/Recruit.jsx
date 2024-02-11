import { useState } from "react";
import { useRecoilState, useRecoilValue } from 'recoil'
// import { JDState } from '../../../state/atoms.jsx'
// import { getJD } from '../../../state/selectors.jsx'


import { isSameDay, parse } from 'date-fns';
import Tag from '../../../common/components/Tag'
import JobDescription from '../../jobdescription/JobDescription'
import "./Calendar.scss";

// 공고 넣기
export default function Recruit({day, searchTerm, dateType }) {
  // const [jdData, setjdData] = useRecoilState(JDState)
  // const JD = useRecoilValue(getJD)

    const [selectedJdId, setSelectedJdId] = useState(null)
    const [JDOpen, setJDOpen] = useState(false)

    // function openJDModalHandler(jdId) {
    //     setModalOpen(!modalOpen)
    // }

  function openJDModalHandler(JdId) {
      setSelectedJdId(JdId)
      setJDOpen(!JDOpen)
  }

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

    let filteredRecruits = JD.jd.filter(data => {
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
                                {isStart ? '시작' : '마감'}
                            </Tag>
                            {data.company.companyName}
                        </div>
                    )
                }
                return null; // 시작일이나 마감일이 아닌 경우 공고를 출력하지 않음
            })}
            <JobDescription selectedJdId={selectedJdId} openJDModalHandler={openJDModalHandler} JDOpen={JDOpen} setJDOpen={setJDOpen} />
        </>
    )}
     

    //   <>
    //       {filteredRecruits.map(data => {
             
  
    //           if (isStart || isExpiration) {
    //               return (
    //                   <div key={data.jdId} className="recruit-tag" onClick={() => handleClick(data.jdId)}>
    //                       <Tag backgroundcolor={isStart ? 'rgb(54, 48, 98)' : 'rgb(249, 148, 23)'} fontsize={'10px'}>
    //                           {isStart ? '시작' : '마감'}
    //                       </Tag>
    //                       {data.company.companyName}
    //                   </div>
    //               );
    //           }
  
    //           return null; // 시작일이나 마감일이 아닌 경우 공고를 출력하지 않음
    //       })}
    //   </>
