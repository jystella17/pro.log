import axios from "axios";

const BASEAPI = "https://prolog.com"

const api = {
  user: `${BASEAPI}/user/`,
  jd: `${BASEAPI}/jd/`,
  process: `${BASEAPI}/process/`,
  qna: `${BASEAPI}/vo/`,
};


// function fetchUser() {
//   return axios.get(api.jobs);
// }

// function fetchUser(id) {
//   const url = `${api.user}${id}.json`;
//   return axios.get(url);
// }

// const fetchJD = async (id) => {
//   const url = `${api.jd}${id}`
//   return axios.get(url);

// };

// function fetchProcess() {
//   return axios.get(api.process);
// }

// function fetchQna() {
//   return axios.get(api.qna);
// }



// export { fetchJD, fetchProcess, fetchUser, fetchQna};