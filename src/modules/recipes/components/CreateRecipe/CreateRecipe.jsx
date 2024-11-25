import './CreateRecipe.css'
import DashboardContent from '../../../shared/components/DashboardContent/DashboardContent'
import arrowIcon from '../../../../assets/images/arrow-icon.png'
import imgfile from '../../../../assets/images/image-file.png'
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosInstance, CATEGORY_URL, RECIPES_URL, TAGS_URL } from '../../../../services/endpoint/Endpoint';
import { Link, useNavigate } from 'react-router-dom';

export default function CreateRecipe() {
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [imagePreview, setImagePreview] = useState(null);
  const Navigate = useNavigate()

  const {register, formState: {errors, isSubmitting}, handleSubmit, setValue} = useForm()

  // Handle file change event
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Set the file in React Hook Form
      setValue("recipeImage", file);
      // Generate a URL for previewing the image
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const createRecipe = async (data) => {
    const formData = new FormData()
    formData.append('name', data?.name)
    formData.append('description', data?.description)
    formData.append('price', data?.price)
    formData.append('tagId', data?.tagId)
    formData.append('categoriesIds', data?.categoriesIds)
    formData.append('recipeImage', data?.recipeImage[0])

    try {
      const res = await axiosInstance.post(RECIPES_URL.POST_RECIPES, formData)
      console.log(res);
      toast.success(res?.data?.message)
      Navigate('/dashboard/recipes')
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
  }, [])

  return (
    <>
        <div className='my-3'>
            <DashboardContent arrowIcon={arrowIcon} Recipes={'All Recipes'} word={'Fill'}/>
        </div>
        <form onSubmit={handleSubmit(createRecipe)}>
          <div className=' row create-inputs g-4'>
            <div className='col-sm-12 create-input'>
              <input type="text" placeholder='Recipe Name'
              {...register('name', { required: 'Recipe name is required' })} />
              {errors.name && <p className='text-danger my-1'>{errors.name?.message}</p>}
            </div>
            <div className='col-sm-12 create-input'>
              <select {...register('tagId', { required: 'Tags is required' })}>
                <option value="">Tags</option>
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
                <option value="">Category</option>
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
            <img style={{minWidth:'350px', maxWidth:'350px', maxHeight:'218px'}} src={imagePreview ? imagePreview : ''} alt="" />
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
