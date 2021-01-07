import {Delete, Insert, Select, Update} from "./default/Querys";

export function InsereNovoExame(exame) {
    return Insert('INSERT INTO Exame SET ?', exame)
}

export function BuscaTodosExames() {
    return Select('SELECT E.idExame, PL.cpf, P.nome, E.nome AS nome_do_exame, E.data, E.url_pdf FROM PacienteLogin AS PL INNER JOIN Paciente AS P ON PL.idPacienteLogin = P.idPacienteLogin INNER JOIN Exame AS E ON PL.idPacienteLogin = E.idPacienteLogin', [])
}

export function BuscaExamePaciente(cpf) {
    return Select('SELECT E.idExame, PL.cpf, P.nome, E.nome AS nome_do_exame, E.data, E.url_pdf FROM PacienteLogin AS PL INNER JOIN Paciente AS P ON PL.idPacienteLogin = P.idPacienteLogin INNER JOIN Exame AS E ON PL.idPacienteLogin = E.idPacienteLogin WHERE PL.cpf = ?', cpf)
}

export function ApagaExame(id) {
    return Delete('DELETE FROM Exame WHERE idExame = ?', id)
}

export function AtualizaExame(values, idExame) {
    return Update(`UPDATE Exame SET ${values} WHERE idExame = ${idExame}`, [])
}