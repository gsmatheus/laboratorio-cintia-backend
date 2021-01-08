import {Select} from "./default/Querys";

export function ProcuraUsuario(username) {
    return Select('SELECT password, idUser FROM Users WHERE username = ?', username)
}