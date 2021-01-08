export default function IntegridadeCpf() {
    return function (req, res, next) {
        if (req.cpf === req.params.cpf) {
            next()
        } else {
            res.status(401).send({message: 'Sem permissao.'})
        }
    }
}