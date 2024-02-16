import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Modal from 'react-modal'
import { fetchJD, fetchAddProcess } from '../../api/api'
import { isSameDay, parse } from "date-fns"

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
    width: '800px',
    height: '400px',
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


function JDContent({ selectedJd, closeModalHandler, day }) {
  const navigate = useNavigate()

  function saveAddProcess() {
    if (selectedJd) { 
      selectedJd.jobGroups
        .filter(jobGroup => {
          const isStart = isSameDay(parse(jobGroup.dateKey.openingDate, "yyyy-MM-dd HH:mm:ss", new Date()), day);
          const isExpiration = isSameDay(parse(jobGroup.dateKey.expirationDate, "yyyy-MM-dd HH:mm:ss", new Date()), day);
          return isStart || isExpiration;
        })
        .map(jobGroup => {
          const openingDate = jobGroup.dateKey.openingDate;
          const expirationDate = jobGroup.dateKey.expirationDate;
  
          fetchAddProcess({
            company: selectedJd.companyName,
            step: 'paper',
            start_date: openingDate,
            end_date: expirationDate,
            tag: []
          })
            .then(res =>
              navigate(`/process/${res.data}`))
            .catch(err =>
              console.error(err.message))
        });
  
      
    } else {
      console.log('selectedJd is undefined');
    }
  }

  return (
    <div className="jd-data">
      <div className="jd-title">
        <div className="jd-company-name">{selectedJd.companyName}</div>
        {selectedJd.jobGroups.map((jobGroup, index) => {
          const isStart = isSameDay(parse(jobGroup.dateKey.openingDate, "yyyy-MM-dd HH:mm:ss", new Date()), day);
          const isExpiration = isSameDay(parse(jobGroup.dateKey.expirationDate, "yyyy-MM-dd HH:mm:ss", new Date()), day);
          if (isStart || isExpiration) {
            return (
              <div className="jd-contents">
                <div key={`${selectedJd.companyName}-${jobGroup.dateKey.openingDate}-${jobGroup.dateKey.expirationDate}`} className="jd-deadline">
                  <CiCalendar style={{height:"20px", width:"20px"}} />
                  <div>{jobGroup.dateKey.openingDate} ~ {jobGroup.dateKey.expirationDate}</div>
                  </div>
                  {jobGroup.jobs.map(job => {
                  if (!job || !job.title || !job.link) { // job이 빈 객체인지 확인
                    return null; // job이 빈 객체라면 아무것도 출력하지 않음
                  }
                    return (
                      <div key={job.title} className="jd-jobs">
                        <div className="jd-job-title">{job.title}</div>
                        <a href={job.link}><Button className={'navy'} width={'130.5px'}>{'홈페이지 바로가기'}</Button></a>
                      </div>
                  )
                })}
              </div>)
          } else { return null }
        })}
        </div>
      <div className="jd-buttons">
        <Button className={'navy'} onClick={saveAddProcess} >{'프로세스 시작하기'}</Button>
        <Button onClick={closeModalHandler}>{'취소'}</Button>
      </div>

    </div>
  )
}


export default function JobDescription({ JDOpen, setJDOpen, day,
  selectedJd, closeModalHandler }) {
  return (
    <Modal
      isOpen={JDOpen}
      onRequestClose={closeModalHandler}
      style={customJDModal}
      contentLabel="JDPage"
    >
      <JDContent selectedJd={selectedJd} closeModalHandler={closeModalHandler} day={day} />
    </Modal>
  )
}