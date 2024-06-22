import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/cart`

// 목록 데이터 가져오기 파라미터는 필요하지 않는다 jwt로 인증을 할거기 때문
export const getCartItems = async () => {
    const res = await jwtAxios.get(`${host}/items`)
    return res.data
}

export const postChangeCart = async (cartItem) => {
    const res = await jwtAxios.post(`${host}/change`,cartItem)
    return res.data
}