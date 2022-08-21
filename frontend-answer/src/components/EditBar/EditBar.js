import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function EditBar({ setMemberList }) {
  const [showAlert, setShowAlert] = useState(false);
  const [validated, setValidated] = useState(null);
  const [form, setForm] = useState({
    fname: "",
    fage: "",
  });

  const onChange = (e) => {
    form.fname.match(/e/i) && form.fage > 0 && form.fage < 120
      ? setValidated(true)
      : setValidated(false);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addMember = () => {
    const payload = {
      name: form.fname,
      age: form.fage,
    };
    axios
      .post(`${API_URL}/People`, payload)
      .then((res) => {
        setShowAlert(true);
        clearForm();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const clearForm = () => {
    // refresh list
    axios
      .get(`${API_URL}/People`)
      .then((response) => {
        setMemberList(response?.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setForm({ ...form, fname: "", fage: "" });
  };

  return (
    <div className="EditBar">
      <InputGroup hasValidation>
        <Form.Group as={Col}>
          <Form.Control
            name="fname"
            value={form?.fname}
            onChange={onChange}
            required
            isInvalid={!(form.fname.match(/e/i) || form.fname === "")}
            placeholder="Input member name here"
          />
          <Form.Control.Feedback type="invalid">
            Name needs to have an 'e'
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control
            type="number"
            name="fage"
            value={form?.fage}
            onChange={onChange}
            required
            isInvalid={
              !((form.fage > 0 && form.fage < 120) || form.fage === "")
            }
            placeholder="Input member age here"
          />
          <Form.Control.Feedback type="invalid">
            Age has to be greater than 0 and less than 120
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" onClick={addMember} disabled={!validated}>
          Add
        </Button>
      </InputGroup>
      {showAlert ? (
        <Alert
          className="mt-2"
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          Member Successfully Added!
        </Alert>
      ) : null}
    </div>
  );
}
