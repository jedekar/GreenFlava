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
const socket = require("../globals/socket");

class Order {
    constructor(
        cargoType,
        locationFrom,
        locationTo,
        date,
        price,
        weight,
        width,
        height,
        length
    ) {
        this.cargoType = cargoType;
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
        const data = {
            locationFrom,
            locationTo,
            typeOfCargo: cargoType,
            weight: cargoWeight,
            token: localStorage.token,
            title: cargoType,
            length: cargoLength,
            width: cargoWidth,
            height: cargoHeight,
        };

        socket.emit("user.createOrder", data);

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
                <Modal.Title id="contained-modal-title-vcenter">
                    New order
                </Modal.Title>
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
                                onChange={(e) =>
                                    setLocationFrom(e.target.value)
                                }
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
                                    onChange={(e) =>
                                        setCargoWeight(e.target.value)
                                    }
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
                        onClick={() => {
                            socket.emit("oreder.get");
                            return setModalShowOrderInfo(true);
                        }}
                    >
                        More info
                    </Link>
                    <OrderInfoModal
                        order={props.order}
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
                <Label>Cargo type: {props.order.typeOfCargo}</Label>
                <Row className="show-grid">
                    <Col xs={6} md={6}>
                        <Label>Where from: {props.order.locationFrom}</Label>
                    </Col>
                    <Col xs={6} md={6}>
                        <Label>Where to: {props.order.locationTo}</Label>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={6} md={6}>
                        <Label>Weight: {props.order.weight}</Label>
                    </Col>
                    <Col xs={2} md={2}>
                        <Label>Length: {props.order.length}</Label>
                    </Col>
                    <Col xs={2} md={2}>
                        <Label>Width: {props.order.width}</Label>
                    </Col>
                    <Col xs={2} md={2}>
                        <Label>Height: {props.order.height}</Label>
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

class UserOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            my_orders: [],
        };
    }

    callApi() {
        console.log("callAPI");
        socket.emit("driver.orderList");

        if (localStorage.token) {
            socket.emit("user.myOrders", { token: localStorage.token });

            socket.on("user.myOrders", ({ err, data }) => {
                this.setState({ my_orders: data });
            });
        }

        socket.on("driver.orderList", ({ err, data }) => {
            console.log("driver.orderList", data);

            this.setState({ orders: data });
        });

        socket.on("global.newOrder", ({ err, data }) => {
            console.log("newOrder", data);
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

        socket.on("user.createOrder", ({ err, data }) => {
            if (err) {
                alert(err);
                return;
            }
            console.log(data);
            this.setState({ my_orders: [...this.state.my_orders, data] });
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
        items.push(
            <OrderEntry
                order={{ title: "titl", locationTo: "TOOO", price: 1000 }}
            ></OrderEntry>
        );

        let my_items = [];
        this.state.my_orders.forEach((order) => {
            my_items.push(<OrderEntry order={order}></OrderEntry>);
        });

        return (
            <div id="userorders">
                <div class="d-flex justify-content-center mt-5">
                    <Card style={{ width: "50rem" }}>
                        <Card.Body>
                            <Tabs fill defaultActiveKey="all">
                                <Tab eventKey="all" title="All orders">
                                    <Card.Body class="mt-4">
                                        <Card.Title>{items}</Card.Title>
                                    </Card.Body>
                                </Tab>
                                <Tab eventKey="my" title="My orders">
                                    <Card.Body class="mt-4">
                                        <Card.Title>{my_items}</Card.Title>
                                    </Card.Body>
                                </Tab>
                            </Tabs>
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
