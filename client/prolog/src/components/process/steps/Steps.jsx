import './Steps.css'

function PaperStep() {
    return (
        <div className="paperstep">
            <div className="text">Paper</div>
            <div>각 전형</div>
        </div>
    )
}

function TestStep() {
    return (
        <div className="teststep">
            <div className="text">Test</div>
            <div>들어갈</div>
        </div>
    )

}

function InterviewStep() {
    return (
        <div className="interviewstep">
            <div className="text">Interview</div>
            <div>자리</div>
        </div>
    )

}

export default function Steps() {
    return (
        <div className="steps">
            <PaperStep />
            <TestStep />
            <InterviewStep />
        </div>
    )
}