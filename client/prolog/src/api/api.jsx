import axios from "axios";

const BASEAPI = "https://i10b112.p.ssafy.io/api"

const api = {
  kakao: `${BASEAPI}/oauth2/code/kakao`,
  naver: `${BASEAPI}/oauth2/code/naver`,
  calendar: `${BASEAPI}/schedule/calendar`,
  process: `${BASEAPI}/process/`,
  addProcess: `${BASEAPI}/schedule/process`,
  // qna: `${BASEAPI}/qna/search/${keyword}`,
};


// function fetchKakao() {
//   return axios.get(api.kakao);
// }

// function fetchNaver() {
//   return axios.get(api.naver);
// }

// (예시) 참고하려고 남겨둠
// function fetchUser(id) {
//   const url = `${api.user}${id}.json`;
//   return axios.get(url);
// }

function fetchJD({ year, month }) {
  const url = `${api.calendar}/${year}/${month}`
  return axios.get(url)
}


// function fetchProcess() {
//   return axios.get(api.process);
// }


// function fetchQna() {
//   return axios.get(api.qna);
// }

function fetchAddProcess(data) {
  return axios.post(api.addProcess, data)
}


export { api, fetchJD, fetchAddProcess }
// export { fetchJD, fetchProcess, fetchUser, fetchQna };