const Joi = require('joi');
const { Op } = require('sequelize');
const { 
  runSchema, 
  throwCategoryNotFoundError,
  throwPostNotFoundError,
  throwUserUnauthorizedError, 
} = require('./_services');
const { BlogPost } = require('../database/models');
const { Category } = require('../database/models');
const { PostCategory } = require('../database/models');
const { User } = require('../database/models');

const REQUIRED_FIELD_MESSAGE = 'Some required fields are missing';

const postServices = {
  validateBodyAdd: runSchema(Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required().min(1),
  }).messages({
    'string.empty': REQUIRED_FIELD_MESSAGE,
    'any.required': REQUIRED_FIELD_MESSAGE,
    'array.min': REQUIRED_FIELD_MESSAGE,
  })),

  validateBodyUpdate: runSchema(Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }).messages({
    'string.empty': REQUIRED_FIELD_MESSAGE,
    'any.required': REQUIRED_FIELD_MESSAGE,
  })),

  async checkIfCategoryExists({ categoryIds }) {
    const categories = await Promise
      .all(categoryIds.map(async (id) => Category.findOne({ where: { id } })));
    if (categories.some((category) => !category)) {
      throwCategoryNotFoundError('"categoryIds" not found');
    } 
  },

  async checkIfUserHasAuthorization(userId, updatePostId) {
    const { posts } = await User.findOne({ where: { id: userId },
      include: [{ model: BlogPost, as: 'posts' }] });
    if (posts.every(({ id: postId }) => postId !== Number(updatePostId))) {
      throwUserUnauthorizedError('Unauthorized user');
    }
  },

  async checkIfPostExists(id) {
    const blogPost = await BlogPost.findOne({ where: { id } });
    if (!blogPost) throwPostNotFoundError('Post does not exist');
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

  async update({ title, content }, id) {
    await BlogPost.update({ title, content }, { where: { id } });
  },

  async delete(id) {
    await BlogPost.destroy({ where: { id } });
  },

  async search(query) {
    const blogPost = await BlogPost
    .findAll({ where: { [Op.or]: [{ title: { [Op.like]: `%${query}%` } },
     { content: { [Op.like]: `%${query}%` } }] }, 
     include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
     { model: Category, as: 'categories' }] });
    return blogPost;
  },
};

module.exports = postServices;
