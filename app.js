const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const jogoController = require("./jogoController");
const categoriaController = require("./categoriaController")

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
    'mongodb://localhost:27017/jogos-api',
    { useNewUrlParser: true });

app.use('/jogos', jogoController);
app.use('/categorias', categoriaController);

app.listen(3000);