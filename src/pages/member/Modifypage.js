import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import ModifyComponent from '../../components/member/ModifyComponent'

function Modifypage() {
  return (
    <BasicLayout>
        <div className = "text-black font-extrabold -mt-10">
            Modify Page
        </div>
        <div className = "w-full flex m-2 p-2">
            <ModifyComponent></ModifyComponent>
        </div>
    </BasicLayout>
  )
}

export default Modifypage