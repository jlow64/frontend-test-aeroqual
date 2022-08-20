import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const Member = ({ details, showModal }) => {
  return (
    <tr key={details.id}>
      <td>{details.name}</td>
      <td>{details.age}</td>
      <td>
        <Button variant="warning" onClick={() => showModal(details)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default function Members() {
  const [memberList, setMemberList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [currentDetails, setCurrentDetails] = useState(null);

  // Modal Helper Functions
  const handleClose = () => {
    setCurrentDetails(null);
    setShowModal(false);
  };
  const handleShow = (details) => {
    setCurrentDetails(details);
    setShowModal(true);
  };
  const handleDelete = () => {
    setShowAlert(true);
    setShowModal(false);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/People`)
      .then((response) => {
        setMemberList(response?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="Members">
        {showAlert ? (
          <Alert
            variant="success"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            Member Successfully Deleted!
          </Alert>
        ) : null}
        {memberList.length > 0 ? (
          <Table hover>
            <thead>
              <tr>
                <th>Members</th>
                <th>Age</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {memberList.map((e) => {
                return <Member key={e.id} details={e} showModal={handleShow} />;
              })}
            </tbody>
          </Table>
        ) : null}
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you really want to delete {currentDetails?.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
