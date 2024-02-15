import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Button from "../../common/components/Button";
import api from "./Axios";

function LogoutButton() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // await api.get("http://localhost:8080/api/logout");
      await api.get("https://i10b112.p.ssafy.io/api/logout");
      navigate("/");
    } catch (error) {
      // console.error("Logout failed", error);
    }
  };

  function HandleLogout() {
    logout();
    // navigate("/");
    location.reload();
  }

  return (
    <Button className={"navy"} onClick={HandleLogout}>
      {"Logout"}
    </Button>
  );
}

export default LogoutButton;
