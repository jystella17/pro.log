import { useState, useEffect } from "react"
import axios from "axios"

import Button from '../../common/components/Button'
import ModalPage from "../../common/components/ModalPage"

import styled from 'styled-components'
import { FaSearch } from "react-icons/fa";
import { useSetRecoilState, useRecoilValue } from "recoil"
import { masterDataState } from "../../state/atoms";


const Row = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: space-between;
`

const ListBox = styled.div`
  gap: 10px;
  padding: 10px;
  width: 535px;
  height: 190px;
  overflow: auto;

`

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`

const SearchButton = styled.button`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  border: none;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  background-color: rgb(54, 48, 98);
  `

const InputBox = styled.input`
  border: 0.5px solid rgb(203, 203, 203);
  border-radius: 5px;
  padding: 0px 10px;

  width: 100%;
  height: 30px;

    &:focus {
        outline: none;
    }
`
  

function SearchMasterContent({ openMasterModal, AddQnAMaster, checkedMaster, setCheckedMaster, handleCheckMasterChange }) {
  const [searchTerm, setSearchTerm] = useState('')
  
  const setMasterData = useSetRecoilState(masterDataState);
  const masterData = useRecoilValue(masterDataState);

  useEffect(() => {
    if (searchTerm !== '') {
      axios.get(`https://i10b112.p.ssafy.io/api/qna/search/${searchTerm}`)
        .then(response => {
          setMasterData(response.data);
          console.log(response.data, "master")
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
    }
  }, [searchTerm, setMasterData]);
  
  
  function MasterInputBox({searchTerm }) {
    const handleSearchChange = event => {
      searchTerm = event.target.value
    };
    return (
      <Row>
        <InputBox value={searchTerm} onChange={handleSearchChange} />
        <SearchButton onClick={() => setSearchTerm(searchTerm)}><FaSearch style={{color: 'white', width: '20px', height: '20px'}}/></SearchButton>
      </Row>
    )
  }
  
  
  function MasterList() {
    // 한 개만 체크되게 하도록 체크 박스 상태 관리
    const [checkedMaster, setCheckedMaster] = useState(null);
    const handleCheckMasterChange = (event) => {
      setCheckedMaster(event.target.id);
    };
    
    useEffect(() => {
      if (masterData && masterData.length > 0) {
        setCheckedMaster(masterData[0].id); // 첫 번째 항목이 default
      }
    }, []);
    
    return (
      <div>
        <ListBox>
          <ul style={{ display: 'flex', flexDirection: 'column'}}>
            {masterData && masterData.length > 0 && masterData.map((data, index) => (
              <li key={index} style={{
                display: 'flex', gap: '15px',
                borderBottom: 'solid lightgray 0.5px',
                alignItems: 'center',
                padding: '20px 0px'
              }}>
                <input type="radio"
                  id={data.id}
                  checked={checkedMaster === data.id}
                  onChange={handleCheckMasterChange}
                  style={{ width: '20px', height: '20px', accentColor: 'rgb(54, 48, 98)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px'}}>
                  <div>Q. {data.question}</div>
                  <div>A. {data.answer}</div>
                </div>
              </li>
            ))}
        </ul>
  
        </ListBox>
      </div>
    )
  }
  
  
  function SearchMasterButtons() {
    return (
      <Buttons>
        <Button className={"navy"} onClick={() => {AddQnAMaster(checkedMaster)}} >{'불러오기'}</Button>
        <Button onClick={openMasterModal}>{'취소'}</Button>
      </Buttons>
    )
  }
  
  return (
    <Content>
      <h3>자소서 키워드를 검색해보세요</h3>
      <MasterInputBox />
      <MasterList searchTerm={searchTerm} masterData={masterData} />
      <SearchMasterButtons openMasterModal={openMasterModal} />
    </Content>
  )
}



export default function SearchMaster({ isMasterOpen, setIsMasterOpen, openMasterModal, AddQnAMaster }) {
  const [checkedMaster, setCheckedMaster] = useState(null);
    const handleCheckMasterChange = (event) => {
      setCheckedMaster(String(event.target.id));
    };

  return (
    <ModalPage
      isOpen={isMasterOpen}
      onRequestClose={() => setIsMasterOpen(false)}
      contentLabel="callMasterPage"
    >
      {<SearchMasterContent
        openMasterModal={openMasterModal}
        AddQnAMaster={AddQnAMaster}
        checkedMaster={checkedMaster}
        setCheckedMaster={setCheckedMaster}
        handleCheckMasterChange={handleCheckMasterChange}

      />}
    </ModalPage>
  )
}