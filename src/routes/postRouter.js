const router = require('express').Router();
const postController = require('../controllers/postController');
const errorHandlerMiddleware = require('../middlewares/errorHandlerMiddleware');

router.post('/', postController.add, errorHandlerMiddleware);
router.get('/', postController.list, errorHandlerMiddleware);

module.exports = router;