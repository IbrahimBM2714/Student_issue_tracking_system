import React from "react";
import NavigationBar from "./NavigationBar";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function About() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: "89vh" }}
    >
      <Row>
        <Col>
          <Card className="text-center p-4">
            <h3>Ibrahim Bin Mansoor</h3>
            <p>[BUITEMS]</p>
            <p>Department of Computer Science</p>
            <p>6th Semester</p>
            <p>Web Development Project</p>
            <p>Submitted to Sir Mehmood Baryali</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
