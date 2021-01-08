import {
    NovoPaciente,
    BuscaPacientes,
    BuscaPaciente,
    ModificaPaciente,
    DeletaPaciente
} from "../controllers/PacienteController";
import {
    BuscaExame,
    BuscaExames,
    DeletaExame,
    ModificaExame,
    NovoExame
} from "../controllers/ExameController";

import {Login} from "../controllers/AdministradorController";
import ValidaPaciente from '../config/middleware/validatorPaciente';
import autenticacao from "../config/middleware/autenticacao";

import {Router} from 'express';

const Route = Router();

Route.post('/paciente', autenticacao(5), ValidaPaciente(1), NovoPaciente);
Route.get('/pacientes', autenticacao(5), BuscaPacientes)
Route.get('/paciente/:cpf', autenticacao(5), BuscaPaciente)
Route.put('/paciente', autenticacao(5), ModificaPaciente)
Route.delete('/paciente/:cpf', autenticacao(5), DeletaPaciente)

Route.post('/exame', autenticacao(5), NovoExame)
Route.get('/exame', autenticacao(5), BuscaExames)
Route.get('/exame/:cpf', autenticacao(5), BuscaExame)
Route.delete('/exame/:id', autenticacao(5), DeletaExame)
Route.put('/exame', autenticacao(5), ModificaExame)

Route.post('/login', Login)

export default Route;