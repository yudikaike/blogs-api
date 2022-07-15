const router = require('express').Router();
const postController = require('../controllers/postController');
const errorHandlerMiddleware = require('../middlewares/errorHandlerMiddleware');

router.get('/search', postController.search, errorHandlerMiddleware);
router.post('/', postController.add, errorHandlerMiddleware);
router.get('/', postController.list, errorHandlerMiddleware);
router.get('/:id', postController.get, errorHandlerMiddleware);
router.put('/:id', postController.update, errorHandlerMiddleware);
router.delete('/:id', postController.delete, errorHandlerMiddleware);

module.exports = router;