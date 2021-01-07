import {
    NovoPaciente,
    BuscaPacientes,
    BuscaPaciente,
    ModificaPaciente,
    DeletaPaciente
} from "../controllers/PacienteController";
import ValidaPaciente from '../config/middleware/validatorPaciente';
import {Router} from 'express';

const Route = Router();

Route.post('/paciente', ValidaPaciente(1), NovoPaciente);
Route.get('/paciente', BuscaPacientes)
Route.get('/paciente/:cpf', BuscaPaciente)
Route.put('/paciente/', ModificaPaciente)
Route.delete('/paciente/:cpf', DeletaPaciente)

export default Route;