const User = require("./models/user_model");
const Order = require("./models/order_model");
const { generateAccessToken } = require("./helpers");
const md5 = require("md5");

/**
 *
 * @module user_action
 *
 */

/**
 * Callback for loginUser.
 *
 * @callback loginUserCallback
 * @param {Error} err - Error if something is not good
 * @param {Object} data - User's data plus token
 * @param {Object} data._id - User's id
 * @param {Object} data.email - User's email
 * @param {Object} data.token - User's token
 */

/**
 * Callback for createUser.
 *
 * @callback createUserCallback
 * @param {Error} err - Error if something is not good
 * @param {Object} data - User's data plus token
 * @param {Object} data._id - User's data plus token
 */

/**
 * Callback for createOrder.
 *
 * @callback createOrderCallback
 * @param {Error} err - Error if something is not good
 * @param {Object} data - Order's data plus token
 */

/**
 * This function will check user by his password and email
 * and if this user is exist return token and data of him.
 *
 * @param {String} password - User's password
 * @param {String} email - User's email
 * @param {loginUserCallback} callback - The callback witch will process with return data.
 * @return undefined
 */
function loginUser({ password, email }, callback) {
    if (!password || !email) {
        return callback(Error(`password: ${password}, email: ${email}`));
    }
    password = md5(password);
    User.findOne({ password, email })
        .then((user) => {
            if (user != null) {
                let JWToken = generateAccessToken(user);
                callback(null, {
                    _id: user._id,
                    email: user.email,
                    token: JWToken,
                });
            } else {
                callback(Error("User doesn't exist"));
            }
        })
        .catch((err) => {
            callback(err);
        });
}

/**
 *
 * This function adds new user to db.
 *
 * @param {String} password - User's password
 * @param {String} email - User's email
 * @param {createUserCallback} callback - The callback which will process with return data.
 */
function createUser({ password, email }, callback = () => {}) {
    /*
        data = {
            password,
            email,
        }
    */
    if (!password || !email) {
        return callback(Error(`password: ${password}, email: ${email}`));
    }

    password = md5(password);
    //console.log("Create user", { password, email });
    var user = new User({ password, email });

    user.save()
        .then((data) => {
            callback(null, { _id: user._id });
            //socket.emit("user.create.success");
        })
        .catch((err) => {
            callback(err);
            //
        });
}

/**
 *
 * This function creates new order and connect this order with user who created it.
 *
 * @param {String} creator_id - User's id
 * @param {Array} location_from - 2D point (longitude, latitude)
 * @param {Array} location_to -  2D point (longitude, latitude)
 * @param {Number} weight - Weight of cargo
 * @param {String} typeOfCargo - Type of cargo
 * @param {Function} callback - The callback witch will process with return data.
 */
function createOrder(
    { creator_id, location_from, location_to, weight, typeOfCargo },
    callback
) {
    data = { creator: creator_id, location_from, location_to };

    data.status = "Created";
    data.driver = null;
    data.location_from = { type: "Point", coordinates: data.location_from };
    data.location_to = { type: "Point", coordinates: data.location_to };
    data.weight = weight;
    data.typeOfCargo = typeOfCargo;

    Order.create(data)
        .then((docOrder) => {
            //console.log("Create order: ", docOrder);

            User.findByIdAndUpdate(
                docOrder.creator,
                {
                    $push: {
                        orders: docOrder._id,
                    },
                },
                { new: true, useFindAndModify: false }
            ).then(() => callback(null, docOrder));
        })
        .catch((err) => {
            callback(err);
        });
}

/**
 *
 * This function moves driver from candidates to serDriver with removing from candidates,
 * and change status of order to "Set Driver"
 *
 * @param {String} creator_id - User's id
 * @param {String} driver_id - Driver's id what you want set
 * @param {String} order_id -  Order's id
 * @param {Function} callback - The callback witch will process with return data.
 */
function setDriver({ creator_id, driver_id, order_id }, callback) {
    if (!creator_id || !driver_id || !order_id) {
        return callback(
            Error(
                `creator_id: ${creator_id}, driver_id: ${driver_id}, order_id: ${order_id}`
            )
        );
    }

    Order.findById(order_id, (err, order) => {
        if (err) {
            callback(err);
            /*socket.emit("user.setDriver.error", {
                message: "Order is not found",
            });*/
            return;
        }
        if (order.creator != creator_id) {
            callback(Error("You don't have rights for this action"));
            /*socket.emit("user.setDriver.error", {
                message: "You have not rights on this action",
            });*/
            return;
        }
        if (order.status != "Created") {
            callback(Error("The order has no allowed status for this action"));
            /*socket.emit("user.setDriver.error", {
                message: "The order has no allowed status for this action",
            });*/
            return;
        }
        Order.update(
            order,
            {
                $set: { setDriver: driver_id, status: "Set Driver" },
                $pull: { candidates: driver_id },
            },
            { upsert: true },
            (err) => {
                if (err) {
                    callback(err);
                    //console.log("Err: ", err);
                    //socket.emit("user.setDriver.error", { message: err });
                } else {
                    order.driver = driver_id;
                    order.status = "Set Driver";
                    order.candidates = order.candidates.filter(
                        (el) => el != driver_id
                    );
                    callback(null, order);
                    //socket.emit("user.setDriver.success", order);
                }
            }
        );
    });
}

/**
 *
 * This function sets status of order to "Cancel".
 * It's mean that this order can't be change late.
 *
 * @param {String} creator_id - User's id
 * @param {String} order_id -  Order's id
 * @param {Function} callback - The callback witch will process with return data.
 */
function cancelOrder({ creator_id, order_id }, callback) {
    if (!creator_id || !order_id) {
        return callback(
            Error(`creator_id: ${creator_id}, order_id: ${order_id}`)
        );
    }

    Order.findById(order_id, (err, order) => {
        if (err) {
            callback(err);
            return;
        }
        if (order.creator != creator_id) {
            callback(Error("You don't have rights for this action"));
            return;
        }
        if (order.status == "Fixed") {
            callback(Error("Order is fixed"));
            return;
        }
        Order.update(
            order,
            { $set: { status: "Cancel" } },
            { upsert: true },
            (err) => {
                if (err) {
                    callback(err);
                } else {
                    order.status = "Cancel";
                    callback(null, order);
                }
            }
        );
    });
}

/**
 *
 * This function finds user data and return it with callback.
 *
 * @param {String} user_id - User's id
 * @param {Function} callback - The callback witch will process with return data.
 */
function getUser({ user_id }, callback) {
    User.findById(user_id, (err, user) => {
        if (err) {
            callback(err);
            return;
        }
        if (user == null) {
            callback(Error("User doesn't exist"));
            return;
        }
        callback(null, user);
    });
}

module.exports = {
    loginUser,
    createUser,
    createOrder,
    cancelOrder,
    setDriver,
    getUser,
};
