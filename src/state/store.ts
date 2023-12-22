import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import { type } from "os";


const store = configureStore({
    reducer : {
        user : userSlice
    }
})

export default store;

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>