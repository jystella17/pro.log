import { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import InputBox from '../../../common/components/InputBox'
import RangeDatePick from "../../../common/components/RangeDatePicker";
import Button from "../../../common/components/Button";
import ModalPage from "../../../common/components/ModalPage"
import './AddProcess.scss'
import { add } from "date-fns";

const Head = styled.div`
  width: 20vw;
`
const Row = styled.div`
  display: flex;
`
// 모달 창 content
function AddProcessContent({ openAddProcessHandler }) {
  const [addCompany, setAddCompany] = useState('')
  const [addDate, setAddDate] = useState(null)
  const [addType, setAddType] = useState('')
  const DateTypes = ['서류 전형', '테스트 전형', '면접 전형']


  const handleAddCompanyChange = (event) => {
    setAddCompany(event.target.value);
  };

  const handleAddDateChange = (date) => {
    setAddDate(date);
  };

  const handleAddTypeChange = (event) => {
    setAddType(event.target.value);
  };

  function handleSubmit() {
    console.log(addCompany);
    console.log(addDate);
    console.log(addType);
  }

  return (
  <>
    {/* <form onSubmit={handleSubmit}> */}
      <div>
    <input type="text" onChange={handleAddCompanyChange}/>

    <div style={{display:"flex", flexDirection:"column", gap: "20px"}}>
      <Row>
        <Head>1차 전형 날짜</Head>
        <div style={{display: "flex", justifyContent: "space-between", width:"371px"}}>
          <RangeDatePick name={'date'} onChange={handleAddDateChange} />
        </div>
      </Row>
      <Row>
          <Head>1차 전형 유형</Head>
          <div>
            <select onChange={handleAddTypeChange} className="selectType">
              <option value="">전형을 선택해주세요.</option>
              {DateTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
      </Row>
    </div>
      <Row style={{ justifyContent: 'flex-end', gap: '20px'}}>
        <Button className={'navy'}
          type={'submit'} onClick={handleSubmit}>{'프로세스 시작하기'}</Button>
        <Button className={'gray'}
          onClick={openAddProcessHandler}>{'취소'}</Button>
        </Row>
        {/* {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>} 에러 메시지 표시 */}
    </div>
      {/* </form> */}
  </>


  )
}
  

// 프로세스 생성 창
function AddProcess({ isAddProcessOpen, setIsAddProcessOpen, openAddProcessHandler }) {
  const navigate = useNavigate()
  
  const [addCompany, setAddCompany] = useState('')
  const [error, setError] = useState('')


  // function handleSubmit(e) {
  //   e.preventDefault()

  //   axios
  //     .post("post 주소", {
  //       company: company,
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
    <ModalPage
      isOpen={isAddProcessOpen}
      onRequestClose={() => setIsAddProcessOpen(false)}
      contentLabel={'AddProcess'}
    >
      {<AddProcessContent
        openAddProcessHandler={openAddProcessHandler}
        addCompany={addCompany}
        setAddCompany={setAddCompany}

      />}
    </ModalPage>
  )
}


export default AddProcess
  
