import styled from "styled-components";
import Button from "../../common/components/Button";

const Container = styled.div`
  display: flex;
`;

const MasterTitle = styled.input``;

function Title() {
  return <MasterTitle />;
}

function Header() {
  return (
    <Container>
      <Title></Title>
      <Button className="cancle" children="취소"></Button>
    </Container>
  );
}

export default Header;
