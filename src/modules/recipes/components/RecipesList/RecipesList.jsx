import './RecipesList.css'
import Header from "../../../shared/components/Header/Header";
import img from '../../../../assets/images/category-list.png'
import noImg from '../../../../assets/images/nodata.png'
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosInstance, CATEGORY_URL, FAVORITE_RECIPES_URL, imageBaseURL, RECIPES_URL, TAGS_URL } from '../../../../services/endpoint/Endpoint';
import NoData from '../../../shared/components/NoData/NoData';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
import { Link } from 'react-router-dom';
import { OrbitProgress } from 'react-loading-indicators';
import { AuthContext } from '../../../../context/AuthContext';

export default function RecipesList() {
  const {loginData} = useContext(AuthContext)
  const [recipesList, setRecipes] = useState([])
  const [show, setShow] = useState(false);
  const [recipeId, setRecipeId] = useState(0)
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [load, setLoad] = useState(false);
  const [pageNumber, setPageNumber] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [nameValue, setNameValue] = useState('')
  const [tagValue, setTagValue] = useState('')
  const [categoryValue, setCategoryValue] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setRecipeId(id)
    setShow(true)
  };

  const getRecipes = async (pageSize, pageNumber, name, tagId, categoryId) => {
    setLoad(true)
    try {
      const res = await axiosInstance.get(RECIPES_URL.GET_RECIPES, 
        {params: {pageSize: pageSize, pageNumber: pageNumber, name: name, tagId: tagId, categoryId: categoryId}})
      console.log(res);
      setLoad(false)
      setRecipes(res?.data?.data)
      setPageNumber(Array(res?.data?.totalNumberOfPages).fill().map((_, i) => i+1))      
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  const deleteRecipe = async() => {
    try {
      await axiosInstance.delete(RECIPES_URL.DELETE_RECIPES(recipeId))      
      handleClose()
      getRecipes(10, 1)
      toast.success('Delete Successfuly')
    } catch (error) {
      toast.error(error?.response?.data?.message)
      handleClose()
    }
  }

  const getCategories = async () => {
    try {
      const res = await axiosInstance.get(CATEGORY_URL.GET_CATEGORIES, {params: {pageSize: 30, pageNumber: 1}})
      console.log(res);
      setCategories(res?.data?.data);
      
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  const getTags = async () => {
    try {
      const res = await axiosInstance.get(TAGS_URL.GET_TAGS)
      console.log(res);
      setTags(res?.data)
      
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  const getNameValue = async (event) => {
    setNameValue(event.target.value);
    getRecipes(10, 1, event.target.value, tagValue, categoryValue)
  }

  const getTagValue = (event) => {
    setTagValue(event.target.value);
    getRecipes(10, 1, nameValue, event.target.value, categoryValue)
  }

  const getCategoryValue = (event) => {
    setCategoryValue(event.target.value);
    getRecipes(10, 1, nameValue, tagValue, event.target.value)
  }

  const addToFavorite = async (id) => {
    try {
      const res = await axiosInstance.post(FAVORITE_RECIPES_URL.POST_FAVORITE_RECIPES, 
        {
          recipeId: id
        }        
      )
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  } 

  useEffect(() => {
    getRecipes(10, 1)
    getCategories()
    getTags()
  }, [])

  // Handle the "Previous" button click
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      getRecipes(10, currentPage - 1); 
    }
  };

   // Handle the "Next" button click
   const handleNextClick = () => {
    if (currentPage < pageNumber.length) {
      setCurrentPage(currentPage + 1);
      getRecipes(10, currentPage + 1);
    }
  };

  return (
    <div className="recipes-list">
      <Header 
        title={'Recipes Items'} 
        description={'You can now add your items that any user can order it from the Application and you can edit'}
        image={img}/>

      <DeleteConfirmation 
        show={show} 
        handleClose={handleClose} 
        deleteItem={'Recipe'} 
        deleteFun={deleteRecipe} />

        {loginData?.userGroup !== 'SystemUser' ?
          <div className="content d-flex justify-content-between align-items-center">
            <div>
              <h4>Recipe Table Details</h4>
              <p>You can check all details</p>
            </div>
            <div>
              <Link to={'/dashboard/recipes/create-recipe'} className="btn btn-success px-4">Add New Item</Link>
            </div>
          </div> : ''
        }
        <div className='row filter'>
          <div className='col-6 search-input'>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" className='form-control' placeholder='Search here ...'
            onChange={getNameValue}/>
          </div>
          <div className='col-3'>
            <select className='form-control' onChange={getTagValue}>
              <option value="">Tags</option>
              {tags.map((tag, index) => {
                return <option key={index} value={tag.id}>{tag.name}</option>
              })}
            </select>
          </div>
          <div className='col-3'>
            <select className='form-control' onChange={getCategoryValue}>
              <option value="">Category</option>
              {categories.map((category, index) => {
                return <option key={index} value={category.id}>{category.name}</option>
              })}
            </select>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Description</th>
              <th>tag</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          {load && <td colSpan={7}><OrbitProgress color="#32cd32" size="medium" text="" textColor="" /></td>}

          {load ? '' : recipesList.length > 0 ? <tbody>
            {recipesList.map((recipe, index) => {
              return  <tr key={index}>
                        <td>{recipe?.name}</td>
                        <td><img src={recipe?.imagePath ? `${imageBaseURL}/${recipe?.imagePath}` : noImg} alt="" style={{minWidth:'60px', maxWidth:'60px', minHeight:'60px', maxHeight:'60px'}}/></td>
                        <td>$ {recipe?.price}</td>
                        <td>{recipe?.description}</td>
                        <td>{recipe?.tag?.name}</td>
                        <td>{recipe?.category[0]?.name}</td>
                        {loginData?.userGroup !== 'SystemUser' ?
                          <td className='action'>
                            <i style={{cursor:"pointer"}} onClick={() => setActiveMenuId(prevId => (prevId === recipe.id ? null : recipe.id))} className="fa-solid fa-ellipsis"></i>
                            <ul className={`menu ${activeMenuId === recipe.id ? 'show' : ''}`}>
                              <li><i title='View' className="fa-solid fa-eye text-success"></i> View</li>
                              <Link style={{textDecoration:'none', color:'black'}} to={`/dashboard/recipes/${recipe?.id}`}>
                                <li><i title='Edit' className="fa-solid fa-pen-to-square text-success px-3"></i> Edit</li>
                              </Link>
                              <li onClick={() => {
                                // handleShow(recipe.id)
                                // setActiveMenuId(null)
                                handleShow(recipe?.id)
                              }}><i title='Delete' className="fa-solid fa-trash text-success"></i> Delete</li>
                            </ul>
                          </td> :  <i className="fa-regular fa-heart text-danger" onClick={() => addToFavorite(recipe?.id)}></i>}
                      </tr>
            })}
            </tbody> : <tbody>
                          <tr>
                            <td colSpan="7">
                              {load ? '' : <NoData />}
                            </td>
                          </tr>
                        </tbody>
          }
          
        </table>

        {recipesList.length > 0 && <div className='d-flex justify-content-end mt-5'>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#" onClick={handlePreviousClick} disabled={currentPage === 1}>Previous</a></li>
              {pageNumber.map((pageNo, index) => {
                return <li key={index} className={`page-item ${pageNo === currentPage ? 'active' : ''}`}><a className="page-link" href="#" onClick={() => {
                  setCurrentPage(pageNo);
                  getRecipes(10, pageNo)
                }}>{pageNo}</a></li>
              })}
              <li className="page-item"><a className="page-link" href="#" onClick={handleNextClick} disabled={currentPage === pageNumber.length}>Next</a></li>
            </ul>
          </nav>
        </div>}
    </div>
  )
}
