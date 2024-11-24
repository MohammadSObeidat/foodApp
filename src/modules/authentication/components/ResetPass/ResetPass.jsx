import logo from '../../../../assets/images/chanpass.png'
import email2 from '../../../../assets/images/e-icon2.png'
import pass from '../../../../assets/images/pass-icon.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react'
import { axiosInstanceUrl, USERS_URL } from '../../../../services/endpoint/Endpoint'
// import axios from 'axios'

export default function ResetPass() {
  const [type, setType] = useState('password')
  const [typeConfirm, setTypeConfirm] = useState('password')
  const Navigate = useNavigate()
  const Location = useLocation()
  const {register, formState: { errors, isSubmitting }, handleSubmit, watch } = useForm({defaultValues: Location.state});

  const onSubmit = async (data) => {
    try {
      let res = await axiosInstanceUrl.post(USERS_URL.REST_PASSWORD, data)
      console.log(res);
      Navigate('/login')
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.message);      
    }
  }

  const changeTypePass = () => {
    if (type === 'password') {
      setType('text')
    } else {
      setType('password')
    }
  }

  const changeTypeConfirm = () => {
    if (typeConfirm === 'password') {
      setTypeConfirm('text')
    } else {
      setTypeConfirm('password')
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
          <h3>Reset  Password</h3>
          <p>Please Enter Your Otp  or Check Your Inbox</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='inputs row  g-2'>
            <div className='input col-12 rounded-2'>
              <img src={email2} alt="" />
              <input disabled={true} className='border border-0 px-2 py-3' type="email" placeholder='Enter your E-mail'
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
                <input className='border border-0 px-2 py-3' type='text' placeholder='OTP'
                {...register('seed', {
                  required: 'seed is required' 
                })}/>
              </div>
            </div>
            {errors.seed && <p className='text-danger my-1'>{errors.seed.message}</p>}
            
            <div className='input col-12 rounded-2'>
              <div className='password'>
                <img src={pass} alt="" />
                <input className='border border-0 px-2 py-3' type={type} placeholder='New Password'
                {...register('password', {
                  required: 'Password is required' 
                })}/>
                {type === 'password' ? <i onClick={changeTypePass} className="fa-duotone fa-solid fa-eye-slash eye"></i> : <i onClick={changeTypePass} className='fa fa-eye eye'></i>}
              </div>
            </div>
            {errors.password && <p className='text-danger my-1'>{errors.password.message}</p>}
            <div className='input col-12 rounded-2'>
              <div className='password'>
                <img src={pass} alt="" />
                <input className='border border-0 px-2 py-3' type={typeConfirm} placeholder='Confirm New Password'
                {...register('confirmPassword', {
                  required: 'confirmPassword is required',
                  validate: (confirmPassword) => 
                   confirmPassword === watch('password') || "Password do not match",
                })}/>
                {typeConfirm === 'password' ? <i onClick={changeTypeConfirm} className="fa-duotone fa-solid fa-eye-slash eye"></i> : <i onClick={changeTypeConfirm} className='fa fa-eye eye'></i>}
              </div>
            </div>
            {errors.confirmPassword && <p className='text-danger my-1'>{errors.confirmPassword.message}</p>}
            <button className='btn btn-success w-100 mt-3' disabled={isSubmitting}>
              {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
              Reset Password
            </button>
          </div>
        </form>
      </div>
      </div>
    </>
  )
}
