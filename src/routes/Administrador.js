import {
    NovoPaciente,
    BuscaPacientes,
    BuscaPaciente,
    ModificaPaciente,
    DeletaPaciente
} from "../controllers/PacienteController";
import ValidaPaciente from '../config/middleware/validatorPaciente';
import {Router} from 'express';
import {BuscaExame, BuscaExames, DeletaExame, ModificaExame, NovoExame} from "../controllers/ExameController";

const Route = Router();

Route.post('/paciente', ValidaPaciente(1), NovoPaciente);
Route.get('/paciente', BuscaPacientes)
Route.get('/paciente/:cpf', BuscaPaciente)
Route.put('/paciente', ModificaPaciente)
Route.delete('/paciente/:cpf', DeletaPaciente)

Route.post('/exame', NovoExame)
Route.get('/exame', BuscaExames)
Route.get('/exame/:cpf', BuscaExame)
Route.delete('/exame/:id', DeletaExame)
Route.put('/exame', ModificaExame)

export default Route;