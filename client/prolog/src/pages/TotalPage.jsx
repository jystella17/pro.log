import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import MasterPaper from "./MasterPaper";
import MyMaster from "./MyMaster";
import MyInfo from "./MyInfo";
import Chatting from "./Chatting";
import MainPage from "./MainPage";
import Sidebar from "../components/sidebar/Sidebar";
import Headbar from "../components/sidebar/Headbar";
import NoProcess from "./NoProcess";
import YesProcess from "./YesProcess";


import Login from "./Login";
import WebRtc from "./WebRtc";
import Process from "../components/process/body/Process";
import PaperBody from "../components/process/body/PaperBody";
import TestBody from "../components/process/body/TestBody";
import InterviewBody from "../components/process/body/InterviewBody";
import QnAContainer from "../components/templates/assay/Assay";
import Interview from "../components/templates/interview/Interview";
import CT from "../components/templates/ct/CT";
import Memo from "../components/templates/memo/Memo";


const AppContainer = styled.div`
  width: 1519px;
  height: 737px;
`;

const TotalPageContent = styled.div`
  // width: 1536px;
  // height: 737px;
  padding-top: 60px;
  padding-left: 246px;
`;

export default function Result() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Sidebar />
        <Headbar />
        <TotalPageContent>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/analysis" element={<Dashboard />} />
              <Route path="/masterpaper" element={<MasterPaper />} />
              <Route path="/myinfo" element={<MyInfo />} />
              <Route path="/chatting" element={<WebRtc />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/process" element={<NoProcess />} />
              <Route path="/process/:selectedJdId" element={<YesProcess />} />
              <Route path="/process/:company" element={<NoProcess />} /> */}
            <Route path="/webrtc" element={<WebRtc />} />
            
            <Route path="/process/:pid" element={<Process />}>
              <Route path="paper" element={<PaperBody />} />
              <Route path="test" element={<TestBody />}>
                <Route path=":tabId">
                  <Route path="1" element={<QnAContainer />} />
                  <Route path="2" element={<CT />} />
                  <Route path="3" element={<Interview />} />
                  <Route path="4" element={<Memo />} />
                </Route>
              </Route>
              <Route path="interview" element={<InterviewBody />} />
            </Route>

            </Routes>
          </TotalPageContent>
      </AppContainer>
    </BrowserRouter>
  );
}
