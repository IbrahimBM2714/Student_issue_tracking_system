import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../supabase";
import { Button, Form, Card, Alert, Container, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const IssueDetails = () => {
  const params = useParams();

  const [issue, setIssue] = useState([]);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState("");
  const [commentName, setCommentName] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [seeComment, setSeeComment] = useState(false);
  const [selectedComment, setSelectedComment] = useState([]);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    fetchIssue();
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const issueId = parseInt(params.issue, 10);
    const { data, error } = await supabase
      .from("issue_comments")
      .select()
      .eq("issue_id", issueId);
    setAllComments(data);

    if (error) {
      console.log(
        "there was error in fetching the comments data:",
        error.message
      );
    }
  };

  const fetchIssue = async () => {
    const { data, error } = await supabase
      .from("std_issues")
      .select()
      .eq("id", params.issue)
      .maybeSingle();

    if (error) {
      console.log("error:", error.message);
    }

    setIssue(data);
    setName(data.name);
    setPriority(data.priority);
    setDescription(data.description);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("std_issues")
      .update({
        name: name,
        priority: priority,
        description: description,
      })
      .eq("id", issue.id);

    if (error) {
      console.log("error updating issue:", error.message);
    } else {
      console.log("Issue updated successfully");
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from("std_issues")
      .delete()
      .eq("id", issue.id);

    if (error) {
      console.log("error deleting issue:", error.message);
    } else {
      console.log("Issue deleted successfully");
    }
    navigate(-1);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleAddComment = () => {
    setShowCommentBox(true);
  };

  const handleCommentNameChange = (e) => {
    setCommentName(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSaveComment = async () => {
    setAlert(false);
    if (!comment || !name) {
      console.log("empty");
      setAlert(true);
      return;
    }

    const issueId = parseInt(params.issue, 10);
    console.log(commentName);
    const { error } = await supabase.from("issue_comments").insert({
      comment: comment,
      issue_id: issueId,
      name: commentName,
    });

    if (error) {
      console.log("error inserting comment:", error.message);
    } else {
      console.log("comment saved successfully");
    }

    setComment("");
    setCommentName("");
    setShowCommentBox(false);
    fetchComments();
  };

  const handleDeleteComment = async () => {
    console.log("handleDelete");
    const { error } = await supabase
      .from("issue_comments")
      .delete()
      .eq("id", selectedComment.id);
    if (error) {
      console.log(error.message);
    }
    fetchComments();
  };

  const handleCardClicked = (comment) => {
    setSelectedComment(comment);
    setSeeComment(true);
  };

  const handleCloseComment = () => {
    setShowCommentBox(false);
  };

  useEffect(() => {
    console.log("mousedown");
    const handleOutsideClick = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setSelectedComment([]);
        setSeeComment(false);
      }
    };

    const handleDeleteComment = async () => {
      console.log("handleDelete");
      const { error } = await supabase
        .from("issue_comments")
        .delete()
        .eq("id", selectedComment.id);
      if (error) {
        console.log(error.message);
      }
      fetchComments();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center "
      style={{ padding: "10px" }}
    >
      <Col lg={8} md={10} sm={12}>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={handleNameChange}
              readOnly={!isEditing}
            />
          </Form.Group>
          <Form.Group controlId="priority">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              value={priority}
              onChange={handlePriorityChange}
              disabled={!isEditing}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={handleDescriptionChange}
              readOnly={!isEditing}
              style={{ height: "100px", resize: "none" }}
            />
          </Form.Group>
        </Form>
        {isEditing ? (
          <>
            <Button
              variant="primary"
              onClick={handleSave}
              style={{ margin: "10px 10px 10px 0px" }}
            >
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{ margin: "10px 10px 10px 0px" }}
            >
              Close
            </Button>
          </>
        ) : (
          <Button
            variant="success"
            onClick={handleEdit}
            style={{ margin: "10px 10px 10px 0px" }}
          >
            Edit
          </Button>
        )}
        <Button
          variant="danger"
          onClick={handleDelete}
          style={{ margin: "10px 10px 10px 0px" }}
        >
          Delete
        </Button>

        {showCommentBox ? (
          <div>
            <Form.Group controlId="name">
              <Form.Label>Enter your name</Form.Label>
              <Form.Control
                type="text"
                value={commentName}
                onChange={handleCommentNameChange}
              />
            </Form.Group>
            <Form.Group controlId="comment">
              <Form.Label>Add a comment</Form.Label>
              <Form.Control
                as="textarea"
                row={3}
                value={comment}
                onChange={handleCommentChange}
                style={{
                  height: "80px",
                  resize: "none",
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleSaveComment}
              style={{ margin: "10px 10px 10px 0" }}
            >
              Save Comment
            </Button>
            <Button variant="danger" onClick={handleCloseComment}>
              Close
            </Button>
            {alert && (
              <Alert variant="danger">Please Fill All the fields</Alert>
            )}
          </div>
        ) : (
          <Button
            variant="info"
            onClick={handleAddComment}
            style={{ margin: "10px 0px 10px 0px" }}
          >
            Add a Comment
          </Button>
        )}

        <h3>Comments:</h3>
        {allComments.map((comment) => (
          <Card
            key={comment.id}
            onClick={() => handleCardClicked(comment)}
            ref={cardRef}
            className="issue-details-card"
            style={{
              boxShadow: "8px 8px 0px rgba(0, 0, 0, 0.2)",
              margin: "10px 0px",
            }}
          >
            <Card.Body>
              <Card.Title>{comment.name}</Card.Title>
              <Card.Text>{comment.comment}</Card.Text>
              {selectedComment === comment && seeComment && (
                <>
                  <Button variant="danger" onClick={handleDeleteComment}>
                    Delete
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        ))}
      </Col>
    </Container>
  );
};

export default IssueDetails;
