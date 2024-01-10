import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { header } from "./userSlice";
import axios from "axios";

type initialStateType = {
    loading : boolean,
    response : any,
    error : any,
}

const initialState:initialStateType = {
    loading : false,
    response : [],
    error : null,
}

export const getAllProducts = createAsyncThunk('getAllProducts',async(_, {rejectWithValue})=>{
    let url = "http://localhost:8080/api/products/allProducts";

    try {
        const response = await axios.get(url,header);
        if(response.status === 200) {
            return { data : response.data , statusCode : response.status, message : "product list fetch successfully."}
        } else {
            return { data : [] , statusCode : response.status, message : "Failed to fetch product list."}
        }
    } catch (error : any) {
        return rejectWithValue(error.message);        
    }
})

const productSlice = createSlice({
    name : 'products',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(getAllProducts.pending, (state)=>{
            state.loading = true
        }).addCase(getAllProducts.fulfilled,(state,action)=>{
            state.loading = false
            state.response = action.payload
            state.error = null
        }).addCase(getAllProducts.rejected, (state,action)=>{
            state.loading = false
            state.response = []
            state.error = action.payload
        })
    }
})

export default productSlice.reducer