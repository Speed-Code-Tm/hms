import React, { useState } from "react";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const HospitalRegistrationForm = () => {
  const [hospitalName, setHospitalName] = useState("");
  const [address, setAddress] = useState("");
  const [hospitalPhoneNumber, setHospitalPhoneNumber] = useState("");
  const [customerCareNumber, setCustomerCareNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [hospitalLogo, setHospitalLogo] = useState(null);
  const [hospitalType, setHospitalType] = useState("");
  const [establishedYear, setEstablishedYear] = useState("");
  const [hasBranches, setHasBranches] = useState(false);
  const [branches, setBranches] = useState([]);
  const [currentBranch, setCurrentBranch] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const handleNext = () => setActiveTab((prev) => prev + 1);
  const handleBack = () => setActiveTab((prev) => prev - 1);

  const handleAddBranch = () => {
    setBranches([...branches, { name: "", type: "", location: "" }]);
  };

  const handleBranchChange = (index, field, value) => {
    const newBranches = branches.slice();
    newBranches[index][field] = value;
    setBranches(newBranches);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const tabs = [
    {
      title: "Basic Info",
      content: (
        <div>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="hospitalName">
                <Form.Label>Hospital Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter hospital name"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  required
                  size="lg"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter hospital address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  size="lg"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="hospitalPhoneNumber">
                <Form.Label>Hospital Phone Number</Form.Label>
                <PhoneInput2
                  country={"ke"}
                  value={hospitalPhoneNumber}
                  onChange={setHospitalPhoneNumber}
                  inputClass="form-control-lg"
                  containerClass="form-control-lg"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="customerCareNumber">
                <Form.Label>Customer Care Number</Form.Label>
                <PhoneInput2
                  country={"ke"}
                  value={customerCareNumber}
                  onChange={setCustomerCareNumber}
                  inputClass="form-control-lg"
                  containerClass="form-control-lg"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="emailAddress">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email address"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  required
                  size="lg"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="websiteURL">
                <Form.Label>Website URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter website URL"
                  value={websiteURL}
                  onChange={(e) => setWebsiteURL(e.target.value)}
                  size="lg"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="hospitalType">
                <Form.Label>Type of Hospital</Form.Label>
                <Form.Control
                  as="select"
                  value={hospitalType}
                  onChange={(e) => setHospitalType(e.target.value)}
                  required
                  size="lg"
                >
                  <option value="">Select type</option>
                  <option value="General">General</option>
                  <option value="Specialty">Specialty</option>
                  <option value="Clinic">Clinic</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="establishedYear">
                <Form.Label>Established Year</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter year established"
                  value={establishedYear}
                  onChange={(e) => setEstablishedYear(e.target.value)}
                  required
                  size="lg"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="hospitalLogo">
                <Form.Label>Hospital Logo</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => setHospitalLogo(e.target.files[0])}
                  size="lg"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="hasBranches">
                <Form.Label>Does the hospital have branches?</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Yes"
                  checked={hasBranches}
                  onChange={(e) => setHasBranches(e.target.checked)}
                />
              </Form.Group>
            </Col>
            {hasBranches && (
              <Col md={12}>
                {branches.map((branch, index) => (
                  <div key={index} className="mb-3 p-3 border rounded">
                    <h5>Branch {index + 1}</h5>
                    <Row className="mb-2">
                      <Col md={4}>
                        <Form.Group controlId={`branchName${index}`}>
                          <Form.Label>Branch Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter branch name"
                            value={branch.name}
                            onChange={(e) =>
                              handleBranchChange(index, "name", e.target.value)
                            }
                            size="lg"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId={`branchType${index}`}>
                          <Form.Label>Type of Branch</Form.Label>
                          <Form.Control
                            as="select"
                            value={branch.type}
                            onChange={(e) =>
                              handleBranchChange(index, "type", e.target.value)
                            }
                            size="lg"
                          >
                            <option value="">Select type</option>
                            <option value="General">General</option>
                            <option value="Specialty">Specialty</option>
                            <option value="Clinic">Clinic</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId={`branchLocation${index}`}>
                          <Form.Label>Branch Location</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter branch location"
                            value={branch.location}
                            onChange={(e) =>
                              handleBranchChange(
                                index,
                                "location",
                                e.target.value
                              )
                            }
                            size="lg"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                ))}
                <Button variant="info" onClick={handleAddBranch} size="lg">
                  Add Branch
                </Button>
                <Form.Group controlId="currentBranch">
                  <Form.Label className="mt-3">
                    Is the current hospital one of the branches?
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={currentBranch}
                    onChange={(e) => setCurrentBranch(e.target.value)}
                    size="lg"
                  >
                    <option value="">Select branch</option>
                    {branches.map((branch, index) => (
                      <option key={index} value={branch.name}>
                        Branch {index + 1}: {branch.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            )}
          </Row>
        </div>
      ),
    },
    {
      title: "Services",
      content: (
        <div>
          <h4>Services Information</h4>
          {/* Add services-related form fields here */}
        </div>
      ),
    },
    {
      title: "Patient Info",
      content: (
        <div>
          <h4>Patient Information</h4>

          {/* Add patient-facing information form fields here */}
        </div>
      ),
    },
    {
      title: "IT Admin",
      content: (
        <div>
          <h4>IT Admin Information</h4>
          {/* Add IT administration form fields here */}
        </div>
      ),
    },
  ];

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f0f5f9" }}
    >
      <Card
        className="p-4 shadow-lg"
        style={{ maxWidth: "1200px", width: "100%", borderRadius: "15px" }}
      >
        <Card.Header className="bg-info text-white text-center rounded-top">
          <h2 className="mb-0">Hospital Registration</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {tabs[activeTab].content}
            <div className="d-flex justify-content-between mt-4">
              {activeTab !== 0 && (
                <Button variant="secondary" onClick={handleBack} size="lg">
                  Back
                </Button>
              )}
              {activeTab < tabs.length - 1 ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleNext}
                  size="lg"
                >
                  Next
                </Button>
              ) : (
                <Button type="submit" variant="success" size="lg">
                  Submit
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HospitalRegistrationForm;
