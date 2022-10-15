require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { devDB } = require('./utils/constants');
const errorHandler = require('./middlewares/error-handler');

const { PORT = 3010, NODE_ENV, MONGO_DB } = process.env;

mongoose.connect(NODE_ENV === 'production' ? MONGO_DB : devDB);

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
app.use('/api', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
