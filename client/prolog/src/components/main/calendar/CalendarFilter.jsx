import { useState } from "react"

import styled from 'styled-components'
import InputBox from "../../../common/components/InputBox"
import './CalendarFilter.scss'

const FilterBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
`


function JobFilter() {
  const jobTypes = ['신입', '경력']

  const [selectedJob, setSelectedJob] = useState(null)

  function filterJobs(type) {
    setSelectedJob(type)
  }

  return (
    <div>
      <select onChange={(e) => filterJobs(e.target.value)} className="selectJob">
        <option value="">채용형태</option>
        {jobTypes.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>
    </div>
  )
}

function DateFilter() {
  const DateTypes = ['시작', '마감', '수시']

  const [selectedDate, setSelectedDate] = useState(null)

  function filterDates(type) {
    setSelectedDate(type)
  }

  return (
    <div>
      <select onChange={(e) => filterDates(e.target.value)} className="selectDate">
        <option value="">채용기간</option>
        {DateTypes.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>
    </div>
  )
}


export default function CalendarFilter() {
  return (
    <FilterBox>
      <input
        placeholder='search ..'
        className="selectInput"
        />
      <JobFilter />
      <DateFilter />
    </FilterBox>

  )
}