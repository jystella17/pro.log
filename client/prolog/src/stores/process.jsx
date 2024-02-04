import { createSlice } from "@reduxjs/toolkit"

const workingState = { isWorking: false }

const processSlice = createSlice({
    name: 'isworking',
    initialState: workingState,
    reducers: {
        working(state) {
            state.isWorking = true
        },
        notWorking(state) {
            state.isWorking = false
        },
    }
})

export const processActions = processSlice.actions
export default processSlice.reducer