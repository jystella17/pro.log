import React from "react";
import ProgressBarBox from "../components/dashboard/Dashboard";
import CountProcess from "../components/dashboard/CountProcess";
import styled from "styled-components";

const Container = styled.div`
  /* width: 977px; */
  min-height: 646px;
  /* height: 100vh; */
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 80px;
`;

const Title = styled.div`
  font-size: x-large;
  font-weight: bold;
  text-align: center;
`;

const Dashboard = () => {
  return (
    <Container>
      <Title>유지원님의 진행 상태를 통계로 확인해보세요.</Title>
      <ProgressBarBox />
      <CountProcess />
    </Container>
  );
};

export default Dashboard;
