import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { header } from "./userSlice";
import axios from "axios";

// type initialStateType = {
//     loading : boolean,
//     response : any,
//     error : any,
// }

type initialStateType = {
    product : { response: any , loading: boolean, error: any },
    productDetails : { response: any , loading: boolean, error: any },
}

const initialState:initialStateType = {
    product : { response: [], loading: false , error: null },
    productDetails : { response: [], loading: false, error: null },
};

// const initialState:initialStateType = {
//     loading : false,
//     response : [],
//     error : null,
// }

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

export const searchProducts = createAsyncThunk('searchProducts', async(searchItem : string, {rejectWithValue})=> {
    let url = "http://localhost:8080/api/products?search="+searchItem;

    try {
        let response = await axios.get(url,header);
        if(response.status === 200) {
            return { data : response.data.products , statusCode : response.status }
        } else {
            return { data : [] , statusCode : response.status }
        }

    } catch (error : any) {
        return rejectWithValue(error.message);
    }
})

export const getProductById = createAsyncThunk('getProductById', async(prodId : string , {rejectWithValue}) => {
    let url = "http://localhost:8080/api/products/"+prodId;
    try {
        const response = await axios.get(url,header);
        if(response.status === 200) {
            return { data : response.data , statusCode : response.status }
        } else {
            return { data : [] , statusCode : response.status }
        }

    } catch (error : any) {
        return rejectWithValue(error.message);
    }
})

const productSlice = createSlice({
    name : 'products',
    initialState,
    reducers : {
    },
    extraReducers : (builder) => {
        builder.addCase(getAllProducts.pending, (state)=>{
            state.product.loading = true
        }).addCase(getAllProducts.fulfilled,(state,action)=>{
            state.product.loading = false
            state.product.response = action.payload
            state.product.error = null
        }).addCase(getAllProducts.rejected, (state,action)=>{
            state.product.loading = false
            state.product.response = []
            state.product.error = action.payload
        }).addCase(searchProducts.pending, (state)=>{
            state.product.loading = true
        }).addCase(searchProducts.fulfilled,(state,action)=>{
            state.product.loading = false
            state.product.response = action.payload
            state.product.error = null
        }).addCase(searchProducts.rejected, (state,action)=>{
            state.product.loading = false
            state.product.response = []
            state.product.error = action.payload
        }).addCase(getProductById.pending, (state)=>{
            state.productDetails.loading = true
        }).addCase(getProductById.fulfilled,(state,action)=>{
            state.productDetails.loading = false
            state.productDetails.response = action.payload
            state.productDetails.error = null
        }).addCase(getProductById.rejected, (state,action)=>{
            state.productDetails.loading = false
            state.productDetails.response = []
            state.productDetails.error = action.payload
        })
    }
})

export default productSlice.reducer