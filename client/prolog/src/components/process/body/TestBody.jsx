import Checkbox from '../components/Checkbox'
import Deadline from "../components/Deadline"

import './ProcessBody.css'

export default function TestBody() {
    
    return (
        <div className="testBody">
            <div className="testHeader">
                <Checkbox />
                <Deadline />
            </div>
        </div>
    )
}