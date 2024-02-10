import { selector } from "recoil";
// import { fetchJD, fetchUser } from "../api/api";
// import { JDState } from "./atoms";

// export const process = selector({
//   key: "process",
//   get: async ({ get }) => {
//     let path = get(processState);
//     let response;
//     if (path === "/news" || path === "/") {
//       response = await fetchNews();
//     } else if (path === "/ask") {
//       response = await fetchAsk();
//       console.log(response.data);
//     } else if (path === "/jobs") {
//       response = await fetchJobs();
//     }
//     return response.data;
//   },
// });

// export const getJD = selector({
//   key: "getJD",
//   get: async ({ get }) => {
//     let JD = get(JDState);
//     let response = await fetchJD(JD);
//     return response.data;
//   },
// });
