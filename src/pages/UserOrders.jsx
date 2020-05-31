import React, { useRef, useState } from "react";
import "../App.css";

import { Button, FormGroup, Label, Input } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FormCheck from "react-bootstrap/FormCheck";
import Card from "react-bootstrap/Card";
import { Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";

class Order {
  constructor(
    title,
    locationFrom,
    locationTo,
    date,
    price,
    weight,
    width,
    height,
    length
  ) {
    this.title = title;
    this.locationFrom = locationFrom;
    this.locationTo = locationTo;
    this.date = date;
    this.price = price;
    this.weight = weight;
    this.width = width;
    this.height = height;
    this.length = length;
  }
}

function OrderCreateModal(props) {
  const [cargoType, setCargoType] = useState("");
  const [locationFrom, setLocationFrom] = useState("");
  const [locationTo, setLocationTo] = useState("");
  const [cargoWeight, setCargoWeight] = useState("");
  const [cargoLength, setCargoLength] = useState("");
  const [cargoWidth, setCargoWidth] = useState("");
  const [cargoHeight, setCargoHeight] = useState("");

  const handleCreateOrder = () => {
    console.log(cargoWidth);
    props.onHide();
  };

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
        <FormGroup>
          <Label>Cargo type:</Label>
          <Input
            onChange={(e) => setCargoType(e.target.value)}
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
                onChange={(e) => setLocationFrom(e.target.value)}
                type="location-from"
                placeholder="London"
              />
            </Col>
            <Col xs={6} md={6}>
              <Label>Where to:</Label>
              <Input
                onChange={(e) => setLocationTo(e.target.value)}
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
                  onChange={(e) => setCargoWeight(e.target.value)}
                  type="cargo-weight"
                />
                <span>kg</span>
              </div>
            </Col>
            <Col xs={2} md={2}>
              <Label>Length:</Label>
              <Input
                onChange={(e) => setCargoLength(e.target.value)}
                type="cargo-length"
              />
            </Col>
            <Col xs={2} md={2}>
              <Label>Width:</Label>
              <Input
                onChange={(e) => setCargoWidth(e.target.value)}
                type="cargo-width"
              />
            </Col>
            <Col xs={2} md={2}>
              <Label>Height:</Label>
              <Input
                onChange={(e) => setCargoHeight(e.target.value)}
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
        <Button onClick={handleCreateOrder} className="btn-success">
          Create order
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function OrderEntry(props) {
  const [modalShowOrderInfo, setModalShowOrderInfo] = React.useState(false);

  return (
    <div>
      {/*           {props.order.title
	   + '    ' + props.order.locationFrom
	   + ' -> ' + props.order.locationTo
	   + '    ' + props.order.price + '$'} */}
      <div class="card mb-3 bg-light" style={{ width: "18rem;" }}>
        <div class="card-body">
          <h5 class="card-title">{props.order.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">
            {props.order.price + "$"}
          </h6>
          <Container fluid="md" className="mt-3 mb-3">
            <Row>
              <Col xs={4} md={4}>
                <p class="card-text">From: {props.order.locationFrom}</p>
              </Col>
              <Col xs={4} md={4}>
                <i class="fa fa-arrow-right"></i>
              </Col>
              <Col xs={4} md={4}>
                <p class="card-text">To: {props.order.locationTo}</p>
              </Col>
            </Row>
          </Container>
          <Container fluid="md" className="mt-3 mb-3"></Container>

          <Link class="card-link" onClick={() => setModalShowOrderInfo(true)}>
            More info
          </Link>
          <OrderInfoModal
            show={modalShowOrderInfo}
            onHide={() => setModalShowOrderInfo(false)}
          />
        </div>
        <div class="card-footer">
          <Row class="ml-auto">
            <Col md={{ span: 4, offset: 4 }}>
              <small class="text-muted">{props.order.date}</small>
            </Col>
            <Col md={{ span: 3, offset: 1 }}>
              {<Button className="btn btn-success">Take order</Button>}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

function OrderInfoModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Order info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Label>Cargo type: </Label>
        <Row className="show-grid">
          <Col xs={6} md={6}>
            <Label>Where from:</Label>
          </Col>
          <Col xs={6} md={6}>
            <Label>Where to:</Label>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={6} md={6}>
            <Label>Weight:</Label>
          </Col>
          <Col xs={2} md={2}>
            <Label>Length:</Label>
          </Col>
          <Col xs={2} md={2}>
            <Label>Width:</Label>
          </Col>
          <Col xs={2} md={2}>
            <Label>Height:</Label>
          </Col>
        </Row>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Additional comment:</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <Button className="btn-success">Take order</Button>
      </Modal.Footer>
    </Modal>
  );
}

function UserOrders() {
  const [modalShowOrderCreate, setModalShowOrderCreate] = React.useState(false);

  let orders = [];
  for (let i = 0; i < 10; i++) {
    orders.push(
      new Order(
        "CargoType" + i,
        "location" + i,
        "location" + (i + 1),
        "date" + i,
        i + 100
      )
    );
  }
  console.log(orders[1]);

  return (
    <div id="userorders">
      <div class="d-flex justify-content-center mt-5">
        <Card style={{ width: "50rem" }}>
          <Card.Body>
            <Tabs fill defaultActiveKey="all">
              <Tab eventKey="all" title="All orders">
                <Card.Body class="mt-4">
                  <Card.Title>
                    <OrderEntry order={orders[1]}></OrderEntry>
                    <OrderEntry order={orders[2]}></OrderEntry>
                    <OrderEntry order={orders[3]}></OrderEntry>
                    <OrderEntry order={orders[4]}></OrderEntry>
                    <OrderEntry order={orders[5]}></OrderEntry>
                  </Card.Title>
                </Card.Body>
              </Tab>
              <Tab eventKey="my" title="My orders"></Tab>
            </Tabs>

            {/* <Nav fill variant="tabs" defaultActiveKey="#all">
              <Nav.Item>
                <Nav.Link href="#all">All orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#my">My orders</Nav.Link>
              </Nav.Item>
            </Nav> */}
          </Card.Body>

          <Card.Footer className="text-muted">
            <Button
              className="btn btn-success"
              onClick={() => setModalShowOrderCreate(true)}
            >
              Create order
            </Button>

            <OrderCreateModal
              show={modalShowOrderCreate}
              onHide={() => setModalShowOrderCreate(false)}
            />
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export default UserOrders;
