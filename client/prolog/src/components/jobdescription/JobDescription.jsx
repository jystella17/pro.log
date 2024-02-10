import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Modal from 'react-modal'
import { useRecoilState, useRecoilValue } from "recoil";
// import { JDState } from "../../state/atoms";
// import { getJD } from "../../state/selectors"

import { CiCalendar } from "react-icons/ci";
import './JobDescription.css'

import Button from "../../common/components/Button";

const customJDModal = Modal.Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    zIndex: '10',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    width: '600px',
    zIndex: '20',
    position: 'absolute',
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "auto",
  }
}


function JDContent({ selectedJdId }) {
  // const [jdData, setjdData] = useRecoilState(JDState)
  // const JD = useRecoilValue(getJD)


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

  
  const navigate = useNavigate()
  function navigateToProcess() {
    navigate('/process')
  }


  return (
    <div className="jd-data">
      <div className="jd-title">
        <div className="company-name">{JD.jd.company.companyName}</div>
        <div className="job-title">상반기 공채</div>
        {/* <div className="deadline">
          <CiCalendar />
          <div>{JDList.openingDate} ~ {JDList.expirationDate}</div>
        </div> */}
        <div className="jd-deadline">
          <CiCalendar />
          <div>2024.01.16 ~ 2024.01.29</div>
        </div>
        <div className="jd-deadline">
          <div>IT-개발</div>
        </div>
        {/* <div className="job-mid-code">
          <div>{JDData.jobmidcode}</div>
        </div> */}
      </div>

      <div className="buttons">
        <Button className={'navy'}>{'홈페이지 바로가기'}</Button>
        {/* <a href={JDList.Link}><Button className={'navy'}>{'홈페이지 바로가기'}</Button></a> */}
        <Button className={'navy'} onClick={navigateToProcess}>{'프로세스 시작하기'}</Button>
      </div>

    </div>
    )
}


export default function JD({modalOpen, setModalOpen, selectedJdId}) {
  // const params = useParams.id;
  // const [JDData, setJDData] = useRecoilState(JDState)
  // const JDList = useRecoilValue(getJD);
  // useEffect(() => {
  //   setJDData(params)
  // })

  // JD data
  // useEffect(() => {
  //   (async () => {
  //   try{
  //     await axios.get('/api').then(res => {
  //         console.log(res.data)
  //         setJDData(res.data)
  //       })
  //   } catch(err){
  //     console.error(err.message)
  //   }})()
  // }, [])
  
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      style={customJDModal}
      contentLabel="JDPage"
    >
      <JDContent selectedJdId={selectedJdId} />
    </Modal>
  )
}