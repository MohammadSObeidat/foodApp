import './Registeration.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../../assets/images/chanpass.png'
import email from '../../../../assets/images/e-icon.png'
import pass from '../../../../assets/images/pass-icon.png'
import imgfile from '../../../../assets/images/image-file.png'
import { useForm } from 'react-hook-form';
import { useState } from 'react'
import { axiosInstanceUrl, USERS_URL } from '../../../../services/endpoint/Endpoint'
import { toast } from 'react-toastify'

export default function Registeration() {
  const [type, setType] = useState('password')
  const [typeConfig, setTypeConfig] = useState('password')
  const Navigate = useNavigate()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append('userName', data?.userName)
    formData.append('email', data?.email)
    formData.append('country', data?.country)
    formData.append('phoneNumber', data?.phoneNumber)
    formData.append('password', data?.password)
    formData.append('confirmPassword', data?.confirmPassword)
    formData.append('profileImage', data?.profileImage?.[0]?.name)
    try {
      const res = await axiosInstanceUrl.post(USERS_URL.REGISTERATION, formData)
      console.log(res.data.message);
      toast.success(res?.data?.message)
      Navigate('/verification', {state: {email: data?.email}})
    } catch (error) {
      toast.error(error?.response?.data?.message)
      const errors = error?.response?.data?.additionalInfo?.errors
      for (const key in errors) {
        toast.error(errors[key][0])
      }
      // console.log(error?.response?.data?.additionalInfo?.errors);
    }
  }

  const changeTypePass = () => {
    if (type === 'password') {
      setType('text')
    } else {
      setType('password')
    }
  }

  const changeTypeConfPass = () => {
    if (typeConfig === 'password') {
      setTypeConfig('text')
    } else {
      setTypeConfig('password')
    }
  }

  return (
    <>
    <div className="col-lg-7 col-md-9 col-sm-6 bg-white rounded-2 px-5 py-4">
      <div className="content">
        <div className="logo-container text-center">
          <img className='w-50' src={logo} alt="" />
        </div>
        <div className='title py-3'>
          <h3>Register</h3>
          <p>Welcome Back! Please enter your details</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-inputs g-4 justify-content-between'>
            <div>
              <div className='form-input rounded-2'>
                <img src={email} alt="" />
                <input className='border border-0 px-2 py-3' type="text" placeholder='UserName'
                {...register('userName', {
                  required: 'userName is required',
                })}/>
              </div>
              {errors.userName && <p className='text-danger mt-1 mb-0'>{errors.userName.message}</p>}
            </div>
            <div>
              <div className='form-input rounded-2'>
                <div className='password'>
                  <img src={email} alt="" />
                  <input className='border border-0 px-2 py-3' type='email' placeholder='Enter your E-mail'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: 'Please enter a valid email address'
                    }
                  })}/>
                </div>
              </div>
              {errors.email && <p className='text-danger mt-1 mb-0'>{errors.email.message}</p>}
            </div>
            <div>
              <div className='form-input rounded-2'>
                <div className='password'>
                  <img src={pass} alt="" />
                  <input className='border border-0 px-2 py-3' type='text' placeholder='Country'
                  {...register('country', {
                    required: 'Country is required' 
                  })}/>
                </div>
              </div>
              {errors.country && <p className='text-danger mt-1 mb-0'>{errors.country.message}</p>}
            </div>
            <div>
              <div className='form-input rounded-2'>
                <div className='password'>
                  <img src={email} alt="" />
                  <input className='border border-0 px-2 py-3' type='number' placeholder='PhoneNumber'
                  {...register('phoneNumber', {
                    required: 'Phone number is required' 
                  })}/>
                </div>
              </div>
              {errors.phoneNumber && <p className='text-danger mt-1 mb-0'>{errors.phoneNumber.message}</p>}
            </div>
            <div>
              <div className='form-input rounded-2'>
                <div className='password'>
                  <img src={pass} alt="" />
                  <input className='border border-0 px-2 py-3' type={type} placeholder='Password'
                  {...register('password', {
                    required: 'Password is required' 
                  })}/>
                  {type === 'password' ? <button type='button' onClick={changeTypePass}><i className="fa-duotone fa-solid fa-eye-slash eye"></i></button> : <button type='button' onClick={changeTypePass}><i className='fa fa-eye eye'></i></button>}
                </div>
              </div>
              {errors.password && <p className='text-danger mt-1 mb-0'>{errors.password.message}</p>}
            </div>
            <div>
              <div className='form-input rounded-2'>
                <div className='password'>
                  <img src={pass} alt="" />
                  <input className='border border-0 px-2 py-3' type={typeConfig} placeholder='confirm-password'
                  {...register('confirmPassword', {
                    required: 'confirmPassword is required',
                    validate: (confirmPassword) => 
                    confirmPassword === watch('password') || "Password do not match",
                  })}/>
                  {typeConfig === 'password' ? <button type='button' onClick={changeTypeConfPass}><i className="fa-duotone fa-solid fa-eye-slash eye"></i></button> : <button type='button' onClick={changeTypeConfPass}><i className='fa fa-eye eye'></i></button>}
                </div>
              </div>
              {errors.confirmPassword && <p className='text-danger mt-1 mb-0'>{errors.confirmPassword.message}</p>}
            </div>
          </div>
          <div className='file rounded-2 mt-4 text-center p-2'>
                <div className='password'>
                  <label htmlFor='image' style={{cursor:'pointer'}}>
                    <img src={imgfile} alt="" />
                    <p>Drag & Drop or <span>Choose a Item Image</span> to Upload</p>
                  </label>
                  <input className='border border-0 px-2 py-3' type='file' style={{display:'none'}} id='image'
                  {...register('profileImage')}/>
                </div>
              </div>
          <div className='links w-100 py-3 d-flex justify-content-end'>
            <Link className='link-reg text-success' to='/'>Login Now?</Link>
          </div>
          <div className='w-100 d-flex justify-content-center'>
            <button className='btn btn-success w-75 mt-3' disabled={isSubmitting}>
              {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
              Register
            </button>
          </div>
        </form>
      </div>
      </div>
    </>
  )
}
