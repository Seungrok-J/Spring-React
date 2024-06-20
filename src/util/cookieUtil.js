import { Cookies } from "react-cookie";

const cookies = new Cookies()
// loginSlice에서 사용해준다.

// 쿠키를 설정할때 이름, 값, 시간을 준다
export const setCookie = (name, value, days=1) => {

    const expires =new Date()
    expires.setUTCDate(expires.getUTCDate()+days) //보관 기한

    // 경로는 하위 모든 경로에 적용되게 /로
    return cookies.set(name, value, {expires:expires,path:'/'})
}

// 쿠키를 가져오는 기능
export const getCookie = (name) => {
    return cookies.get(name)
}

// 쿠키를 삭제하는 기능
export const removeCookie = (name,path ='/') => {
    return cookies.remove(name,{path:path});
}