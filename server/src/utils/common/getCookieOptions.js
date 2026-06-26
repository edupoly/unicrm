const { NODE_ENV } = process.env;

const getCookieOptions = (maxAge) => {
    return {
        httpOnly: true,
        secure: NODE_ENV === 'dev' ? false : true,
        sameSite: NODE_ENV === 'dev' ? 'lax' : 'none',
        maxAge
    }
};

module.exports = getCookieOptions;