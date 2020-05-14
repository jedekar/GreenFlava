const mongoose = require("mongoose");

let mongoDB = "mongodb://127.0.0.1/test_database";
mongoose.connect(mongoDB);

const Order = require("../order_model");
const User = require("../user_model");

describe("Order model test", () => {
    let user;
    beforeAll(async () => {
        await Order.remove({});
        await User.remove({});
    });

    beforeEach(async () => {
        user = new User({ password: 1, email: "foo@bar.com" });
        await user.save();
    });

    afterEach(async () => {
        await Order.remove({});
        await User.remove({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("has a module Order", () => {
        expect(Order).toBeDefined();
    });

    describe("get order", () => {
        it("get a order", async () => {
            const order = new Order({
                creator: user,
                location_from: { coordinates: [1, 1] },
                location_to: { coordinates: [2, 2] },
                status: "Created",
            });
            await order.save();

            const foundOrder = await Order.findOne({ creator: user });
            const expacted = {
                location_from: { coordinates: [1, 1] },
                location_to: { coordinates: [2, 2] },
            };
            const actual = {
                location_from: {
                    coordinates: [...foundOrder.location_from.coordinates],
                },
                location_to: {
                    coordinates: [...foundOrder.location_to.coordinates],
                },
            };
            expect(actual).toEqual(expacted);
        });
    });

    describe("save order", () => {
        it("save a order", async () => {
            const order = new Order({
                creator: user,
                location_from: { coordinates: [1, 1] },
                location_to: { coordinates: [2, 2] },
                status: "Created",
            });
            const saveOrder = await order.save();
            const expacted = {
                location_from: { coordinates: [1, 1] },
                location_to: { coordinates: [2, 2] },
            };
            const actual = {
                location_from: {
                    coordinates: [...saveOrder.location_from.coordinates],
                },
                location_to: {
                    coordinates: [...saveOrder.location_to.coordinates],
                },
            };
            expect(actual).toEqual(expacted);
        });
    });

    describe("update order", () => {
        it("update a order", async () => {
            const order = new Order({
                creator: user,
                location_from: { coordinates: [1, 1] },
                location_to: { coordinates: [2, 2] },
                status: "Created",
            });
            await order.save();
            order.location_from = { coordinates: [3, 3] };
            const updateOrder = await order.save();

            const expacted = {
                location_from: { coordinates: [3, 3] },
                location_to: { coordinates: [2, 2] },
            };
            const actual = {
                location_from: {
                    coordinates: [...updateOrder.location_from.coordinates],
                },
                location_to: {
                    coordinates: [...updateOrder.location_to.coordinates],
                },
            };
            expect(actual).toEqual(expacted);
        });
    });
});
