import { useState } from "react"
import RangeDatePick from "../../../common/components/RangeDatePicker"

export default function ProcessBodyHeader() {
  const [isGoing, setIsGoing] = useState(true)
  const checkIsGoing = () => {setIsGoing(!isGoing)}
  return (
    <div>
      <div>
        <label id="ing">진행중</label>
        <input type="checkbox" id="ing" onClick={checkIsGoing}/>
      </div>
      <RangeDatePick />
    </div>

  )
}