const driver_ection = require("../driver_ection");

const mongoose = require("mongoose");
let mongoDB = "mongodb://127.0.0.1/test_database";
mongoose.connect(mongoDB);

const User = require("../models/user_model");
const Order = require("../models/order_model");

describe("Driver ection test", () => {
    beforeAll(async () => {
        await User.remove({});
        await Order.remove({});
    });

    afterEach(async () => {
        await User.remove({});
        await Order.remove({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("has a module driver_ection", () => {
        expect(driver_ection).toBeDefined();
    });
});
