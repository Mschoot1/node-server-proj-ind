const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CinemaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        streetName: String,
        city: String,
        zipCode: String
    }
}, {
    timestamps: true
});

const Cinema = mongoose.model('Cinema', CinemaSchema);

module.exports = Cinema;
