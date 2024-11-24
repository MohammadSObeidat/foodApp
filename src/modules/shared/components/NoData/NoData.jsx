import './NoData.css'
import noData from '../../../../assets/images/nodata.png'

export default function NoData() {
  return (
    <div className='my-4'>
      <img src={noData} alt="" />
      <h3 className='py-3'>No Data !</h3>
      <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
    </div>
  )
}
