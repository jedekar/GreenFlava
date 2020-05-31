const Order = require("./models/order_model");

/**
 *
 * @module driver_action
 *
 */

function acceptOrder({ driver_id, order_id }, callback) {
    if (!driver_id || !order_id) {
        return callback(
            Error(`driver_id: ${driver_id}, order_id: ${order_id}`)
        );
    }

    Order.findById(order_id, (err, order) => {
        if (err) {
            callback(err);
            return;
        }
        if (order == null) {
            callback(Error("Order is not found"));
            return;
        }
        if (order.status === "Fixed" || order.status === "Cancel") {
            callback(Error("Order is fixed or cancel"));
            return;
        }
        if (order.candidates.includes(driver_id)) {
            callback(Error("The driver is already candidate"));
            return;
        }
        order.candidates.push(driver_id);
        order
            .save()
            .then((order) => callback(null, order))
            .catch((err) => callback(err));
    });
}

function fixOrder({ driver_id, order_id }, callback) {
    if (!driver_id || !order_id) {
        return callback(
            Error(`driver_id: ${driver_id}, order_id: ${order_id}`)
        );
    }

    Order.findById(order_id, (err, order) => {
        if (err) {
            callback(Error("Order is not found"));
            return;
        }
        if (order.status === "Cancel") {
            callback(Error("Order is canceled"));
            return;
        }
        if (order.status === "Fixed") {
            callback(Error("Order is fixed"));
            return;
        }
        if (order.setDriver !== driver_id) {
            callback(Error("Driver is not set on this order"));
            return;
        }

        Order.updateOne(
            order,
            {
                $set: { driver: driver_id, status: "Fixed", setDriver: null },
            },
            { upsert: true },
            (err) => {
                if (err) {
                    callback(err);
                } else {
                    order.driver = driver_id;
                    order.status = "Fixed";
                    order.setDriver = null;
                    callback(null, order);
                }
            }
        );
    });
}

function cancelOrder({ driver_id, order_id }, callback) {
    if (!driver_id || !order_id) {
        return callback(
            Error(`driver_id: ${driver_id}, order_id: ${order_id}`)
        );
    }
    Order.findById(order_id, (err, order) => {
        if (err) {
            callback(Error("Order is not found"));
            return;
        }
        if (order.status === "Cancel") {
            callback(Error("Order is canceled"));
            return;
        }
        if (order.status === "Fixed") {
            callback(Error("Order is fixed"));
            return;
        }
        if (order.setDriver !== driver_id) {
            callback(Error("Driver is not set on this order"));
            return;
        }

        Order.updateOne(
            order,
            {
                $set: { status: "Created", setDriver: null },
            },
            { upsert: true },
            (err) => {
                if (err) {
                    callback(err);
                } else {
                    order.status = "Created";
                    order.setDriver = null;
                    callback(null, order);
                }
            }
        );
    });
}

module.exports = { acceptOrder, fixOrder, cancelOrder };
