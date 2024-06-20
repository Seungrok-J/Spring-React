import { API_SERVER_HOST } from "./todoApi"
import jwtAxios from "../util/jwtUtil"


const host = `${API_SERVER_HOST}/api/products`


export const postAdd = async (product) =>{
    const header = {headers:{'Content-Type' : 'multipart/form-data'}}

    // 데이터 전송
    const res = await jwtAxios.post(`${host}/`, product, header)

    return res.data
}

export const getList = async (pageParam) => {
    const {page,size} = pageParam
    const res = await jwtAxios.get(`${host}/list`, {params:{page:page,size:size}})
    return res.data
}

// 리스트 클릭했을때 나오는 Read페이지 api연결
export const getOne = async (pno) => {
    const res = await jwtAxios.get(`${host}/${pno}`)
    return res.data
}

export const deleteOne = async (pno) => {
    const res = await jwtAxios.delete(`${host}/${pno}`)
    return res.data
}

export const putOne = async (pno,product) => {
    const header = {headers:{'Content-Type' : 'multipart/form-data'}}
    const res = await jwtAxios.put(`${host}/${pno}`,product)
    return res.data
}