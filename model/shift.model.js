const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShiftSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activity',
        required: true
    },
    date: Date,
    duration: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Shift = mongoose.model('Shift', ShiftSchema);

module.exports = Shift;