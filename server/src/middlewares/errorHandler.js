const errorHandler = (error, req, res) => {
    console.log(error);
    return res.send('faf');
};

module.exports = errorHandler;