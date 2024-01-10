import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import { type } from "os";
import productSlice from "../slices/productSlice";


const store = configureStore({
    reducer : {
        user : userSlice,
        products : productSlice,
    }
})

export default store;

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>