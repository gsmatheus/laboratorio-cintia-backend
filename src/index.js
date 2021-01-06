import express from 'express';
import bodyParser from 'body-parser';

import Administrador from './routes/Administrador';

const app = express();
const morgan = require('morgan');

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


/**
 * Iniciando o servidor
 */

app.listen(3636, "localhost", function () {
    console.log('Servidor rodando na porta:', 3636)
});