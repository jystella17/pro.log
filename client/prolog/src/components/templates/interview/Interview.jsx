// Paper와 동일

// db 저장 기능(저장할 때는 qnas를  axios 요청)
// 삭제는 qna를 axios.delete
import { useState, useRef } from "react";
import styled from "styled-components";
import { IoClose, IoAddCircleOutline, IoChevronForward, IoChevronDown } from "react-icons/io5";
import "./Interview.scss";
import { Input, ConfigProvider } from "antd";

// 높이 늘어나는 것 수정

const ContainerAll = styled.div`
  padding: 70px 100px 30px 100px;
  /* width: 60vw; */
  border-radius: 10px;
`;

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
  const [open, setOpen] = useState(false);
  const textareaRef = useRef(null);

  function OpenAnswer() {
    setOpen(!open);
  }

  // 입력할 때마다 높이 조절
  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 높이 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 스크롤 높이에 맞춰 높이 조정
    }
  };

  return (
    <div className="qna">
      {/* 질문 */}
      <div className="qna-header">
        <div className="qna-number">
          {/* 토글 버튼 */}
          {open ? (
            <IoChevronDown onClick={OpenAnswer} />
          ) : (
            <IoChevronForward onClick={OpenAnswer} />
          )}
          <input
            className="question"
            type="text"
            placeholder="면접 질문을 입력하세요."
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
      {open && (
        <textarea
          ref={textareaRef} // ref 연결
          className="answer"
          placeholder="답변을 입력하세요."
          value={answer}
          onChange={(e) => {
            onAChange(id, e.target.value);
            handleResizeHeight();
          }}
        ></textarea>
      )}
    </div>
  );
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
  function removeQnA(id, index) {
    if (window.confirm("문항을 삭제하시겠습니까?")) {
      setQnAs(qnas.filter((q) => q.id !== id));
    }
  }

  // 질문 내용이 변경될 때 호출되는 함수
  function handleQuestionChange(id, newQuestion) {
    setQnAs(qnas.map((q) => (q.id === id ? { ...q, question: newQuestion } : q)));
    console.log(`질문 ${id + 1} 변경됨:`, newQuestion);
  }

  // 답변 내용이 변경될 때 호출되는 함수
  const handleAnswerChange = (id, newAnswer) => {
    setQnAs(qnas.map((q) => (q.id === id ? { ...q, answer: newAnswer } : q)));
    console.log(`답변 ${id + 1} 변경됨:`, newAnswer);
  };

  return (
    <>
      <ContainerAll>
        <div className="content">
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
