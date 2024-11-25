import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout'
import Login from './modules/authentication/components/Login/Login'
import Registeration from './modules/authentication/components/Registeration/Registeration'
import ForgetPass from './modules/authentication/components/ForgetPass/ForgetPass'
import ResetPass from './modules/authentication/components/ResetPass/ResetPass'
import NotFound from './modules/shared/components/NotFound/NotFound'
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout'
import Dashboard from './modules/dashboard/components/Dashboard/Dashboard'
import RecipesList from './modules/recipes/components/RecipesList/RecipesList'
import RecipeData from './modules/recipes/components/RecipeData/RecipeData'
import CategoriesList from './modules/categories/components/CategoriesList/CategoriesList'
import CategoryData from './modules/categories/components/CategoryData/CategoryData'
import UserList from './modules/users/components/UserList/UserList'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ProtectedRotue from './modules/shared/components/ProtectedRotue/ProtectedRotue'
import CreateRecipe from './modules/recipes/components/CreateRecipe/CreateRecipe'
import EditRecipe from './modules/recipes/components/EditRecipe/EditRecipe'
import Verification from './modules/authentication/components/Verification/Verification'
import Favorites from './modules/Favorites/Favorites'
import ProtectedRouteIsAdmin from './modules/shared/components/ProtectedRouteIsAdmin/ProtectedRouteIsAdmin'
import ProtectedRouteIsUser from './modules/shared/components/ProtectedRouteIsUser/ProtectedRouteIsUser'

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <AuthLayout/>,
      errorElement: <NotFound/>,
      children: [
        {index: true, element: <Login/>},
        {path: 'login', element: <Login/>},
        {path: 'register', element: <Registeration/>},
        {path: 'verification', element: <Verification/>},
        {path: 'forget-password', element: <ForgetPass/>},
        {path: 'reset-password', element: <ResetPass/>}
      ]
    },
    {
      path: 'dashboard',
      element:  <ProtectedRotue>
                  <MasterLayout/>
                </ProtectedRotue>,
      errorElement: <NotFound/>,
      children: [
        {index: true, element: <Dashboard/>},
        {path: 'recipes', element: <RecipesList/>},
        {path: 'recipes/create-recipe', element: <ProtectedRouteIsAdmin><CreateRecipe/></ProtectedRouteIsAdmin>},
        {path: 'recipes/:recipeId', element: <ProtectedRouteIsAdmin><EditRecipe/></ProtectedRouteIsAdmin>},
        {path: 'recipe-data', element: <RecipeData/>},
        {path: 'categories', element: <ProtectedRouteIsAdmin><CategoriesList/></ProtectedRouteIsAdmin>},
        {path: 'category-data', element: <CategoryData/>},
        {path: 'user', element: <ProtectedRouteIsAdmin><UserList/></ProtectedRouteIsAdmin>},
        {path: 'favorites', element: <ProtectedRouteIsUser><Favorites/></ProtectedRouteIsUser>}
      ]
    }
  ])

  return (
    <>
      <ToastContainer/>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
