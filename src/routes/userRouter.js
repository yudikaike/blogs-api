const router = require('express').Router();
const userController = require('../controllers/userController');
const errorHandlerMiddleware = require('../middlewares/errorHandlerMiddleware');

router.post('/', userController.add, errorHandlerMiddleware);
router.get('/', userController.list, errorHandlerMiddleware);
router.get('/:id', userController.get, errorHandlerMiddleware);

module.exports = router;
