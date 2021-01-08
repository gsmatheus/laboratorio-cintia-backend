import express from 'express';
import bodyParser from 'body-parser';

import Administrador from './routes/Administrador';
import Usuario from './routes/Usuario';

const app = express();
const morgan = require('morgan');
require("dotenv-safe").config();

/**
 * Configurações do Express
 */

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(morgan('dev'));
app.use(bodyParser.json())

/**
 * Rotas
 */

app.use('/admin', Administrador);
app.use('/user', Usuario);

/**
 * Iniciando o servidor
 */

app.listen(3636, "localhost", function () {
    console.log('Servidor rodando na porta:', 3636)
});