const Form = require('../models/Form')

// add
async function addForm(form) {
    const newForm = await Form.create(form);
    return newForm
}

// get list with search and pagination
async function getForm(search = '', limit = 10, page = 1) {
    const [forms, count] = await Promise.all([
        Form.find({ name: { $regex: search, $options: 'i' } })
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 }),
        Form.countDocuments({ name: { $regex: search, $options: 'i' } })
    ])
    return {
        forms,
        lastPage: Math.ceil(count / limit)
    }
}


module.exports = {
    addForm,
    getForm,
}