const db = require('./db/config')
const express = require('express');

const film_router = require('./routers/film');
const acteur_router = require('./routers/acteur');

const app = express();

app.use(express.json());

app.use('/api/film',film_router);
app.use('/api/acteur',acteur_router);

app.listen(3000);