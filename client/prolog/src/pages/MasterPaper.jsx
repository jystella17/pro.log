import styled from "styled-components";
import Header from "../components/masterPaper/Header";
import QnA from "../components/masterPaper/QnA";

const Container = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function MasterPaper() {
  return (
    <Container>
      <Header></Header>
      <QnA></QnA>
    </Container>
  );
}

export default MasterPaper;
