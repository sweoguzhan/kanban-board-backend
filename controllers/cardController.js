const Card = require('../models/Card');
const TaskList = require('../models/TaskListSchema');
const Category = require('../models/Category');

// Create Card with Task Lists
exports.createCard = async (req, res) => {
    const { categoryId, color, title, taskLists } = req.body;
    try {
        const newCard = new Card({ categoryId, color, title, taskLists });
        if (taskLists && taskLists.length > 0) {
            const taskListDocuments = await TaskList.insertMany(taskLists.map(task => ({
                ...task,
                cardId: newCard._id
            })));
            newCard.taskLists = taskListDocuments.map(task => task._id);
        }
        await newCard.save();

        await Category.findByIdAndUpdate(categoryId, { $push: { cards: newCard._id } });

        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Cards with Task Lists
exports.getCards = async (req, res) => {
    try {
        const cards = await Card.find().populate('taskLists').populate('categoryId');
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a Single Card with Task Lists
exports.getCard = async (req, res) => {
    const { id } = req.params;
    try {
        const card = await Card.findById(id).populate('taskLists').populate('categoryId');
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Card and its Task Lists
exports.updateCard = async (req, res) => {
    const { id } = req.params;
    const { categoryId, color, note, taskLists,order } = req.body;

    try {
        const card = await Card.findById(id);
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }

        const previousCategoryId = card.categoryId; // Save old category id
        const cardCount = await Card.countDocuments({ categoryId });
        const order = cardCount + 1;

        // Update card fields
        card.categoryId = categoryId || card.categoryId;
        card.color = color || card.color;
        card.note = note || card.note;
        card.order = order || card.order;

        if (taskLists && taskLists.length > 0) {
            await TaskList.deleteMany({ cardId: card._id });
            const taskListDocuments = await TaskList.insertMany(taskLists.map(task => ({
                ...task,
                cardId: card._id
            })));
            card.taskLists = taskListDocuments.map(task => task._id);
        }

        await card.save();

        if (previousCategoryId && previousCategoryId !== card.categoryId) {
            // Delete card from previous category
            await Category.findByIdAndUpdate(previousCategoryId, { $pull: { cards: card._id } });
        }

        // Add card to new category
        if (card.categoryId) {
            await Category.findByIdAndUpdate(card.categoryId, { $addToSet: { cards: card._id } });
        }

        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a Card and its Task Lists
exports.deleteCard = async (req, res) => {
    const { id } = req.params;
    try {
        const card = await Card.findById(id);
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }

        await TaskList.deleteMany({ cardId: card._id });
        await Card.deleteOne({ _id: card._id });
        res.status(200).json({ message: 'Card and associated task lists deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


