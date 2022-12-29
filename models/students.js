
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
        // trim: true,
        min: '1990-01-01',
        max: '2000-01-01'
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
},
    {
        collection: 'students',
        timestamps: true,

    }
);



const Model = model('Student', studentSchema);
module.exports = Model;