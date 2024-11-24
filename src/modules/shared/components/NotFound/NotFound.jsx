import './NotFound.css'
import logo from '../../../../assets/images/chanpass.png'
import notFoundImg from '../../../../assets/images/notFound1.png'
import arrowLeft from '../../../../assets/images/left-arrow.png'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="not-found">
      <div className='logo px-5 pt-3'>
        <img src={logo} alt="" />
      </div>
      <div className='content d-flex justify-content-between align-items-center'>
        <div className='text px-5'>
          <h1>Oops</h1>
          <p id='not'>Page not found </p>
          <p>
            This Page doesn’t exist or was removed!
            We suggest you  back to home.
          </p>
          <Link to={'/dashboard'} className='btn btn-success px-5 py-3'> <img src={arrowLeft} className='px-3' alt="" /> Back To Home</Link>
        </div>
        <div className='notfound-img'>
          <img src={notFoundImg} alt="" />
        </div>
      </div>
    </div>
  )
}
