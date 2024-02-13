import { useState, useEffect } from "react"

import Button from '../../common/components/Button'
import InputBox from '../../common/components/InputBox'
import ModalPage from "../../common/components/ModalPage"

import styled from 'styled-components'
import { FaSearch } from "react-icons/fa";

const Row = styled.div`
  display: flex;
  gap: 10px;
`

const ListBox = styled.div`
  gap: 10px;
  padding: 30px 10px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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
  
  function MasterInputBox({handleSearchChange}) {
    return (
      <Row>
        <InputBox type="text" width={'470px'} height={'30px'} onChange={handleSearchChange} />
        <SearchButton><FaSearch style={{color: 'white', width: '20px', height: '20px'}}/></SearchButton>
      </Row>
    )
  }
  

function MasterList({filteredData}) {

  return (
    <div>
      <ListBox>
      {filteredData.map(data => (
        <>
        <Row>
          <input type="checkbox" />
          <div>{data}</div>
        </Row>
          <hr />
        </>
      ))}

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

function SearchMasterContent({openMasterModal, datas, searchTerm, filteredData}) {
  return (
    <Content>
      <MasterInputBox datas={datas} />
      <MasterList datas={datas} searchTerm={searchTerm} filteredData={filteredData} />
      <SearchMasterButtons openMasterModal={openMasterModal} />
    </Content>
  )
}



export default function SearchMaster({isMasterOpen, setIsMasterOpen, openMasterModal }) {
  const datas = ['자소서', '쓰는', '중임']

  // 마스터 자소서 검색 상태 관리
  const [searchTerm, setSearchTerm] = useState('');
  
  let filteredData = datas.filter(data => {
    if (searchTerm && !data.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
  }
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