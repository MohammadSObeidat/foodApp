import './SideBar.css'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Modal from 'react-bootstrap/Modal';
// Images
import home from '../../../../assets/images/home-icon.png'
import chanPassImg from '../../../../assets/images/chanpass.png'
import pass from '../../../../assets/images/pass-icon.png'
import users from '../../../../assets/images/people.png'
import recipes from '../../../../assets/images/columns-gap.png'
import categories from '../../../../assets/images/category-icon.png'
import changePassword  from '../../../../assets/images/change-pass-icon.png'
import logout from '../../../../assets/images/logout-icon.png'
import logo from '../../../../assets/images/logo-sidebar.png'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance, USERS_URL } from '../../../../services/endpoint/Endpoint';
import { toast } from 'react-toastify';

export default function SideBar() {
  const Navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [show, setShow] = useState(false);
  const [oldPassword, setOldPassword] = useState('password');
  const [newPassword, setNewPassword] = useState('password');
  const [confirmPassword, setConfirmPassword] = useState('password');
  const {register, formState: { errors, isSubmitting }, handleSubmit, watch} = useForm();

  const toggle = () => {
    setIsCollapsed(prev => !prev)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
  };

  const oldPasswordFun = () => {
    if (oldPassword === 'password') {
      setOldPassword('text')
    } else {
      setOldPassword('password')
    }
  }

  const newPasswordFun = () => {
    if (newPassword === 'password') {
      setNewPassword('text')
    } else {
      setNewPassword('password')
    }
  }

  const confirmPasswordFun = () => {
    if (confirmPassword === 'password') {
      setConfirmPassword('text')
    } else {
      setConfirmPassword('password')
    }
  }

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.put(USERS_URL.CHANGE_PASSWORD, data)
      console.log(res);
      toast.success(res?.data?.message)
      handleClose()
    } catch (error) {
      // console.log(error.response.data.message);
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className='text-center'>
          <div className='img-change-password'>
            <img className='w-75' src={chanPassImg} alt="" />
          </div>
          <div className='text-change-pass pt-2'>
            <h1>Change Your Password</h1>
            <p>Enter your details below</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='inputs row px-5 g-3'>
              <div className='input col-12 rounded-2'>
                <div className='password'>
                  <img src={pass} alt="" />
                  <input className='border border-0 px-2 py-3' type={oldPassword} placeholder='Old Password'
                  {...register('oldPassword', {
                    required: 'old password is required',
                  })}/>
                  {oldPassword === 'password' ? <i onClick={oldPasswordFun} className="fa-duotone fa-solid fa-eye-slash eye"></i> : <i onClick={oldPasswordFun} className='fa fa-eye eye'></i>}
                </div>
              </div>
              {errors.oldPassword && <p className='text-danger my-1 text-start'>{errors.oldPassword.message}</p>}
              <div className='input col-12 rounded-2'>
                <div className='password'>
                  <img src={pass} alt="" />
                  <input className='border border-0 px-2 py-3' type={newPassword} placeholder='New Password'
                  {...register('newPassword', {
                    required: 'new password is required' 
                  })}/>
                  {newPassword === 'password' ? <i onClick={newPasswordFun} className="fa-duotone fa-solid fa-eye-slash eye"></i> : <i onClick={newPasswordFun} className='fa fa-eye eye'></i>}
                </div>
              </div>
              {errors.newPassword && <p className='text-danger my-1 text-start'>{errors.newPassword.message}</p>}
              <div className='input col-12 rounded-2'>
                <div className='password'>
                  <img src={pass} alt="" />
                  <input className='border border-0 px-2 py-3' type={confirmPassword} placeholder='Confirm New Password'
                  {...register('confirmNewPassword', {
                    required: 'confirm new password is required',
                    validate: (confirmNewPassword) => 
                      confirmNewPassword === watch('newPassword') || "new password do not match",
                  })}
                  />
                  {confirmPassword === 'password' ? <i onClick={confirmPasswordFun} className="fa-duotone fa-solid fa-eye-slash eye"></i> : <i onClick={confirmPasswordFun} className='fa fa-eye eye'></i>}
                </div>
              </div>
              {errors.confirmNewPassword && <p className='text-danger my-1 text-start'>{errors.confirmNewPassword.message}</p>}

              <button className='btn btn-success w-100 my-4 py-2' disabled={isSubmitting}>
                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                Change Password
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <div className='sidebar-container'>
        <Sidebar collapsed={isCollapsed}>
          <Menu>
            <MenuItem onClick={toggle} className={`img ${isCollapsed === false ? 'img-p' : ''}`} icon={<img src={logo} alt="" />}></MenuItem>
            <MenuItem component={<Link to='/dashboard'/>} icon={<img src={home} alt="" />}> 
              Home 
            </MenuItem>
            <MenuItem component={<Link to='/dashboard/user'/>} icon={<img src={users} alt="" />}> 
              Users
            </MenuItem>
            <MenuItem component={<Link to='/dashboard/recipes'/>} icon={<img src={recipes} alt="" />}> 
              Recipes
            </MenuItem>
            <MenuItem component={<Link to='/dashboard/categories'/>} icon={<img src={categories} alt="" />}> 
              Categories
            </MenuItem>
            <MenuItem icon={<img src={changePassword} alt="" />} onClick={handleShow}> 
              Change Password
            </MenuItem>
            <MenuItem icon={<img src={logout} alt="" />} onClick={() => {
              localStorage.removeItem('token')
              Navigate('/')
            }}> 
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  )
}
