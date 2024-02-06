
import { useState, useRef } from "react";
import useDetectClose from '../../../common/hooks/useDetectClose'
import PaperBody from "../body/PaperBody";

import './Steps.scss'
import { CiCirclePlus } from "react-icons/ci";



function TypeTab() {
  return (
    <div className="typeTab"></div>
  )

}



// 드롭다운 content
function Dropdown() {
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useDetectClose(dropdownRef, false)
  const [currentPage, setCurrentPage] = useState(null)
  
  
  function ValueClick(page) {
    setIsOpen(!isOpen)
    setCurrentPage(page)
  }

  
  // 드롭다운에 들어갈 리스트
  return (
      <div className="wrapper">
          <CiCirclePlus onClick={() => setIsOpen(!isOpen)} style={{cursor: "pointer"}}/>
          <ul
              ref={dropdownRef}
              className={`dropdownList ${isOpen ? 'down' : 'up'}`}>
            <li onClick={() => ValueClick('assay')}>자기소개서</li>
            <li onClick={() => ValueClick('ct')}>코딩테스트</li>
            <li onClick={() => ValueClick('interview')}>면접 문항</li>
            <li onClick={() => ValueClick('empty')}>빈 페이지</li>
      </ul>
      {/* {currentPage && <PaperBody page={currentPage} />} */}
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
                <div className="title">{threestep[i]}</div>
                <div>탭</div>
                <Dropdown />
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