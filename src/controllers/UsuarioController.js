import {ProcuraUmPaciente} from "../models/PacienteModel";
import JWT from 'jsonwebtoken';

const config = require('../config/mensagens');

export function Login(req, res) {
    /**
     * Faz o login do usuario normal/paciente.
     */
    let cpf = req.body.cpf;
    let datanasc = req.body.datanasc;

    ProcuraUmPaciente(cpf).then(value => {
        if (value.length !== 0) {
            if (value[0].datanasc === datanasc) {
                let access_token = JWT.sign({
                    idUser: value[0].id,
                    cpf: value[0].cpf,
                    admin: false
                }, process.env.SECRET, {
                    expiresIn: 7200
                });
                res.status(200).send({access_token: access_token})
            } else {
                res.status(401).send({message: 'Data de nascimento incorreta.', status: false})
            }
        } else {
            res.status(400).send({message: config.PACIENTE.busca_sem_cadastro})
        }
    }, reason => {
        res.status(500).send({message: reason})
    })
}