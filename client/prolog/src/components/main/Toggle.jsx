import { useState } from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: #7077A1;}

  > .toggle--checked {
    background-color: rgb(54, 48, 98);
    transition : 0.5s
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255,254,255);
    transition : 0.5s
  }

  >.toggle--checked {
    left: 27px;
    transition : 0.5s
  }
`

export default function Toggle({isOn, toggleHandler}) {
  

  return (
    <>
      <ToggleContainer onClick={toggleHandler}>

        <div className={`toggle-container ${isOn ? "toggle--checked" : null}`} />
        <div className={`toggle-circle ${isOn ? "toggle--checked" : null}`}/>
      </ToggleContainer>
    </>
  )
}