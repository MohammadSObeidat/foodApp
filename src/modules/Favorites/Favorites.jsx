import './Favorites.css'
import Header from '../shared/components/Header/Header'
import img from '../../assets/images/category-list.png'
// import { useEffect, useState } from 'react'
// import { axiosInstance, FAVORITE_RECIPES_URL } from '../../services/endpoint/Endpoint'
import NoData from '../shared/components/NoData/NoData'

export default function Favorites() {
    // const [favoritesLists, setFavoritesLists] = useState([])

    // const getFavorites = async () => {
    //     try {
    //         const res = await axiosInstance.get(FAVORITE_RECIPES_URL.GET_FAVORITE_RECIPES)
    //         console.log(res);
    //         setFavoritesLists(res?.data?.data)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     getFavorites()        
    // }, [])
  return (
    <div className='favorites-container'>
        <Header 
        title={'Favorite Items'} 
        description={'You can now add your items that any user can order it from the Application and you can edit'}
        image={img}/>

        <div className='favorites'>
            {/* {favoritesLists.length > 0 ? favoritesLists.map((favorite, index) => {
                return <div key={index} className='favorite'>
                            <div className='favorite-img'>
                                <img src={img} alt="" />
                            </div>
                            <div className='favorite-details'>
                                <div>
                                    <h4>{favorite?.recipe}</h4>
                                    <p>Lorem ipsum dolor, sit  
                                    Lorem ipsum dolor, sit  </p>
                                </div>
                                <i className="fa-solid fa-heart text-danger"></i>
                            </div>
                        </div>
            }) : <NoData/>} */}
            
        </div>
    </div>
  )
}
