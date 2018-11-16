const config = require('config');

module.exports = function () {
    if(!config.get('jwtMyKey')) {
        throw new Error('FATAL ERROR: jwtMyKey is not defined');
    }
    
}