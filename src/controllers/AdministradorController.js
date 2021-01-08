import {ProcuraUsuario} from "../models/AdministradorModel";
import JWT from 'jsonwebtoken';

const config = require('../config/mensagens');

export function Login(req, res) {
    /**
     * Faz login do administrador, retornando a access-token.
     */
    let username = req.body.username
    let password = req.body.password
    let bcrypt = require('bcrypt')

    // bcrypt.hash('admin', 5, function (err, hash) {
    //     console.log(hash)
    // })

    ProcuraUsuario(username).then(value => {
        if (value.length === 0) {
            res.status(404).send({message: config.ADMINISTRADOR.login_user_errado})
        } else {
            if (bcrypt.compareSync(password, value[0].password)) {
                let access_token = JWT.sign({
                    idUser: value[0].idUser,
                    admin: true
                }, process.env.SECRET, {
                    expiresIn: 7200
                })

                res.status(200).send({access_token: access_token})
            } else {
                res.status(401).send({message: config.ADMINISTRADOR.login_incorreto})
            }
        }
    }, () => {
        res.status(400).send({message: config.ADMINISTRADOR.login_consulta_erro})
    })

}