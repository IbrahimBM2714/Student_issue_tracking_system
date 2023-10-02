import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DisplayIssue = () => {
  const [Issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showIssue, setShowIssue] = useState(false);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    const { data, error } = await supabase.from("std_issues").select();
    setIssues(data);
    console.log(Issues);
    if (error) {
      console.log("there was error in fetching the data:", error.message);
    }
  };
  const navigate = useNavigate();

  const handleCardClick = (issue) => {
    navigate(`/display-issues/${issue.id}`);
  };

  const handleCardHover = (issue) => {
    setSelectedIssue(issue);
    setShowIssue(true);
    console.log("card enter: ", issue.name);
  };

  const handleCardLeave = () => {
    setSelectedIssue(null);
    setShowIssue(false);
    console.log("card leave");
  };

  return (
    <div>
      <h2>All Issues Displayed</h2>
      <Row>
        <Col>
          <Card style={{ height: "170px" }}>
            {showIssue ? (
              <Card.Body>
                <Card.Title>{selectedIssue.name}</Card.Title>
                <Card.Text>Priority: {selectedIssue.priority}</Card.Text>
                <Card.Text
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Description: {selectedIssue.description}
                </Card.Text>
                <Card.Text>(click to card to see more information)</Card.Text>
              </Card.Body>
            ) : (
              <p style={{ margin: "auto" }}>(Hover over a card)</p>
            )}
          </Card>
        </Col>
      </Row>
      <Row className="">
        {Issues.map((issue) => (
          <Col key={issue.id} xs={12} md={6} lg={4} xl={3}>
            <Card
              className="display-issue-card"
              onClick={() => handleCardClick(issue)}
              style={{
                boxShadow: "8px 8px 0px rgba(0, 0, 0, 0.2)",
                margin: "10px",
              }}
              onMouseEnter={() => handleCardHover(issue)}
              onMouseLeave={handleCardLeave}
            >
              <Card.Body>
                <Card.Title>{issue.name}</Card.Title>
                <Card.Text style={{ margin: "0px" }}>
                  Priority: {issue.priority}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DisplayIssue;
