import { useState } from "react";

import Assay from '../../templates/assay/Assay'
import CT from '../../templates/ct/CT'
import Interview from '../../templates/interview/Interview'
import Memo from '../../templates/memo/Memo'

import SearchMaster from "../../masterPaper/SearchMaster";
import Button from '../../../common/components/Button'


import './Process.scss'


export default function TypeTabs() {
  const [types, setTypes] = useState([])
  const [nextTabId, setNextTabId] = useState(1)
  const [templateType, setTemplateType] = useState(null)
  const [activeTab, setActiveTab] = useState(null)

  const [qnas, setQnas] = useState()
  const [cts, setCts] = useState()
  const [interviews, setInterviews] = useState()
  const [memos, setMemos] = useState()

  function ContentRenderer({ templateType }) {
    function handleQnasChange(data) {
      setQnas(data)
    }

    function handleCtsChange(data) {
      setCts(data)
    }

    function handleInterviewsChange(data) {
      setInterviews(data)
    }

    function handleMemosChange(data) {
      setMemos(data)
    }

    switch (templateType) {
      case 0:
        return <Assay handleQnasChange={handleQnasChange} />;
      case 1:
        return <CT handleCtsChange={handleCtsChange} />;
      case 2:
        return <Interview handleInterviewsChange={handleInterviewsChange} />;
      case 3:
        return <Memo handleMemosChange={handleMemosChange} />;
      default:
        return null;
    }
  }


  // 드롭다운 누를 때 각 다른 페이지 렌더링
  function handleDropdownChange(event) {
    const selectedValue = event.target.value

    if (selectedValue == 'assay') {
      addType('assay')
    } else if (selectedValue == 'ct') {
      addType('ct')
    } else if (selectedValue == 'toggle') {
      addType('toggle')
    } else if (selectedValue == 'memo') {
      addType('memo')
    } else {
      setContent(null)
    }
  }

  // 전형 추가
  function addType(template) {
    let newType
    switch (template) {
      case 'assay':
        newType = {
          id: nextTabId,
          templateType: 0,
          title: '자기소개서',
          data: qnas
        };
        break;
      case 'ct':
        newType = {
          id: nextTabId,
          templateType: 1,
          title: '코딩테스트',
          data: cts
        };
        break;
      case 'toggle':
        newType = {
          id: nextTabId,
          templateType: 2,
          title: '면접 문항',
          data: interviews
        };
        break;
      case 'memo':
        newType = {
          id: nextTabId,
          templateType: 3,
          title: '빈 페이지',
          data: memos
        };
        break;
      default:
        newType = null;
    }
    if (newType) {
      setTypes([...types, newType])
      setNextTabId(nextTabId + 1)
      setActiveTab(nextTabId)
      setTemplateType(newType.templateType)
    }
  }

  function handleTabClick(tabId) {
    setActiveTab(tabId);
    setTemplateType(types.find(tab => tab.id === tabId).templateType);
  }

  // 마스터 자소서 불러오기 모달창 상태 관리
  const [isMasterOpen, setIsMasterOpen] = useState(false)
  const openMasterModal = () => {
    setIsMasterOpen(!isMasterOpen)
  }

  
  return (
    <div className="paper-body">
      <div className="paper-tabs">
        <div className="tab-menu">
          {types.map(tab => (
            <div key={tab.id} onClick={() => handleTabClick(tab.id)} className={activeTab === tab.id ? 'active-tab' : ''}>
              {tab.title}
            </div>
          ))}
        </div>

        <select value='' onChange={handleDropdownChange} className="select-template">
          <option value="">템플릿 추가</option>
          <option value="assay">자기소개서</option>
          <option value="ct">코딩테스트</option>
          <option value="toggle">면접 문항</option>
          <option value="memo">빈 페이지</option>
        </select>
        <Button className={'navy'} width={'100px'} height={'40px'} onClick={openMasterModal}>{'불러오기'}</Button>
      </div>
      <div className="tab-menu">
        <ContentRenderer templateType={templateType}/>
      </div>
      <SearchMaster isMasterOpen={isMasterOpen} setIsMasterOpen={setIsMasterOpen} openMasterModal={openMasterModal} />
    </div>
  );
};
