import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { BsLayoutSidebar } from "react-icons/bs";
import Button from "../../common/components/Button";
import LogoutButton from "../login/LogoutButton";
import api from "../login/Axios";

const Head = styled.div`
  display: flex;
  position: fixed;
  left: 246px;
  height: 60px;
  width: 1290px;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 50px;
  border-bottom: 1px solid rgb(245, 245, 245);
  background-color: white;
  z-index: 10;
`;

const Greetings = styled.div`
  padding-right: 40px;
`;

export default function Headbar() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["access_token"]);
  function navigateToLogin() {
    navigate(`/login?path=${window.location.href}`);
  }

  const isLoggedIn = !!cookies.access_token;

  const [profile, setProfile] = useState(null);
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await api.get("https://i10b112.p.ssafy.io/api/user/profile");
      setProfile(response.data);
      // console.log(response.data);
    } catch (error) {
      // console.error("사용자 정보 가져오기 실패", error);
    }
  };

  return (
    <Head>
      {isLoggedIn ? (
        <>
          <Greetings>{`${profile?.nickname}님 안녕하세요 !`}</Greetings>
          <LogoutButton />
        </>
      ) : (
        <Button className={"navy"} onClick={navigateToLogin}>
          {"Login or SignUp"}
        </Button>
      )}
    </Head>
  );
}
