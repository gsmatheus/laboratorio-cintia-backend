import {Insert, Select} from "./default/Querys";

export function InsereNovoPaciente(paciente) {
    return Insert('INSERT INTO PacienteLogin SET ?', paciente)
}

export function ProcuraUmPaciente(cpf) {
    return Select('SELECT cpf FROM PacienteLogin WHERE cpf = ?', cpf)
}

export function InsereInformacoesPaciente(informacoes) {
    return Insert('INSERT INTO Paciente SET ?', informacoes)
}