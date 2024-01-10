import { createSlice , createAsyncThunk} from '@reduxjs/toolkit' 
import axios from 'axios'


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

export const header = {
    headers : {
        'Content-type' : 'application/json'
    }
}

export const loginUser = createAsyncThunk('loginUser', async(data : any , { rejectWithValue }) => {
    try {
        let url = 'http://localhost:8080/api/users/login';
        
        let body = {
            email : data.email,
            password : data.password
        }
        const response = await axios.post(url,body,header);
        if(response.status == 200) {
            return { data : response.data ,statusCode : response.status, message : "User Logged in Successfully" };
        } else {
            return { statusCode : response.status, message : "Failed to login."}
        }
    } catch (error : any) {
        if(error.response && error.response.status === 401) {
            return { statusCode : error.response.status , message: error.response.data.message, error: error.message };
        } else {
            return rejectWithValue(error.message);
        }  
    }
})

export const registerUser = createAsyncThunk('registerUser', async(data :any , {rejectWithValue})=> {
    let url = "http://localhost:8080/api/users/addUser";
    try {
        const response = await axios.post(url,data,header);
        if(response.status == 200) {
            return { data : response.data ,statusCode : response.status, message : "User Register Successfully" };
        } else {
            return { statusCode : response.status, message : "Failed to register user"}
        }
    } catch (error : any) {
        return rejectWithValue(error.message);
    }
})

export const logoutUser = createAsyncThunk('logoutUser', async( _ , { rejectWithValue }) => {
    try {
        localStorage.removeItem('token');
        sessionStorage.removeItem('user');
        return [{"msg" : "User Logout Successfully." }];

    } catch (error : any) {
        return rejectWithValue(error.message);
    }
})

export const getUserList = createAsyncThunk('getUserList', async(_, { rejectWithValue}) => {
    try {
        let url = 'http://localhost:8080/api/users/listUsers';

        let response = await axios.get(url,header);
        return response.data;
        
    } catch (error : any) {
        return rejectWithValue(error.message);
    }
})

export const updateUser = createAsyncThunk('updateUser', async(data : any , {rejectWithValue})=>{
    try {
        const userId = data.id;
        const url = 'http://localhost:8080/api/users/'+userId;
        const response = await axios.put(url,data,header);
        return response.data;
    } catch (error : any) {
        return rejectWithValue(error.message);
    }
});

export const deleteUser = createAsyncThunk('deleteUser', async(id : number , {rejectWithValue}) => {
    try {
        let url = 'http://localhost:8080/api/users/'+id;
        const response = await axios.delete(url,header);
        return response.data; 
    } catch (error : any) {
        return rejectWithValue(error.message);
    }
})

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(loginUser.pending , (state) => {
            state.loading = true;
        }).addCase(loginUser.fulfilled, (state,action) => {
            state.loading = false;
            state.response = action.payload;
            state.error = null
        }).addCase(loginUser.rejected, (state,action) => {
            state.loading = false;
            state.response = [];
            state.error = action.payload
        }).addCase(logoutUser.pending, (state)=> {
            state.loading = true;
        }).addCase(logoutUser.fulfilled, (state,action)=>{
            state.loading = false;
            state.response = action.payload;
            state.error = null;
        }).addCase(logoutUser.rejected, (state,action)=>{
            state.loading = false;
            state.response = [];
            state.error = action.payload;
        }).addCase(getUserList.pending, (state) =>{
            state.loading = true;
        }).addCase(getUserList.fulfilled, (state,action)=> {
            state.loading = false;
            state.response = action.payload;
            state.error = null;
        }).addCase(getUserList.rejected, ( state,action) => {
            state.loading = false;
            state.response = [];
            state.error = action.payload;
        }).addCase(updateUser.pending, (state)=> {
            state.loading = true;
        }).addCase(updateUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.response = action.payload
            state.error = null;
        }).addCase(updateUser.rejected, (state,action)=>{
            state.loading = false
            state.response = []
            state.error = action.payload
        }).addCase(deleteUser.pending, (state)=> {
            state.loading = true;
        }).addCase(deleteUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.response = action.payload
            state.error = null;
        }).addCase(deleteUser.rejected, (state,action)=>{
            state.loading = false
            state.response = []
            state.error = action.payload
        }).addCase(registerUser.pending, (state)=> {
            state.loading = true;
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.response = action.payload
            state.error = null;
        }).addCase(registerUser.rejected, (state,action)=>{
            state.loading = false
            state.response = []
            state.error = action.payload
        })
    }

});

export default userSlice.reducer