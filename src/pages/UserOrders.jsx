import React from "react";
import "../App.css";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormCheck from "react-bootstrap/FormCheck";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

class Order {
  constructor(title, locationFrom, locationTo, date, price) {
    this.title = title;
    this.locationFrom = locationFrom;
    this.locationTo = locationTo;
    this.date = date;
    this.price = price;
  }
}

function OrderCreateModal(props) {
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

function OrderEntry(props) {
  return (<div>
          {props.order.title
	   + '    ' + props.order.locationFrom
	   + ' -> ' + props.order.locationTo
	   + '    ' + props.order.price + '$'}
          </div> )
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
        <Label>Cargo type:</Label>
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
  const [modalShowOrderInfo, setModalShowOrderInfo] = React.useState(false);
  
  let orders = [];
  for (let i = 0; i < 10; i++) {
    orders.push(new Order('name'+i, 'location'+i, 'location'+(i+1), i, i+100));
  }
  console.log(orders[1]);

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
	  <Card.Title>
	    <OrderEntry order={orders[1]}></OrderEntry>
            <OrderEntry order={orders[2]}></OrderEntry>
            <OrderEntry order={orders[3]}></OrderEntry>
            <OrderEntry order={orders[4]}></OrderEntry>
            <OrderEntry order={orders[5]}></OrderEntry>
            <OrderEntry order={orders[6]}></OrderEntry>
            <OrderEntry order={orders[7]}></OrderEntry>
            <OrderEntry order={orders[8]}></OrderEntry>
	  </Card.Title>
          {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
            <Button
              className="btn btn-success"
              onClick={() => setModalShowOrderInfo(true)}
            >
              Order info
            </Button>

            <OrderInfoModal
              show={modalShowOrderInfo}
              onHide={() => setModalShowOrderInfo(false)}
            />
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
