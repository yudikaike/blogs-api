const Joi = require('joi');
const { runSchema, throwNotFoundError } = require('./_services');
const { User } = require('../database/models');

const userServices = {
  validateBodyLogin: runSchema(Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).messages({
    'string.empty': 'Some required fields are missing',
    'any.required': 'Some required fields are missing',
  })),

  async checkIfLoginExists({ email, password }) {
    const user = await User.findOne({ where: { email, password } });
    if (!user) throwNotFoundError('Invalid fields');
  }, 
};

module.exports = userServices;
