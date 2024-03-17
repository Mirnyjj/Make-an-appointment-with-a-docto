const mongoose = require('mongoose');


const FormSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Form = mongoose.model('Form', FormSchema);

module.exports = Form;