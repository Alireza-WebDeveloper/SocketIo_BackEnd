const express = require('express');
const dotenv = require('dotenv');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanatize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');
const hpp = require('hpp');
const bodyParser = require('body-parser');
const ErrorHandler = require('./Middlewares/ErrorHandler');

// 1 ) Enviroment

dotenv.config({ path: './config.env' });

// 2) MiddleWares Globals

app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));
app.use(cors());

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true, trim: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 3 Middleware Routes
app.use('/', (req, res, next) =>
  res.json({
    status: 200,
    data: {
      user: {
        id: 'lc1' + Math.floor(Math.random() * 23273) + 'c1',
        name: 'alireza',
      },
    },
    error: {},
  })
);
app.use(ErrorHandler);
// 4 ) helmet Securety http header , Data Sanitazion against NOSQL Query Injection , Data Sanitazion against XSS

app.use(mongoSanatize());
app.use(xss());
app.use(hpp());
app.use(helmet());

module.exports = app;
