import { useState } from "react"

import './Components.scss'

function FilterBox({ my, setMy, all, setAll }) {
  
  return (
    <div className="filter-box" >
      <div className="filter-checkbox">
        <input type="checkbox" checked={my} onChange={(e) => setMy(e.target.checked)} style={{ width: '15px', height: '15px', accentColor: 'rgb(54, 48, 98)' }} />
        <label style={{marginLeft: '10px'}}>내 일정</label>
      </div>
      <div className="filter-checkbox">
        <input type="checkbox" checked={all} onChange={(e) => setAll(e.target.checked)} style={{ width: '15px', height: '15px', accentColor: 'rgb(54, 48, 98)' }} />
        <label style={{marginLeft: '10px'}}>전체 공고</label>
      </div>
    </div>
  )
}

export default FilterBox