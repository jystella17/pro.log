import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { BsLayoutSidebar } from "react-icons/bs";
import Button from "../../common/components/Button";
import LogoutButton from "../login/LogoutButton";

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

export default function Headbar() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["access_token"]);
  function navigateToLogin() {
    navigate(`/login?path=${window.location.href}`);
  }

  const isLoggedIn = !!cookies.access_token;

  return (
    <Head>
      {isLoggedIn ? (
        <LogoutButton />
      ) : (
        <Button className={"navy"} onClick={navigateToLogin}>
          {"Login or SignUp"}
        </Button>
      )}
    </Head>
  );
}
