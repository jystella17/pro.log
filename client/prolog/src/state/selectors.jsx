import { selector } from "recoil";
import { fetchJD } from "../api/api";
import { JDState } from "./atoms";


export const getJD = selector({
  key: "getJD",
  get: async ({ get }) => {
    let JD = get(JDState);
    let response = await fetchJD(JD);
    return response.data;
  },
});
