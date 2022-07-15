const authServices = require('../services/authServices');
const postServices = require('../services/postServices');

const postController = {
  async add(req, res, next) {
    try {
      const token = req.headers.authorization;
      const { id: userId } = await authServices.validateToken(token);
      await postServices.validateBodyAdd(req.body);
      await postServices.checkIfCategoryExists(req.body);
      const post = await postServices.add(req.body, userId);
      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = postController;
