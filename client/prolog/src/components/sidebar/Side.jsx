import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "../../pages/Dashboard";
import MyMaster from "../../pages/MyMaster";
import Master from "../../pages/Master";
import MyPage from "../../pages/MyPage";
import AllChatting from "../../pages/AllChatting";
import MyChatting from "../../pages/MyChatting";
import MainPage from "../../pages/MainPage";
import Login from "../../pages/Login"

export default function Side() {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mymaster" element={<MyMaster />} />
          <Route path="/master" element={<Master />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/allchatting" element={<AllChatting />} />
          <Route path="/mychatting" element={<MyChatting />} />
         
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}
