import { useState } from "react";

import Assay from '../../templates/assay/Assay'
import CT from '../../templates/ct/CT'
import Interview from '../../templates/interview/Interview'
import Memo from '../../templates/memo/Memo'

import './Process.scss'

export default function TypeTabs() {
  const [types, setTypes] = useState([])
  const [nextTabId, setNextTabId] = useState(1)
  const [content, setContent] = useState(null)
  const [activeTab, setActiveTab] = useState(null)

  // 드롭다운 누를 때 각 다른 페이지 렌더링
  function handleDropdownChange(event) {
    const selectedValue = event.target.value

    if (selectedValue == 'assay') {
      addType('assay')
      setContent(<Assay />)
    } else if (selectedValue == 'ct') {
      addType('ct')
      setContent(<CT />)
    } else if (selectedValue == 'toggle') {
      addType('toggle')
      setContent(<Interview />)
    } else if (selectedValue == 'memo') {
      addType('memo')
      setContent(<Memo />)
    } else {
      setContent(null)
    }
  }

  // 전형 추가
  function addType(template) {
    if (template == 'assay') {
      const newType = {
        id: nextTabId,
        title: '자기소개서',
        content: <Assay />,
        data: { id: 0, question: '', answer: '' }
      }
      setTypes([...types, newType])
    } else if (template == 'ct') {
      const newType = {
        id: nextTabId,
        title: '코딩테스트',
        content: <CT />,
        data: {
          id: 0, questionNum: 0, solveNum: 0,
          reCheck: { isSolve: 0, algorithm: '', level: 0, memo: '' }
        }
      }
      setTypes([...types, newType])
    } else if (template == 'toggle') {
      const newType = {
        id: nextTabId,
        title: '면접 문항',
        content: <Interview />,
        data: { id: 0, toggle: true, question: '', answer: '', previous: true }
      }
      setTypes([...types, newType])
    } else if (template == 'memo') {
      const newType = {
        id: nextTabId,
        title: '빈 페이지',
        content: <Memo />,
        data: { id: 0, memo: '' }
      }
      setTypes([...types, newType])
    }
    setNextTabId(nextTabId + 1)
    setActiveTab(nextTabId)
  }


  function handleTabClick(tabId) {
    setActiveTab(tabId);
    setContent(types.find(tab => tab.id === tabId).content);
  }

  
  return (
    <div className="interview-body">
      <div className="interview-tabs">
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
      </div>
      <div className="tab-menu">
        {content}
      </div>
    </div>
  );
};
