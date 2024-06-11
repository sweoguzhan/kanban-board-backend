const Category = require('../models/Category');
const Card = require('../models/Card');

exports.createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const newCategory = await Category.create({ name });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate({
            path: 'cards',
            populate: {
                path: 'taskLists',
                model: 'TaskListSchema',
            },
        });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id).populate({
            path: 'cards',
            match: { categoryId: id } // Filter cards by categoryId
        });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        await Card.deleteMany({ categoryId: category._id });
        await Category.deleteOne({ _id: category._id });
        res.status(200).json({ message: 'Category and associated cards deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
