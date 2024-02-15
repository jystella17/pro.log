import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import "./Memo.scss";
import { useParams,useLocation } from "react-router";
import { useRecoilValue,useSetRecoilState } from "recoil";
import { processDataState } from "../../../state/atoms";
import axios from "axios";



const ContainerAll = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 70px 100px;
  // background-color: #ecefff;
  // border-radius: 10px;
`;

function Memo() {
  const [memo, setMemo] = useState([]); // 현재 입력중인 메모
  const [savedMemo, setSavedMemo] = useState(""); // 저장된 메모
  const textareaRef = useRef(null);
  const memoRef = useRef();



  const processData = useRecoilValue(processDataState);
  const setProcessData = useSetRecoilState(processDataState);
  
  const params = useParams();
  const location = useLocation(); // 어떤 스텝이니 test? interview ?
  const step = location.state.step;
  const { tabId } = params;   // 몇번째 템플릿이니
  const ntab = tabId;

  if (!processData) {
    return null;
}
  
  useEffect(() => {
    // console.log(processData,"pd in Memo")
    if (processData) {
      // const now = processData[step][tabId];
      console.log(processData[step][ntab].memoList, "NOW2222")
      const t = processData[step][ntab].memoList
      setMemo(t);
      memoRef.current = processData[step][ntab].memoList;
    }
  }, []);

  useEffect(() => {
    memoRef.current = memo;
    // console.log(memoRef.current,"memoref")
  }, [memo]);

  useEffect(() => {
    // 마운트될 때 실행할 코드
    console.log('MEMO컴포넌트가 마운트되었습니다.',processData);

    // 언마운트될 때 실행할 함수 반환
    return () => {
      const deepCopy = obj => {
        if (typeof obj !== 'object' || obj === null) {
            return obj; // 객체가 아니거나 null인 경우 그대로 반환
        }

        const newObj = Array.isArray(obj) ? [] : {}; // 배열인지 객체인지에 따라 새로운 객체 생성

        for (let key in obj) {
            newObj[key] = deepCopy(obj[key]); // 재귀적으로 내부 객체들을 복사
        }

        return newObj;
    };

    const updatedTest = deepCopy(processData);
    updatedTest[step][ntab].memoList = [memoRef.current];
    // console.log('MeMo컴포넌트가 언마운트되었습니다.', updatedTest);
      setProcessData(updatedTest);
      axios.put(`https://i10b112.p.ssafy.io/api/process`, updatedTest)
            .then(response => {
                // console.log('PUT 요청이 성공했습니다.', response);
            })
            
      
    };
  }, []);

  

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 높이 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 스크롤 높이에 맞춰 높이 조정
    }
  };

  // 메모 입력
  function handleMemoChange(e) {
    setMemo(e.target.value);
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
      {processData && <textarea
        rows={1}
        //   왜 새로고침할때랑, 쓸때랑 다르지..
        ref={textareaRef} // ref 연결
        value={memo}
        onChange={(e) => {
          handleMemoChange(e);
          handleResizeHeight();
        }}
        placeholder="메모를 입력하세요."
      ></textarea>}
      {/* <button onClick={handleSaveLocalMemo}>저장</button> */}
    </ContainerAll>
  );
}

export default Memo;
