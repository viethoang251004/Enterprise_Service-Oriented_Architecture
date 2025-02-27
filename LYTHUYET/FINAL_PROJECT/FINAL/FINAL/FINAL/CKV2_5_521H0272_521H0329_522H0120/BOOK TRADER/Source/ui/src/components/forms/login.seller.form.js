import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import React from "react";
// import validator from 'validator'

export default function Login() {
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({})

    const handleChangeForm = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        /*
            TODO: check email rỗng hoặc mật khẩu rỗng
        */
        // Gửi đến BackEnd //
        await fetch('http://localhost:3056/v1/api/seller/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(loginData)
        }).then(
            res => res.json()
        ).then(
            res => {
                if(res.message === 'login successfully') {
                    navigate("/profile")
                }
            }
            
        )
        
    }

    return (

        <div className="h-screen w-full flex ">
            <div className="w-full flex items-center justify-center lg:w-1/2">
            <div className='bg-slate-50 px-10 py-20 rounded-3xl border-2'>
            <h1 className='text-3xl font-semibold'>Đăng nhập tài khoản bán hàng trên Booker</h1>
            <form onSubmit={handleSubmit} method='post'
                className='mt-8'>

                {/* Email */}
                <div className='mb-8'>
                    <label className='text-sm text-gray-400 font-medium'>Email sử dụng: </label>
                    <input
                        id='email'
                        name='email'
                        onChange={handleChangeForm}
                        type='email'
                        className='w-full border-2 border-gray-100 rounded-lg p-2 mt-2 bg-white'
                        placeholder='Email đăng nhập ...'
                    >
                    </input>
                </div> {/* End Email */}

                
                {/* Password */}
                <div className='mb-8'>
                    <label className='text-sm text-gray-400 font-medium'>Mật khẩu: </label>
                    <input
                        onChange={handleChangeForm}
                        id='password'
                        name='password'
                        type='password'
                        className='w-full border-2 border-gray-100 rounded-lg p-2 mt-2 bg-white'
                        placeholder='Mật khẩu đăng nhập ...'
                    >
                    </input>
                </div> {/* End password */}

                {/* Submit button */}
                <button 
                    // disabled={isDisable}
                    className='
                    active:scale-[0.98] active:duration-75 transition-all 
                    hover:scale-[1.01] ease-in-out
                    w-full rounded-xl bg-yellow-200 
                    p-0.5 text-yellow-600 text-lg font-semibold'> 
                    Đăng nhập
                </button> {/* End Submit button */}

                {/* Sign up */}
                <div className='mt-8 flex justify-center items-center'>
                    <p className='font-medium text-base text-gray-500'>Chưa có tài khoản bán hàng?</p>
                    <Link to={'/signup'}>
                        <button 
                            className='
                            ml-2 text-slate-900 font-bold
                            active:scale-[0.98] active:duration-75 transition-all 
                            hover:scale-[1.01] ease-in-out hover:text-yellow-600
                            '>
                            Đăng ký
                        </button>
                    </Link>             
                </div> {/* End Sign up */}

            </form>
        </div>
            </div>

        <div className="hidden relative lg:flex h-full w-1/2 bg-gray-50 items-center justify-center">
         <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-400 rounded-full animate-pulse" />
         <div className="w-full h-1/2 absolute bg-white/10 backdrop-blur-lg" />
        </div>
        </div>

        
    )
}