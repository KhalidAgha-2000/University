const userModel = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { singin } = require('../routes/validation')

class Controller {

    // -------------- Delete Student
    deleteUser(req, res, next) {
        let { id } = req.params
        userModel.findOne({ _id: id }, (err, response) => {
            if (err) return next(err)
            userModel.deleteOne({ _id: id }, (err, response) => {
                res.status(200).json({ success: true, message: "User Deleted !", data: response })
            })
        })
    }

    async resetPassword(req, res) {
        let { id } = req.params
        const user = await userModel.findOne({ _id: id })
        let oldPassword = req.body.oldPassword

        bcrypt.compare(oldPassword, user.password, async function (err, isMatch) {

            if (err) throw err

            else if (!isMatch) {
                res.status(404).json({ success: false, message: 'Invalid credential ! ' })
            }
            else if (req.body.password < 6) {
                res.status(404).json({ success: false, message: 'Password must be more than 6 characters' })
            }
            else {

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                const updateUser = await userModel.findByIdAndUpdate(user, {
                    $set: { password: hashedPassword },
                },
                    { new: true }
                );
                res.status(404).json({ success: true, message: 'Password has been updated', data:updateUser })
            }

        })




    }
}

module.exports = new Controller(); 