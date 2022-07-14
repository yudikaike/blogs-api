const Joi = require('joi');
const { 
  runSchema, 
  throwNotFoundError, 
  throwUserAlreadyExistsError,
} = require('./_services');
const { User } = require('../database/models');

const userServices = {
  validateBodyLogin: runSchema(Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).messages({
    'string.empty': 'Some required fields are missing',
    'any.required': 'Some required fields are missing',
  })),

  validateBodyAdd: runSchema(Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string(),
  })),

  async checkIfLoginExists({ email, password }) {
    const user = await User.findOne({ where: { email, password } });
    if (!user) throwNotFoundError('Invalid fields');
  },
  
  async checkIfUserExists({ email }) {
    const user = await User.findOne({ where: { email } });
    if (user) throwUserAlreadyExistsError('User already registered');
  },

  async add({ displayName, email, password, image }) {
    await User.create({ displayName, email, password, image });
  },
};

module.exports = userServices;
