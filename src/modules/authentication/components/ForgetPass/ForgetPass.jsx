import './ForgetPass.css'
import logo from '../../../../assets/images/chanpass.png'
import email from '../../../../assets/images/e-icon.png'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstanceUrl, USERS_URL } from '../../../../services/endpoint/Endpoint';

export default function ForgetPass() {
  const {register,  formState: { errors, isSubmitting }, handleSubmit} = useForm();
  const Navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstanceUrl.post(USERS_URL.FORGET_PASSWORD, data)
      console.log(res);
      Navigate('/reset-password', { state: { email: data.email } })
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
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
          <h3>Forgot Your Password?</h3>
          <p>No worries! Please enter your email and we will send a password reset link </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='inputs row g-5'>
            <div className='input col-12 rounded-2'>
              <img src={email} alt="" />
              <input className='border border-0 px-2 py-3' type="email" placeholder='Enter your email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              })}/>
            </div>
            {errors.email && <p className='text-danger my-1'>{errors.email.message}</p>}
            <button className='btn btn-success' disabled={isSubmitting}>
              {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
              Submit
            </button>
          </div>
        </form>
      </div>
      </div>
    </>  
  )
}
