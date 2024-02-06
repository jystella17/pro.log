import { useState, useRef } from "react"

import { Checkbox, Rate } from 'antd';

import Tag from "../../common/components/InputTag"
import SmallInputBox from "../../common/components/SmallInputBox"
import InputBox from "../../common/components/InputBox"
import styled from 'styled-components'
import './CT.css'

const Col = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4%;
  background-color: rgb(245, 245, 245);
  border-radius: 5px;
  gap: 15px;
`

// 코테 문항 수 
function Question({question, qnum, saveQNum}) {
  return (
    <div className="q">
      <div>{question}</div>
      <SmallInputBox width={'35px'} height={'35px'} size={'X-large'} value={qnum} onChange={saveQNum}/>
    </div>
  )
}


// 코테 문항 정보 표
function CTTable({qnum}) {
  const [check, setCheck] = useState(0)
  const onChange = () => {setCheck(1)}

  function AddLines() {
    const lines = []
    for (let i = 0; i < qnum; i++) {
      lines.push(
        <tr key={i}>
          <td><Checkbox onChange={onChange} /></td>
          <td><SmallInputBox width={'40px'} height={'23px'} size={'small'} /></td>
          <td><Rate allowHalf defaultValue={0} /></td>
          <td><InputBox width={'60px'} height={'30px'} size={'small'} /></td>
        </tr>
      )
    }
    return lines
  }
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
        {AddLines()}
      </tbody>
    </table>
    )
  }

function Header() {
  return (
    <Col>
      <h2>'기업이름' 코딩테스트에 대비할 문제 유형을 기록해보세요.</h2>
      <Tag />
    </Col>
  )
}

function Body() {
  const [qnum, setQNum] = useState(0)
  const saveQNum = (e) => setQNum(e.target.value)

  return (
    <Col>
      <h4>테스트가 끝났다면, 문제를 복기해 보세요.</h4>
      <Question question={'몇 문제였나요?'} qnum={qnum} saveQNum={saveQNum} />
      <Question question={'몇 문제 제출 하셨나요?'} />
      <CTTable qnum={qnum} />
    </Col>
  )
}


export default function CT() {
  return (
    <div className="ct">
      <Header />
      <Body />
    </div>
   
    
  )
}