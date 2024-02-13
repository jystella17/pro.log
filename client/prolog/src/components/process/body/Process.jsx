
import styled from "styled-components";
import ProcessHeader from "../header/NoProcessHeader";
import Steps from "../steps/Steps";
import { useEffect } from "react";
import { useSetRecoilState } from 'recoil';
import { processDataState } from "../../../state/atoms"; 
import { useParams } from "react-router-dom";
import axios from "axios";

const Content = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`



function Process() {
    const setProcessData = useSetRecoilState(processDataState);
    const params = useParams()

    // JSON 데이터를 받아온 후 Recoil 상태 업데이트
    useEffect(() => {
        axios.get('https://i10b112.p.ssafy.io/api/65c316564f44af490c064d54')
            .then(response => {
                setProcessData(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [setProcessData]);
    
    
    return (
        <div className="process">
        <ProcessHeader />
        <Steps />
        <Content>
            </Content>
        </div>
    );

  // 나머지 코드
}

export default Process;