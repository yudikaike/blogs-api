const authServices = require('../services/authServices');
const userServices = require('../services/userServices');

const userController = {
  async login(req, res, next) {
    try {
      await userServices.validateBodyLogin(req.body);
      await userServices.checkIfLoginExists(req.body);
      const token = await authServices.createToken(req.body);
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  },

  async add(req, res, next) {
    try {
      await userServices.validateBodyAdd(req.body);
      await userServices.checkIfUserExists(req.body);
      await userServices.add(req.body);
      const token = await authServices.createToken(req.body);
      res.status(201).json({ token });
    } catch (err) {
      next(err);
    }
  },

  async list(req, res, next) {
    try {
      const token = req.headers.authorization;
      await authServices.validateToken(token);
      const users = await userServices.list();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  },

  async get(req, res, next) {
    try {
      const token = req.headers.authorization;
      const { id } = req.params;
      await authServices.validateToken(token);
      await userServices.validateParamsId(id);
      const users = await userServices.get(id);
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = userController;
