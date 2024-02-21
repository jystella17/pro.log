import axios from "axios";

const BASEAPI = "https://i10b112.p.ssafy.io/api"

const api = {
  kakao: `${BASEAPI}/oauth2/code/kakao`,
  naver: `${BASEAPI}/oauth2/code/naver`,
  calendar: `${BASEAPI}/schedule/calendar`,
  process: `${BASEAPI}/process/`,
  addProcess: `${BASEAPI}/schedule/process`,

};

function fetchJD({ year, month }) {
  const url = `${api.calendar}/${year}/${month}`
  return axios.get(url)
}


function fetchAddProcess(data) {
  return axios.post(api.addProcess, data)
}


export { api, fetchJD, fetchAddProcess }
