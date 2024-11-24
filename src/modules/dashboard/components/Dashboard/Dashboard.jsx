import './Dashboard.css'
import Header from "../../../shared/components/Header/Header";
import headerImage from '../../../../assets/images/header-img.png'
import arrowIcon from '../../../../assets/images/arrow-icon.png'
import DashboardContent from '../../../shared/components/DashboardContent/DashboardContent';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';

export default function Dashboard() {
  const {loginData} = useContext(AuthContext)
  return (
    <div>
      <Header 
        loginData={loginData}
        title={'Welcome'} 
        description={'This is a welcoming screen for the entry of the application , you can now see the options'}
        image={headerImage}/>

        <DashboardContent arrowIcon={arrowIcon} Recipes={'Fill Recipes'} word={'Fill'}/>
    </div>
  )
}
