import PaperBody from '../process/body/PaperBody'
import Steps from '../process/steps/Steps'
import ProcessHeader from '../process/header/ProcessHeader'

export default function Process() {
    return (
        <div clasName="processbody">
            <ProcessHeader />
            <Steps />
            <PaperBody />
        </div>    
    )   
}