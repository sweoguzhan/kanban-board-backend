const mongoose = require('mongoose');
const Category = require('./Category');
const Card = require('./Card');
const TaskListSchema = require('./TaskListSchema');
const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
});

boardSchema.pre('remove', async function(next) {
    try {
        const categories = await Category.find({ boardId: this._id });

        for (let category of categories) {
            await Card.deleteMany({ categoryId: category._id });

            const cards = await Card.find({ categoryId: category._id });
            for (let card of cards) {
                await TaskListSchema.deleteMany({ cardId: card._id });
            }
        }

        await Category.deleteMany({ boardId: this._id });

        next();
    } catch (error) {
        next(error);
    }
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
