const errorHandler = (err, req, res, next) => {
  const statusCode = (!err.statusCode) ? 500 : err.statusCode;
  const errMessage = (statusCode === 500) ? `На сервере произошла ошибка ${err.name}` : err.message;
  res.status(statusCode).send({ message: errMessage });
  next();
};

module.exports = errorHandler;
