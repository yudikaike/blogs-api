const router = require('express').Router();
const userController = require('../controllers/userController');
const errorHandlerMiddleware = require('../middlewares/errorHandlerMiddleware');

router.post('/', userController.add, errorHandlerMiddleware);
router.get('/', userController.list, errorHandlerMiddleware);

module.exports = router;
