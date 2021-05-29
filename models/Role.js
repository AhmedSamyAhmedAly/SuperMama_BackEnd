const mongoose = require('mongoose');


const roleSchema = new mongoose.Schema({
    role: { type: String, required: true } 

})
///////match user schema with user table ///////
const Role = mongoose.model('Roles', roleSchema)

module.exports = Role;