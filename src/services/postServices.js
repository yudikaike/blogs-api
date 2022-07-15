const Joi = require('joi');
const { 
  runSchema, 
  throwCategoryNotFoundError,
  throwPostNotFoundError, 
} = require('./_services');
const { BlogPost } = require('../database/models');
const { Category } = require('../database/models');
const { PostCategory } = require('../database/models');
const { User } = require('../database/models');

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

  async list(userId) {
    const blogPosts = await BlogPost.findAll({ where: { userId }, 
      include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Category, as: 'categories' }] });
    if (!blogPosts.length) throwPostNotFoundError('Posts not found');
    return blogPosts;
  },

  async get(id) {
    const blogPost = await BlogPost.findOne({ where: { id }, 
      include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Category, as: 'categories' }] });
    if (!blogPost) throwPostNotFoundError('Post does not exist');
    return blogPost;
  },
};

module.exports = postServices;
