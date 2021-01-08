import {Delete, Insert, Select, Update} from "./default/Querys";

export function InsereNovoPaciente(paciente) {
    return Insert('INSERT INTO PacienteLogin SET ?', paciente)
}

export function InsereInformacoesPaciente(informacoes) {
    return Insert('INSERT INTO Paciente SET ?', informacoes)
}

export function ProcuraUmPaciente(cpf) {
    return Select('SELECT idPacienteLogin AS id, datanasc, cpf FROM PacienteLogin WHERE cpf = ?', cpf)
}

export function BuscaTodosPacientes() {
    return Select('SELECT PL.idPacienteLogin, PL.cpf, Pl.datanasc, P.nome, P.celular, P.sexo FROM PacienteLogin AS PL INNER JOIN Paciente AS P ON PL.idPacienteLogin = P.idPacienteLogin', [])
}

export function BuscaInformacaoPaciente(id) {
    return Select('SELECT PL.idPacienteLogin, PL.cpf, Pl.datanasc, P.nome, P.celular, P.sexo FROM PacienteLogin AS PL INNER JOIN Paciente AS P ON PL.idPacienteLogin = P.idPacienteLogin WHERE PL.idPacienteLogin = ?', id)
}

export function AtualizaPaciente(table, values, idPaciente) {
    return Update(`UPDATE ${table} SET ${values} WHERE idPacienteLogin = ${idPaciente}`, [])
}

export function ApagaPaciente(cpf) {
    return Delete('DELETE FROM PacienteLogin WHERE cpf = ?',cpf)
}