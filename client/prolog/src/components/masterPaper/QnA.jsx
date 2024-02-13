import { useState, useEffect } from "react";
import styled from "styled-components";
import { IoClose, IoAddCircle, IoAddCircleOutline } from "react-icons/io5";
import "./QnA.scss";
import { Flex, Input, ConfigProvider } from "antd";
import Button from "../../common/components/Button";
import axios from "axios";

const ContainerAll = styled.div`
  padding: 70px 100px 30px 100px;
  width: 85%;
  background-color: #7c93c326;
  border-radius: 10px;
`;

const Container = styled.div`
  padding: 70px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
`;

const MasterTitle = styled.div`
  font-size: xx-large;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Explain = styled.div`
  color: gray;
`;

// 실시간 글자수 적용 textarea
const { TextArea } = Input;
const onChange = (e) => {
  console.log("Change:", e.target.value);
};

function QnAComponent({
  id,
  question,
  answer,
  onRemove,
  onQChange,
  onAChange,
  index,
  isRemovable,
}) {
  return (
    <div className="qna">
      {/* 질문 */}
      <div className="qna-header">
        <div className="qna-number">
          <p>{index + 1}.</p>
          <input
            className="question"
            type="text"
            placeholder="질문을 입력하세요."
            value={question}
            // 입력 변경 시 onChange
            onChange={(e) => onQChange(id, e.target.value)}
          />
        </div>
        {/* qna가 하나 남았을 때는 삭제 불가 */}
        {isRemovable && (
          <div className="x-button" onClick={() => onRemove(id, index)}>
            <IoClose />
          </div>
        )}
      </div>
      {/* 답변 */}
      {/* padding.. */}
      <ConfigProvider
        theme={{
          token: {
            colorPrimaryHover: "",
            colorPrimary: "lightgrey",
          },
        }}
      >
        <TextArea
          showCount
          cols="4"
          rows="8"
          className="answer"
          type="text"
          placeholder="답변을 입력하세요."
          value={answer}
          // 입력 변경 시 onChange
          onChange={(e) => onAChange(id, e.target.value)}
        />
      </ConfigProvider>{" "}
    </div>
  );
}

// 상태관리
function QnAContainer() {
  const [qnas, setQnAs] = useState([{ id: 0, question: "", answer: "" }]);

  // QnA get
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("https://i10b112.p.ssafy.io/api/cover-letter");
  //       setQnAs(response.data);
  //       console.log("마스터자소서 불러오기 성공", response.data);
  //     } catch (error) {
  //       console.error("마스터자소서 불러오기 실패", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // QnA 컴포넌트 추가 함수
  function AddQnA() {
    const newId = qnas.length > 0 ? Math.max(...qnas.map((q) => q.id)) + 1 : 1;
    setQnAs([...qnas, { id: newId, question: "", answer: "" }]);
  }

  // 특정 QnA 삭제 함수
  function removeQnA(id, index) {
    if (window.confirm(`문항 ${index + 1}을 삭제하시겠습니까?`)) {
      setQnAs(qnas.filter((q) => q.id !== id));
    }
  }

  // 질문 내용이 변경될 때 호출되는 함수
  function handleQuestionChange(id, newQuestion) {
    setQnAs(qnas.map((q) => (q.id === id ? { ...q, question: newQuestion } : q)));
  }

  // 답변 내용이 변경될 때 호출되는 함수
  const handleAnswerChange = (id, newAnswer) => {
    setQnAs(qnas.map((q) => (q.id === id ? { ...q, answer: newAnswer } : q)));
  };

  return (
    <>
      <Container>
        <div>
          <MasterTitle>마스터 자기소개서</MasterTitle>
          <Explain>마스터 자기소개서를 만들어서 여러 자기소개서에 사용해보세요!</Explain>
        </div>
        <div>
          {/* <Button className="navy" children="저장하기" onClick={saveQnALocal}></Button> */}
        </div>
      </Container>
      <ContainerAll>
        <div className="qnas-button">
          <div className="qnas">
            {/* react에서 list의 각 항목을 렌더링 할 때는, 각 항목에 고유한 key prop이 있어야함 */}
            {qnas.map((q, index) => (
              <QnAComponent
                key={q.id}
                id={q.id}
                index={index}
                question={q.question}
                answer={q.answer}
                onRemove={removeQnA}
                onQChange={handleQuestionChange}
                onAChange={handleAnswerChange}
                isRemovable={qnas.length > 1}
              />
            ))}
          </div>
          <div className="addButton">
            <IoAddCircleOutline size="60" color="#5D5D8A" onClick={AddQnA} />
          </div>
        </div>
      </ContainerAll>
    </>
  );
}

export default QnAContainer;
