const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const sectionSchema = new Schema({
    ID: { type: String, required: true },
    title: { type: String, required: true },
    num: { type: String, required: true },
    description: { type: String, required: true },
    course: { type: String, required: true },
    videos: [{
        title: { type: String, required: false },
        URL: { type: String, required: false }, 
        subtitle: { type: String, required: false }
    }]
});


module.exports = mongoose.model('Section', sectionSchema);

