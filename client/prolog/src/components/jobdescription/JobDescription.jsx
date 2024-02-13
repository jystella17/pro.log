import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Modal from 'react-modal'
import { fetchJD, fetchAddProcess } from '../../api/api'
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


function JDContent({ selectedJdId, JDData }) {
  const navigate = useNavigate()

  const selectedJD = JDData.jd.find(jd => jd.jdId === selectedJdId)

  function saveAddProcess() {
    fetchAddProcess({
      company: selectedJD.company.companyName, end_date: selectedJD.expirationDate
    })
      .then(res =>
        console.log('저장 완료: ', res.data))
      .catch(err =>
        console.error(err.message))
    
    navigate('/process')
  }



  return (
    <div className="jd-data">
      <div className="jd-title">
        <div className="jd-company-name">{selectedJD.company.companyName}</div>
        <div className="jd-job-title">{selectedJD.jobTitle}</div>
        <div className="jd-deadline">
          <CiCalendar />
          <div>{selectedJD.openingDate} ~ {selectedJD.expirationDate}</div>
        </div>
        <div className="job-mid-code">
          <div>{selectedJD.jobMidCode}</div>
        </div>
      </div>

      <div className="buttons">
        <a href={selectedJD.link}><Button className={'navy'}>{'홈페이지 바로가기'}</Button></a>
        <Button className={'navy'} onClick={saveAddProcess}>{'프로세스 시작하기'}</Button>
      </div>

    </div>
    )
}


export default function JobDescription({ selectedJdId, JDOpen, setJDOpen }) {
  const [JDData, setJDData] = useState();

  useEffect(() => {
    if (!JDData) {fetchJD()
      .then(res => {
        console.log(res.data)
        setJDData(res.data)
      })
      .catch(err => console.log(err))}
  },[])
  
  
  return (
    <Modal
      isOpen={JDOpen}
      onRequestClose={() => setJDOpen(false)}
      style={customJDModal}
      contentLabel="JDPage"
    >
      <JDContent selectedJdId={selectedJdId} JDData={JDData} />
    </Modal>
  )
}