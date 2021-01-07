export default function ValidaPaciente(condition) {
    return function (req, res, next) {

        /**
         * Valida os dados da rota que adiciona um novo paciente.
         */
        if (condition === 1) {
            let cpf = req.body.cpf
            let datanasc = req.body.datanasc
            let nome = req.body.nome
            let celular = req.body.celular
            let sexo = req.body.sexo

            if (!cpf || !datanasc || !nome || !celular || !sexo) {
                return res.status(500).send({message: 'preencha'})
            } else {
                /**
                 * Remove . e - da string.
                 */
                req.body.cpf = String(cpf).replace('.', '')
                    .replace('.', '')
                    .replace('-', '')
                next()
            }
        }
    }
}