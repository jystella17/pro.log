// 질문 답변 컴포넌트(질문, 답변-실시간 글자수)
// 질문 답변 컴포넌트(삭제버튼)

// 질문 답변 추가 버튼
// 기능
import { useState } from "react";
import styled from "styled-components";
import "./QnA.scss";

const ContainerAll = styled.div`
  padding: 70px 100px;
  /* display: flex;
  justify-content: center; */
  width: 60vw;
  height: 100vh;
  background-color: #7c93c326;
  border-radius: 10px;
`;

function QnAComponent({ id, question, answer, onRemove, onQChange, onAChange }) {
  return (
    <div>
      {/* 질문 */}
      <div>
        <input
          className="question"
          type="text"
          placeholder="질문을 입력하세요."
          value={question}
          // 입력 변경 시 onChange
          onChange={(e) => onQChange(id, e.target.value)}
        />
        {/* 첫 번째 질문-답변 쌍이 아니면 삭제 버튼을 표시 */}
        {id !== 0 && <button onClick={() => onRemove(id)}>X</button>}
      </div>
      {/* 답변 */}
      <textarea
        cols="4"
        rows="8"
        className="answer"
        type="text"
        placeholder="답변을 입력하세요."
        value={answer}
        // 입력 변경 시 onChange
        onChange={(e) => onAChange(id, e.target.value)}
      />
    </div>
  );
}

// QnA 컴포넌트 추가
function AddButton({ onAdd }) {
  return <button onClick={onAdd}>+</button>;
}

// 상태관리
function QnAContainer() {
  const [qnas, setQnAs] = useState([{ id: 0, question: "", answer: "" }]);

  // QnA 컴포넌트 추가 함수
  function AddQnA() {
    const newId = qnas.length > 0 ? Math.max(...qnas.map((q) => q.id)) + 1 : 1;
    setQnAs([...qnas, { id: newId, question: "", answer: "" }]);
  }

  // 특정 QnA 삭제 함수
  function removeQnA(id) {
    setQnAs(qnas.filter((q) => q.id !== id));
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
      <ContainerAll>
        <div className="content">
          <div className="qna">
            {qnas.map((q) => (
              <QnAComponent
                key={q.id}
                id={q.id}
                question={q.question}
                answer={q.answer}
                onRemove={removeQnA}
                onQChange={handleQuestionChange}
                onAChange={handleAnswerChange}
              />
            ))}
          </div>
          <div className="deleteButton">
            <AddButton onAdd={AddQnA} />
          </div>
        </div>
      </ContainerAll>
    </>
  );
}

export default QnAContainer;
