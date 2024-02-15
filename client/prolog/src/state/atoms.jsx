import { atom } from 'recoil'

export const JDState = atom({
  key: 'JD',
  default: 0,
})

export const processDataState = atom({
  key: 'processDataState',
  default: null
});
