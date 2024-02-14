import { useState, useEffect } from "react";
import styled from "styled-components";
import { IoClose, IoAddCircleOutline } from "react-icons/io5";
import { Input, ConfigProvider } from "antd";
import { useRecoilValue } from "recoil";
import { processDataState } from "../../../state/atoms";

const { TextArea } = Input;

const ContainerAll = styled.div`
  padding: 70px 100px 30px 100px;
  background-color: #f3f8ff;
  border-radius: 10px;
`;

function QnAComponent({
  qnaId,
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
      <div className="qna-header">
        <div className="qna-number">
          <p>{index + 1}.</p>
          <input
            className="question"
            type="text"
            placeholder="질문을 입력하세요."
            value={question}
            onChange={(e) => onQChange(qnaId, e.target.value)}
          />
        </div>
        {isRemovable && (
          <div className="x-button" onClick={() => onRemove(qnaId, index)}>
            <IoClose />
          </div>
        )}
      </div>
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
          onChange={(e) => {
            onAChange(qnaId, e.target.value);
          }}
        />
      </ConfigProvider>{" "}
    </div>
  );
}

function QnAContainer() {
  const processData = useRecoilValue(processDataState);
  const [qnas, setQnAs] = useState([]);
  

  useEffect(() => {
    if (processData) {
      
      const newQnAs = processData.test.flatMap((item, index) => (
        item.content.map((contentItem, contentIndex) => ({
          ...contentItem,
          qnaId: `${index}-${contentIndex}`, // 적절한 고유 식별자 생성
        }))
      ));
      setQnAs(newQnAs);

      console.log(processData, "QNS");
      
    }
  }, [processData]);

  function AddQnA() {
    const newId = qnas.length > 0 ? Math.max(...qnas.map((q) => parseInt(q.qnaId.split("-")[0], 10))) + 1 : 0;
    setQnAs([...qnas, { qnaId: `${newId}-0`, id: newId, question: "", answer: "" }]);
  }

  function removeQnA(qnaId, index) {
    if (window.confirm(`문항 ${index + 1}을 삭제하시겠습니까?`)) {
      setQnAs(qnas.filter((q) => q.qnaId !== qnaId));
    }
  }

  function handleQuestionChange(qnaId, newQuestion) {
    setQnAs(qnas.map((q) => (q.qnaId === qnaId ? { ...q, question: newQuestion } : q)));
    console.log(`질문 ${qnaId} 변경됨:`, newQuestion);
  }

  const handleAnswerChange = (qnaId, newAnswer) => {
    setQnAs(qnas.map((q) => (q.qnaId === qnaId ? { ...q, answer: newAnswer } : q)));
    console.log(`답변 ${qnaId} 변경됨:`, newAnswer);
  };

  return (
    <>
      <ContainerAll>
        <div className="content">
          <div className="qnas">
            {qnas.map((q, index) => (
              <QnAComponent
                key={q.qnaId}
                qnaId={q.qnaId}
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
