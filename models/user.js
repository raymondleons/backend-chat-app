const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

let SchemaUser = new Schema({
    email: { type: String, required: true, mas: 255, unique:true },
    password: { type: String, required: true }
})

SchemaUser.plugin(uniqueValidator, { message: 'Error, {VALUE} is not available.',
    type: 'Unique Validators' })

// Export the model
module.exports = mongoose.model('User', SchemaUser)

