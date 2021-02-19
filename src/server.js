require('dotenv').config({
    path: (process.env.NODE_ENV || '').trim() === 'dev' ? '.env.dev' : '.env'
});

const express = require('express');

const cors = require('cors');

const routes = require('./routes');

require('./database')

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// console.log(process.env.DB_NAME)
app.listen(process.env.SERVER_PORT || 17380);
