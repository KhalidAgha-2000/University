const bcrypt = require('bcryptjs')
const Model = require('../models/users')
const jwt = require('jsonwebtoken')
const { login } = require('../routes/validation')

class Controller {
    async login(req, res, next) {
        //validate before saving 
        const { error } = login(req.body)
        if (error) return res.status(404).json({ success: false, message: error.message })// error.details[0].message 

        //check if user exists in database 
        const user = await Model.findOne({ username: req.body.username })
        if (!user) return res.status(404).json({ success: false, message: 'Invalid credential ! ' })

        //Validate password with the hashed one in database 
        bcrypt.compare(req.body.password, user.password, function (err, isMatch) {

            if (err) throw err

            else if (!isMatch) {
                res.status(404).json({ success: false, message: 'Invalid credential ! ' })
            }
            else {
                const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SCERET, { expiresIn: 60 * 60 })
                res.cookie('Ctoken', token).json({ success: true, message: "Successfully LogedIn ! ", user, token })
            }
        })
    }

    logout(req, res, next) {
        return res
            .clearCookie("Ctoken")
            .status(200)
            .json({ message: "Successfully logged out" });
    }
}

const controller = new Controller()
module.exports = controller;
