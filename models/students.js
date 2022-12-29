
const { model, Schema } = require('mongoose')

const studentSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type: String,
        required: true,
    },

    countrycode: {
        type: String,
        required: true,
    },
    creationDate: {
        type: Intl,
        required: false
    },
},
    {
        collection: 'students',
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);


studentSchema.virtual('creationdate')
    .get(function () {
        let date = new Date(this.creationDate)
        return date.toString()
    })


studentSchema.virtual('dateofbirth')
    .get(function () {
        let date = new Date(this.dateOfBirth)
        return date.toString()
    })


const Model = model('Student', studentSchema);
module.exports = Model;