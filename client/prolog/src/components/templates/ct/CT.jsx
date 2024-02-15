import React, { useState, useEffect,useRef } from 'react';
import { Checkbox, Rate } from 'antd';
import { useParams, useLocation } from 'react-router';
import { useRecoilValue,useSetRecoilState } from 'recoil';
import { processDataState } from '../../../state/atoms';
import axios from "axios";
import Tag from '../../../common/components/InputTag';
import NCT from "./NCT";
import SmallInputBox from '../../../common/components/SmallInputBox';
import InputBox from '../../../common/components/InputBox';
import styled from 'styled-components';
import './CT.css';

const Col = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4%;
  border-radius: 8px;
  background-color: white;
  box-shadow: 5px 5px 5px -5px gray;
  gap: 15px;
`;

function Header({ company }) {
  return (
    <Col>
      <h2>{company} 코딩테스트에 대비할 문제 유형을 기록해보세요.</h2>
      <Tag />
    </Col>
  );
}

function Question({ question, qnum, setQNum }) {
  const handleQNumChange = (e) => {
    const newValue = e.target.value;
    if (!isNaN(newValue)) {
      if (newValue <= 10) {
        setQNum(newValue);
      } else {
        setQNum(10);
      }
    }
  };

  return (
    <div className="q">
      <div>{question}</div>
      <SmallInputBox width={'35px'} height={'35px'} size={'X-large'} value={qnum} onChange={handleQNumChange} />
    </div>
  );
}

function Body({ qnum, setQNum, codingTestList, onDataChange }) {
  return (
    <Col>
      <h4>테스트가 끝났다면, 문제를 복기해 보세요.</h4>
      <Question question={'몇 문제였나요?'} qnum={qnum} setQNum={setQNum} />
      <CTTable codingTestList={codingTestList} onDataChange={onDataChange} />
    </Col>
  );
}

function CTTableRow({ index, codingTestItem, onDataChange }) {
  const [isSolve, setIsSolve] = useState(codingTestItem.solved);
  const [algorithm, setAlgorithm] = useState(codingTestItem.algorithm);
  const [level, setLevel] = useState(codingTestItem.level);
  const [memo, setMemo] = useState(codingTestItem.memo);

  const handleIsSolveChange = (e) => {
    const newValue = e.target.checked;
    setIsSolve(newValue);
    onDataChange(index, { ...codingTestItem, solved: newValue });
  };

  const handleAlgorithmChange = (e) => {
    const newValue = e.target.value;
    setAlgorithm(newValue);
    onDataChange(index, { ...codingTestItem, algorithm: newValue });
  };

  const handleLevelChange = (value) => {
    setLevel(value);
    onDataChange(index, { ...codingTestItem, level: value });
  };

  const handleMemoChange = (e) => {
    const newValue = e.target.value;
    setMemo(newValue);
    onDataChange(index, { ...codingTestItem, memo: newValue });
  };

  return (
    <tr>
      <td>
        <Checkbox checked={isSolve} onChange={handleIsSolveChange} />
      </td>
      <td>
        <SmallInputBox width={'70px'} height={'23px'} size={'small'} value={algorithm} onChange={handleAlgorithmChange} />
      </td>
      <td>
        <Rate defaultValue={level} onChange={handleLevelChange} />
      </td>
      <td>
        <InputBox width={'200px'} height={'30px'} size={'small'} value={memo} onChange={handleMemoChange} />
      </td>
    </tr>
  );
}

function CTTable({ codingTestList, onDataChange }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Solve</th>
          <th>유형</th>
          <th>난이도</th>
          <th>메모</th>
        </tr>
      </thead>
      <tbody>
        {codingTestList.map((codingTestItem, index) => (
          <CTTableRow
            key={index}
            index={index}
            codingTestItem={codingTestItem}
            onDataChange={onDataChange}
          />
        ))}
      </tbody>
    </table>
  );
}

export default function CT() {
  const processData = useRecoilValue(processDataState);
  const setProcessData = useSetRecoilState(processDataState);
  const params = useParams();
  const location = useLocation();
  const step = location.state.step;
  const { tabId } = params;
  const ntab = tabId;
  const ctRef = useRef();

  const [rowData, setRowData] = useState([]);

  if (!processData) {
    return null;
  }

  useEffect(() => {
    if (processData) {
      setRowData(processData[step][ntab].codingTestList)
    }
  }, []);

  useEffect(() => {
    ctRef.current = rowData;
  }, [rowData]);

  useEffect(() => {
    // console.log('코테 컴포넌트 마운트되었습니다.', processData);

    return () => {
      const deepCopy = obj => {
        if (typeof obj !== 'object' || obj === null) {
          return obj;
        }

        const newObj = Array.isArray(obj) ? [] : {};

        for (let key in obj) {
          newObj[key] = deepCopy(obj[key]);
        }

        return newObj;
      };

      const updatedTest = deepCopy(processData);
      updatedTest.test[ntab].codingTestList = ctRef.current;

      setProcessData(updatedTest);
      axios.put(`https://i10b112.p.ssafy.io/api/process`, updatedTest)
            .then(response => {
                // console.log('PUT 요청이 성공했습니다.', response);
            })
            .catch(error => {
                // console.error('PUT 요청이 실패했습니다.', error);
            });
    }
  }, []);

  const handleRowDataChange = (index, newData) => {
    const updatedRowData = [...rowData];
    updatedRowData[index] = newData;
    ctRef.current = updatedRowData;
    setRowData(updatedRowData);
  };

  return (
    <div className="ct">
      <Header company={processData.company} />
      {processData[step][ntab] !== undefined ? (
        <Body
          qnum={rowData.length}
          setQNum={setRowData}
          codingTestList={processData[step][ntab].codingTestList}
          onDataChange={handleRowDataChange}
        />
      ) : (
        <NCT />
      )}
    </div>
  );
}
