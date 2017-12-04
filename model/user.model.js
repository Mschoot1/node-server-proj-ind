const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    // ,
    // area: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Area',
    //     required: true
    // }
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;