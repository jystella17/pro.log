import styled from 'styled-components'

import PaperBody from '../process/body/PaperBody'
import Steps from '../process/steps/Steps'
import ProcessHeader from '../process/header/ProcessHeader'

import { Checkbox } from "antd"
import RangeDatePicker from "../../../common/components/RangeDatePicker"

export default function ProcessPage() {
    return (
        <div>
            <div className="paperHeader">
                <Checkbox />
                <RangeDatePicker />
            </div>
            <ProcessHeader />
            <Steps />
            <PaperBody />
        </div>    
    )   
}