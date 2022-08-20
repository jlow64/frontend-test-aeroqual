import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

export default function EditBar() {
  const [validated, setValidated] = useState(null);
  const [form, setForm] = useState({
    fname: "",
  });

  const onChange = (e) => {
    e.target.value.match(/e/i) ? setValidated(true) : setValidated(false);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addMember = () => {
    console.log(`ADD MEMBER ${form.fname}`);
  };

  return (
    <div className="EditBar">
      <InputGroup hasValidation>
        <Form.Control
          name="fname"
          value={form?.fname}
          onChange={onChange}
          required
          isInvalid={form.fname !== "" ? !validated : validated}
          placeholder="Input member name here"
        />
        <Button variant="secondary" onClick={addMember} disabled={!validated}>
          Add
        </Button>
        <Form.Control.Feedback type="invalid">
          Name needs to have an 'e'
        </Form.Control.Feedback>
      </InputGroup>
    </div>
  );
}
