import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"

const Wrapper = styled.div`
  // display: flex;
  // flex-direction: column;
  justify-content: center;
  // position: relative;
`

const DropMenus = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  position: absolute;
  border: 0.5px solid gray;
  border-radius: 5px;
  padding: 5px 15px;
`

const Plus = styled.button`
  display: flex;
  align-items:center;
  justify-content: center;
  height: 23px;
  width: 23px;
  border-radius: 15px;
  border : none;
  background-color: white;
  color: gray;
  cursor: pointer;
`


export default function AddTemplates({addSubTab}) {
  
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const toggledown = () => { setIsOpen(!isOpen)}

  const handleCTClick = () => {
    navigate('/ct')
    addSubTab()
    toggledown()
  }
  // const handleAssayClick = () => { navigate.push('/assay') }
  // const handleInterviewClick = () => { navigate.push('/interview') }
  // const handleEmptyClick = () => { navigate.push('/memo') }

  return (
    <Wrapper>
      <Plus onClick={toggledown}>+</Plus>
      {isOpen && (
        <DropMenus>
          {/* <li onClick={handleAssayClick}>자기소개서</li> */}
          <li onClick={handleCTClick}>코딩 테스트</li>
          {/* <li onClick={handleInterviewClick}>면접 문항</li> */}
          {/* <li onClick={handleEmptyClick}>면접 문항</li> */}
        </DropMenus>
      )}
    </Wrapper>
  );
}