import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

import { fetchAddProcess } from '../../../api/api'
import styled from 'styled-components'
import DatePick from "../../../common/components/DatePicker";
import Button from "../../../common/components/Button";
import ModalPage from "../../../common/components/ModalPage"
import './AddProcess.scss'

const Head = styled.div`
  width: 20vw;
`
const Row = styled.div`
  display: flex;
`
// 모달 창 content
function AddProcessContent({
  openAddProcessHandler,
  deadline, setDeadline,
  addCompany, setAddCompany,
  addType, setAddType,
  AddPlan
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
            <select onChange={(e) => setAddType(e.target.value)} className="selectType">
              <option value="">전형을 선택해주세요.</option>
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
  const [addType, setAddType] = useState('')

  function AddPlan() {
    const newPlan = {
      title: `${addCompany} 마감`,
      date: deadline
    }
    setPlans([...plans, newPlan])
    setIsAddProcessOpen(false)
  }
  
  return (
    <ModalPage
      isOpen={isAddProcessOpen}
      onRequestClose={() => setIsAddProcessOpen(false)}
      contentLabel={'AddProcess'}
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
    </ModalPage>
  )
}


export { AddProcess }
  
