const express = require("express");
const http = require("http");
const mongoose = require("mongoose");

const User = require("./lib/models/user_model");
const Order = require("./lib/models/order_model");

const md5 = require("md5");
const { authenticateToken } = require("./lib/helpers");

//mongodb connection-------------------------------------------
/*
const MongoClient = require("mongodb").MongoClient;
const uri =
    "mongodb+srv://admin:1@cluster0-psx9m.mongodb.net/test?retryWrites=true&w=majority/IPZdatabase";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect().then(() => console.log("Successfully connect to MongoDB"));
*/
mongoose
    .connect(
        "mongodb+srv://admin:1@cluster0-psx9m.mongodb.net/test?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Successfully connect to MongoDB"))
    .catch((err) => console.error("Connection error", err));

//--------------------------------------------------------------

const app = express();

//------ROUTING------------------

app.get("/users", (req, res) => {
    console.log("HERE");
    res.send(global.userSessions);
});

app.get("/getAll", (req, res) => {
    console.log("get all");
    User.find({}, function (err, users) {
        res.send(users);
        console.log(users);
        console.log("get all end");
    }).catch((err) => {
        console.log("Err: ", err);
    });
});

app.get("/getMe", (req, res) => {
    let data = { email: "my_email@mail.com" };
    data.password = md5(1);
    User.findOne(data).then((user) => {
        res.send(user);
    });
});

app.get("/clear", (req, res) => {
    User.remove({}, () => {});
    Order.remove({}, () => {});
});

app.get("/getOrders", (req, res) => {
    Order.find({}, (err, orders) => res.send(orders));
});

app.get("/getOrder", (req, res) => {
    Order.findById("5eb946628df1cc0d68f7be60", (err, order) => res.send(order));
});
//-------------------------------

//-------Socket server-------------------
const socketIO = require("socket.io");

server = http.Server(app);
server.listen(5000);
console.log("Servet start on port 5000");

io = socketIO(server);

//const createUser = require("./lib/createUser");
//const loginUser = require("./lib/loginUser");
//const createOrder = require("./lib/createOrder");
//const setDriver = require("./lib/setDriver");
//const cancelOrder = require("./lib/cancelOrder");
//const acceptOrder = require("./lib/acceptOrder");
//const fixOrder = require("./lib/fixOrder");

const driver_ection = require("./lib/driver_ection");
const user_ection = require("./lib/user_ection");

let userSessions = {};

io.on("connection", (socket) => {
    console.log("Connection!!");
    socket.on("user.create", (data) => {
        /*
            data = {
                password,
                email
            }
        */
        user_ection.createUser(data, (err, data) => {
            socket.emit("user.create", { err: err.message, data: null });
        });
    });
    socket.on("user.login", (data) => {
        /*
            data = {
                password,
                email,
            }
        */

        user_ection.loginUser(data, (err, userData) => {
            // data = {token}
            if (err) {
                console.log("Err: " + err.message);
                socket.emit("user.login", { err: err.message, data: null });
            } else {
                userSessions[userData._id] = socket;
                socket.emit("user.login", { data: userData, err: null });
            }
        });
    });

    socket.on("user.me", (data) => {
        let user;
        try {
            user = authenticateToken(data.token);
            // потрібна додати параметри ордера
        } catch (err) {
            socket.emit("user.createOrder", {
                err: "Bad JWT. Autorize please.",
                data: null,
            });
            return;
        }
        socket.emit("user.me", { data: user, err: null });
    });

    socket.on("user.get", (data) => {
        let user;
        try {
            user = authenticateToken(data.token);
            // потрібна додати параметри ордера
        } catch (err) {
            socket.emit("user.createOrder", {
                err: "Bad JWT. Autorize please.",
                data: null,
            });
            return;
        }

        user_ection.getUser({ user_id: data.user }, (err, user) => {
            socket.emit("user.get", { err: err.message, data: user });
        });
    });

    socket.on("user.createOrder", (data) => {
        /*
            data =  {
                token,
                location_from,
                location_to,
            }
        */
        // check JWT
        let user;
        try {
            user = authenticateToken(data.token);
            // потрібна додати параметри ордера
        } catch (err) {
            socket.emit("user.createOrder.", {
                err: "Bad JWT. Autorize please.",
                data: null,
            });
            return;
        }

        user_ection.createOrder(
            {
                creator_id: user._id,
                location_from: data.location_from,
                location_to: data.location_to,
                typeOfCargo: data.typeOfCargo,
                weight: data.weight,
            },
            (err, order) => {
                if (err) {
                    socket.emit("user.createOrder", {
                        err: err.message,
                        data: null,
                    });
                } else {
                    //change it
                    io.emit("global.newOrder", { err: null, data: order });
                    socket.emit("user.createOrder", { err: null, data: order });
                }
            }
        );
    });
    socket.on("user.setDriver", (data) => {
        /*
            data = {
                token,
                driver (driver_id),
                order (order_id),
            }
        */

        // check JWT
        let user;
        try {
            user = authenticateToken(data.token);
        } catch (err) {
            socket.emit("user.setDriver", {
                err: "Bad JWT. Autorize please.",
                data: null,
            });
            return;
        }

        user_ection.setDriver(
            {
                creator_id: user._id,
                driver_id: data.driver,
                order_id: data.order,
            },
            (err, order) => {
                if (err) {
                    socket.emit("user.setDriver", {
                        err: err.message,
                        data: null,
                    });
                } else {
                    socket.emit("user.setDriver", { err: null, data: order });

                    let driver_id = order.driver;
                    let driverSocket = userSessions[driver_id];
                    if (driverSocket) {
                        driverSocket.emit("order.update", {
                            err: null,
                            data: order,
                        });
                    }
                }
            }
        );
    });
    socket.on("user.cancelOrder", (data) => {
        /*
            data = {
                token,
                order (order_id),
            }
        */
        let user;
        try {
            user = authenticateToken(data.token);
        } catch (err) {
            socket.emit("user.cancelOrder", {
                err: "Bad JWT. Autorize please.",
            });
            return;
        }

        user_ection.cancelOrder(
            {
                creator_id: user._id,
                order_id: data.order,
            },
            (err, order) => {
                if (err) {
                    socket.emit("user.cancelOrder", {
                        err: err.message,
                        data: null,
                    });
                } else {
                    socket.emit("user.cancelOrder", { err: null, data: order });

                    for (const driver_id of order.candidates) {
                        let driverSocket = userSessions[driver_id];
                        if (driverSocket) {
                            driverSocket.emit("order.update", {
                                err: null,
                                data: order,
                            });
                        }
                    }

                    if (order.setDriver) {
                        let driverSocket = userSessions[order.setDriver];
                        if (driverSocket) {
                            driverSocket.emit("order.update", {
                                err: null,
                                data: order,
                            });
                        }
                    }

                    if (order.driver) {
                        let driverSocket = userSessions[order.setDriver];
                        if (driverSocket) {
                            driverSocket.emit("order.update", {
                                err: null,
                                data: order,
                            });
                        }
                    }
                }
            }
        );
    });

    socket.on("driver.acceptOrder", (data) => {
        /*
            data = {
                token,
                order (order_id)
            }
        */
        console.log(data);
        let user;
        try {
            user = authenticateToken(data.token);
        } catch (err) {
            socket.emit("driver.acceptOrder", {
                err: "Bad JWT. Autorize please.",
                data: null,
            });
            return;
        }

        driver_ection.acceptOrder(
            {
                driver_id: user._id,
                order_id: data.order,
            },
            (err, order) => {
                if (err) {
                    socket.emit("message", "lol");
                    socket.emit("driver.acceptOrder", {
                        err: err.message,
                        data: null,
                    });
                } else {
                    socket.emit("driver.acceptOrder", {
                        err: null,
                        data: order,
                    });

                    let orderCreator_id = order.creator;
                    let orderCreatorSocket = userSessions[orderCreator_id];
                    if (orderCreatorSocket) {
                        orderCreatorSocket.emit("order.update", {
                            err: null,
                            data: order,
                        });
                    }

                    for (const driver of order.candidates) {
                        let driverSocket = userSessions[driverSocket];
                        if (driverSocket) {
                            driverSocket.emit("order.update", {
                                err: null,
                                data: order,
                            });
                        }
                    }
                }
            }
        );
    });
    socket.on("driver.fixOrder", (data) => {
        /*
            data = {
                token,
                order (order_id),
            }
        */
        let user;
        try {
            user = authenticateToken(data.token);
        } catch (err) {
            socket.emit("driver.fixOrder", {
                err: "Bad JWT. Autorize please.",
                data: null,
            });
            return;
        }

        driver_ection.fixOrder(
            {
                driver_id: user._id,
                order_id: data.order,
            },
            (err, order) => {
                if (err) {
                    socket.emit("driver.fixOrder", {
                        err: err.message,
                        data: null,
                    });
                } else {
                    socket.emit("driver.fixOrder", { err: null, data: order });

                    let orderCreator_id = order.creator;
                    let orderCreatorSocket = userSessions[orderCreator_id];
                    if (orderCreatorSocket) {
                        orderCreatorSocket.emit("order.update", {
                            err: null,
                            data: order,
                        });
                    }

                    for (const driver of order.candidates) {
                        let driverSocket = userSessions[driverSocket];
                        if (driverSocket) {
                            driverSocket.emit("order.update", {
                                err: null,
                                data: order,
                            });
                        }
                    }
                }
            }
        );
    });
    socket.on("driver.cancelOrder", (data) => {
        /*
            data = {
                driver (driver_id)
                order (order_id)
            }
        */
        let user;
        try {
            user = authenticateToken(data.token);
        } catch (err) {
            socket.emit("driver.cancelOrder.error", {
                message: "Bad JWT. Autorize please.",
            });
            return;
        }

        driver_ection.cancelOrder(
            socket,
            {
                driver_id: data.driver,
                order_id: data.order,
            },
            (err, order) => {
                if (err) {
                    socket.emit("driver.cancelOrder", {
                        err: err.message,
                        data: null,
                    });
                } else {
                    socket.emit("driver.cancelOrder", {
                        err: null,
                        data: order,
                    });

                    let orderCreator_id = order.creator;
                    let orderCreatorSocket = userSessions[orderCreator_id];
                    if (orderCreatorSocket) {
                        orderCreatorSocket.emit("order.update", {
                            err: null,
                            data: order,
                        });
                    }

                    for (const driver of order.candidates) {
                        let driverSocket = userSessions[driverSocket];
                        if (driverSocket) {
                            driverSocket.emit("order.update", {
                                err: null,
                                data: order,
                            });
                        }
                    }
                }
            }
        );
    });

    socket.on("driver.orderList", (data) => {
        /*
            data = {
                token,
            }
        */
        let user;
        try {
            user = authenticateToken(data.token);
        } catch (err) {
            socket.emit("driver.orderList", {
                err: "Bad JWT. Autorize please.",
            });
            return;
        }

        Order.find({}, (err, orders) => {
            socket.emit("driver.orderList", { err: err.message, data: orders });
        });
    });

    socket.on("order.get", (data) => {
        /*
            data = {
                token,!!!
                order (order_id)
            }
        */
        console.log(data);
        Order.findById(data.order).then((order) => {
            socket.emit("order.get", { err: null, data: order });
        });
    });
});
//---------------------------------------

//-----OAuth-----------------------------
/*
app.use(express.static("googleOAuthExample")); //<---------------------------
const { google } = require("googleapis");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } = require("./config");

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

const scopes = ["https://www.googleapis.com/auth/gmail.modify"];// change it

const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
});

console.log(url);

app.get("/oauth_test", (req, res) => {
    res.sendFile(__dirname + "/googleOAuthExample.html");
});

app.get("/url", (req, res) => {
    res.send(url);
});

app.get("/token", (req, res) => {});
*/
//---------------------------------------