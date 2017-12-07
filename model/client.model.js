const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    firstName: {type: String, required: true},
    infix: String,
    lastName: {type: String, required: true},
    // dateOfBirth: {type: Date, required: true},
    address: {
        streetName: {type: String, required: true},
        homeNumber: {type: Number, required: true},
        city: {type: String, required: true}
    }
}, {
    timestamps: true
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;