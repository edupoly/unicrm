import jwt from 'jsonwebtoken';

const { JWT_SECRET_KEY } = process.env;


const createJwtToken = (payload, expiresIn) => {
    return jwt.sign(
        payload,
        JWT_SECRET_KEY,
        { expiresIn }
    );
};

const verifyJwtToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET_KEY);
    }
    catch (err) {
        throw new jwt.JsonWebTokenError('Access Denied: Token got expired or modified');
    }
};

export { createJwtToken, verifyJwtToken };
