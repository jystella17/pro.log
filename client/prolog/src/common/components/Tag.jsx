import styled from 'styled-components'

const TagBox = styled.div`
width: auto;
height: 28px;
display: flex;
align-items: center;
justify-content: center;
padding: 0 10px;
font-size: 13px;
list-style: none;
margin: 0 8px 8px 0;
color: rgb(245, 245, 245);
background: #7077A1;
border-radius: 13px;
`

function Tag(content) {
  return (
    <TagBox>{content}</TagBox>
  )
}