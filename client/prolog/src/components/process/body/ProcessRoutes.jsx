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
                <ul className="tabs">
                    <li
                        className={`tab paper ${activeStep === 'essay' ? 'active' : ''}`}
                        onClick={() => handleTabClick('essay')}
                    >
                        <Link to={`/process/${pid}/essay`}>Paper</Link>
                    </li>
                    <li
                        className={`tab test ${activeStep === 'test' ? 'active' : ''}`}
                        onClick={() => handleTabClick('test')}
                    >
                        <Link to={`/process/${pid}/test`}>Test</Link>
                    </li>
                    <li
                        className={`tab interview ${activeStep === 'interview' ? 'active' : ''}`}
                        onClick={() => handleTabClick('interview')}
                    >
                        <Link to={`/process/${pid}/interview`}>Interview</Link>
                    </li>
                </ul>
            </div>
            <div>
                <Outlet /> 
            </div>
        </div>
    );
}

export default ProcessRoutes;
