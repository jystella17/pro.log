import { useEffect, useState } from "react";
import Assay from '../../templates/assay/Assay'
import CT from '../../templates/ct/CT'
import Interview from '../../templates/interview/Interview'
import Memo from '../../templates/memo/Memo'

import SearchMaster from "../../masterPaper/SearchMaster";
import Button from '../../../common/components/Button'


import './PaperBody.scss'

import { useRecoilValue } from "recoil";
import { processDataState } from "../../../state/atoms";
import { Outlet, useNavigate, useParams } from "react-router";
import './Process.scss'

export default function TypeTabs() {
  const processData = useRecoilValue(processDataState);
  const savedTemplate = processData;
  const [types, setTypes] = useState();
  const [nextTabId, setNextTabId] = useState(0);
  const [templateType, settemplateType] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [qnas, setQnas] = useState();
  const [cts, setCts] = useState();
  const [interviews, setInterviews] = useState();
  const [memos, setMemos] = useState();


  const [isMasterOpen, setIsMasterOpen] = useState(false)
  const openMasterModal = () => {
    setIsMasterOpen(!isMasterOpen)
  }



  

  const navigate = useNavigate();

  const params = useParams();
  const { pid } = params; // 현재 pid 가져오기

  useEffect(() => {
    if (savedTemplate !== null) {
      const updatedTypes = savedTemplate.essay.map((item, index) => ({
        ...item,
        nextTabId: nextTabId + index
      }));
      setTypes(updatedTypes);
      setNextTabId(savedTemplate.essay.length)
      console.log(updatedTypes, "Updated Types");
    }
  }, [savedTemplate]);

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

  function addType(template) {
    let newType;
    switch (template) {
      case 'QnA':
        newType = {
          nextTabId: nextTabId,
          templateType: 1,
          templateName: 'QnA',
          data: qnas
        };
        break;
      case 'CodingTest':
        newType = {
          nextTabId: nextTabId,
          templateType: 2,
          templateName: 'CodingTest',
          data: cts
        };
        break;
      case 'Toggle':
        newType = {
          nextTabId: nextTabId,
          templateType: 3,
          templateName: 'Toggle',
          data: interviews
        };
        break;
      case 'Memo':
        newType = {
          nextTabId: nextTabId,
          templateType: 4,
          templateName: 'Memo',
          data: memos
        };
        break;
      default:
        newType = null;
    }
    if (newType) {
      setTypes([...types, newType]);
      setNextTabId(nextTabId + 1);
      setActiveTab(nextTabId);
      settemplateType(newType.templateType);
    }
  }

  function handleTabClick(tabId,templateType) {
    setActiveTab(tabId);
    settemplateType(types.find(tab => tab.nextTabId === tabId).templateType);
    navigate(`/p/${pid}/paper/${tabId}/${templateType}`, { state: {"step" :"paper"} });
  }

  return (
    <div className="paper-body">
      <div className="paper-tabs">
        {types && <div className="tab-menu">
          {types.map(tab => (
            <div key={tab.nextTabId} onClick={() => handleTabClick(tab.nextTabId,tab.templateType)} className={activeTab === tab.nextTabId ? 'active-tab' : ''}>
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
      {templateType === 1 &&
          <Button className={'navy'} width={'100px'} height={'40px'} onClick={openMasterModal}>{'불러오기'}</Button>}
      <div className="paper-menu">
        {/* <ContentRenderer nextTabId={templateType}/>
         */}
        <Outlet />
        
      </div>
      <SearchMaster isMasterOpen={isMasterOpen} setIsMasterOpen={setIsMasterOpen} openMasterModal={openMasterModal} />
    </div>
  );
};
