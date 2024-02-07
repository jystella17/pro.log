import { configureStore } from "@reduxjs/toolkit";
import processReducer from "./process";

const store = configureStore({
    reducer: { process: processReducer },
})

export default store