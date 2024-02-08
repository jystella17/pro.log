import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import InputBox from '../../../common/components/InputBox'
import RangeDatePick from "../../../common/components/RangeDatePicker";
import Button from "../../../common/components/Button";
import useDetectClose from "../../../common/hooks/useDetectClose";
import './AddProcess.scss'

// 모달 창이 뜬 전체화면
const ModalContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

// 모달 창 뒷 배경
const BackGround = styled.div`
    z-index: 1;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.5);
    top : 0;
    left : 0;
    right : 0;
    bottom : 0;
`
// 모달 창
const ModalView = styled.div.attrs((props) => ({
    role: 'dialog',
  }))`
    display: flex;
    flex-direction: column;

    border-radius: 10px;
    width: 700px;
    min-width: 700px;
    height: 300px;
    padding: 50px;
    gap: 20px;
    background-color: #ffffff;
  `;


const Head = styled.div`
  width: 20vw;
`
const Row = styled.div`
  display: flex;
`

// 프로세스로 이동하는 이벤트


function SelectType() {
  const DateTypes = ['서류 전형', '테스트 전형', '면접 전형']

  const [selectedType, setSelectedType] = useState(null)

  function filterTypes(type) {
    setSelectedType(type)
  }

  return (
    <div>
      <select onChange={(e) => filterTypes(e.target.value)} className="selectType">
        <option value="">전형을 선택해주세요.</option>
        {DateTypes.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>
    </div>
  )
}
  
// 프로세스 생성 창
function AddProcess({ openModalHandler }) {
  const navigate = useNavigate()
  function navigateToProcess() {
    navigate('/process')
  }


  const [company, setCompany] = useState('')
  const [task, setTask] = useState('')

  const saveCompany = (e) => setCompany(e.target.value)
  const saveTask = (e) => setTask(e.target.value)

  // function handleSubmit(e) {
  //   e.preventDefault()

  //   axios
  //     .post("post 주소", {
  //       company: company,
  //       task: task,
  //       // step,
  //       // start_date,
  //       // end_date
  //     })
  //     .then((res) => {
  //       console.log(res.data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }



  return (
    <ModalView onClick={(e) => e.stopPropagation()}>

      {/* <form onSubmit={handleSubmit}> */}
        <div>
        <InputBox width={'300px'} height={'45px'} text="기업명을 입력하세요." value={company} onChange={saveCompany} />
  
        <div style={{display:"flex", flexDirection:"column", gap: "20px"}}>
          <Row>
            <Head>직무</Head>
            <InputBox width={'350px'} height={'37px'} text="지원하는 직무를 입력하세요." value={task} onChange={saveTask}/>
          </Row>
          <Row>
            <Head>1차 전형 날짜</Head>
            <div style={{display: "flex", justifyContent: "space-between", width:"371px"}}>
              <RangeDatePick name={'date'} />
            </div>
          </Row>
          <Row>
              <Head>1차 전형 유형</Head>
              <SelectType />
          </Row>
        </div>
          <Row style={{ justifyContent: 'flex-end', gap: '20px'}}>
            <Button className={'navy'}
              onClick={navigateToProcess}
              type={'submit'}>{'프로세스 시작하기'}</Button>
            <Button className={'gray'}
              onClick={openModalHandler}>{'취소'}</Button>
          </Row>
        </div>
      {/* </form> */}

    </ModalView>
  )
}


export default function Modal({openModalHandler}) {
    return (
        <>
            <ModalContainer>
              <BackGround>
                <AddProcess openModalHandler={openModalHandler} />
              </BackGround>
            </ModalContainer>
        
        </>
    )

}