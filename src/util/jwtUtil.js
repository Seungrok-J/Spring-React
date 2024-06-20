// Interceptors라는 기능을 이용해서 리퀘스트나 리스폰스를 보내기 전이나
// 처리하기 전, 실패했을때 intercept 한다
// 두가지 axios를 사용
// 1. accessToken을 가진 axios
// 2. 그냥 로그인 할때 처럼 전달하는 axios

import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/todoApi";

const jwtAxios = axios.create()

// refreshToken을 호출해 주는 함수
const refreshJWT = async (accessToken, refreshToken)=>{
    const host =API_SERVER_HOST

    const header = {headers:{'Authorization':`Bearer ${accessToken}`}}

    const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, header)

    // res의 데이터는 새로만들어진 토큰
    return res.data
}

// before request
// axios로 데이터를 보내면 사용
const beforeReq = (config) => {
    console.log('before request........')
    const memberInfo = getCookie('member')
    // 로그아웃을 했거나 정보가없을때
    if (!memberInfo) {
        console.log('Member NOT FOUND')
        return Promise.reject(
            {
                response:
                {
                    data:
                        { error: "REQUIRE_LOGIN" }
                }
            }
        )
    }
    const { accessToken } = memberInfo
    // Authorization 헤더 처리
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
}

//fail request
const requestFail = (err) => {
    console.log("request error............")
    return Promise.reject(err)
}
//before return response
const beforeRes = async (res) => {
    console.log("before return response...........")
    const data = res.data

    if (data && data.error === 'ERROR_ACCESS_TOKEN') {

        const memberCookieValue = getCookie('member')

        const result = await refreshJWT(memberCookieValue.accessToken,memberCookieValue.refreshJWT)
        // 새로운 accessToken, refreshToken

        memberCookieValue.accessToken=result.accessToken
        memberCookieValue.refreshToken=result.refreshToken

        setCookie('member', JSON.stringify(memberCookieValue), 1)

        const originalRequest = res.config

        originalRequest.headers.Authorization=`Bearer ${result.accessToken}`

        return await axios(originalRequest)

    }
    return res
}
//fail response
const responseFail = (err) => {
    console.log("response fail error.............")
    return Promise.reject(err);
}
jwtAxios.interceptors.request.use(beforeReq, requestFail)
jwtAxios.interceptors.response.use(beforeRes, responseFail)






export default jwtAxios