import { useEffect, useState } from "react";

import Assay from '../../templates/assay/Assay'
import CT from '../../templates/ct/CT'
import Interview from '../../templates/interview/Interview'
import Memo from '../../templates/memo/Memo'

import { useRecoilValue, useSetRecoilState } from "recoil";
import { processDataState } from "../../../state/atoms";
import { Outlet, useNavigate, useParams } from "react-router";

import './ProcessBody.scss'

export default function TypeTabs() {
  const processData = useRecoilValue(processDataState);
  const setProcessData = useSetRecoilState(processDataState);
  const savedTemplate = processData;
  const [types, setTypes] = useState();
  const [nextTabId, setNextTabId] = useState(0);
  const [templateType, settemplateType] = useState(null);
  // const [templateType, settemplateType] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [flag, setFlag] = useState(0);
  const [initflag, setInitFlag] = useState(0);

  const navigate = useNavigate();

  const params = useParams();
  const { pid } = params; // 현재 pid 가져오기

  useEffect(() => {
    if (savedTemplate !== null && initflag === 0) {
      const updatedTypes = savedTemplate.interview.map((item, index) => ({
        ...item,
        nextTabId: nextTabId + index
      }));
      setTypes(updatedTypes);
      setNextTabId(savedTemplate.interview.length)
      setInitFlag(1);
      // console.log(updatedTypes, "Updated Types");
    }
  }, [savedTemplate]);

  useEffect(() => {
    if (types !== undefined && types !== null && flag === 1) {
      const updatedTypes = types.map((type) => {
        // Exclude nextTabId field from newType
        const { nextTabId, ...newTypeWithoutNextTabId } = type;
        return newTypeWithoutNextTabId;
      });
  
      const updatedProcessData = { ...processData, interview: updatedTypes };
      setProcessData(updatedProcessData);
      // console.log(updatedProcessData, "Updated Process Data===========HERE@@");
      setFlag(0);
      
    }
  }, [types, flag]);


  function handleDropdownChange(event) {
    const selectedValue = event.target.value;

    if (selectedValue === 'QnA') {
      addType('QnA');
    } else if (selectedValue === 'CodingTest') {
      addType('CodingTest');
    } else if (selectedValue === 'Toggle') {
      addType('Toggle');
    } else if (selectedValue === 'Memo') {
      addType('Memo');
    } else {
      // setContent(null);
      console.log("ERRORROROR")
    }
  }

  // 전형 추가
  function addType(template) {
    let newType;
    switch (template) {
      case 'QnA':
        newType = {
          nextTabId: nextTabId,
          templateType: 1,
          templateName: 'QnA',
          codingTestList: [],
          memoList: [],
          toggleList: [],
          qnaList: [],

        };
        break;
      case 'CodingTest':
        newType = {
          nextTabId: nextTabId,
          templateType: 2,
          templateName: 'CodingTest',
          codingTestList: [],
          memoList: [],
          toggleList: [],
          qnaList: [],
        };
        break;
      case 'Toggle':
        newType = {
          nextTabId: nextTabId,
          templateType: 3,
          templateName: 'Toggle',
          codingTestList: [],
          memoList: [],
          toggleList: [],
          qnaList: [],
        };
        break;
      case 'Memo':
        newType = {
          nextTabId: nextTabId,
          templateType: 4,
          templateName: 'Memo',
          codingTestList: [],
          memoList: [],
          toggleList: [],
          qnaList: [],
        };
        break;
      default:
        newType = null;
    }
    if (newType) {
      setTypes([...(types || []), newType]); // 이전 상태가 없는 경우를 고려하여 초기화
      setNextTabId(nextTabId + 1); // nextTabId를 1 증가시킴
      setActiveTab(nextTabId); // setActiveTab을 nextTabId로 설정
      settemplateType(newType.templateType);
      setFlag(1);
      
    }
  }

  function handleTabClick(tabId,templateType) {
    setActiveTab(tabId);
    settemplateType(types.find(tab => tab.nextTabId === tabId).templateType);
    navigate(`/process/${pid}/interview/${tabId}/${templateType}`, { state: {"step" :"interview"} });
  }

  
  return (
    <div className="interview-body">
      <div className="process-tabs-wrapper">
      {types && <div className="process-tabs">
          {types.map(tab => (
            <div key={tab.nextTabId} onClick={() => handleTabClick(tab.nextTabId,tab.templateType)} className={`process-tab ${activeTab === tab.nextTabId ? 'active-tab' : ''}`}>
              {tab.templateName}
            </div>
          ))}
        </div>}

        <select value='' onChange={handleDropdownChange} className="select-template">
          <option value="">템플릿 추가</option>
          <option value="QnA">자기소개서</option>
          <option value="CodingTest">코딩테스트</option>
          <option value="Toggle">면접 문항</option>
          <option value="Memo">빈 페이지</option>
        </select>
      </div>
      <div className="process-menu">
          {/* <ContentRenderer templateType={templateType}/> */}
          <Outlet />
        </div>
        </div>
  
  );
};
