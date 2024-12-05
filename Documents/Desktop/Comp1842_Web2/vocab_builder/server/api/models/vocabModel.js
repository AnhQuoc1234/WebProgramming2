const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VocabSchema = new Schema({
    english: {
        type: String,
        required: 'English word cannot be blank!',
        trim: true
    },
    german: {
        type: String,
        required: 'German word cannot be blank!',
        trim: true
    },
    vietnamese: {
        type: String,
        required: 'Vietnamese word cannot be blank!',
        trim: true
    }
    },
    { collection: 'vocab' }
);

module.exports = mongoose.model('Vocab', VocabSchema);