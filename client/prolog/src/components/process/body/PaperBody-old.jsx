import CT from "../../templates/ct/CT"
import Interview from "../../templates/interview/Interview"
import Assay from "../../templates/assay/Assay"
import TypeTabs from "../types/TypeTabs"
// import  from "../../templates/"

import './Process.css'

function Body({ page }) {
    switch (page) {
        case 'assay':
            return <Assay />;
        case 'ct':
            return <CT />;
        case 'interview':
            return <Interview />;
        // case 'memo':
        //     return <Memo />;
        default:
            return null;
    }

}

export default function ProcessBody() {
   
    return (
        <div className="paperBody">
            {/* <div className="paperHeader">
                <Checkbox />
                <RangeDatePicker />
            </div> */}
            <div className="paperContent">
                <TypeTabs />
                <Body />
            </div>
        </div>
    )

}
    
