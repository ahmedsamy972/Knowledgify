const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const categorySchema = new Schema({
    ID: { type: String, required: true },
    name: { type: String, required: true },
    fields: [{
        title: { type: String, required: true },
        description: { type: String, required: true },
        imgURL: { type: String, required: false }
    }],
    courses: [{ type: String, required: false }]
});

module.exports = mongoose.model('Category', categorySchema);

