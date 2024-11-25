import './CategoriesList.css'
import Header from "../../../shared/components/Header/Header";
import img from '../../../../assets/images/category-list.png'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance, CATEGORY_URL } from '../../../../services/endpoint/Endpoint';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
import NoData from '../../../shared/components/NoData/NoData';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { OrbitProgress } from 'react-loading-indicators';

export default function CategoriesList() {
  const [categoryList, setCategoryList] = useState([])
  const [pageNumber, setPageNumber] = useState([])
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [load, setLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [nameValue, setNameValue] = useState('')

  const {register, formState: { errors, isSubmitting }, handleSubmit, reset } = useForm();

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setCategoryId(id)
    setShow(true)
  };

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => {
    setShowAdd(true)
    reset({ name: '' });
  };

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (id) => {
    setCategoryId(id)
    setShowEdit(true)
  };

  const getCategory = async(pageSize, pageNumber, name) => {
    if (categoryList.length > 0) {
      setLoad(false)
    }

    try {
      const res = await axiosInstance.get(CATEGORY_URL.GET_CATEGORIES, 
        {params: {name: name, pageSize: pageSize, pageNumber: pageNumber}})
      setCategoryList(res?.data?.data);
      setPageNumber(Array(res?.data?.totalNumberOfPages).fill().map((_, i) => i + 1))
      setLoad(false)
    } catch (error) {
      console.log(error.message);
    }
  }

  const getOneCategory = async () => {
    try {
      const res = await axiosInstance.get(CATEGORY_URL.GET_CATEGORY(categoryId))
      reset({ name: res.data.name });
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  const editCategory = async (data) => {
    try {
      await axiosInstance.put(CATEGORY_URL.PUT_CATEGIRY(categoryId), data)
      handleCloseEdit()
      getCategory(10, 1, nameValue)
      toast.success('Category successfully updated!');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error updating category');
    }
    
  }

  useEffect(() => {
    getCategory(10, 1, nameValue)
  }, [])
  
  useEffect(() => {
    getOneCategory()
  }, [categoryId])

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post(CATEGORY_URL.POST_CATEGORY, data)
      console.log(res);
      handleCloseAdd()
      getCategory(10, 1, nameValue)
      toast.success('Category successfully added!')
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Something went wrong!';
      toast.error(errorMessage)
    }
    
  }

  const deleteCategory = async() => {
    try {
      await axiosInstance.delete(CATEGORY_URL.DELETE_CATEGIRY(categoryId))      
      handleClose()
      getCategory(10, 1, nameValue)
      toast.success('Delete Successfuly')
    } catch (error) {
      toast.error(error?.response?.data?.message)
      handleClose()
    }
  }

  const getNameValue = (event) => {
    setNameValue(event.target.value);
    getCategory(10, 1, event.target.value)
  }
  
  // Handle the "Previous" button click
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      getCategory(10, currentPage - 1, nameValue); 
    }
  };

   // Handle the "Next" button click
   const handleNextClick = () => {
    if (currentPage < pageNumber.length) {
      setCurrentPage(currentPage + 1);
      getCategory(10, currentPage + 1, nameValue);
    }
  };

  return (
    <div className='category-list'>
      <ToastContainer />

      <Header 
        title={'Categories Item'} 
        description={'You can now add your items that any user can order it from the Application and you can edit'}
        image={img}/>

        <DeleteConfirmation 
          show={show} 
          handleClose={handleClose} 
          deleteItem={'Category'} 
          deleteFun={deleteCategory} />

        {/* =========================== add modal ==========================*/}
        <Modal show={showAdd} onHide={handleCloseAdd}>
          <Modal.Header closeButton>
            <h2>Add Category</h2>
          </Modal.Header>
          <Modal.Body className='px-5 my-4'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='row inputs'>
                <div className='input col-12 rounded-2'>
                  <input className='border border-0 py-3' type="text" placeholder='Category Name'
                  {...register('name', {
                    required: 'Name is required',
                  })}/>
                </div>
              </div>
              {errors.name && <p className='text-danger my-2'>{errors.name.message}</p>}
              <button className='btn btn-success mt-4 w-100' disabled={isSubmitting}>
                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                Save
              </button>
            </form>
          </Modal.Body>
        </Modal>

        {/* =============================== edit modal ============================= */}
        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <h2>Edit Category</h2>
          </Modal.Header>
          <Modal.Body className='px-5 my-4'>
            <form onSubmit={handleSubmit(editCategory)}>
              <div className='row inputs'>
                <div className='input col-12 rounded-2'>
                  <input className='border border-0 py-3' type="text" placeholder='Category Name'
                  {...register('name', {
                    required: 'Name is required',
                  })}/>
                </div>
              </div>
              {errors.name && <p className='text-danger my-2'>{errors.name.message}</p>}
              <button className='btn btn-success mt-4 w-100' disabled={isSubmitting}>
                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                Update
              </button>
            </form>
          </Modal.Body>
        </Modal>

        <div className="content d-flex justify-content-between align-items-center">
          <div>
            <h4>Categories Table Details</h4>
            <p>You can check all details</p>
          </div>
          <div>
            <button className="btn btn-success" onClick={handleShowAdd}>Add New Category</button>
          </div>
        </div>

        <div className='row filter'>
          <div className='col-6 search-input'>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" className='form-control' placeholder='Search here ...'
            onChange={getNameValue}/>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Creation Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {load && <td className='pt-5' colSpan={3}><OrbitProgress color="#32cd32" size="medium" text="" textColor="" /></td>}

          {load ? '' :  categoryList.length > 0 ?  <tbody>
            {categoryList.map((category, index) => {
              return  <tr key={index}>
                        <td>{category?.name}</td>
                        <td>{category?.creationDate}</td>
                        <td className='action'>
                          <i style={{cursor:"pointer"}} onClick={() => setActiveMenuId(prevId => (prevId === category.id ? null : category.id))} className="fa-solid fa-ellipsis"></i>
                          <ul className={`menu ${activeMenuId === category.id ? 'show' : ''}`}>
                            <li>
                              <button onClick={() => {
                                // handleShowEdit(category.id)
                                setActiveMenuId(null)
                              }}>
                                <i title='View' className="fa-solid fa-eye text-success"></i> View
                              </button>
                            </li>
                            <li>
                              <button onClick={() => {
                                handleShowEdit(category.id)
                                setActiveMenuId(null)
                              }}>
                                <i title='Edit' className="fa-solid fa-pen-to-square text-success px-3"></i> Edit
                              </button>
                            </li>
                            <li>
                              <button onClick={() => {
                                handleShow(category.id)
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
                            <td colSpan="3">
                              {load ? '' : <NoData />}
                            </td>
                          </tr>
                        </tbody>
          }     
        </table>

        {categoryList.length > 0 && <div className='d-flex justify-content-end mt-5'>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#" onClick={handlePreviousClick} disabled={currentPage === 1}>Previous</a></li>
              {pageNumber.map((pageNo, index) => {
                return <li key={index} className={`page-item ${pageNo === currentPage ? 'active' : ''}`}><a className="page-link" href="#" onClick={() => {
                  setCurrentPage(pageNo);
                  getCategory(10, pageNo)
                }}>{pageNo}</a></li>
              })}
              <li className="page-item"><a className="page-link" href="#" onClick={handleNextClick} disabled={currentPage === pageNumber.length}>Next</a></li>
            </ul>
          </nav>
        </div>}
    </div>
  )
}
