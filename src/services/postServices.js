const Joi = require('joi');
const { 
  runSchema, 
  throwCategoryNotFoundError, 
} = require('./_services');
const { BlogPost } = require('../database/models');
const { Category } = require('../database/models');
const { PostCategory } = require('../database/models');

const postServices = {
  validateBodyAdd: runSchema(Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required().min(1),
  }).messages({
    'string.empty': 'Some required fields are missing',
    'any.required': 'Some required fields are missing',
    'array.min': 'Some required fields are missing',
  })),

  async checkIfCategoryExists({ categoryIds }) {
    const categories = await Promise
      .all(categoryIds.map(async (id) => Category.findOne({ where: { id } })));
    if (categories.some((category) => !category)) {
      throwCategoryNotFoundError('"categoryIds" not found');
    } 
  },

  async add({ title, content, categoryIds }, userId) {
    const blogPost = await BlogPost.create({ title, content, userId });
    const postCategories = categoryIds.map((categoryId) => ({ postId: blogPost.id, categoryId }));
    await PostCategory.bulkCreate(postCategories);
    return blogPost;
  },
};

module.exports = postServices;
