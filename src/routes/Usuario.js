import {Login} from "../controllers/UsuarioController";

import {Router} from 'express';
import autenticacao from "../config/middleware/autenticacao";
import {BuscaPaciente} from "../controllers/PacienteController";
import {BuscaExame} from "../controllers/ExameController";
import IntegridadeCpf from "../config/middleware/integridade";

const Route = Router();

Route.get('/perfil/:cpf', autenticacao(1), IntegridadeCpf(), BuscaPaciente)
Route.get('/exame/:cpf', autenticacao(1), IntegridadeCpf(), BuscaExame)

Route.post('/login', Login)

export default Route;