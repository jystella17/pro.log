import styled from "styled-components"

import Toggle from "./Toggle";

import { CiCalendar } from "react-icons/ci";
import { BsKanban } from "react-icons/bs";

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 40px;
`

export default function MainHeader() {
  return (
    <Header>
      <CiCalendar />
      <Toggle />
      <BsKanban />
    </Header>
  )
}