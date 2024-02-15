import { useState, useRef } from "react";
import PaperBody from "../body/PaperBody";
import TestBody from "../body/TestBody"
import InterviewBody from "../body/InterviewBody"

import './Steps.scss'

function Steps() {
  const [activeStep, setActiveStep] = useState(0)
  const tabs = ['Paper', 'Test', 'Interview']
  
  // 각 탭에 해당하는 컴포넌트
  const tabSteps = [
    <PaperBody />,
    <TestBody />,
    <InterviewBody />
  ]

  // function addTab() {
  //   const newTabs = [...tabs, 'new tab']
  //   setTabs(newTabs)
  //   setActiveTab(newTabs.length - 1)
  // }

  return (
    <div className="step-wrapper">
      <ul className="step-tabs">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`step-tab ${tab} ${index == activeStep ? 'active' : ''}`}
            onClick={() => setActiveStep(index)}
          >
              {tab}
          </li>
        ))}
      </ul>
      {tabSteps[activeStep]}
    </div>
  );
}

export default Steps