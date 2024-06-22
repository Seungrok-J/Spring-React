import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { modifyMember } from '../../api/memberApi'
import useCustomLogin from '../../hooks/useCustomLogin'
import ResultModal from '../common/ResultModal'

// 수정할 수 있는 데이터의 초기값
const initState = {
    email: '',
    pw: '',
    nickname: '',
}


function ModifyComponent() {

    const [member, setMember] = useState(initState)
    const loginInfo = useSelector(state => state.loginSlice)

    const {moveToLogin}=useCustomLogin()
    
    const [result, setResult] = useState()

    // 로그인 정보가 변경이 되면 유즈이펙트를 사용
    useEffect(() => {
        setMember({ ...loginInfo, pw: 'ABCD' })
    }, [loginInfo])

    // 상태를 변경
    const handleChange = (e) => {

        member[e.target.name] = e.target.value
    
        setMember({...member})
    
      }

    // 수정 버튼 클릭
    const handleClickModify = (e) => {
        modifyMember(member).then(result =>{
            setResult('Modified')
        })
    }

    const closeModal = () => {
        setResult(null)
        moveToLogin()
    }

    return (
        <>
            <div className="mt-6">
                {result ? <ResultModal callbackFn={closeModal} title={'회원정보수정'} cotent={'정보수정완료'}></ResultModal>:<></>}
                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="w-1/5 p-6 text-right font-bold">Email</div>
                        <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                            name="email" type={'text'} value={member.email} readOnly >
                        </input>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="w-1/5 p-6 text-right font-bold">Password</div>
                        <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                            name="pw" type={'password'} value={member.pw} onChange={handleChange} >
                        </input>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="w-1/5 p-6 text-right font-bold">Nickname</div>
                        <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                            name="nickname" type={'text'} value={member.nickname} onChange={handleChange} >
                        </input>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap justify-end">
                        <button type="button"
                            className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                            onClick={handleClickModify}
                        > Modify </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModifyComponent