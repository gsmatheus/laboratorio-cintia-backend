import MySQL from 'mysql';

const connection = MySQL.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'laboratorio_cintia',
    connectionLimit: 10,
});

export default connection;