const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HallSchema = new Schema({
    name: {type: String, required: true},
    cinema: {
        type: Schema.Types.ObjectId,
        ref: 'Cinema'
    },
    capacity: {type: Number, required: true}
}, {
    timestamps: true
});

const Hall = mongoose.model('Hall', HallSchema);

module.exports = Hall;