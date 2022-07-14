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
};

module.exports = userController;
