import JWT from 'jsonwebtoken';

export default function VerificaJWT(role) {
    return function (req, res, next) {
        /**
         * Captura o token no headers
         */
        const access_token = req.headers['x-access-token']

        if (!access_token) {
            return res.status(403).send({message: 'No token provided'});
        } else {
            JWT.verify(access_token, process.env.SECRET, function (err, decoded) {
                if (err) {
                    return res.status(401).send({message: 'Failed to authenticate Token'});
                } else {
                    req.idPaciente = decoded.idUser
                    req.cpf = decoded.cpf

                    if (decoded.admin) {
                        req.admin = true
                        next()
                    } else if (role === 1) {
                        next()
                    } else {
                        return res.status(401).send({message: 'Not authorized'});
                    }
                }
            })
        }
    }
}