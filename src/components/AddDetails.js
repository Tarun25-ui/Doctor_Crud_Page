import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";


const AddDetails = ({ onSendDetails, lastId, editDetail, onUpdateDetail }) => {
  const clearData = {
    fullName: "",
    specilization: "",
    city: ""
  };

  const [toggleForm, setToggleForm] = useState(false);
  const [formData, setFormData] = useState(clearData);

  useEffect(() => {
    if (editDetail) {
      setFormData(editDetail);
      setToggleForm(true);
    }
  }, [editDetail]);

  function formDataPublish() {
    if (!formData.fullName || !formData.specilization || !formData.city) {
      alert("All fields are required.");
      return;
    }

    const DetailsInfo = {
      id: editDetail ? editDetail.id : lastId + 1,
      fullName: formData.fullName,
      specilization: formData.specilization,
      city: formData.city,
    };

    if (editDetail) {
      onUpdateDetail(DetailsInfo);
    } else {
      onSendDetails(DetailsInfo);
    }

    setFormData(clearData);
    setToggleForm(false);
  }

  return (
    <>
      <Col md="8">
        <Card className="mb-3">
          <Card.Header>
            {editDetail ? "Edit Details" : "Add Details"}
            <Button
              size="sm"
              className="button-add small float-end"
              onClick={() => setToggleForm(!toggleForm)}
            >
              {toggleForm ? "Close" : "Add"}
            </Button>
          </Card.Header>
          {toggleForm && (
            <Card.Body>
              <Form>
                <Row className='mb-3'>
                  <Form.Group as={Col}>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Full Name"
                      id="fullName"
                      onChange={(event) => setFormData({ ...formData, fullName: event.target.value })}
                      value={formData.fullName}
                    />
                  </Form.Group>
                  </Row>
                  <Row className='mb-3'>
                  <Form.Group as={Col}>
                    <Form.Label>Specilization</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Specilization"
                      id="specilization"
                      onChange={(event) => setFormData({ ...formData, specilization: event.target.value })}
                      value={formData.specilization}
                    />
                  </Form.Group>
                  </Row>
                  <Row className='mb-3'>
                  <Form.Group as={Col}>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City"
                      id="city"
                      onChange={(event) => setFormData({ ...formData, city: event.target.value })}
                      value={formData.city}
                    />
                  </Form.Group>
                </Row>
                <Button variant="primary" onClick={formDataPublish}>
                  {editDetail ? "Update" : "Submit"}
                </Button>
              </Form>
            </Card.Body>
          )}
        </Card>
      </Col>
    </>
  );
};

export default AddDetails;
