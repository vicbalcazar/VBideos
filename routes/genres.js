const asyncMiddleware = require("../middleware/async");
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    //throw new Error('Could not get Genres.');
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', auth, async (req, res) => {


  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  await genre.save();
  res.send(genre);
});

router.put('/:id', auth, async (req, res) => {

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
  new: true
})

  //const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  //genre.name = req.body.name; 
  res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {

  const genre = await Genre.findByIdAndRemove(req.params.id);

  //const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  // const index = genres.indexOf(genre);
  // genres.splice(index, 1);

  res.send(genre);
});

router.get('/:id', async (req, res) => {

  const genre = await Genre.findById(req.params.id);
  //const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

module.exports = router;