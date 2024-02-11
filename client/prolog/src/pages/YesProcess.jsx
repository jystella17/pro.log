import { Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import YesProcessHeader from "../components/process/header/YesProcessHeader";
import Steps from "../components/process/steps/Steps"
// import AddTemplates from "../components/process/body/AddTemplate";
import PaperBody from "../components/process/body/PaperBody"
import { Checkbox } from "antd"
import RangeDatePicker from "../common/components/RangeDatePicker"
import { useState } from "react";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`

function YesProcess() {
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

  const [savedData, setSavedData] = useState(null)
  const handleProcessSave = (data) => { setSavedData(data) }
  
  // const sendProcess = (savedData) => {
  //   axios.post('api/save-data', savedData)
  //     .then(response => {
  //       console.log('Data saved successfully:', response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error while saving data:', error);
  //     });
  // }



  return (
      <div className="process">
      <YesProcessHeader onSave={handleProcessSave} />
        <Steps onSave={handleProcessSave} />
      </div>

  );
}

export default YesProcess