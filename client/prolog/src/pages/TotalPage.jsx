import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import MasterPaper from "./MasterPaper";
import MyInfo from "./MyInfo";
import Chatting from "./Chatting";
import MainPage from "./MainPage";
import Sidebar from "../components/sidebar/Sidebar";
import Headbar from "../components/sidebar/Headbar";
import Process from "./Process";
import CT from "../components/templates/CT";
import Login from "./Login";

const AppContainer = styled.div`
  display: flex;
  width: 100vw;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 261px;
  padding-top: 60px;
`;
const TotalPage = styled.div`
  display: inline-block;
`;

const Content = styled.div`
  flex: 1;
`;

export default function Result() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Sidebar />
        <MainContent>
          <Headbar />
          <Content>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/masterpaper" element={<MasterPaper />} />
              <Route path="/chatting" element={<Chatting />} />
              <Route path="/myinfo" element={<MyInfo />} />
              <Route path="/login" element={<Login />} />
              <Route path="/process" element={<Process />} />
            </Routes>
          </Content>
        </MainContent>
      </AppContainer>
    </BrowserRouter>
  );
}
