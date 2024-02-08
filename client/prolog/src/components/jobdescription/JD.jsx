import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Modal from 'react-modal'
import { useRecoilState, useRecoilValue } from "recoil";
// import { JDState } from "../../state/atoms";
// import { getJD } from "../../state/selectors"

import { CiCalendar } from "react-icons/ci";
import './JD.css'

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


function JDContent() {
  const navigate = useNavigate()

  function navigateToProcess() {
    navigate('/process')
  }
  return (
    <div className="jd-data">
      <div className="jd-title">
        <div className="company-name">삼성전자</div>
        {/* <div>{JDList.jobTitle}</div> */}
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


export default function JD({modalOpen, setModalOpen}) {
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
      <JDContent />
      {/* <JDContent JDList={JDList} /> */}
    </Modal>
  )
}