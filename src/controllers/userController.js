const authServices = require('../services/authServices');
const userServices = require('../services/userServices');

const errors = {
  ValidationError: 400,
  NotFoundError: 400,
};

const userController = {
  async login(req, res) {
    try {
      await userServices.validateBodyLogin(req.body);
      await userServices.checkIfLoginExists(req.body);
      const token = await authServices.createToken(req.body);
      res.status(200).json({ token });
    } catch ({ name, message }) {
      const status = errors[name];
      if (!status) return res.sendStatus(500);
      return res.status(status).json({ message });
    }
  },
};

module.exports = userController;
