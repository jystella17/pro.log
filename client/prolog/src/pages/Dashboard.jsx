import { useState, useEffect } from "react";
import ProgressBarBox from "../components/dashboard/Dashboard";
import CountProcess from "../components/dashboard/CountProcess";
import styled from "styled-components";
import api from "../components/login/Axios";

const Container = styled.div`
  /* width: 977px; */
  min-height: 646px;
  /* height: 100vh; */
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 100px;
`;

const Title = styled.div`
  font-size: x-large;
  font-weight: bold;
  text-align: center;
`;
const DashboardEx = styled.div`
  padding-top: 20px;
  /* font-size: small; */
  text-align: center;
`;

const Dashboard = () => {
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
    <Container>
      <div>
        <Title>{`${profile?.nickname}님의 진행 상태 통계입니다.`}</Title>
        <DashboardEx>
          {/* {`${profile?.nickname}님이 진행중인 프로세스들이 각 전형 별 비율과 최종 합격률을 알려드립니다.`} */}
          프로세스들의 각 전형 단계별 진행 비율과 최종 합격률을 한눈에 확인하세요.
        </DashboardEx>
      </div>
      <ProgressBarBox />
      <CountProcess />
    </Container>
  );
};

export default Dashboard;
