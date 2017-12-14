const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    schedule: {
        type: Schema.Types.ObjectId,
        ref: 'Schedule',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Schedule = mongoose.model('Reservation', ReservationSchema);

module.exports = Schedule;