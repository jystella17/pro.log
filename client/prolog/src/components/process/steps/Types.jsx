import { useState } from "react";
import AddTemplates from "../body/AddTemplate";
import './Steps.scss'

function Types({ active }) {

  const [subTabs, setSubTabs] = useState(['자기소개서', '서브 탭 2']);

  const addSubTab = () => {
    const newSubTabs = [...subTabs, `New Tab ${subTabs.length + 1}`];
    setSubTabs(newSubTabs);
  };


  return (
    <div className="types">
      <AddTemplates addSubTab={addSubTab} />
      <ul>
        {subTabs.map((subTab, index) => (
          <li key={index} className={`type ${active ? 'active-type' : ''}`}>{subTab}</li>
        ))}
      </ul>
    </div>
  );
}


export default Types;