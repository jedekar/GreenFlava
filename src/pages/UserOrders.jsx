import React from "react";
import "../App.css";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormCheck from "react-bootstrap/FormCheck";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">New order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Cargo type:</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p> */}
        <FormGroup>
          <Label>Cargo type:</Label>
          <Input
            //onChange={(e) => setUsername(e.target.value)}
            type="cargo-type"
            placeholder="Clothing, furniture, glass etc."
          />
        </FormGroup>
        <FormGroup controlId="formBasicCheckbox">
          <FormCheck type="checkbox" label="Fragile" />
        </FormGroup>
        <FormGroup>
          <Row className="show-grid">
            <Col xs={6} md={6}>
              <Label>Where from:</Label>
              <Input
                //onChange={(e) => setUsername(e.target.value)}
                type="location-from"
                placeholder="London"
              />
            </Col>
            <Col xs={6} md={6}>
              <Label>Where to:</Label>
              <Input
                //onChange={(e) => setUsername(e.target.value)}
                type="location-to"
                placeholder="Madrid"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row className="show-grid">
            <Col xs={6} md={6}>
              <Label>Weight:</Label>
              <div>
                <Input
                  //onChange={(e) => setUsername(e.target.value)}
                  type="cargo-weight"
                />
                <span>kg</span>
              </div>
            </Col>
            <Col xs={2} md={2}>
              <Label>Length:</Label>
              <Input
                //onChange={(e) => setUsername(e.target.value)}
                type="cargo-length"
              />
            </Col>
            <Col xs={2} md={2}>
              <Label>Width:</Label>
              <Input
                //onChange={(e) => setUsername(e.target.value)}
                type="cargo-width"
              />
            </Col>
            <Col xs={2} md={2}>
              <Label>Height:</Label>
              <Input
                //onChange={(e) => setUsername(e.target.value)}
                type="cargo-height"
              />
              <a>cm</a>
            </Col>
          </Row>
        </FormGroup>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Additional comment:</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <Button className="btn-success">Create order</Button>
      </Modal.Footer>
    </Modal>
  );
}

function UserOrders() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div id="userorders">
      <div class="d-flex justify-content-center mt-5">
        <Card style={{ width: "35rem" }}>
          <Card.Header>
            <Nav fill variant="tabs" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Link href="#first">All orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#link">My orders</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Card.Title>Looking for drivers:</Card.Title>
            <Card.Title>In process:</Card.Title>
            {/* <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text> */}
          </Card.Body>
          <Card.Footer className="text-muted">
            <Button
              className="btn btn-success"
              onClick={() => setModalShow(true)}
            >
              Create order
            </Button>

            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export default UserOrders;
