import { useState, useRef } from "react"

import { Checkbox, Rate } from 'antd';

import Tag from "../../common/components/Tag"
import styled from 'styled-components'
import './CT.css'

const Col = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4%;
  background-color: rgb(245, 245, 245);
  border-radius: 5px;
  gap: 20px;
  `
// 코테 문항 수 
function Question({question, qnum}) {
  return (
    <div className="q">
      <div>{question}</div>
      <div><input type="text" value={qnum} /></div>
    </div>
  )
}

// 코테 문항별 정보
// const initialItems = [
//   {
//     is_solve: 1,
//     algorithm: 'dfs',
//     level: 3,
//     memo: 'ez'
//   },{
//     is_solve: 1,
//     algorithm: 'dfs',
//     level: 3,
//     memo: 'ez'
//   },{
//     is_solve: 1,
//     algorithm: 'dfs',
//     level: 3,
//     memo: 'ez'
//   },{
//     is_solve: 1,
//     algorithm: 'dfs',
//     level: 3,
//     memo: 'ez'
//   }
// ]


function CTTable() {
  const [qnum, setQNum] = useState(0)

  
  
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  function AddLines() {
    const lines = []
    for (let i = 0; i < qnum; i++) {
      lines.push(
        <tr>
          <td><Checkbox onChange={onChange} style={{color: 'pink'}} /></td>
          <td><input type="text" /></td>
          <td><Rate allowHalf defaultValue={2.5} /></td>
          <td><input type="text" /></td>
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
        {AddLines}
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
  return (
    <Col>
      <h4>테스트가 끝났다면, 문제를 복기해 보세요.</h4>
      <Question question={'몇 문제였나요?'} />
      <Question question={'몇 문제 제출 하셨나요?'} />
      <CTTable />
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