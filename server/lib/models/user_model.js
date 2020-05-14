const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, "is invalid"],
        index: true,
    },
    password: {
        type: String,
        select: false,
        required: [true, "can't be blank"],
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

userSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("User", userSchema, "user");
