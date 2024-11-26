import './EditRecipe.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DashboardContent from '../../../shared/components/DashboardContent/DashboardContent'
import { useForm } from 'react-hook-form'
import imgfile from '../../../../assets/images/image-file.png'
import arrowIcon from '../../../../assets/images/arrow-icon.png'
import noImg from '../../../../assets/images/nodata.png'
import { axiosInstance, CATEGORY_URL, imageBaseURL, RECIPES_URL, TAGS_URL } from '../../../../services/endpoint/Endpoint'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

export default function EditRecipe() {
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [recipe, setRecipe] = useState([])
  const [imagePreview, setImagePreview] = useState(null);
  const {recipeId} = useParams()
  const Navigate = useNavigate()
  const {register, formState: {errors, isSubmitting}, handleSubmit, setValue} = useForm()

  // Handle file change event
  const handleFileChange = (e) => {
    e.preventDefault()
    const file = e.target.files[0];
    if (file) {
      setValue("recipeImage", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const editRecipe = async (data) => {
    const formData = new FormData()
    formData.append('name', data?.name)
    formData.append('description', data?.description)
    formData.append('price', data?.price)
    formData.append('tagId', data?.tagId)
    formData.append('categoriesIds', data?.categoriesIds)
    formData.append('recipeImage', data?.recipeImage)

    try {
      const res = await axiosInstance.put(RECIPES_URL.PUT_RECIPE(recipeId), formData)
      console.log(res);
      toast.success('The Recipe update successfully')
      Navigate('/dashboard/recipes')
    } catch (error) {
      console.log(error)
    }    
  }
  setValue('name', recipe?.name)
  setValue('tagId', recipe?.tag?.id)
  setValue('price', recipe?.price)
  setValue('categoriesIds', recipe?.category?.[0]?.id)
  setValue('description', recipe?.description)

  const getRecipe = async () => {
    try {
      const res = await axiosInstance.get(RECIPES_URL.GET_RECIPE(recipeId))
      console.log(res);
      setRecipe(res?.data)
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    getCategories()
    getTags()
    getRecipe()
  }, [])

  return (
    <>
        <div className='my-3'>
            <DashboardContent arrowIcon={arrowIcon} Recipes={'All Recipes'} word={'Edit'}/>
        </div>
        <form onSubmit={handleSubmit(editRecipe)}>
          <div className=' row create-inputs g-4'>
            <div className='col-sm-12 create-input'>
              <input type="text" placeholder='Recipe Name'
              {...register('name', { required: 'Recipe name is required' })} />
              {errors.name && <p className='text-danger my-1'>{errors.name?.message}</p>}
            </div>
            <div className='col-sm-12 create-input'>
              <select {...register('tagId', { required: 'Tags is required' })}>
                {tags.map((tag, index) => {
                  return <option key={index} value={tag.id}>{tag.name}</option>
                })}
              </select>
              {errors.tagId && <p className='text-danger my-1'>{errors.tagId?.message}</p>}
            </div>
            <div className='col-sm-12 create-input'>
              <input type="text" placeholder='Price' 
              {...register('price', { required: 'Price  is required' })}/>
              {errors.price && <p className='text-danger my-1'>{errors.price?.message}</p>}
            </div>
            <div className='col-sm-12 create-input'>
              <select {...register('categoriesIds', { required: 'Category  is required' })}>
                {categories.map((category, index) => {
                    return <option key={index} value={category.id}>{category.name}</option>
                })}
              </select>
              {errors.categoriesIds && <p className='text-danger my-1'>{errors.categoriesIds?.message}</p>}
            </div>
            <div className='col-sm-12 create-input'>
              <textarea placeholder='Description'
              {...register('description', { required: 'Description   is required' })}></textarea>
              {errors.description && <p className='text-danger my-1'>{errors.description?.message}</p>}
            </div>
            <div className='col-sm-12 create-input' id='input-file'>
              <label htmlFor='image' style={{cursor:'pointer'}}>
                <img src={imgfile} alt="" />
                <p>Drag & Drop or <span>Choose a Item Image</span> to Upload</p>
              </label>
              <input type="file" placeholder='Recipe Name' id='image' style={{display: 'none'}}
              {...register('recipeImage')}
              onChange={handleFileChange}/>
            </div>
            <img style={{minWidth:'350px', maxWidth:'350px', minHeight:'218px', maxHeight:'218px'}} src={imagePreview ? imagePreview : recipe?.imagePath ? `${imageBaseURL}/${recipe?.imagePath}` : noImg} alt="" />
            <div className='d-flex justify-content-end'>
              <Link to={'/dashboard/recipes'} className="btn btn-outline-success px-5 mx-4">Cancel</Link>
              <button className='btn btn-success px-3' disabled={isSubmitting}>
                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                Save
              </button>
            </div>
          </div>
        </form>
    </>
  )
}
