import styled from 'styled-components'

// import Sidebar from "../components/sidebar/Sidebar";
import Side from "../components/sidebar/Side";
import Calendar from "../components/main/calendar/Calendar";
import ProcessHeader from "../components/process/header/ProcessHeader"

const TotalPage = styled.div`
    display: flex;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
`


export default function Result() {
    return (
        <TotalPage>
            <Side />
            <Content>
                <div>header bar</div>
                <Calendar />
                {/* <ProcessHeader /> */}
            </Content>
        </TotalPage>
    )
}