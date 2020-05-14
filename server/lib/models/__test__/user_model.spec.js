const mongoose = require("mongoose");

let mongoDB = "mongodb://127.0.0.1/test_database";
mongoose.connect(mongoDB);

const User = require("../user_model");

describe("User model test", () => {
    beforeAll(async () => {
        await User.remove({});
    });

    afterEach(async () => {
        await User.remove({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("has a module User", () => {
        expect(User).toBeDefined();
    });

    describe("get user", () => {
        it("get a user", async () => {
            const user = new User({ password: 1, email: "foo@email.com" });
            await user.save();

            const foundUser = await User.findOne({ email: "foo@email.com" });
            const expacted = "foo@email.com";
            const actual = foundUser.email;
            expect(actual).toEqual(expacted);
        });
    });

    describe("save user", () => {
        it("save a user", async () => {
            const user = new User({ password: 1, email: "foo@email.com" });
            const saveUser = await user.save();
            const expacted = "foo@email.com";
            const actual = saveUser.email;
            expect(actual).toEqual(expacted);
        });
    });

    describe("update user", () => {
        it("update a user", async () => {
            const user = new User({ password: 1, email: "foo@email.com" });
            await user.save();
            user.email = "bar@email.com";
            const updateUser = await user.save();

            const expacted = "bar@email.com";
            const actual = updateUser.email;
            expect(actual).toEqual(expacted);
        });
    });
});
