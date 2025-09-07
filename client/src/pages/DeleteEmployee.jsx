import { useDispatch } from "react-redux";
import { deleteEmployee } from "../features/employeeSlice";
import toast from "react-hot-toast";
import { Button, Modal } from "react-bootstrap";
import { Trash2Icon } from "lucide-react";

export default function DeleteEmployee({ showDel, handleClose, emp }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (!emp?._id) {
      toast.error("Invalid employee selected");
      return;
    }

    dispatch(deleteEmployee(emp._id))
      .unwrap()
      .then(() => {
        handleClose(); // close modal after success
      })
  };

  return (
    <Modal size="sm" show={showDel} onHide={handleClose} centered>
      <Modal.Body className="fs-4 text-center">
        <div className="my-3 text-primary">
          <Trash2Icon size={70} />
        </div>
        <p>
          Are you sure you want to delete{" "}
          <span className="text-primary fw-bold text-capitalize">
            {emp?.name}
          </span>
          's details?
        </p>
      </Modal.Body>
      <Modal.Footer className="row m-0 p-0 gap-1">
        <Button
          className="col fw-bold fs-5 m-0 p-2 rounded-top-0 rounded-end-0"
          variant="danger"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          className="col fw-bold fs-5 m-0 p-2 rounded-top-0 rounded-start-0"
          variant="primary"
          onClick={handleDelete}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
