const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const courseSchema = new Schema({
    ID: { type: String, required: true },
    code: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: String, required: false },
    
    students: [{ type: String, required: false }],
    coverImg: { type: String, required: false },

    category: { type: String, required: true },
    sections: [{ type: String,  required: false }]
});

module.exports = mongoose.model('Course', courseSchema);

