const authServices = require('../services/authServices');
const categoryServices = require('../services/categoryServices');

const categoryController = {
  async add(req, res, next) {
    try {
      const token = req.headers.authorization;
      await authServices.validateToken(token);
      await categoryServices.validateBodyAdd(req.body);
      const category = await categoryServices.add(req.body);
      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = categoryController;
