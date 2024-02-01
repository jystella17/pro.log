import Checkbox from '../components/Checkbox'
import Deadline from "../components/Deadline"

import './ProcessBody.css'

export default function InterviewBody() {
    
    return (
        <div className="interviewBody">
            <div className="interviewHeader">
                <Checkbox />
                <Deadline />
            </div>
        </div>
    )
}