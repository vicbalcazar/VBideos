const {genreSchema} = require('./genre');
const Joi = require('joi');
const mongoose = require('mongoose');

//representation, document in mongoDB
const Movie = mongoose.model( 'Movies', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}) );
//input ot api
function ValidateMovie(movie){
    const schema = {
        title: Joi.string().min(1).max(255).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
        
    };
    //console.log('BBBBBBBBBB');
    return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.validate = ValidateMovie;