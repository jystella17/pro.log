import axios from "axios";

const BASEAPI = "http://localhost:8080"

const api = {
  user: `${BASEAPI}/user/`,
  jd: `${BASEAPI}/schedule/calendar/`,
  process: `${BASEAPI}/process/`,
  qna: `${BASEAPI}/qna/search/${keyword}`,
};


// function fetchUser() {
//   return axios.get(api.jobs);
// }

// (예시) 참고하려고 남겨둠
// function fetchUser(id) {
//   const url = `${api.user}${id}.json`;
//   return axios.get(url);
// }

// function fetchJD(year, month) {
//   const url = `${api.jd}${year}/${month}`
//   return axios.get(url)
// }


// function fetchProcess() {
//   return axios.get(api.process);
// }

// function fetchQna() {
//   return axios.get(api.qna);
// }



// export { fetchJD, fetchProcess, fetchUser, fetchQna};