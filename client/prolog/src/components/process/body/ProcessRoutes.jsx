import { Routes, Route, useParams, Outlet, Link } from "react-router-dom";
import { useState } from "react";
import ProcessHeader from "../header/NoProcessHeader";
import Steps from "../steps/Steps";
import PaperBody from "../body/PaperBody";
import TestBody from "../body/TestBody";
import InterviewBody from "../body/InterviewBody";

import './ProcessRoutes.scss';

function ProcessRoutes() {
    const params = useParams();
    const { pid } = params; // 현재 pid 가져오기

    const [activeStep, setActiveStep] = useState('paper'); // 기본 값은 paper로 설정

    const handleTabClick = (tab) => {
        setActiveStep(tab);
    };

    return (
        <div className="process-routes">
            <div>
                <ul className="step-tabs">

                    <Link to={`/process/${pid}/paper`} className={`step-tab paper ${activeStep === 'paper' ? 'active' : ''}`}>
                        <li onClick={() => handleTabClick('paper')}>Paper</li>
                    </Link>
                        
                    <Link to={`/process/${pid}/test`} className={`step-tab test ${activeStep === 'test' ? 'active' : ''}`}>
                        <li onClick={() => handleTabClick('test')}>Test</li>
                    </Link>
                        
                    <Link to={`/process/${pid}/interview`}  className={`step-tab interview ${activeStep === 'interview' ? 'active' : ''}`}>
                        <li onClick={() => handleTabClick('interview')}>Interview</li>
                    </Link>
                    
                </ul>
            </div>
            <div>
                <Outlet /> 
            </div>
        </div>
    );
}

export default ProcessRoutes;
