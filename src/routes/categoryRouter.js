const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const errorHandlerMiddleware = require('../middlewares/errorHandlerMiddleware');

router.post('/', categoryController.add, errorHandlerMiddleware);

module.exports = router;
