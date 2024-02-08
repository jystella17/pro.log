import { useState, useRef } from "react";
// import PaperBody from "../body/PaperBody";

import './Steps.scss'

function Steps() {
  const [activeTab, setActiveTab] = useState(0)
  const [tabs, setTabs] = useState(['Paper', 'Test', 'Interview'])

  // function addTab() {
  //   const newTabs = [...tabs, 'new tab']
  //   setTabs(newTabs)
  //   setActiveTab(newTabs.length - 1)
  // }

  return (
    <div>
      <ul className="tabs">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`tab ${tab}`}
            onClick={() => setActiveTab(index)}
          >
              {tab}
            {/* <Types key={index} active={index === activeTab} /> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Steps