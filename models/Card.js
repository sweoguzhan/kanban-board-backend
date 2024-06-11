// models/Card.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    color: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
    },
    taskLists: [{
        type: Schema.Types.ObjectId,
        ref: 'TaskListSchema',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Card', cardSchema);
