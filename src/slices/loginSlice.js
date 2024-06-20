import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";

const initState = {
    email: '',
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => loginPost(param));



const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState: initState,
    reducers: {
        login: (state, action) => {
            console.log("login......", action);
            console.log(action.payload)
            // 새로운 상태
            return { email: action.payload.email }
        },
        logout: () => {
            console.log("logout......")

            return { email: '' }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            const payload = action.payload
            return payload
        })
            .addCase(loginPostAsync.pending, (state, action) => {
                console.log("pending")
            })
            .addCase(loginPostAsync.rejected, (state, action) => {
                console.log("rejected")
            })
    }
})

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;