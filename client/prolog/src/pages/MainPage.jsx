import { useState } from "react";
import styled from "styled-components"

import MainHeader from "../components/main/MainHeader";
import Calendar from "../components/main/calendar/Calendar";
import Kanban from "../components/main/kanban/Kanban"

const Main = styled.div`

`


function MainPage() {
  const [isOn, setIsOn] = useState(false)

  function toggleHandler() {
    setIsOn(!isOn)
  }

  return (
    <div>
      <MainHeader isOn={isOn} setIsOn={setIsOn} />
      {isOn ? <Kanban /> :<Calendar />} 
    </div>
    )
};

export default MainPage;
