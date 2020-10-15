const express = require('express');
const restful = require('node-restful');
const serve = express();
const mongoose = restful.mongoose;
const bodyParser = require('body-parser');
const cors = require('cors');

//database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://db/mydb');

//Middlewares
serve.use(bodyParser.urlencoded({extended:true}));
serve.use(bodyParser.json());
serve.use(cors());

//ODM
const Client = restful.model('Client', {
    name: { type: String, required: true }
});

//Rest API
Client.methods(['get', 'post', 'put', 'delete']);
Client.updateOptions({new: true, runValidators: true});

//Routes
Client.register(serve, '/clients');

//start
serve.listen(3000);