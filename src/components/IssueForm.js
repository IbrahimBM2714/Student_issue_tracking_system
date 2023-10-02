import React, { useState } from "react";
import { supabase } from "../supabase";
import { Form, Button, Alert, Container, Col, Row } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

const IssueForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError(false);

    if (!name || !description || !priority) {
      setFormError(true);
      return;
    }

    const { error } = await supabase.from("std_issues").insert({
      name: name,
      description: description,
      priority: priority,
    });
    if (error) {
      console.error("Error creating user:", error.message);
    } else {
      console.log("successful");
    }

    setName("");
    setDescription("");
    setPriority("");

    navigate("/display-issues");
  };

  return (
    <div style={{ paddingTop: "20px" }}>
      <Container className="justify-content-center align-items-center">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8} className="form-style">
            <h3 style={{ textAlign: "center", paddingBottom: "20px" }}>
              Student Issue Form
            </h3>
            <Form onSubmit={handleSubmit}>
              {formError && (
                <Alert variant="danger">Please Fill All the fields</Alert>
              )}
              <Form.Group controlId="name">
                <Form.Label>
                  <h5>Name:</h5>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>
                  <h5>Issue Description:</h5>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  style={{ height: "150px", resize: "none" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="priority">
                <Form.Label>
                  <h5>Priority:</h5>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                style={{ marginTop: "10px" }}
              >
                Submit
              </Button>
            </Form>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default IssueForm;
