const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/film')
.then(()=> console.log('Mongo is UP.'))
.catch(err => console.log('Mongo is Down , raison : ',err.message));