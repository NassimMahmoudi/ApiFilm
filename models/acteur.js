const mongoose = require('mongoose');

const acteur_schema = new mongoose.Schema({
    nom : String,
    annee_nais : Number
});



module.exports=mongoose.model('Acteur',acteur_schema);;
