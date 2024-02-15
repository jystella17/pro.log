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

// 로그인 분기
import { AuthProvider } from "../components/login/AuthContext";
import NeedLogin from "../components/login/NeedLogin";

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
    <AuthProvider>
      <BrowserRouter>
        <AppContainer>
          <Sidebar />
          <Headbar />
          <TotalPageContent>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route
                path="/analysis"
                element={
                  <NeedLogin>
                    <Dashboard />
                  </NeedLogin>
                }
              />
              <Route
                path="/masterpaper"
                element={
                  <NeedLogin>
                    <MasterPaper />
                  </NeedLogin>
                }
              />
              <Route
                path="/myinfo"
                element={
                  <NeedLogin>
                    <MyInfo />
                  </NeedLogin>
                }
              />
              <Route path="/chatting" element={<WebRtc />} />
              <Route path="/login" element={<Login />} />
            <Route path="/webrtc" element={<WebRtc />} />
            
            <Route path="/process/:pid" element={<Process />}>
              <Route path="essay" element={<PaperBody />}>
                <Route path=":tabId">
                  <Route path="1" element={<QnAContainer />} />
                  <Route path="2" element={<CT />} />
                  <Route path="3" element={<Interview />} />
                  <Route path="4" element={<Memo />} />
                </Route>
              </Route>
              <Route path="test" element={<TestBody />}>
                <Route path=":tabId">
                  <Route path="1" element={<QnAContainer />} />
                  <Route path="2" element={<CT />} />
                  <Route path="3" element={<Interview />} />
                  <Route path="4" element={<Memo />} />
                </Route>
              </Route>
              <Route path="interview" element={<InterviewBody />}>
                <Route path=":tabId">
                  <Route path="1" element={<QnAContainer />} />
                  <Route path="2" element={<CT />} />
                  <Route path="3" element={<Interview />} />
                  <Route path="4" element={<Memo />} />
                </Route>
              </Route>
            </Route>

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
    </AuthProvider>
  );
}
