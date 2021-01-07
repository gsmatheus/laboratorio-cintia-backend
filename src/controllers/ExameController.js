import {ApagaExame, AtualizaExame, BuscaExamePaciente, BuscaTodosExames, InsereNovoExame} from "../models/ExameModel";

const config = require('../config/mensagens');

export function NovoExame(req, res) {
    /**
     * Adiciona um novo exame a um paciente.
     */
    let nome = req.body.nome
    let data = req.body.data
    let url_pdf = req.body.url_pdf
    let id = req.body.id

    InsereNovoExame({
        nome: nome,
        data: data,
        url_pdf: url_pdf,
        idPacienteLogin: id
    }).then(() => {
        res.status(200).send({message: config.EXAME.novo_sucesso})
    }, () => {
        res.status(500).send({message: config.EXAME.novo_erro})
    })
}

export function BuscaExames(req, res) {
    /**
     * Busca todos os exames.
     */
    BuscaTodosExames().then(value => {
        res.status(200).send({exames: value})
    }, () => {
        res.status(400).send({message: config.EXAME.busca_erro})
    })
}

export function BuscaExame(req, res) {
    /**
     * Busca todos os exames de um paciente.
     */
    let cpf = req.params.cpf

    BuscaExamePaciente(cpf).then(value => {
        res.status(200).send({exames: value})
    }, () => {
        res.status(500).send({message: config.EXAME.busca_erro})
    })
}

export function DeletaExame(req, res) {
    /**
     *  Apaga um exame de um paciente.
     */
    let id = req.params.id

    ApagaExame(id).then(value => {
        let affectedRows = value.affectedRows
        res.status(200).send({message: 'Exames apagados com sucesso.', total: affectedRows})
    }, reason => {
        res.status(500).send({message: reason})
    })
}

export function ModificaExame(req, res) {
    /**
     * Atualiza os dados de um exame
     */
    let id = req.body.id
    let data = req.body.data

    AtualizaExame(data, id).then(value => {
        let affectedRows = value.affectedRows
        res.status(200).send({message: config.EXAME.atualiza_sucesso, total: affectedRows})
    }, () => {
        res.status(500).send({message: config.EXAME.atualiza_erro})
    })
}