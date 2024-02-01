import Checkbox from '../components/Checkbox'
import Deadline from "../components/Deadline"

import './ProcessBody.css'

export default function PaperBody() {
    
    return (
        <div className="paperBody">
            <div className="paperHeader">
                <Checkbox />
                <Deadline />
            </div>
        </div>
    )
}