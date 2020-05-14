const user_action = require("../user_action");
const { authenticateToken } = require("../helpers");

const mongoose = require("mongoose");
let mongoDB = "mongodb://127.0.0.1/test_database";
mongoose.connect(mongoDB);

const User = require("../models/user_model");
const Order = require("../models/order_model");

describe("User action test", () => {
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

    it("has a module user_action", () => {
        expect(user_action).toBeDefined();
    });

    /*
    describe("create user", () => {
        let data = { password: 1, email: "foo@bar.com" };
        user_action.createUser(data, (err, user) => {
            User.findOne({ email: "foo@bar.com" }).then((user) => {
                const expacted = "foo@bar.com";
                const actual = user.email;
                expect(actual).toEqual(expacted);
            });
        });
    });

    describe("login user", () => {
        let data = { password: 1, email: "foo@bar.com" };
        return;
        user_action.createUser(data, (err, user) => {
            User.findOne({ email: "foo@bar.com" }, console.log);
            user_action.loginUser(data, (err, userData) => {
                if (err) {
                    throw err;
                }
                const user = authenticateToken(userData.token);
                const expacted = "foo@bar.com";
                const actual = user.email;
                expect(actual).toEqual(userData.email);
                expect(actual).toEqual(expacted);
            });
        });
    });

    describe("create order", () => {
        let data = { password: 1, email: "foo@bar.com" };
    });*/
});
