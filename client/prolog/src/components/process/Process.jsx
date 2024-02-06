import styled from 'styled-components'

import PaperBody from '../process/body/PaperBody'
import Steps from '../process/steps/Steps'
import ProcessHeader from '../process/header/ProcessHeader'


export default function ProcessPage() {
    return (
        <div>
            <ProcessHeader />
            <Steps />
            <PaperBody />
        </div>    
    )   
}