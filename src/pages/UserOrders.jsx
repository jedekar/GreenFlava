import React from "react";
import "../App.css";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormCheck from "react-bootstrap/FormCheck";
import Card from "react-bootstrap/Card";

class Order {
  constructor(title, locationFrom, locationTo, date, price) {
    this.title = title;
    this.locationFrom = locationFrom;
    this.locationTo = locationTo;
    this.date = date;
    this.price = price;
  }
}

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

function OrderEntry(props) {
  return (<div>
          {props.order.title
	   + '    ' + props.order.locationFrom
	   + ' -> ' + props.order.locationTo
	   + '    ' + props.order.price + '$'}
          </div> )
}

function UserOrders() {
  const [modalShow, setModalShow] = React.useState(false);
  let orders = [];
  for (let i = 0; i < 10; i++) {
    orders.push(new Order('name'+i, 'location'+i, 'location'+(i+1), i, i+100));
  }
  console.log(orders[1]);
  
  return (
    /* <div class="container">
      <div class="row">
        <div class="orders-box align-self-center">
          <h2 className="mt-5">Yours orders list:</h2>

          <Button variant="primary" onClick={() => setModalShow(true)}>
            Create order
          </Button>

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      </div>
    </div> */
    <div id="userorders">
      <div class="d-flex justify-content-center mt-5">
        <Card className="text-center" style={{ width: "35rem" }}>
          <Card.Header as="h5">Your orders</Card.Header>
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
            </Card.Body>
          {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
        </Card>
      </div>
    </div>
  );
}

export default UserOrders;
