import { useState } from "react"

import './Components.scss'

function FilterBox({ my, setMy, all, setAll }) {
  
  return (
    <div className="filter-box" >
      <div>
        <input type="checkbox" checked={my} onChange={(e) => setMy(e.target.checked)} />
        <label style={{marginLeft: '10px'}}>내 일정</label>
      </div>
      <div>
        <input type="checkbox" checked={all} onChange={(e) => setAll(e.target.checked)}/>
        <label style={{marginLeft: '10px'}}>전체 공고</label>
      </div>
    </div>
  )
}

export default FilterBox