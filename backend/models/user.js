const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    ID: { type: String, required: true },
    bio: { type: String, required: false },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, required: false },
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course', required: false }]
});

module.exports = mongoose.model('User', userSchema);

