import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import MyMaster from "./MyMaster";
import MasterPaper from "./MasterPaper";
import MyPage from "./MyPage";
import AllChatting from "./AllChatting";
import MyChatting from "./MyChatting";
import MainPage from "./MainPage";
import Sidebar from "../components/sidebar/Sidebar";
import Headbar from "../components/sidebar/Headbar";
import Process from "./Process"
import CT from "../components/templates/CT"
import Login from "./Login";



const AppContainer = styled.div`
  display: flex;
  width: 100vw;
`

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 291px;
  padding-top: 60px;
`
const TotalPage = styled.div`
  display: inline-block;
`;

const Content = styled.div`
  flex: 1;
`

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
            <Route path="/mymaster" element={<MyMaster />} />
            <Route path="/masterpaper" element={<MasterPaper />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/allchatting" element={<AllChatting />} />
            <Route path="/mychatting" element={<MyChatting />} />
            <Route path="/login" element={<Login />} />
            <Route path="/process" element={<Process />} />
            <Route path="/process/ct" element={<CT />} />

          </Routes>
          </Content>
        </MainContent>
      </AppContainer>
    </BrowserRouter>
  );
}
