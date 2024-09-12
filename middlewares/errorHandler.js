const errorHandler = (error, _, res, next) => {
    res.status(error.code || 500).send(error.message);
    next();
};

module.exports = errorHandler;
