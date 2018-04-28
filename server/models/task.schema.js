const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {type: String},
    complete: {type: Boolean},
    category: {type: String}
});

module.exports = mongoose.model('Task', taskSchema);