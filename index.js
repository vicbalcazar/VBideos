const express = require('express');
const app = express();

const winston = require('winston');

require('./startup/logging') ();
require('./startup/routes') (app);
require('./startup/db') ();
require('./startup/config') ();
require('./startup/APIvalidation') ();

// process.on('uncaughtException', (ex) => {
//     winston.error(ex.message, ex);
//     process.exit(1);
// } );
// const p = Promise.reject(new Error('failed like a bitch'));
// p.then( () => console.log('Done'));

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));