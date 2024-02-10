import styled from "styled-components";
import MyInfoHeader from "../components/myInfo/header/Header";
import MyInfoBody from "../components/myInfo/body/Body";

const Container = styled.div`
  /* 가로축 정렬 */
  margin: 0 auto;
  padding: 60px 50px;
  width: 60vw;
  min-height: 100vh;
  /* display: flex;
  flex-direction: column; */
`;

function MyInfoPage() {
  return (
    <Container>
      <MyInfoHeader />
      <MyInfoBody />
    </Container>
  );
}

export default MyInfoPage;
