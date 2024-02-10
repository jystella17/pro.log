import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import "./Memo.scss";

// 저장이랑 수정 어떻게 하지..

const ContainerAll = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 70px 100px;
  background-color: #ecefff;
  border-radius: 10px;
`;

function Memo() {
  const [memo, setMemo] = useState(""); // 현재 입력중인 메모
  const [savedMemo, setSavedMemo] = useState(""); // 저장된 메모
  const textareaRef = useRef(null);

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 높이 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 스크롤 높이에 맞춰 높이 조정
    }
  };

  // 메모 입력
  function handleMemoChange(e) {
    setMemo(e.target.value);
    console.log(e.target.value);
  }

  // 메모 저장
  function handleSaveMemo() {
    setSavedMemo(memo);
  }

  // 메모 local 저장 (연습용)
  function handleSaveLocalMemo() {
    localStorage.setItem("memo", memo);
  }

  // localStorage에서 메모 가져오기
  function handleGetLocalMemo() {
    const storedMemo = localStorage.getItem("memo");
    if (storedMemo) {
      setMemo(storedMemo);
    }
  }

  // 새로고침시에도 memo값 유지
  useEffect(() => {
    handleGetLocalMemo();
  }, []);

  // memo 상태가 변경될 때마다 textarea의 높이를 조절
  useEffect(() => {
    handleResizeHeight();
  }, [memo]);

  // 메모 수정
  function handleMemo() {
    setMemo(savedMemo);
  }

  return (
    <ContainerAll>
      <textarea
        rows={1}
        //   왜 새로고침할때랑, 쓸때랑 다르지..
        ref={textareaRef} // ref 연결
        value={memo}
        onChange={(e) => {
          handleMemoChange(e);
          handleResizeHeight();
        }}
        placeholder="메모를 입력하세요."
      ></textarea>
      {/* <button onClick={handleSaveLocalMemo}>저장</button> */}
    </ContainerAll>
  );
}

export default Memo;
