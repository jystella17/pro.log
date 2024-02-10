import Checkbox from '../components/Checkbox'
import Deadline from "../components/Deadline"
import RangeDatePicker from "../../../common/components/RangeDatePicker"
import CT from "../../templates/CT"
// import  from "../../templates/"
// import  from "../../templates/"
// import  from "../../templates/"

import './ProcessBody.css'

function PaperBody({ page }) {
    switch (page) {
        case 'assay':
            return <SelfIntroduction />;
        case 'ct':
            return <CT />;
        case 'interview':
            return <InterviewQuestions />;
        case 'emptyPage':
            return <EmptyPage />;
        default:
            return null;
    }

}

export default function ProcessBody() {
    return (
        <div className="paperBody">
            <div className="paperHeader">
                <Checkbox />
                <RangeDatePicker />
            </div>
            <div className="paperContent">
                <PaperBody />
            </div>
        </div>
    )

}
    
