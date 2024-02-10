import styled from "styled-components";
import Button from "../../common/components/Button";

const ContainerAll = styled.div`
  padding: 50px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* sidebar랑 너비 조절 */
  width: 70vw;
  height: 10vh;
  /* background-color: #fbfafa; */
`;

const MasterTitle = styled.div`
  font-size: xx-large;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Explain = styled.div`
  color: gray;
`;

function Header() {
  return (
    <ContainerAll>
      <div>
        <MasterTitle>마스터 자기소개서</MasterTitle>
        <Explain>마스터 자기소개서를 만들어서 여러 자기소개서에 사용해보세요!</Explain>
      </div>{" "}
      <div>
        <Button className="navy" children="저장하기"></Button>
      </div>
    </ContainerAll>
  );
}

export default Header;
