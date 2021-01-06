import express from 'express';

const app = express();

app.listen(3636, "localhost", function () {
    console.log('Servidor rodando na porta:', 3636)
});