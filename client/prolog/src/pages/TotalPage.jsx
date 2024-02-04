import styled from 'styled-components'

// import Sidebar from "../components/sidebar/Sidebar";
import Side from "../components/sidebar/Side";

const TotalPage = styled.div`
    display: flex;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
`


export default function Result() {
    return (
        <TotalPage>
            <Side />
            <Content>
                <div>header bar</div>
                <div>여기에 화면을 출력하세요</div>
            </Content>
        </TotalPage>
    )
}