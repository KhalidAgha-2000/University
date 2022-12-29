const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    const TokenCookie = req.cookies.Ctoken;

    if (TokenCookie || token) {
        jwt.verify(token || TokenCookie, process.env.TOKEN_SCERET, (err, decodedToken) => {
            if (err) {
                return res.json({ status: 400, message: err.message })
            }
            else {
                next()
            }
        })
    }
    else {
        return res.json({ status: 400, message: 'Not Authenticated! ' })
    }

}

module.exports = { authenticate };