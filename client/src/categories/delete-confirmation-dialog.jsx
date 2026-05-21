import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteConfirmationDialog({
  showDeleteConfirmationDialog,
  setShowDeleteConfirmationDialog,
  handleDelete,
}) {
  return (
    <Modal show={true} onHide={() => setShowDeleteConfirmationDialog(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete ingredient</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Ingredient {showDeleteConfirmationDialog.name} will be deleted.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowDeleteConfirmationDialog(false)}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={async () => {
            await handleDelete(showDeleteConfirmationDialog.id);
            setShowDeleteConfirmationDialog(false);
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmationDialog;
