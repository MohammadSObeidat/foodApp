import './Login.css'
import logo from '../../../../assets/images/chanpass.png'
import email from '../../../../assets/images/e-icon.png'
import pass from '../../../../assets/images/pass-icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react'
import { axiosInstanceUrl, USERS_URL } from '../../../../services/endpoint/Endpoint'

export default function Login({saveLoginData}) {
  const [type, setType] = useState('password')
  const Navigate = useNavigate()
  const {register, formState: { errors, isSubmitting }, handleSubmit} = useForm();

  const onSubmit = async (data) => {
    try {
      let res = await axiosInstanceUrl.post(USERS_URL.LOGIN, data)
      console.log(res);
      localStorage.setItem('token', res.data.token)
      saveLoginData()
      Navigate('/dashboard', {replace: true})
      toast.success("Success Login !")
    } catch (error) {
      toast.error(error?.response?.data?.message);      
    }
  }

  const changeType = () => {
    if (type === 'password') {
      setType('text')
    } else {
      setType('password')
    }
  }

  return (
    <>
    <div className="col-lg-4 col-md-6 col-sm-6 bg-white rounded-2 px-5 py-4">
      <div className="content">
        <div className="logo-container text-center">
          <img className='w-75' src={logo} alt="" />
        </div>
        <div className='title py-3'>
          <h3>Log In</h3>
          <p>Welcome Back! Please enter your details</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='inputs row  g-4'>
            <div className='input col-12 rounded-2'>
              <img src={email} alt="" />
              <input className='border border-0 px-2 py-3' type="email" placeholder='Enter your E-mail'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: 'Please enter a valid email address'
                }
              })}/>
            </div>
            {errors.email && <p className='text-danger my-1'>{errors.email.message}</p>}
            <div className='input col-12 rounded-2'>
              <div className='password'>
                <img src={pass} alt="" />
                <input className='border border-0 px-2 py-3' type={type} placeholder='Password'
                {...register('password', {
                  required: 'Password is required' 
                })}/>
                {type === 'password' ? <i onClick={changeType} className="fa-duotone fa-solid fa-eye-slash eye"></i> : <i onClick={changeType} className='fa fa-eye eye'></i>}
              </div>
            </div>
            {errors.password && <p className='text-danger my-1'>{errors.password.message}</p>}
          </div>
          <div className='links w-100 py-3 d-flex justify-content-between'>
            <Link className='link-reg' to='/register'>Register Now?</Link>
            <Link className='link-for' to='/forget-pass'>Forgot Password?</Link>
          </div>
          <button className='btn btn-success w-100 my-2' disabled={isSubmitting}>
            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
            Login
          </button>
        </form>
      </div>
    </div>
    </>
  )
}
