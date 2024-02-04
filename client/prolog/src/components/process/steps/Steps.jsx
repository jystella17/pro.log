import './Steps.css'
import { CiCirclePlus } from "react-icons/ci";

import { Dropdown } from 'antd';
import TypesTab from "../body/types/Types";

// 드롭다운
const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer">자기소개서 페이지</a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer">코딩테스트 페이지</a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer">면접 문항 페이지</a>
    ),
  },
  {
    key: '4',
    label: (
        <a target="_blank" rel="noopener noreferrer">빈 페이지</a>
    ),
  },
];


function TemplateDropdown() {
    return (
        <div>
            <Dropdown
                menu={{
                    items,
                }}
                placement="topLeft"
            >
            <CiCirclePlus />
            </Dropdown>
        </div>
    )
}



// 단계
function Steps() {
    const step = []
    const threestep = ['Paper', 'Test', 'Interview']

    for (let i = 0; i < 3; i++) {
        step.push(
          <div className={`step ${threestep[i]}`} key={i}>
            <div className="content">
                <div className="title">{threestep[i]}</div>
                <div>탭</div>
                <TemplateDropdown />
            </div>
            <hr />
            </div>
        )
    }

    return (
        <div className="steps">{step}</div>
    )

    
}







export default function Step() {
    return (
        <Steps />
    )
}