import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./pages/Dashboard";
import MyMaster from "./pages/MyMaster";
import MyPage from "./pages/MyPage";
import AllChatting from "./pages/AllChatting";
import MyChatting from "./pages/MyChatting";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mymaster" element={<MyMaster />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/allchatting" element={<AllChatting />} />
          <Route path="/mychatting" element={<MyChatting />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
