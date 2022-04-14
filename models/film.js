const mongoose = require('mongoose');
const { Acteur } = require('./acteur');

const film_schema = new mongoose.Schema({
    nom : String,
    acteurs : [String],
    year : Number
});



module.exports=mongoose.model('Film',film_schema);;
