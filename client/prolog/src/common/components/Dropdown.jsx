import { useRef, useState } from 'react'
import useDetectClose from "../hooks/useDetectClose"
import './Components.scss'


// 전형 선택 드롭다운
function TypesDropdown({ value, setType, setIsOpen, isOpen }) {
    function ValueClick() {
      setType(value)
      setIsOpen(!isOpen)
    }
    return (
      <div>
        <li onClick={ValueClick}>{value}</li>
      </div>
    )
  }
  
  // 드롭다운 content
  function Dropdown() {
    const dropdownRef = useRef(null)
    const [isOpen, setIsOpen] = useDetectClose(dropdownRef, false)
    const [type, setType] = useState('')
    const dropdownList = ['서류 전형', '테스트 전형', '면접 전형']
    
    // 드롭다운에 들어갈 리스트
    return (
        <div className="wrapper">
            <input className="dropdownName" onClick={() => setIsOpen(!isOpen)} type='button' value={type} placeholder="전형을 선택하세요."/>
            <ul
                ref={dropdownRef}
                className={`dropdownList ${isOpen ? 'down' : 'up'}`}>
                {dropdownList.map((value, index) => (
                  <TypesDropdown key={index} value={value} setIsOpen={setIsOpen} setType={setType} isOpen={isOpen} /> 
                ))}
            </ul>
        </div>
    )
  }

export default Dropdown