const Joi = require('joi');
const { runSchema } = require('./_services');
const { Category } = require('../database/models');

const categoryServices = {
  validateBodyAdd: runSchema(Joi.object({
    name: Joi.string().required(),
  }).messages({
    'string.empty': '"name" is required',
  })),

  async add({ name }) {
    const category = await Category.create({ name });
    return { 
      id: category.id, 
      name: category.name,
    };
  },
};

module.exports = categoryServices;
