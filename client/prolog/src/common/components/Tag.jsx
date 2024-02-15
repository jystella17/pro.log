import styled from 'styled-components'
import { StyleSheetManager } from "styled-components"

const TagBox = styled.div`
  display: flex;
  width: 30px;
  height: 20px;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  font-size: ${props => `${props.fontsize}`};
  margin: 0 5px 0px 0;
  color: rgb(245, 245, 245);
  background-color: ${props => `${props.backgroundcolor}`};
  border-radius: 13px;
  `

export default function Tag({ backgroundcolor, fontsize, children }) {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => !['fontsize', 'backgroundcolor'].includes(prop)}>
      <TagBox
        backgroundcolor={backgroundcolor}
        fontsize={fontsize}
      >
        {children}
      </TagBox>
    </StyleSheetManager>
  )
}