import styled from "styled-components";
import MyInfoBody from "../components/myInfo/MyInfomation";

const Container = styled.div`
  /* 가로축 정렬 */
  margin: 0 auto;
  padding: 0 50px;
  width: 60%;
  min-height: 100vh;
`;

function MyInfoPage() {
  return (
    <Container>
      <MyInfoBody />
    </Container>
  );
}

export default MyInfoPage;
