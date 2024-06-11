// models/TaskList.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskListSchema = new Schema({
    description: {
        type: String,
        required: false,
    },
    dueDate: {
        type: Date,
        required: false,
    },
    cardId: {
        type: Schema.Types.ObjectId,
        ref: 'Card',
        required: true,
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

module.exports = mongoose.model('TaskListSchema', TaskListSchema);
