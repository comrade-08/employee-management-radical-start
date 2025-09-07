import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, fetchEmployees } from "../features/employeeSlice";
import toast from "react-hot-toast";
import { Button, Modal, Spinner } from "react-bootstrap";
import { Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DeleteEmployee({
  showDel,
  handleClose,
  emp,
  handleDelete,
}) {
  const { isDeleting } = useSelector((state) => state.employees);
  return (
    <Modal size="sm" show={showDel} onHide={handleClose} centered>
      <Modal.Body className="fs-6 text-center fw-medium">
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
          type="button"
          className="col fw-medium fs-5 m-0 p-1 rounded-top-0 rounded-end-0"
          variant="danger"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          className="col fw-medium fs-5 m-0 p-1 rounded-top-0 rounded-start-0"
          variant="primary"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? <Spinner size="sm" /> : "Yes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
