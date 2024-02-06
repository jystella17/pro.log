import { useNavigate } from "react-router-dom";

import styled from 'styled-components'
import { BsLayoutSidebar } from "react-icons/bs";
import Button from "../../common/components/Button";

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7%;
  padding: 0px 30px;
  border-bottom: 1px solid rgb(245, 245, 245);
`


export default function Headbar() {
  const navigate = useNavigate()
  
  function navigateToLogin() {
    navigate("/login")
  }

  return (
    <Head>
      <BsLayoutSidebar style={{height: '20px', width: '20px'}} />
      <Button
        className={'navy'}
        onClick={navigateToLogin}>
        {'Login or SignUp'}
      </Button>
    </Head>
  )
}