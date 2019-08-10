const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URL, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Database connection established');
  })
  .catch(err => {
    console.error(`Database error, exiting. Stack trace:\n${err}`);
    process.exit();
  });

const app = express();

const whitelist = [process.env.FRONTEND_URL, 'https://bementor.be'];
const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.ENVIRONTMENT !== 'production' && !origin) return callback(null, true);
    if (whitelist.indexOf(origin) !== -1) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  credentials: true
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();
app.use('/api', router);

require('./src/lib/auth');
require('./src/route/user.route')(router);
require('./src/route/conversation.route')(router);
require('./src/route/message.route')(router);
require('./src/route/interest.route')(router);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
