const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    hall: {
        type: Schema.Types.ObjectId,
        ref: 'Hall',
        required: true
    },
    movie: {
        title: {type: String, required: true},
        tagline: String,
        released: {
            low: Number,
            high: Number
        }
    },
    dateTime: {type: Date}
}, {
    timestamps: true
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;