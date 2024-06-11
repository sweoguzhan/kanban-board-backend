const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cards: [{
        type: Schema.Types.ObjectId,
        ref: 'Card',
    }],
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    },
    order: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Category', categorySchema);
