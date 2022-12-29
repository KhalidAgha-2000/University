const studentModel = require('../models/students')



class Controller {

    // ---------- Add Student
    async addStudent(req, res, next) {
        const student = new studentModel({

            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            countrycode: req.body.countrycode,
            dateOfBirth: req.body.dateOfBirth,


        })

        try {
            const saveStudent = await student.save()
            res.status(200).json({ success: true, message: "New Stundent has been addded! ", users: saveStudent })
        }
        catch (err) {
            res.send({ message: 'Error' })
        }
    }

    //----------------- Get One Student
    getOneStudent(req, res, next) {
        let { id } = req.params
        studentModel.findOne({ _id: id }, (err, response) => {
            if (err) next(err);
            res.status(200).json({ success: true, message: `Student with ID ${id} `, data: response })
        })
    }

    // --------------- Update Student
    async updateStudent(req, res, next) {
        let { id } = req.params;

        const student = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            countrycode: req.body.countrycode,
            dateOfBirth: req.body.dateOfBirth,
        }
        studentModel.updateOne({ _id: id }, {
            $set: student
        }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, message: `Student with ID ${id} has been updated`, data: response });
        });
    }

    // -------------- Delete Student
    deleteStudent(req, res, next) {
        let { id } = req.params
        studentModel.findOne({ _id: id }, (err, response) => {
            if (err) return next(err)
            studentModel.deleteOne({ _id: id }, (err, response) => {
                res.status(200).json({ success: true, message: "Student Deleted !", data: response })
            })
        })
    }



    // -------------- Get All Students with pagination


    async allStudents(req, res, next) {
        try {
            const { page = 2, limit = 10 } = req.query;

            const students = await studentModel.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .sort({ createdAt: -1 })
                .exec();

            const count = await studentModel.countDocuments();
            res.status(200).json({
                students,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
            });
        } catch (err) {
            next(err);
        }


    }
}

module.exports = new Controller();
