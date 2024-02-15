import { useState } from "react"

import styled from 'styled-components'
import './CalendarFilter.scss'

import FilterBox from '../../../common/components/FilterBox'

const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
`

function SearchFilter({ setSearchTerm }) {
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
  const DateTypes = [
    {
      title: '채용 마감일',
      value: '1'
    },
    {
      title: '채용시',
      value: '2'
    },
    {
      title: '상시',
      value: '3'
    },
    {
      title: '수시',
      value: '4'
    }
  ]

  const [selectedDate, setSelectedDate] = useState(null)

  function handleDateChange(event) {
    const selectedDateType = event.target.value
    setSelectedDate(selectedDateType)
    const selectedDateObject = DateTypes.find(type => type.value.toString() === selectedDateType)
    setDateType(selectedDateObject)
  }

  return (
    <div>
      <select onChange={handleDateChange} className="date-filter">
        <option value="" disabled>마감일 형식</option>
        {DateTypes.map((type, index) => (
          <option key={index} value={type.value}>{type.title}</option>
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