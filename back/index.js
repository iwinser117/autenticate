const cookieParser = require('cookie-parser');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

// Configure dotenv files above using any other library and files
dotenv.config({ path: '.env' });
require('./conn.js');
const route = require('./routes/rutauserio.js');

// Creating an app from express
const app = express();

app.disable('x-powered-by');

app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

if (process.env.TRUST_PROXY === '1') {
  app.set('trust proxy', 1);
}

const allowedOrigins = (process.env.CORS_ORIGINS || 'https://autenticate.vercel.app')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});


// Using your routes
app.use('/api', apiLimiter, route);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = status === 500 ? 'Internal server error' : err.message;

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  res.status(status).json({ error: message });
});

// Listening to the server
const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
