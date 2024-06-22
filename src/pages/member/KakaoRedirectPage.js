import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAccessToken, getMemberWithAccessToken } from '../../api/kakaoApi';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/loginSlice';
import useCustomLogin from '../../hooks/useCustomLogin';

function KakaoRedirectPage() {

    const [searchParamas] = useSearchParams()

    const {moveToPath} = useCustomLogin()

    const authCode = searchParamas.get('code')

    const dispatch = useDispatch()

    useEffect(() => {
        getAccessToken(authCode).then(accessToken => {

            getMemberWithAccessToken(accessToken).then(memberInfo =>{
                console.log(memberInfo)
                // 슬라이스에 로그인 할때 result값을 이용
                dispatch(login(memberInfo))

                if(memberInfo && memberInfo.social){
                    moveToPath('/')
                }else{
                    moveToPath('/member/modify')
                }

            })
        })
    },[authCode]);

    return (
        <div>
            <div>Kakao Login Redirect</div>
            <div>{authCode}</div>
        </div>
    )
}

export default KakaoRedirectPage