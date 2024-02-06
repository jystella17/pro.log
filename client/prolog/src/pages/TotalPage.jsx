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
import Login from "./Login";

const TotalPage = styled.div`
  display: inline-block;
`;

const Content = styled.div`
  // display: block;
  // flex-direction: column;
  width: 80%;
`;

export default function Result() {
  return (
    <BrowserRouter>
      <TotalPage>
        <Sidebar />
        <Content>
          <Headbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mymaster" element={<MyMaster />} />
            <Route path="/masterpaper" element={<MasterPaper />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/allchatting" element={<AllChatting />} />
            <Route path="/mychatting" element={<MyChatting />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Content>
      </TotalPage>
    </BrowserRouter>
  );
}
