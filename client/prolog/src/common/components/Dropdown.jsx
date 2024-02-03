import { useRef, useState } from 'react'
import useDetectClose from "../hooks/useDetectClose"
import './Components.scss'


function Dropdown() {
    const dropdownRef = useRef(null)
    const [isOpen, setIsOpen] = useDetectClose(dropdownRef, false)

    // 드롭다운에 들어갈 리스트
    return (
        <div className="wrapper">
            <button className="dropdownName" onClick={() => setIsOpen(!isOpen)}>드롭다운 버튼</button>
            <ul
                ref={dropdownRef}
                className={`${isOpen ? 'active' : 'menus' }`}>
                
                <li>
                    들어갈
                </li>
                <hr />
                <li>
                    메뉴
                </li>
                <hr />
                <li>
                    리스트
                </li>
            </ul>
        </div>
    )
}

export default Dropdown