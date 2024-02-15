import { useState, useEffect,useRef } from "react";
import styled from "styled-components";
import { IoClose, IoAddCircleOutline } from "react-icons/io5";
import { Input, ConfigProvider } from "antd";
import { useRecoilValue,useSetRecoilState } from "recoil";
import { processDataState, masterDataState } from "../../../state/atoms";
import { useParams, useLocation, useNavigate } from "react-router";
import Button from "../../../common/components/Button";
import SearchMaster from '../../masterPaper/SearchMaster'
import axios from "axios"; // axios import 추가

const { TextArea } = Input;

const ContainerAll = styled.div`
  padding: 20px 10%;
  // background-color: #f3f8ff;
  // border-radius: 10px;
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
    <div className="qna-wrapper">
      
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
  const setProcessData = useSetRecoilState(processDataState);
  const masterData = useRecoilValue(masterDataState);
  console.log(processData)

  const [qnas, setQnAs] = useState([]);
  const [dataToSend, setDataToSend] = useState();
  const [company, setCompany] = useState();
  const [qnaId, setQnaId] = useState(0);
  const [now, setNow] = useState();
  const valueRef = useRef();
  const params = useParams();
  const location = useLocation(); // 어떤 스텝이니 test? interview ?
  const navigate = useNavigate();
  const step = location.state.step;
  const { tabId, pid } = params;   // 몇번째 템플릿이니
  const ntab = tabId;
  console.log(step, "st  props")
  console.log(ntab,"stabId")
  const currentPath = window.location.pathname;
  const lastSlashIndex = currentPath.lastIndexOf('/');
  const lastValue = currentPath.substring(lastSlashIndex + 1);
    

  useEffect(() => {
    console.log(processData[step][ntab],"processData[step][ntab]")
    if (processData[step][ntab].qnaList) {
      // const now = processData[step][tabId];
      setCompany(processData.company)
      console.log(processData[step], "NOW")
      console.log(processData[step][ntab].qnaList, "NOW2222")
      const t = processData[step][ntab].qnaList
      const newQnAs = t.map((item, index) => ({
        ...item,
        qnaId: `${index}`, // qnaId 필드 추가
      }));
      setQnaId(processData[step][ntab].qnaList.length)
      setQnAs(newQnAs);
      console.log(processData[step][ntab].qnaList,"New Q")
    }
  }, []);

  // useEffect(() => {
  //   console.log(processData[step][ntab], " Q == = = = Q")
    
  // }, [processData[step][ntab]]);
  

  useEffect(() => {
    if (processData) {
      console.log(qnas, " qnas")
      const dts = qnas.map(({ qnaId, ...rest }) => ({
      ...rest, // qnaId 필드를 제외한 나머지 필드들을 복사하여 dataToSend 배열에 추가
      company:company
      }));
      console.log(dts,"dts")
      setDataToSend(dts)
      valueRef.current = dts;
    }
  }, [qnas]);

  

  // useEffect(() => {
    
  //   const intervalId = setInterval(() => {
  //     sendPutRequest(dataToSend);
  //     console.log(dataToSend,"Interval!!!!!!!!!!!!!!!!!!!")
  //   }, 30000);
  
  //   // 컴포넌트가 unmount될 때 타이머 정리
  //   return () => {
  //     clearInterval(intervalId);
  //   }
  // }, [dataToSend]); // dataToSend가 변경될 때마다 타이머 설정 혹은 정리

  useEffect(() => {
    // 마운트될 때 실행할 코드
    console.log('컴포넌트가 마운트되었습니다.',processData);

    // 언마운트될 때 실행할 함수 반환
    return () => {
      
      sendPutRequest(valueRef.current);
      const updatedProcessData = {
        ...processData,
        test: [
          ...processData.test.slice(0, ntab), // 기존 배열의 0번째 요소부터 1번째 요소 직전까지를 복사합니다.
          {
            ...processData.test[ntab], // 기존 1번째 요소를 복사합니다.
            qnaList: valueRef.current // qnaList를 types로 설정합니다.
          },
          ...processData.test.slice(ntab+1) // 기존 배열의 2번째 요소부터 끝까지를 복사합니다.
        ]
      };
      
      
      setProcessData(updatedProcessData);
      
      
      console.log('컴포넌트가 언마운트되었습니다.');
    };
  }, []);


  function updateProcessDataState(newValue) {
    const setProcessDataState = useSetRecoilState(processDataState);
    setProcessDataState(newValue);
  }
  
  
  

  async function sendPutRequest(data) {
    try {
      console.log(data,"datatatatata")
      if (data!==undefined) {
        console.log(data,"PUT AXIOS")
        // PUT 요청 보내기
        await axios.put(`https://i10b112.p.ssafy.io/api/qna`, 
          data // 또는 필요한 데이터
        );
        
      }
      
    } catch (error) {
      console.error("Error sending PUT request:", error);
    }
  }


  async function AddQnA() {
    try {
      const response = await axios.post(`https://i10b112.p.ssafy.io/api/${pid}/${step}/${ntab}/qna`, {
      });
      const oid = response.data.id; // 응답에서 id 값을 추출하여 oid 변수에 저장
      const newId = qnas.length > 0 ? Math.max(...qnas.map((q) => parseInt(q.qnaId.split("-")[0], 10))) + 1 : 0;
      setQnAs([...qnas, { qnaId: `${newId}-0`, id: oid, question: "", answer: "" }]);
    } catch (error) {
      console.error("Error adding QnA:", error);
    }
  }

  function removeQnA(qnaId, index) {
    if (window.confirm(`문항 ${index + 1}을 삭제하시겠습니까?`)) {
      setQnAs(qnas.filter((q) => q.qnaId !== qnaId));
    }
  }

  function handleQuestionChange(qnaId, newQuestion) {
    setQnAs(qnas.map((q) => (q.qnaId === qnaId ? { ...q, question: newQuestion } : q)));
    // console.log(`질문 ${qnaId} 변경됨:`, newQuestion);
  }


  const handleAnswerChange = (qnaId, newAnswer) => {
    setQnAs(qnas.map((q) => (q.qnaId === qnaId ? { ...q, answer: newAnswer } : q)));
    // console.log(`답변 ${qnaId} 변경됨:`, newAnswer);
  };

  const [isMasterOpen, setIsMasterOpen] = useState(false)
  const openMasterModal = () => {
    setIsMasterOpen(!isMasterOpen)
  }

  // 불러오기 요청을 받았을 때 추가하는 함수
  async function AddQnAMaster(masterId) {
    if (masterData) {
      const masterItem = masterData.find(item => item.id === masterId)
      const newQnA = {
        ...masterItem,
        qnaId: `${qnas.length}-0`,
      };
      try {
        await axios.post(`https://i10b112.p.ssafy.io/api/${pid}/${step}/${ntab}/qna`, {
          newQnA
        });
        setQnAs([...qnas, newQnA]);
      } catch (error) {
        console.error("Error adding QnA:", error);
      }
    }
  }


 

  return (
    <>
      <ContainerAll>
        {processData && <div className="qna-container">
          <div style={{display: 'flex', justifyContent:'flex-end', width: '100%', padding: '20px 10px'}}>
            <Button className={'navy'} width={'100px'} height={'40px'} onClick={openMasterModal}>{'불러오기'}</Button>
          </div>
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
        </div>}
      </ContainerAll>
      <SearchMaster
        isMasterOpen={isMasterOpen}
        setIsMasterOpen={setIsMasterOpen}
        openMasterModal={openMasterModal}
        AddQnAMaster={AddQnAMaster}
      />
    </>
  );
}

export default QnAContainer;
