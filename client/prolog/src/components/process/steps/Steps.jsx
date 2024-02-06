import { useState, useRef } from "react";
// import useDetectClose from '../../../common/hooks/useDetectClose'
// import PaperBody from "../body/PaperBody";

import './Steps.scss'
import { CiCirclePlus } from "react-icons/ci";
import Types from "./Types"



function Steps() {
  const [activeTab, setActiveTab] = useState(0)
  const [tabs, setTabs] = useState(['Paper', 'Test', 'Interview'])

  function addTab() {
    const newTabs = [...tabs, 'new tab']
    setTabs(newTabs)
    setActiveTab(newTabs.length - 1)
  }

  return (
    <div>
      <ul className="tabs">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`tab ${index === activeTab ? 'active-tab' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            <div>
              {tab}
            </div>
            <Types key={index} active={index === activeTab} />
          </li>
        ))}
        {/* <li onClick={addTab}>+</li> */}
      </ul>
    </div>
  );
}

export default Steps