import React from "react";
import "../App.css";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FormCheck from "react-bootstrap/FormCheck";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
const socket = require("../globals/socket");

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
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    New order
                </Modal.Title>
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
                    <label for="exampleFormControlTextarea1">
                        Additional comment:
                    </label>
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
                                <p class="card-text">
                                    From: {props.order.locationFrom}
                                </p>
                            </Col>
                            <Col xs={4} md={4}>
                                <i class="fa fa-arrow-right"></i>
                            </Col>
                            <Col xs={4} md={4}>
                                <p class="card-text">
                                    To: {props.order.locationTo}
                                </p>
                            </Col>
                        </Row>
                    </Container>
                    <Container fluid="md" className="mt-3 mb-3"></Container>

                    <Link
                        class="card-link"
                        onClick={() => setModalShowOrderInfo(true)}
                    >
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
                            {
                                <Button className="btn btn-success">
                                    Take order
                                </Button>
                            }
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
                <Modal.Title id="contained-modal-title-vcenter">
                    Order info
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Label>Cargo type:}</Label>
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
                    <label for="exampleFormControlTextarea1">
                        Additional comment:
                    </label>
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

function ButtonModalShowOrderCreate() {
    const [modalShowOrderCreate, setModalShowOrderCreate] = React.useState(
        false
    );

    return (
        <>
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
        </>
    );
}

function ButtonModalShowOrderInfo() {
    const [modalShowOrderInfo, setModalShowOrderInfo] = React.useState(false);

    return (
        <>
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
        </>
    );
}

class UserOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
        };
    }

    callApi() {
        console.log("callAPI");
        socket.emit("driver.orderList");

        socket.on("driver.orderList", ({ err, data }) => {
            console.log("driver.orderList", data);

            this.setState({ orders: data });
        });

        socket.on("global.newOrder", ({ err, data }) => {
            console.log("newOrder");
            const order = data;
            if (err) {
                console.log("Err:", err);
                return;
            }
            console.log(order);
            let newOrders = [order, ...this.state.orders];
            console.log("newOrders: ", newOrders);
            this.setState({ orders: newOrders });
        });
    }

    componentWillMount() {
        this.callApi();
    }

    render() {
        let items = [];
        console.log(this.state);
        this.state.orders.forEach((order) => {
            items.push(<OrderEntry order={order}></OrderEntry>);
        });

        return (
            <div id="userorders">
                <div class="d-flex justify-content-center mt-5">
                    <Card style={{ width: "35rem" }}>
                        <Card.Header>
                            <Nav fill variant="tabs" defaultActiveKey="#first">
                                <Nav.Item>
                                    <Nav.Link href="#first">
                                        All orders
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#link">My orders</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{items}</Card.Title>
                            {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
                            <ButtonModalShowOrderInfo />
                            <Card.Title>Looking for drivers:</Card.Title>
                            <Card.Title>In process:</Card.Title>

                            {/* <Card.Title>Special title treatment</Card.Title>
      <Card.Text>
        With supporting text below as a natural lead-in to additional
        content.
      </Card.Text> */}
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <ButtonModalShowOrderCreate />
                        </Card.Footer>
                    </Card>
                </div>
            </div>
        );
    }
}

export default UserOrders;
