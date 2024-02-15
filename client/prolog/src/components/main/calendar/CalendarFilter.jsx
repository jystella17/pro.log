import { useState } from "react"

import styled from 'styled-components'
import './CalendarFilter.scss'

import FilterBox from '../../../common/components/FilterBox'

const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
`

function SearchFilter({setSearchTerm}) {
  function handleSearchChange(event) {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <input
        type="text"
        className="search-filter"
        placeholder="search ..."
        onChange={handleSearchChange}
      />
    </div>
  )
}



function JobFilter() {
  const jobTypes = ['신입', '경력']

  const [selectedJob, setSelectedJob] = useState(null)

  function filterJobs(type) {
    setSelectedJob(type)
  }

  return (
    <div>
      <select onChange={(e) => filterJobs(e.target.value)} className="job-filter">
        <option value="">채용형태</option>
        {jobTypes.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>
    </div>
  )
}

function DateFilter({ setDateType }) {
  const DateTypes = ['시작', '마감', '수시']

  const [selectedDate, setSelectedDate] = useState(null)

  function handleDateChange(event) {
    const selectedDateType = event.target.value
    setSelectedDate(selectedDateType)
    setDateType(selectedDateType)
  }

  return (
    <div>
      <select onChange={handleDateChange} className="date-filter">
        <option value="">채용기간</option>
        {DateTypes.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>
    </div>
  )
}


export default function CalendarFilter({
  setSearchTerm,
  setDateType,
  my, setMy, all, setAll
}) {
  return (
    <Filter>
      <SearchFilter setSearchTerm={setSearchTerm}/>
      <DateFilter setDateType={setDateType} />
      <FilterBox my={my} setMy={setMy} all={all} setAll={setAll} />
    </Filter>

  )
}