import './Favorites.css'
import Header from '../shared/components/Header/Header'
import img from '../../assets/images/category-list.png'
import { useEffect, useState } from 'react'
import { axiosInstance, FAVORITE_RECIPES_URL, imageBaseURL } from '../../services/endpoint/Endpoint'
import NoData from '../shared/components/NoData/NoData'
import { OrbitProgress } from 'react-loading-indicators'

export default function Favorites() {
    const [favoritesLists, setFavoritesLists] = useState([])
    const [load, setLoad] = useState(false);

    const getFavorites = async () => {
        setLoad(true)
        try {
            const res = await axiosInstance.get(FAVORITE_RECIPES_URL.GET_FAVORITE_RECIPES)
            console.log(res);
            setFavoritesLists(res?.data?.data)
            setLoad(false)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteFavorite = async (id) => {
        try {
            await axiosInstance.delete(FAVORITE_RECIPES_URL.DELETE_RECIPES(id))
            getFavorites()
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        getFavorites()        
    }, [])
  return (
    <div className='favorites-container'>
        <Header 
        title={'Favorite Items'} 
        description={'You can now add your items that any user can order it from the Application and you can edit'}
        image={img}/>

        {load && <p className='text-center mt-5'><OrbitProgress color="#32cd32" size="medium" text="" textColor="" /></p>}

        <div className='favorites'>
            {load ? '' : favoritesLists.length > 0 ? favoritesLists.map((favorite, index) => {
                return <div key={index} className='favorite'>
                            <div className='favorite-img'>
                                <img src={`${imageBaseURL}/${favorite?.recipe?.imagePath}`} alt="" />
                            </div>
                            <div className='favorite-details'>
                                <div className='favorite-text'>
                                    <h4>{favorite?.recipe?.name}</h4>
                                    <p>{favorite?.recipe?.description}</p>
                                </div>
                                <i className="fa-solid fa-heart text-danger" onClick={() => deleteFavorite(favorite?.id)}></i>
                            </div>
                        </div>
            }) : <NoData/>}
            
        </div>
    </div>
  )
}
