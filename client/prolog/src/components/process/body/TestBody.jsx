import Checkbox from '../components/Checkbox'
import Deadline from "../components/Deadline"
import RangeDatePicker from "../../../common/components/RangeDatePicker"

import './ProcessBody.css'

export default function TestBody() {
    
    return (
        <div className="testBody">
            <div className="testHeader">
                <Checkbox />
                <RangeDatePicker />
            </div>
        </div>
    )
}