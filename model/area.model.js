const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AreaSchema = new Schema({
    name: {type: String, required: true}
}, {
    timestamps: true
});

const Area = mongoose.model('Area', AreaSchema);

module.exports = Area;