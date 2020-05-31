const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

/**
 * @module order_model
 */

/**
 *
 * @class orderSchema
 * @param {mongoose.Schema.Types.ObjectId} creator
 * @param {mongoose.Schema.Types.ObjectId} driver
 * @param {Point} location_from
 * @param {Point} location_to
 * @param {Array(mongoose.Schema.Types.ObjectId)} candidates
 * @param {mongoose.Schema.Types.ObjectId} setDriver
 * @param {String} status
 * @param {String} typeOfCargo
 * @param {Number} weight
 *
 */
const orderSchema = mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    title: String,
    location_from: String,
    location_to: String,
    candidates: [],
    setDriver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    date: { type: Date, default: new Date() },
    status: String,
    typeOfCargo: String,
    weight: Number,
});

module.exports = mongoose.model("Order", orderSchema, "order");
