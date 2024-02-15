import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaperBody from "../body/PaperBody";
import TestBody from "../body/TestBody";
import InterviewBody from "../body/InterviewBody";

import './Steps.scss';

function Steps() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const tabs = ['Paper', 'Test', 'Interview'];
  

  return (
    <div className="step-wrapper">
      <ul className="step-tabs">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`step-tab ${tab} ${index === activeStep ? 'active' : ''}`}
            onClick={() => {
              setActiveStep(index);
              navigate(`${window.location.pathname}${tab.toLowerCase()}`); // 현재 주소에 탭 이름을 추가하여 이동합니다.
            }}
          >
            {tab}
          </li>
        ))}
      </ul>
      {/* {tabSteps[activeStep]} */}
    </div>
  );
}

export default Steps;
