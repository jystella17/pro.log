import { Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import NoProcessHeader from "../components/process/header/NoProcessHeader";
import Steps from "../components/process/steps/Steps"
// import AddTemplates from "../components/process/body/AddTemplate";
import PaperBody from "../components/process/body/PaperBody"
import { Checkbox } from "antd"
import RangeDatePicker from "../common/components/RangeDatePicker"

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`

function NoProcess() {
  
  return (
      <div className="process">
        <NoProcessHeader />
        <Steps />
      </div>

  );
}

export default NoProcess