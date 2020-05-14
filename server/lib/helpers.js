const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET } = require("../config");

//generate JWT
function generateAccessToken(user) {
    return jwt.sign(user.toJSON(), ACCESS_TOKEN_SECRET);
}

function authenticateToken(token) {
    let user_data;
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return err;
        user_data = user;
    });
    return user_data;
}

module.exports = { generateAccessToken, authenticateToken };
