import React from 'react'
import useCustomLogin from '../../hooks/useCustomLogin';

function CartComponent() {

    const { isLogin, loginState } = useCustomLogin();

    return (
        <div className='w-full'>
            {isLogin ?
                <div>
                    <div>
                        {loginState.nicname}'s cart
                    </div>
                </div>

                :
                <div></div>
            }
        </div>
    )
}

export default CartComponent