const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const server = express();

//conecta com mongodb
mongoose
    .connect('mongodb+srv://owapi:AdhRONoWfoM2WaFH@cluster0-kgkfr.mongodb.net/owbackend?retryWrites=true&w=majority',
    {
        useNewUrlParser: true
    });
server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);