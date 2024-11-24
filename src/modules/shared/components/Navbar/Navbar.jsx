import './Navbar.css'
// Images
import userImage from '../../../../assets/images/Ellipse 234.png'

export default function Navbar({loginData}) {
  return (
    <nav className="navbar d-flex justify-content-end">
      <div className="info">
        <img src={userImage} alt="" />
        <span className='px-3'>{loginData?.userName}</span>
      </div>
    </nav>
  )
}
