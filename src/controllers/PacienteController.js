import {
    InsereNovoPaciente, InsereInformacoesPaciente, ProcuraUmPaciente,
    BuscaTodosPacientes, BuscaInformacaoPaciente, AtualizaPaciente, ApagaPaciente
} from "../models/PacienteModel";

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
    console.log(cpf)
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
                res.status(500).send({message: config.PACIENTE.desconhecido, err: reason})
            })
        } else {
            res.status(409).send({message: config.PACIENTE.procura_sucesso})
        }
    }, () => {
        res.status(500).send({message: config.PACIENTE.procura_erro})
    })
}

export function BuscaPaciente(req, res) {
    /**
     * Busca os dados de um unico paciente.
     * @type {string}
     */
    let cpf = req.params.cpf;

    /**
     * Verifica se o cpf está cadastrado.
     */

    ProcuraUmPaciente(cpf).then(value => {
        if (value.length !== 0) {
            let id = value[0].id

            /**
             * Buscando os dados.
             */
            BuscaInformacaoPaciente(id).then(value1 => {
                res.status(200).send({dados: value1})
            }, () => {
                res.status(400).send({message: config.PACIENTE.busca_erro2})
            })
        } else {
            res.status(400).send({message: config.PACIENTE.busca_sem_cadastro})
        }
    }, () => {
        res.status(500).send({message: config.PACIENTE.procura_erro})
    })
}

export function BuscaPacientes(req, res) {
    /**
     * Busca todos os pacientes, retornando as informações de cada.
     */

    BuscaTodosPacientes().then(value => {
        res.status(200).send({pacientes: value})
    }, () => {
        res.status(400).send({message: config.PACIENTE.busca_erro})
    })
}

export function ModificaPaciente(req, res) {
    /**
     * Atualiza os dados de um paciente.
     */
    let id = req.body.id;
    let data = req.body.data;
    let type = req.body.type;

    /**
     * Verifica em qual tabela a informação será modificada
     */
    let table;
    switch (type) {
        case "login":
            table = 'PacienteLogin'
            break;
        case "perfil":
            table = 'Paciente'
            break;
        default:
            res.status(400).send({message: config.PACIENTE.type_invalido})
    }

    /**
     * Atualiza os dados.
     */
    AtualizaPaciente(table, data, id).then(() => {
        res.status(200).send({message: config.PACIENTE.atualiza_sucesso})
    }, () => {
        res.status(500).send({message: config.PACIENTE.atualiza_erro})
    })

}

export function DeletaPaciente(req, res) {
    /**
     * Apaga todos os dados do paciente do banco de dados.
     */
    let cpf = req.params.cpf;

    ProcuraUmPaciente(cpf).then(value => {
        if (value.length !== 0) {
            ApagaPaciente(cpf).then(() => {
                res.status(200).send({message: config.PACIENTE.apaga_sucesso})
            }, () => {
                res.status(500).send({message: config.PACIENTE.apaga_erro})
            })
        } else {
            res.status(400).send({message: config.PACIENTE.busca_sem_cadastro})
        }
    }, () => {
        res.status(500).send({message: config.PACIENTE.procura_erro})
    })
}