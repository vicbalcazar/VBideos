const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid') (Joi);

const express = require('express');
const app = express();

require('./startup/routes') (app);
require('./startup/db') ();

// process.on('uncaughtException', (ex) => {
//     winston.error(ex.message, ex);
//     process.exit(1);
// } );

winston.handleExceptions(
    new winston.transports.File( {filename: 'uncaughtExceptions.log'} ));

process.on('unhandledRejection', (ex) => {
    // winston.error(ex.message, ex);
    // process.exit(1);
    throw ex;
} );

winston.add(winston.transports.File, { filename: 'logfile.log'});
winston.add(winston.transports.MongoDB, { 
    db:'mongodb://localhost/vidly', 
    level: 'info'
});

// const p = Promise.reject(new Error('failed like a bitch'));
// p.then( () => console.log('Done'));



if(!config.get('jwtMyKey')) {
    console.log('FATAL ERROR: jwtMyKey is not defined');
    process.exit(1);
}




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));