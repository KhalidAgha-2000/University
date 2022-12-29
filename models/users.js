
const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
  
},
    {
        collection: 'users',
        timestamps: true,

    }
);

const Model = model('User', userSchema);
module.exports = Model;