import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoClose, IoAddCircleOutline } from "react-icons/io5";
import "./QnA.scss";
import { Input, ConfigProvider } from "antd";
import Button from "../../common/components/Button";
import api from "../login/Axios";

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
  onChange,
  index,
  isRemovable,
}) {
  return (
    <div className="qna" onChange={() => onChange(id, question, answer)}>
      {/* 질문 */}
      <div className="qna-header">
        <div className="qna-number">
          <p>{index + 1}.</p>
          <input
            className="question"
            type="text"
            placeholder="질문을 입력하세요."
            value={question || ""}
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
          value={answer || ""}
          // 입력 변경 시 onChange
          onChange={(e) => onAChange(id, e.target.value)}
        />
      </ConfigProvider>{" "}
    </div>
  );
}

// 상태관리
function QnAContainer() {
  // const [qnas, setQnAs] = useState([{ id: 0, question: "", answer: "" }]);
  const [qnas, setQnAs] = useState([]);

  const navigate = useNavigate();

  // qnas get
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/cover-letter");
        setQnAs(response.data || []);
      } catch (error) {
        // console.error("마스터자소서 불러오기 실패", error);
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  // qnas put test
  // function SaveQnAs() {
  //   const saveData = async () => {
  //     try {
  //       // qnas배열을 json으로 변환
  //       // const qnasJsonString = JSON.stringify(qnas);
  //       // await api.put("https://i10b112.p.ssafy.io/api/cover-letter", qnasJsonString);
  //       await api.put("https://i10b112.p.ssafy.io/api/cover-letter", qnas, {
  //         headers: {
  //           "Content-Type": "application/json", // 이 헤더를 추가
  //         },
  //       });
  //     } catch (error) {
  //       console.error("마스터자소서 저장 실패", error);
  //     }
  //   };
  //   saveData();
  // }

  // qna 추가
  function AddQnA() {
    const emptyQna = {
      question: "",
      answer: "",
    };
    api
      .post("/api/cover-letter", {
        data: emptyQna,
      })
      .then((response) => {
        const id = response.data;
        // setQnAs([...qnas, { ...emptyQna, id }]);
        setQnAs((prev) => prev.concat({ ...emptyQna, id }));
      })
      .catch((error) => {
        // console.error(error);
      });
  }

  // qna 삭제
  function removeQnA(id, index) {
    if (window.confirm(`문항 ${index + 1}을 삭제하시겠습니까?`)) {
      setQnAs(qnas.filter((q) => q.id !== id));
      api
        .delete(`/api/cover-letter/${id}`)
        .then((response) => {
          // console.log(response);
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  }

  // Question onChange
  function handleQuestionChange(id, newQuestion) {
    setQnAs(qnas.map((q) => (q.id === id ? { ...q, question: newQuestion } : q)));
  }

  // Answer onChange
  const handleAnswerChange = (id, newAnswer) => {
    setQnAs(qnas.map((q) => (q.id === id ? { ...q, answer: newAnswer } : q)));
  };

  // on Input end
  const handleChange = (id, question, answer) => {
    // console.log("id", id);
    api
      .put("/api/cover-letter", {
        id,
        question,
        answer,
      })
      .then((response) => {})
      .catch((error) => {});
  };
  return (
    <>
      <Container>
        <div>
          <MasterTitle>마스터 자기소개서</MasterTitle>
          <Explain>마스터 자기소개서를 만들어서 여러 자기소개서에 사용해보세요!</Explain>
        </div>
        <div>{/* <Button className="navy" children="저장하기" onClick={SaveQnAs}></Button> */}</div>
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
                onChange={handleChange}
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
