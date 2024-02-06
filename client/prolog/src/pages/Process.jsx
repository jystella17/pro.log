import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import ProcessHeader from "../components/process/header/ProcessHeader";
import Steps from "../components/process/steps/Steps"
// import AddTemplates from "../components/process/body/AddTemplate";
import CT from "../components/templates/CT";
import MainPage from "../pages/MainPage"

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

function Process() {
  return (
    <BrowserRouter>
      <div className="process">
        <ProcessHeader />
        <Steps />
        <Content>
          <Header>
            <Checkbox />
            <RangeDatePicker />
          </Header>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/ct" element={<CT />} />
          {/* <Route path="/assay" component={Assay} />
          <Route path="/interview" component={Interview} />
          <Route path="/memo" component={Memo} /> */}
          </Routes>
          </Content>
      </div>
    </BrowserRouter>
  );
}

export default Process