import styled from "styled-components";

const TypeTabs = styled.div`
  border: none;
  border-radius: 8px;
  background-color: rgb(232, 211, 255);
  height: 10px;
`

function Tabs() {
  const initialTabs = ['자기소개서']
  const [tabs, setTabs] = useState(initialTabs)

  function addTags(select) {
    setTabs([...tabs, select])
  }

  return (
    <div>
   
    </div>
  )
}