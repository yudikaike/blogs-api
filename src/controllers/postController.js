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

  async list(req, res, next) {
    try {
      const token = req.headers.authorization;
      const { id: userId } = await authServices.validateToken(token);
      const posts = await postServices.list(userId);
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  },

  async get(req, res, next) {
    try {
      const token = req.headers.authorization;
      const { id } = req.params;
      await authServices.validateToken(token);
      const post = await postServices.get(id);
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const token = req.headers.authorization;
      const { id: updatePostId } = req.params;
      const { id: userId } = await authServices.validateToken(token);
      await postServices.checkIfPostExists(updatePostId);
      await postServices.checkIfUserHasAuthorization(userId, updatePostId);
      await postServices.validateBodyUpdate(req.body);
      await postServices.update(req.body, updatePostId);
      const post = await postServices.get(updatePostId);
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const token = req.headers.authorization;
      const { id: deletePostId } = req.params;
      const { id: userId } = await authServices.validateToken(token);
      await postServices.checkIfPostExists(deletePostId);
      await postServices.checkIfUserHasAuthorization(userId, deletePostId);
      await postServices.delete(deletePostId);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = postController;
