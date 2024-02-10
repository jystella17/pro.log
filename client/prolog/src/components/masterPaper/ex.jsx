import React, { useState } from "react";

// QuestionAnswerComponent는 개별 질문과 답변 입력 필드를 렌더링합니다.
// 첫 번째 질문-답변 쌍을 제외하고 삭제 버튼을 포함합니다.
const QuestionAnswerComponent = ({ id, question, onRemove, onChange }) => {
  return (
    <div>
      {/* 질문 입력 필드 */}
      <input
        type="text"
        placeholder="질문을 입력하세요..."
        value={question}
        onChange={(e) => onChange(id, e.target.value)} // 입력 변경 시 onChange 핸들러 호출
      />
      {/* 첫 번째 질문-답변 쌍이 아니면 삭제 버튼을 표시 */}
      {id !== 0 && <button onClick={() => onRemove(id)}>X</button>}
    </div>
  );
};

// AddQuestionComponent는 새 질문-답변 쌍을 추가하는 '+' 버튼을 렌더링합니다.
const AddQuestionComponent = ({ onAdd }) => {
  return <button onClick={onAdd}>+</button>;
};

// QuestionsContainer는 모든 질문-답변 쌍의 상태를 관리합니다.
const QuestionsContainer = () => {
  const [questions, setQuestions] = useState([{ id: 0, question: "" }]);

  // 새 질문-답변 쌍을 추가하는 함수입니다.
  const addQuestionAnswer = () => {
    const newId = questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
    setQuestions([...questions, { id: newId, question: "" }]);
  };

  // 특정 질문-답변 쌍을 삭제하는 함수입니다.
  const removeQuestionAnswer = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // 질문 내용이 변경될 때 호출되는 함수입니다.
  const handleQuestionChange = (id, newQuestion) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, question: newQuestion } : q)));
  };

  // 질문-답변 쌍을 렌더링합니다. map 함수를 사용하여 questions 배열의 각 요소를
  // QuestionAnswerComponent로 변환합니다.
  return (
    <div>
      {questions.map((q) => (
        <QuestionAnswerComponent
          key={q.id}
          id={q.id}
          question={q.question}
          onRemove={removeQuestionAnswer}
          onChange={handleQuestionChange}
        />
      ))}
      <AddQuestionComponent onAdd={addQuestionAnswer} />
    </div>
  );
};

export default QuestionsContainer;
