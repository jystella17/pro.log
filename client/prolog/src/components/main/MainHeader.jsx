import styled from "styled-components"

import Toggle from "./Toggle";

import { FaRegCalendar } from "react-icons/fa6";
import { BsKanban } from "react-icons/bs";

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 30px;
  gap: 15px;
`

export default function MainHeader() {
  return (
    <Header>
      <FaRegCalendar />
      <Toggle />
      <BsKanban />
    </Header>
  )
}