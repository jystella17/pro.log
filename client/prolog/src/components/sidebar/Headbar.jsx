import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { BsLayoutSidebar } from "react-icons/bs";
import Button from "../../common/components/Button";

const Head = styled.div`
  display: flex;
  position: fixed;
  left: 246px;
  height: 60px;
  width: 1290px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  border-bottom: 1px solid rgb(245, 245, 245);
  background-color: white;
  z-index: 10;
`;

export default function Headbar() {
  const navigate = useNavigate();

  function navigateToLogin() {
    navigate("/login");
  }

  return (
    <Head>
      <BsLayoutSidebar style={{ height: "20px", width: "20px" }} />
      <Button className={"navy"} onClick={navigateToLogin}>
        {"Login or SignUp"}
      </Button>
    </Head>
  );
}
