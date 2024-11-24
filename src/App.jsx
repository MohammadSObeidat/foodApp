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
import { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import ProtectedRotue from './modules/shared/components/ProtectedRotue/ProtectedRotue'
import CreateRecipe from './modules/recipes/components/CreateRecipe/CreateRecipe'
import EditRecipe from './modules/recipes/components/EditRecipe/EditRecipe'
import Verification from './modules/authentication/components/Verification/Verification'


function App() {
  const [loginData, setLoginData] = useState(null)
  const saveLoginData = () => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    setLoginData(decoded);
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      saveLoginData()
    }
  }, [])

  const router = createBrowserRouter([
    {
      path: '',
      element: <AuthLayout/>,
      errorElement: <NotFound/>,
      children: [
        {index: true, element: <Login saveLoginData={saveLoginData}/>},
        {path: 'login', element: <Login saveLoginData={saveLoginData}/>},
        {path: 'register', element: <Registeration/>},
        {path: 'verification', element: <Verification/>},
        {path: 'forget-pass', element: <ForgetPass/>},
        {path: 'reset-pass', element: <ResetPass/>}
      ]
    },
    {
      path: 'dashboard',
      element:  <ProtectedRotue loginData={loginData}>
                  <MasterLayout loginData={loginData}/>
                </ProtectedRotue>,
      errorElement: <NotFound/>,
      children: [
        {index: true, element: <Dashboard loginData={loginData}/>},
        {path: 'recipes', element: <RecipesList/>},
        {path: 'recipes/create-recipe', element: <CreateRecipe/>},
        {path: 'recipes/:recipeId', element: <EditRecipe/>},
        {path: 'recipe-data', element: <RecipeData/>},
        {path: 'categories', element: <CategoriesList/>},
        {path: 'category-data', element: <CategoryData/>},
        {path: 'user', element: <UserList/>}
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
