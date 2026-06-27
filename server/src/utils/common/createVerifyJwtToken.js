const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = process.env;


const createJwtToken = (payload, expiresIn) => {
    return jwt.sign(
        payload,
        JWT_SECRET_KEY,
        { expiresIn }
    );
};

const verifyJwtToken = (token) => {
    return jwt.verify(token, JWT_SECRET_KEY);
};

module.exports = { createJwtToken, verifyJwtToken };