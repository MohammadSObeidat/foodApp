import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import deleteImage from '../../../../assets/images/modal-delete.png'

export default function DeleteConfirmation({show, handleClose, deleteItem, deleteFun}) {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className='text-center'>
            <img className='w-50' src={deleteImage} alt="" />
            <h5 className='my-3'>Delete This {deleteItem} ?</h5>
            <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={deleteFun}>
              Delete this item
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}
