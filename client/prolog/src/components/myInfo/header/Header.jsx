import styled from "styled-components";

const Header = styled.div`
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
  & div {
    color: #686767;
  }
`;

const Button = styled.div``;

function MyInfoHeader() {
  return (
    <Header>
      <div>닉네임, 프로필 사진 등 개인정보를 업데이트 하세요</div>
      <Button>
        <button>취소</button>
        <button>저장</button>
      </Button>
    </Header>
  );
}

export default MyInfoHeader;
