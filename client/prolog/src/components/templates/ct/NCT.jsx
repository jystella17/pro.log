import { useState, useRef } from "react"

import { Checkbox, Rate } from 'antd';

import Tag from "../../../common/components/InputTag"
import SmallInputBox from "../../../common/components/SmallInputBox"
import InputBox from "../../../common/components/InputBox"
import styled from 'styled-components'
import './CT.css'

const Col = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4%;
  border-radius: 8px;
  background-color: white;
  box-shadow: 5px 5px 5px -5px gray;
  gap: 15px;
`

function Header() {
  return (
    <Col>
      <h2>'기업이름' 코딩테스트에 대비할 문제 유형을 기록해보세요.</h2>
      <Tag />
    </Col>
  )
}

// 코테 문항 수 
function Question({ question, qnum, setQNum }) {
  
  const handleQNumChange = (e) => {
    const newValue = e.target.value;
    // 입력값이 숫자인지 확인합니다.
    if (!isNaN(newValue)) {
      // 숫자이고 10보다 작거나 같은 경우에만 설정합니다.
      if (newValue <= 10) {
        setQNum(newValue);
      } else {
        // 10보다 큰 경우 10으로 설정합니다.
        setQNum(10);
      }
    }
  };

  return (
    <div className="q">
      <div>{question}</div>
      <SmallInputBox width={'35px'} height={'35px'} size={'X-large'} value={qnum} onChange={handleQNumChange}/>
    </div>
  )
}

function Body({ qnum, setQNum }) {

  return (
    <Col>
      <h4>테스트가 끝났다면, 문제를 복기해 보세요.</h4>
      <Question question={'몇 문제였나요?'} qnum={qnum} setQNum={setQNum} />
      
      <CTTable qnum={qnum} />
    </Col>
  )
}


function CTTableRow({ index, onDataChange }) {
  const [cts, setCts] = useState([{id: 0, isSolve: false, algorithm:'', level:0, memo:''}])

  const handleIsSolveChange = (e) => {
    const newValue = e.target.checked;
    setCts(prevData => ({ ...prevData, isSolve: newValue }));
    onDataChange(index, { ...cts, isSolve: newValue });
  };

  const handleAlgorithmChange = (e) => {
    const newValue = e.target.value;
    setCts(prevData => ({ ...prevData, algorithm: newValue }));
    onDataChange(index, { ...cts, algorithm: newValue });
  };

  const handleLevelChange = (value) => {
    setCts(prevData => ({ ...prevData, level: value }));
    onDataChange(index, { ...cts, level: value });
  };

  const handleMemoChange = (e) => {
    const newValue = e.target.value;
    setCts(prevData => ({ ...prevData, memo: newValue }));
    onDataChange(index, { ...cts, memo: newValue });
  };

  return (
    <tr>
      <td><Checkbox checked={cts.isSolve} onChange={handleIsSolveChange} /></td>
      <td><SmallInputBox width={'40px'} height={'23px'} size={'small'}  value={cts.algorithm} onChange={handleAlgorithmChange} /></td>
      <td><Rate defaultValue={cts.level} onChange={handleLevelChange} /></td>
      <td><InputBox width={'60px'} height={'30px'} size={'small'} value={cts.memo} onChange={handleMemoChange} /></td>
    </tr>
  )
}



// 코테 문항 정보 표
function CTTable({ qnum }) {
  const [data, setData] = useState([])
  
  function handleDataChange(index, newData) {
    const updatedData = [...data];
    updatedData[index] = newData;
    setData(updatedData);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Solve</th>
          <th>유형</th>
          <th>난이도</th>
          <th>메모</th>
        </tr>
      </thead>
      <tbody>
      {Array.from({ length: qnum }).map((_, index) => (
          <CTTableRow key={index} index={index} onDataChange={handleDataChange} />
        ))}
      </tbody>
    </table>
    )
}


export default function NCT() {
  const [qnum, setQNum] = useState('')

  return (
    <div className="ct">
      {/* <Header /> */}
      <Body qnum={qnum} setQNum={setQNum} />
    </div>
  )
}