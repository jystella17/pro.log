import { useState } from "react"
import styled from 'styled-components'

import Button from "../../common/components/Button";

import { CiCalendar } from "react-icons/ci";
import { GoPencil } from "react-icons/go";

const Background = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  `

function JDHead({JDData}) {
  return (
    <div className="jd-data">
      <div className="jd-title">
        <div className="company-name">삼성전자</div>
        {/* <div>{JDData.jobTitle}</div> */}
        <div className="job-title">상반기 공채</div>
        {/* <div className="deadline">
          <CiCalendar />
          <div>{JDData.openingDate} ~ {JDData.expirationDate}</div>
        </div> */}
        <div className="deadline">
          <CiCalendar />
          <div>2024.01.16 ~ 2024.01.29</div>
        </div>
      </div>

      <div className="buttons">
        <Button className={'navy'}>{'홈페이지 바로가기'}</Button>
      </div>
    </div>
    )
}

function JDBody() {
  
}


function JD() {

  const [JDData, setJDData] = useState([])
  // JD data
  useEffect(() => {
    (async () => {
    try{
      await axios
        .get('/api').then(res => {
          console.log(res.data)
          setJDData(res.data)
        })
    } catch(err){
      console.error(err.message)
    }})()
  }, [])
  
  return (
    <JDHead JDData={JDData} />
  )
}