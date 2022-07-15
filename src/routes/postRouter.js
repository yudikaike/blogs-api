const router = require('express').Router();
const postController = require('../controllers/postController');
const errorHandlerMiddleware = require('../middlewares/errorHandlerMiddleware');

router.post('/', postController.add, errorHandlerMiddleware);

module.exports = router;