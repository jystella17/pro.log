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

const TotalPage = styled.div`
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Result() {
  return (
    <BrowserRouter>
      <TotalPage>
        <Sidebar />
        <Content>
          <div>header bar</div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mymaster" element={<MyMaster />} />
            <Route path="/masterpaper" element={<MasterPaper />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/allchatting" element={<AllChatting />} />
            <Route path="/mychatting" element={<MyChatting />} />
          </Routes>
        </Content>
      </TotalPage>
    </BrowserRouter>
  );
}
