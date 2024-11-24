import { Link } from "react-router-dom";

export default function DashboardContent({Recipes, arrowIcon, word}) {
  return (
    <div className='dashboard-content'>
        <div className='text'>
          <h1>{word} the <span>Recipes</span> !</h1>
          <p className='w-75'>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
        </div>
        <div>
          <Link to={'/dashboard/recipes'} className='btn btn-success px-5'>{Recipes} <img src={arrowIcon} alt="" /></Link>
        </div>
      </div>
  )
}
