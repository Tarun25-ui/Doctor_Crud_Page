import { Button, ListGroup } from "react-bootstrap";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const DetailsInfo = ({ Detail, onDeleteDetail, onEditDetail }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      onDeleteDetail(Detail.id);
    }
  };

  return (
    <>
      <ListGroup.Item>
        <p><strong>Full Name:</strong> {Detail.fullName}</p>
        <p><strong>Specilization:</strong> {Detail.specilization}</p>
        <p><strong>City:</strong> {Detail.city}</p>
        <Button size="sm" variant="primary" onClick={() => onEditDetail(Detail)}><CiEdit /> Edit</Button>
        <Button size="sm" variant="danger" className="float-end" onClick={handleDelete}><MdDeleteOutline /> Delete</Button>
      </ListGroup.Item>
    </>
  );
};

export default DetailsInfo;
