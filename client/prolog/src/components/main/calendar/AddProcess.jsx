import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import Modal from 'react-modal'

import { fetchAddProcess } from '../../../api/api'
import styled from 'styled-components'
import DatePick from "../../../common/components/DatePicker";
import Button from "../../../common/components/Button";
import './AddProcess.scss'

const Head = styled.div`
  width: 20vw;
`
const Row = styled.div`
  display: flex;
`

const customAddProcessModal = Modal.Styles = {
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
    height: '300px',
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
    padding: "40px"
  }
}



// 모달 창 content
function AddProcessContent({
  openAddProcessHandler,
  deadline, setDeadline,
  addCompany, setAddCompany,
  addType, setAddType,
}) {

  const navigate = useNavigate()
  const types = [
    {
      title: '서류 전형',
      value: 'paper'
    },
    {
      title: '테스트 전형',
      value: 'test'
    },
    {
      title: '면접 전형',
      value: 'interview'
    }
  ]

  function saveAddProcess() {
    fetchAddProcess({
      company: addCompany, step: addType, end_date: deadline
    })
      .then(res =>
        console.log('저장 완료: ', res.data))
      .catch(err =>
        console.error(err.message))
    
    navigate('/process')
  }


  function handleChange(date) {
    setDeadline(date)
  }

  function handleAddTypeChange(e) {
    const selectedValue = e.target.value;
    
    // 선택된 값이 유효하다면 상태를 업데이트하고, 그렇지 않다면 경고 메시지를 표시합니다.
    if (selectedValue) {
      setAddType(selectedValue);
    } else {
      alert("전형을 선택해주세요.");
    }
  }

  return (
  <>
    <div className="add-process">
      <input type="text" onChange={(e) => setAddCompany(e.target.value)} className="input-company" placeholder="회사명을 입력하세요."/>

      <div className="input-datas">
        <Row>
          <Head>1차 전형 날짜</Head>
          <div style={{display: "flex", justifyContent: "space-between", width:"371px"}}>
              <DatePick selectedDate={deadline} setSelectedDate={setDeadline} onChange={handleChange}/>
          </div>
        </Row>
        <Row>
          <Head>1차 전형 유형</Head>
            <div>
            <select onChange={handleAddTypeChange} className="selectType">
                <option>전형을 선택해주세요.</option>
              {types.map((type, index) => (
                <option key={index} value={type.value}>{type.title}</option>
              ))}
            </select>
          </div>
      </Row>
    </div>
      <Row style={{ justifyContent: 'flex-end', gap: '20px'}}>
          <Button className={'navy'} onClick={ saveAddProcess }
          type={'submit'}>{'프로세스 시작하기'}</Button>
        <Button className={'gray'}
          onClick={openAddProcessHandler}>{'취소'}</Button>
      </Row>
    </div>
  </>

  )
}




// 프로세스 생성 창
function AddProcess({
  plans, setPlans,
  onStateChange,
  isAddProcessOpen,
  setIsAddProcessOpen,
  openAddProcessHandler }) {
  
  const [addCompany, setAddCompany] = useState('')
  const [deadline, setDeadline] = useState(new Date());
  const [addType, setAddType] = useState('assay')

  function AddPlan() {
    const newPlan = {
      title: `${addCompany} 마감`,
      date: deadline
    }
    setPlans([...plans, newPlan])
    setIsAddProcessOpen(false)
  }
  
  return (
    <Modal
      isOpen={isAddProcessOpen}
      onRequestClose={() => setIsAddProcessOpen(false)}
      contentLabel='AddProcess'
      style={customAddProcessModal}
    >
      {<AddProcessContent
        plans={plans} setPlans={setPlans}
        openAddProcessHandler={openAddProcessHandler}
        addCompany={addCompany} setAddCompany={setAddCompany}
        deadline={deadline} setDeadline={setDeadline}
        addType={addType} setAddType={setAddType}
        AddPlan={AddPlan}
        onStateChange={onStateChange}
      />}
    </Modal>
  )
}


export { AddProcess }
  
