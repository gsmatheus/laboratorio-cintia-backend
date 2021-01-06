import {NovoPaciente} from "../controllers/PacienteController";
import {Router} from 'express';
import ValidaPaciente from '../config/middleware/validatorPaciente';

const Route = Router();

// noinspection JSCheckFunctionSignatures
Route.post('/paciente', ValidaPaciente(1), NovoPaciente);


export default Route;