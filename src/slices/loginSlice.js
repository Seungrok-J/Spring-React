import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

const initState = {
    email: '',
}

const loadMemberCookie = () =>{
    const memberInfo = getCookie('member')



    return memberInfo
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => loginPost(param));



const loginSlice = createSlice({
    name: 'LoginSlice',
    // 초기값을 쿠키가 있는경우와 없는 경우를 설정
    initialState: loadMemberCookie() || initState,
    reducers: {
        login: (state, action) => {
            console.log("login......", action);
            console.log(action.payload)
            // 새로운 상태
            return { email: action.payload.email }
        },
        logout: () => {
            console.log("logout......")

            removeCookie('member')
            return { ...initState }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            const payload = action.payload

            // 로그인 됐을때 쿠키 만들기
            if(!payload.error){
                setCookie("member", JSON.stringify(payload),1)
            }



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