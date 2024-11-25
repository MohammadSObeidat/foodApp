import './UserList.css'
import Header from "../../../shared/components/Header/Header";
import img from '../../../../assets/images/category-list.png'
import userImg from '../../../../assets/images/user-img.png'
import { OrbitProgress } from 'react-loading-indicators';
import NoData from '../../../shared/components/NoData/NoData';
import { useEffect, useState } from 'react';
import { axiosInstance, imageBaseURL, USERS_URL } from '../../../../services/endpoint/Endpoint';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';

export default function UserList() {
  const [userList, setUserList] = useState([])
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [show, setShow] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userData, setUserData] = useState(null)
  const [load, setLoad] = useState(true);
  const [pageNumber, setPageNumber] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [countryValue, setCountryValue] = useState('')
  const [groupValue, setGroupValue] = useState('')


  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setUserId(id)
    setShow(true)
  };

  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = async (id) => {
    console.log(id);
    // setLoad(true)
    try {
      const res = await axiosInstance.get(USERS_URL.GET_USER(id))
      console.log(res);
      setUserData(res?.data)
      setLoad(false)
    } catch (error) {
      console.log(error);
    }

    setShowInfo(true)
  };

  const getUsers = async (pageSize, pageNumber, userName, email, country, groups) => {
    if (userList.length > 0) {
      setLoad(false)
    }

    try {
      const res = await axiosInstance.get(USERS_URL.GET_USERS, 
        {params: {
          pageSize: pageSize, 
          pageNumber: pageNumber, 
          userName: userName, 
          email: email, 
          country: country,
          groups: groups
        }})

      console.log(res);
      setUserList(res?.data?.data)
      setLoad(false)
      setPageNumber(Array(res?.data?.totalNumberOfPages).fill().map((_, i) => i + 1))
    } catch (error) {
      console.log(error);
    }
  }

  const deleteUser = async () => {
    try {
      const res = await axiosInstance.delete(USERS_URL.DELETE_USER(userId))
      toast.success(res?.data?.message)
      setShow(false)
      getUsers(20, 1)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  const getNameValue = (event) => {
    setNameValue(event.target.value);
    getUsers(20, 1, event.target.value, emailValue, countryValue, groupValue)
  }

  const getEmailValue = (event) => {
    setEmailValue(event.target.value);
    getUsers(20, 1, nameValue, event.target.value, countryValue, groupValue)
  }

  const getCountryValue = (event) => {
    setCountryValue(event.target.value);
    getUsers(20, 1, nameValue, emailValue, event.target.value, groupValue)
  }

  const getGroupValue = (event) => {
    setGroupValue(event.target.value);
    getUsers(20, 1, nameValue, emailValue, countryValue, event.target.value)
  }

  useEffect(() => {
    getUsers(20, 1)
  }, [])

  // Handle the "Previous" button click
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      getUsers(20, currentPage - 1, nameValue, emailValue, countryValue, groupValue); 
    }
  };

   // Handle the "Next" button click
   const handleNextClick = () => {
    if (currentPage < pageNumber.length) {
      setCurrentPage(currentPage + 1);
      getUsers(20, currentPage + 1, nameValue, emailValue, countryValue, groupValue);
    }
  };

  return (
    <div className='user-list'>
      <Header 
        title={'Users List'} 
        description={'You can now add your items that any user can order it from the Application and you can edit'}
        image={img}/>

      <DeleteConfirmation 
          show={show} 
          handleClose={handleClose} 
          deleteItem={'User'} 
          deleteFun={deleteUser} />


        {load ? '' : <Modal show={showInfo} onHide={handleCloseInfo}>
          <Modal.Header closeButton>
            <h3>User Information</h3>
          </Modal.Header>
          <Modal.Body className='text-center'>
            <div className='user-img'>
              <img style={{minWidth:'250px', maxWidth:'250px', minHeight:'250px', maxHeight:'250px'}} src={userData?.imagePath ? `${imageBaseURL}/${userData?.imagePath}` : userImg} alt="" />
            </div>
            <div className='info pt-3'>
              <h3>Name: {userData?.userName}</h3>
              <p>Email: {userData?.email}</p>
              <p>Country: {userData?.country}</p>
              <p>Phone Number: {userData?.phoneNumber}</p>
            </div>
          </Modal.Body>
        </Modal>}

      <div className="content">
        <div>
          <h4>Users Table Details</h4>
          <p>You can check all details</p>
        </div>
      </div>

      <div className='row filter'>
        <div className='col-3 search-input'>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" className='form-control' placeholder='User Name ...'
          onChange={getNameValue}/>
        </div>
        <div className='col-3 search-input'>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" className='form-control' placeholder='E-mail'
          onChange={getEmailValue}/>
        </div>
        <div className='col-3 search-input'>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" className='form-control' placeholder='country'
          onChange={getCountryValue}/>
        </div>
        <div className='col-3'>
          <select className='form-control' onChange={getGroupValue}>
            <option value="" selected={true}>Select role ...</option>
            <option value="1">admin</option>
            <option value="2">user</option>
          </select>
        </div>
      </div>

      <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Country</th>
              <th>PhoneNumber</th>
              <th>Actions</th>
            </tr>
          </thead>
          {load && <td className='pt-5' colSpan={6}><OrbitProgress color="#32cd32" size="medium" text="" textColor="" /></td>}

          {load ? '' : userList.length > 0 ?  <tbody>
            {userList.map((user, index) => {
              return  <tr key={index}>
                        <td>{user?.userName}</td>
                        <td><img style={{minWidth:'60px', maxWidth:'60px', minHeight:'60px', maxHeight:'60px'}} src={user?.imagePath ? `${imageBaseURL}/${user?.imagePath}` : userImg} alt="" /></td>
                        <td>{user?.email}</td>
                        <td>{user?.country}</td>
                        <td>{user?.phoneNumber}</td>
                        <td className='action'>
                          <button onClick={() => setActiveMenuId(prevId => (prevId === user.id ? null : user.id))}>
                            <i style={{cursor:"pointer"}} className="fa-solid fa-ellipsis"></i>
                          </button>
                          <ul className={`menu ${activeMenuId === user.id ? 'show' : ''}`}>
                            
                              <li>
                                <button onClick={() => {
                                  handleShowInfo(user?.id)
                                  setActiveMenuId(null)
                                }}>
                                  <i title='View' className="fa-solid fa-eye text-success"></i> View
                                </button>
                              </li>
                              <li>
                                <button onClick={() => {
                                  handleShow(user?.id)
                                  setActiveMenuId(null)
                                }}>
                                  <i title='Delete' className="fa-solid fa-trash text-success"></i> Delete
                                </button>
                              </li>
                          </ul>
                        </td>
                      </tr>
            })}
          </tbody> : <tbody>
                        <tr>
                          <td colSpan="6">
                            {load ? '' : <NoData />}
                          </td>
                        </tr>
                      </tbody>
          }
        </table>

        {pageNumber.length > 0 && <div className='d-flex justify-content-end mt-5'>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#" onClick={handlePreviousClick} disabled={currentPage === 1}>Previous</a></li>
              {pageNumber.slice(currentPage - 5, currentPage + 5).map((pageNo) => {
                return <li className={`page-item ${pageNo === currentPage ? 'active' : ''}`} key={pageNo}>
                  <a className="page-link" href="#" onClick={() => {
                    setCurrentPage(pageNo)
                    getUsers(20, pageNo)
                    }}>
                    {pageNo}
                  </a>
                </li>
              })}
              <li className="page-item"><a className="page-link" href="#" onClick={handleNextClick} disabled={currentPage === pageNumber.length}>Next</a></li>
            </ul>
          </nav>
        </div>}
    </div>
  )
}
