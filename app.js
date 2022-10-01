const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/diplomdb');

const { PORT = 3010 } = process.env;
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://diplomat.nomoredomains.icu',
    'https://diplomat.nomoredomains.icu',
    'http://dmitry-karapotkin.github.io',
    'https://dmitry-karapotkin.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Content-Type',
    'Origin',
    'Authorization',
    'Accept',
    'X-Requested-With',
  ],
  credentials: true,
};

const app = express();

app.use(helmet());
app.use(requestLogger);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const statusCode = (!err.statusCode) ? 500 : err.statusCode;
  const errMessage = (statusCode === 500) ? `На сервере произошла ошибка ${err.name} - ${err.message}` : err.message;
  res.status(statusCode).send({ message: errMessage });
  next();
});

app.listen(PORT);
