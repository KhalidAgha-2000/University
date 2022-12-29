const bcrypt = require('bcryptjs')
const userModel = require('../models/users')
const jwt = require('jsonwebtoken')
const { singin } = require('../routes/validation')

class Controller {
    get(req, res, next) {
        userModel.find({}, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }


    // Creating an User 
    async post(req, res) {
        // Validate before saving an User 
        const { error } = singin(req.body);
        if (error) return res.json({ error: error.details[0].message });

        // Check if the username is already in the database 
        const userExists = await userModel.findOne({ username: req.body.username })
        if (userExists) return res.json({ success: false, message: "User already exists" })

        //  Hashing a password
        const salt = await bcrypt.genSalt(10); //The salt will hash the password and create a string password of dfault complexity of 10
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //  User creation if no error in User data enetered 
        const user = new userModel({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: hashedPassword,
        })
        try {
            const savedUser = await user.save() //This is to save the entered user data once post request is finished 
            res.status(200).json({ success: true,message:"New User has been addded! ", users: savedUser })
        }
        catch (err) {
            res.send({ message: 'Error' })
        }
    }

}


const controller = new Controller(); //Creating an instance from this class 
module.exports = controller; ts = controller;