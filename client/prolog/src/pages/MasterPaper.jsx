import styled from "styled-components";
// import Header from "../components/masterPaper/Header";
import QnA from "../components/masterPaper/QnA";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 1px solid #7c93c326;
  border-radius: 10px; */
`;

function MasterPaper() {
  return (
    <Container>
      {/* <Header></Header> */}
      <QnA></QnA>
    </Container>
  );
}

export default MasterPaper;
