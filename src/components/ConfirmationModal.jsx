import { Button, Modal } from "react-bootstrap"

const ConfirmationModal = ( {show, handleClose, handleConfirm, message}) =>{


    return(
        <Modal  show={show} onHide={handleClose}>
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <button type="button"  className="btn btn-outline-secondary" onClick={handleClose}>
            Cancel
          </button>
          <Button variant="danger"  onClick={handleConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    )

}


export default ConfirmationModal