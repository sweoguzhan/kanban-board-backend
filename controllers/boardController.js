// Tüm crud işlemlerini yap aşağıda

const Board = require('../models/Board');
const Category = require('../models/Category');

exports.getBoards = async (req, res) => {
    try{
        const boards = await Board.find().populate({
            path: 'categories',
            populate: {
                path: 'cards',
                populate: {
                    path: 'taskLists',
                    model: 'TaskListSchema',
                },
            },
        });
        res.status(200).json(boards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getBoard = async (req, res) => {
    const { id } = req.params;
    try {
        const board = await Board.findById(id).populate({
            path: 'categories',
            populate: {
                path: 'cards',
                populate: {
                    path: 'taskLists',
                    model: 'TaskListSchema',
                },
            },
        });
        res.status(200).json(board);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createBoard = async (req, res) => {
    const { name } = req.body;

    try {
        const newBoard = new Board({ name });
        await newBoard.save();

        const categories = ['In Progress', 'To Do', 'Designed', 'Backlog'];

        for (let categoryName of categories) {
            const category = new Category({
                name: categoryName,
                boardId: newBoard._id,
            });
            await category.save();
            newBoard.categories.push(category._id);
        }

        await newBoard.save();
        res.status(201).json(newBoard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBoard = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedBoard = await Board.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );
        res.status(200).json(updatedBoard);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteBoard = async (req, res) => {
    const { id } = req.params;
    try {
        await Board.findByIdAndDelete(id);
        res.status(200).json({ message: 'Board deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
