import './Header.css'

export default function Header({loginData, title, description, image}) {
  return (
    <div className="header-container d-flex justify-content-between align-items-center px-5 my-3 rounded-2 bg-success">
      <div className="header-caption">
        <h1 className='text-white'>{title} {loginData?.userName} !</h1>
        <p className='text-white w-75'>{description}</p>
      </div>
      <div className="header-img">
        <img className='w-75' src={image} alt="" />
      </div>
    </div>
  )
}
