const router = require('express').Router();
const userController = require('../controllers/userController');
const errorHandlerMiddleware = require('../middlewares/errorHandlerMiddleware');

router.post('/', userController.login, errorHandlerMiddleware);

module.exports = router;
