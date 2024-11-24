import './Dashboard.css'
import Header from "../../../shared/components/Header/Header";
import headerImage from '../../../../assets/images/header-img.png'
import arrowIcon from '../../../../assets/images/arrow-icon.png'
import DashboardContent from '../../../shared/components/DashboardContent/DashboardContent';

export default function Dashboard({loginData}) {

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
