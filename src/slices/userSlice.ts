import { createSlice , createAsyncThunk} from '@reduxjs/toolkit' 
import axios from 'axios'


type initialStateType = {
    loading : boolean,
    response : any[],
    error : any,
}

const initialState:initialStateType = {
    loading : false,
    response : [],
    error : null,
}

export const loginUser = createAsyncThunk('loginUser', async(data : any , { rejectWithValue }) => {
    try {
        let url = 'http://localhost:8080/api/users/login';
        const header = {
            headers : {
                'Content-type' : 'application/json'
            }
        }
        let body = {
            email : data.email,
            password : data.password
        }
        const response = await axios.post(url,body,header);
        return response.data
    } catch (error : any) {
        if(error.response && error.response.status === 401) {
            return { message: error.response.data.message, error: error.message };
        } else {
            return rejectWithValue(error.message);
        }  
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
        const header = {
            headers : {
                'Content-type' : 'application/json'
            }
        }
        let response = await axios.get(url,header);
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
        })
    }

});

export default userSlice.reducer