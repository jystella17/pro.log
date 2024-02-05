import styled from 'styled-components'

// import Sidebar from "../components/sidebar/Sidebar";
import Side from "../components/sidebar/Side";
import CT from "../components/templates/CT"

const TotalPage = styled.div`
    display: flex;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
`


export default function Result() {
    return (
        <TotalPage>
            <Side />
            <Content>
                <div>header bar</div>
                <CT />
            </Content>
        </TotalPage>
    )
}