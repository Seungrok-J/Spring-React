

const rest_api_key ='da943df09732bc92a67197b8410a575b'
const redirect_uri ='http://localhost:3000/member/kakao'

const auth_code_path='https://kauth.kakao.com/oauth/authorize'

export const getKakaoLoginLink = () => {
    const kakaoURL =`${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

    return kakaoURL
}