const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const courseSchema = new Schema({
    ID: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    students: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
    coverImg: { type: String, required: false },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    sections: [{ type: Schema.Types.ObjectId, ref: 'Section', required: false }]
});

module.exports = mongoose.model('Course', courseSchema);

