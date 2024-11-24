import { useForm } from 'react-hook-form';
import logo from '../../../../assets/images/chanpass.png'
import email from '../../../../assets/images/e-icon.png'
import pass from '../../../../assets/images/pass-icon.png'
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstanceUrl, USERS_URL } from '../../../../services/endpoint/Endpoint';
import { toast } from 'react-toastify';

export default function Verification() {
    const Navigate = useNavigate()
    const Location = useLocation()
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm({defaultValues: Location.state});

    const onSubmit = async (data) => {
        try {
            const res = await axiosInstanceUrl.put(USERS_URL.VERIFY, data)
            toast.success(res?.data?.message)
            Navigate('/')
        } catch (error) {
            toast.error(error?.response?.data?.message);
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
          <h3> Verify Account</h3>
          <p>Please Enter Your Otp or Check Your Inbox</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='inputs row  g-4'>
            <div className='input col-12 rounded-2'>
              <img src={email} alt="" />
              <input className='border border-0 px-2 py-3' type="email" placeholder='Enter your E-mail' disabled={true}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: 'Please enter a valid email address'
                }
              })}
              />
            </div>
            {errors.email && <p className='text-danger my-1'>{errors.email.message}</p>}
            <div className='input col-12 rounded-2'>
              <div className='password'>
                <img src={pass} alt="" />
                <input className='border border-0 px-2 py-3' type='text' placeholder='OTP'
                {...register('code', {
                  required: 'Code is required' 
                })}
                />
              </div>
            </div>
            {errors.code && <p className='text-danger my-1'>{errors.code.message}</p>}
          </div>
          <button className='btn btn-success w-100 mt-4' disabled={isSubmitting}> 
            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
            send
          </button>
        </form>
      </div>
    </div>
    </>
  )
}
