import { useState, useEffect } from "react"

import Button from '../../common/components/Button'
import ModalPage from "../../common/components/ModalPage"

import styled from 'styled-components'
import { FaSearch } from "react-icons/fa";

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
  
  function MasterInputBox({ handleSearchChange, searchTerm }) {
    return (
      <Row>
        <InputBox value={searchTerm} onChange={handleSearchChange} />
        <SearchButton><FaSearch style={{color: 'white', width: '20px', height: '20px'}}/></SearchButton>
      </Row>
    )
  }
  

function MasterList({filteredData}) {

  return (
    <div>
      <ListBox>
        <ul>
          {filteredData.map((data, index) => (
            <li key={index}>
              <input type="checkbox"
                style={{ width: '20px', height: '20px', accentColor: 'rgb(54, 48, 98)' }} />
              <div>{data}</div>
              <hr />
            </li>
          ))}
      </ul>

      </ListBox>
    </div>
  )
}

function SearchMasterButtons({openMasterModal}) {
  return (
    <Buttons>
      <Button className={"navy"}>{'불러오기'}</Button>
      <Button onClick={openMasterModal}>{'취소'}</Button>
    </Buttons>
  )
}

function SearchMasterContent({openMasterModal, datas, searchTerm, filteredData, handleSearchChange}) {
  return (
    <Content>
      <h3>자소서 키워드를 검색해보세요</h3>
      <MasterInputBox datas={datas} handleSearchChange={handleSearchChange}/>
      <MasterList datas={datas} searchTerm={searchTerm} filteredData={filteredData} />
      <SearchMasterButtons openMasterModal={openMasterModal} />
    </Content>
  )
}



export default function SearchMaster({isMasterOpen, setIsMasterOpen, openMasterModal }) {
  const datas = ['자소서', '쓰는', '중임', '이거', '늘어나면', '어캐 되려나']

  // 마스터 자소서 검색 상태 관리
  const [searchTerm, setSearchTerm] = useState('');
  
  let filteredData = datas.filter(data => {
    if (searchTerm && !data.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true
  })

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <ModalPage
      isOpen={isMasterOpen}
      onRequestClose={() => setIsMasterOpen(false)}
      contentLabel="callMasterPage"
    >
      {<SearchMasterContent
        handleSearchChange={handleSearchChange}
        openMasterModal={openMasterModal}
        datas={datas}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredData={filteredData}
      />}
    </ModalPage>
  )
}