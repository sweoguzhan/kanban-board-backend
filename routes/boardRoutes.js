const express = require('express');
const { createBoard, getBoards, updateBoard, deleteBoard, getBoard } = require('../controllers/boardController');
const router = express.Router();


router.post('/', createBoard);
router.get('/', getBoards);
router.get('/:id', getBoard);
router.put('/:id', updateBoard);
router.delete('/:id', deleteBoard);

module.exports = router;
