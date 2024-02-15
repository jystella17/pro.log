import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../../common/components/Button";
import api from "../login/Axios";

const Header = styled.div`
  padding: 0px 10px;
  display: flex;
  margin: 50px 0;
  justify-content: space-between;
  & div {
    color: #686767;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
`;

const Body = styled.div`
  margin-top: 40px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px 30px 25px 0px;
  border-top: 1px solid lightgray;
  min-height: 30px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  & p {
    margin: 2px 0;
    font-size: x-small;
    color: #8d8c8c;
  }
`;

const InputContent = styled.input`
  padding-left: 10px;
  width: 20vw;
  height: 30px;
  border: 2px solid lightgray;
  border-radius: 5px;
`;

function InfoComponent({ title, explain, inputType, value, onChange, name }) {
  return (
    <Info>
      <Title>
        <div>{title}</div>
        <p>{explain}</p>
      </Title>
      <InputContent type={inputType} value={value} onChange={onChange} name={name} />
    </Info>
  );
  // }
}

function MyInfoBody() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  function NavigateToMain() {
    navigate("/");
  }

  // profile get
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await api.get("/api/user/profile");
      setProfile(response.data);
    } catch (error) {
      // console.error("사용자 정보 가져오기 실패", error);
    }
  };

  // onChange
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // profile 저장
  function handleSaveInfo() {
    const updateUserDetails = async () => {
      try {
        const update = await api.put("/api/user/profile", { ...profile });
        // console.log("내 정보 저장 완료");
        window.alert("저장되었습니다.");
      } catch (error) {
        // console.error("내 정보 저장 실패", error);
      }
    };
    updateUserDetails();
  }

  return (
    <div>
      <Header>
        <div>개인정보를 업데이트 하세요.</div>
        <Buttons>
          {/* onClick 저장 -> db에 저장 */}
          <Button className="grey" children="취소하기" onClick={NavigateToMain} />
          <Button className="navy" children="저장하기" onClick={handleSaveInfo} />
        </Buttons>
      </Header>

      {profile && (
        <Body>
          <InfoComponent
            title="이름"
            inputType="text"
            name="nickname"
            value={profile.nickname}
            onChange={handleInputChange}
          ></InfoComponent>

          <InfoComponent
            title="이메일"
            inputType="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
          ></InfoComponent>
          <InfoComponent
            title="전화번호"
            inputType="tel"
            name="phoneNumber"
            value={profile?.phoneNumber || ""}
            onChange={handleInputChange}
          ></InfoComponent>
        </Body>
      )}
    </div>
  );
}

export default MyInfoBody;
