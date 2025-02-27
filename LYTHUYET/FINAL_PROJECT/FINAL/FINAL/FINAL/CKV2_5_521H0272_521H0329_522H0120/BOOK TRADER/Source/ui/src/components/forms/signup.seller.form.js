
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validator from 'validator'

export default function SignUp() {
    const [signupData, setSignupData] = useState({})
    const [isValid, setIsValid] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleChange = (e) => {
        const email = e.target.value
        let checkIfValidEmail = validator.isEmail(email)
        if (!checkIfValidEmail) {
            setIsDisable(true)
            setIsValid(false)
            setMessage('Email không hợp lệ.')
        }
        else {
            setIsDisable(false)
            setIsValid(true)
            setSignupData({...signupData, [e.target.name]: email})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault() // stop refreshing the page

        // email không hợp lệ => không gửi đến backend
        if (!isValid) return 0
        // email hợp lệ =>gửi đến backend
        await fetch('http://localhost:3056/v1/api/seller/signup', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(signupData)
        }).then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                navigate("/")
            }
        })
        
    }
    
    return (
        <div className="h-screen w-full flex ">
            <div className="w-full flex items-center justify-center lg:w-1/2">
            <div className='bg-slate-50 px-10 py-20 rounded-3xl border-2'>
            <h1 className='text-4xl font-semibold'>Đăng ký bán sách trên Booker</h1>
            <p className='font-medium text-lg text-gray-600 mt-4'>
                Dễ dàng trao đổi sách với cộng đồng yêu sách tại Việt Nam.
            </p>
            <form onSubmit={handleSubmit} method='post'
                className='mt-8'>

                {/* Email */}
                <div className='mb-8'>
                    <label className='text-sm text-gray-400 font-medium'>Email sử dụng bán sách: </label>
                    <input
                        onChange={handleChange}
                        id='email'
                        name='email'
                        type='email'
                        className='w-full border-2 border-gray-100 rounded-lg p-2 mt-2 bg-white'
                        placeholder='Email đăng ký ...'
                    >
                    </input>
                </div> {/* End Email */}

                {/* Submit button */}
                <button 
                    disabled={isDisable}
                    className='
                    active:scale-[0.98] active:duration-75 transition-all 
                    hover:scale-[1.01] ease-in-out
                    w-full rounded-xl bg-yellow-200 
                    p-0.5 text-yellow-600 text-lg font-semibold'> 
                    Đăng ký
                </button> {/* End Submit button */}

                {/* Login */}
                <div className='mt-8 flex justify-center items-center'>
                    <p className='font-medium text-base text-gray-500'>Đã có tài khoản bán hàng?</p>
                    <Link to={'/'}>
                        <button 
                            className='
                            ml-2 text-slate-900 font-bold
                            active:scale-[0.98] active:duration-75 transition-all 
                            hover:scale-[1.01] ease-in-out hover:text-yellow-600
                            '>
                            Đăng nhập
                        </button>
                    </Link>
                    
                </div> {/* End Login */}

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