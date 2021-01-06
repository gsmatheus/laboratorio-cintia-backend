import {InsereNovoPaciente, ProcuraUmPaciente, InsereInformacoesPaciente} from "../models/PacienteModel";

const config = require('../config/mensagens');

export function NovoPaciente(req, res) {
    /**
     * Cadastra um novo paciente, dados recebido por POST.
     * @type {string}
     */
    let cpf = req.body.cpf
    let datanasc = req.body.datanasc
    let nome = req.body.nome
    let celular = req.body.celular
    let sexo = req.body.sexo

    /**
     * Verifica se o paciente já está cadastrado.
     */

    ProcuraUmPaciente(
        cpf
    ).then(value => {
        if (value.length === 0) {

            /**
             * Cadastra o login do paciente.
             */

            InsereNovoPaciente({
                cpf: cpf,
                datanasc: datanasc
            }).then(value => {
                let idPaciente = value.insertId

                /**
                 * Cadastra as informações do paciente.
                 */

                InsereInformacoesPaciente({
                    nome: nome,
                    celular: celular,
                    sexo: sexo,
                    idPacienteLogin: idPaciente
                }).then(() => {
                    res.status(200).send({message: config.PACIENTE.novo_sucesso})
                }, () => {
                    res.status(500).send({message: config.PACIENTE.informacoes_erro})
                })
            }, reason => {
                res.status(500).send({message: config.PACIENTE.desconhecido, err:reason})
            })
        } else {
            res.status(409).send({message: config.PACIENTE.procura_sucesso})
        }
    }, () => {
        res.status(500).send({message: config.PACIENTE.procura_erro})
    })
}